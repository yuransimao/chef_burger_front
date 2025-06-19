import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { pedidoService } from '@/services/orderService';
import { StatusPedido, Pedido } from '@/interface/order.interface';

export const PEDIDO_KEYS = {
  all: ['pedidos'] as const,
  lists: () => [...PEDIDO_KEYS.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...PEDIDO_KEYS.lists(), { filters }] as const,
  details: () => [...PEDIDO_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...PEDIDO_KEYS.details(), id] as const,
  meusPedidos: () => [...PEDIDO_KEYS.all, 'meus-pedidos'] as const,
  byStatus: (status?: StatusPedido) => [...PEDIDO_KEYS.all, 'status', status] as const,
};

export function useCreatePedido() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: pedidoService.createPedido,
    onSuccess: (data) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: PEDIDO_KEYS.all });
      
      // Adicionar o novo pedido às listas em cache
      queryClient.setQueryData<Pedido[]>(PEDIDO_KEYS.meusPedidos(), (old) => {
        return old ? [data, ...old] : [data];
      });

      // Adicionar aos pedidos por status
      queryClient.setQueryData<Pedido[]>(PEDIDO_KEYS.byStatus(data.status), (old) => {
        return old ? [data, ...old] : [data];
      });

      toast.success('Pedido criado com sucesso!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao criar pedido');
    },
  });
}

export function useMeusPedidos() {
  return useQuery({
    queryKey: PEDIDO_KEYS.meusPedidos(),
    queryFn: pedidoService.getMeusPedidos,
    staleTime: 30000, // 30 segundos
  });
}

export function usePedidosByStatus(status?: StatusPedido) {
  return useQuery({
    queryKey: PEDIDO_KEYS.byStatus(status),
    queryFn: () => pedidoService.getPedidosByStatus(status),
    staleTime: 10000, // 10 segundos
  });
}

export function useUpdateStatusPedido() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: StatusPedido }) =>
      pedidoService.updateStatusPedido(id, status),
    onSuccess: (updatedPedido) => {
      // Atualizar o pedido específico
      queryClient.setQueryData(
        PEDIDO_KEYS.detail(updatedPedido.id),
        updatedPedido
      );

      // Atualizar todas as listas que podem conter este pedido
      queryClient.setQueriesData<Pedido[]>(
        { queryKey: PEDIDO_KEYS.lists() },
        (old) => {
          if (!old) return old;
          return old.map((pedido) =>
            pedido.id === updatedPedido.id ? updatedPedido : pedido
          );
        }
      );

      
      queryClient.invalidateQueries({ queryKey: PEDIDO_KEYS.all });

      toast.success('Status do pedido atualizado!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao atualizar status');
    },
  });
}

export function usePedidoById(id: number) {
  return useQuery({
    queryKey: PEDIDO_KEYS.detail(id),
    queryFn: () => pedidoService.getPedidoById(id),
    enabled: !!id,
  });
}