
import { useEffect, useRef, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PEDIDO_KEYS } from './usePedidos';
import { Pedido } from '@/interface/order.interface';

export interface WebSocketMessage {
  type: 'PEDIDO_CREATED' | 'PEDIDO_UPDATED' | 'PEDIDO_STATUS_CHANGED';
  data: Pedido;
}

const urlws =
  process.env.NODE_ENV === 'development'
    ? 'ws://localhost:3001'
    : 'wss://chef-burger-front.vercel.app';


export function useWebSocket(url: string = urlws) {
  const queryClient = useQueryClient();
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isConnectedRef = useRef(false);

  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const message: WebSocketMessage = JSON.parse(event.data);
      
      switch (message.type) {
        case 'PEDIDO_CREATED':
          // Atualizar cache para novo pedido
          queryClient.setQueryData<Pedido[]>(PEDIDO_KEYS.meusPedidos(), (old) => {
            if (!old) return [message.data];
            return [message.data, ...old];
          });

          queryClient.setQueryData<Pedido[]>(
            PEDIDO_KEYS.byStatus(message.data.status),
            (old) => {
              if (!old) return [message.data];
              return [message.data, ...old];
            }
          );

          toast.success('Novo pedido recebido!');
          break;

        case 'PEDIDO_UPDATED':
        case 'PEDIDO_STATUS_CHANGED':
          // Atualizar pedido existente em todas as listas
          queryClient.setQueriesData<Pedido[]>(
            { queryKey: PEDIDO_KEYS.lists() },
            (old) => {
              if (!old) return old;
              return old.map((pedido) =>
                pedido.id === message.data.id ? message.data : pedido
              );
            }
          );

          // Atualizar o pedido específico
          queryClient.setQueryData(
            PEDIDO_KEYS.detail(message.data.id),
            message.data
          );

          if (message.type === 'PEDIDO_STATUS_CHANGED') {
            toast.info(`Pedido #${message.data.id} - Status: ${message.data.status}`);
          }
          break;
      }
    } catch (error) {
      console.error('Erro ao processar mensagem WebSocket:', error);
    }
  }, [queryClient]);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        console.log('WebSocket conectado');
        isConnectedRef.current = true;
      };

      wsRef.current.onmessage = handleMessage;

      wsRef.current.onclose = (event) => {
        console.log('WebSocket desconectado:', event.code, event.reason);
        isConnectedRef.current = false;

        // Tentar reconectar após 3 segundos se não foi fechado intencionalmente
        if (event.code !== 1000) {
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log('Tentando reconectar WebSocket...');
            connect();
          }, 3000);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('Erro WebSocket:', error);
        isConnectedRef.current = false;
      };
    } catch (error) {
      console.error('Erro ao conectar WebSocket:', error);
    }
  }, [url, handleMessage]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    if (wsRef.current) {
      wsRef.current.close(1000, 'Desconectado pelo usuário');
      wsRef.current = null;
    }
    
    isConnectedRef.current = false;
  }, []);

  const sendMessage = useCallback((message: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket não está conectado');
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    isConnected: isConnectedRef.current,
    sendMessage,
    connect,
    disconnect,
  };
}