'use client'

import React, { useMemo, memo, useCallback } from 'react'
import { Card, Separator, Button } from './'
import { Info, Minus, Frown, Loader2 } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '@/hooks/redux'
import { FormatCurrency } from '@/helps/formatCurrency'
import { decrementarQuantidade, limparCarrinho } from '@/store/carrinho'
import { useCreatePedido } from '@/hooks/usePedidos'
import { useWebSocket } from '@/hooks/useWebSocket'
import { CreatePedidoDto } from '@/interface/order.interface'
import { useAuth } from '@/hooks/useAuth';

function InfoProductComponent() {
  const { itens, total } = useAppSelector((state) => state.carrinho)
   const {user_id} = useAuth()
  const dispatch = useAppDispatch()
  const createPedidoMutation = useCreatePedido()
  

  useWebSocket()

  const handleDecrementar = useCallback(
    (id: number) => dispatch(decrementarQuantidade(id)),
    [dispatch]
  )

  const handleFinalizarPedido = useCallback(async () => {
    if (itens.length === 0) return
    if(user_id){
      const pedidoData: CreatePedidoDto = {
      firebaseUid:user_id,
      total: Number(total),
      itens: itens.map(item => ({
        produtoId: item.produto.id,
        quantidade: item.quantidade,
        preco: Number(item.preco)
      })),
      observacoes: undefined, 
      mesaId: undefined, 
      
    }

    try {
      await createPedidoMutation.mutateAsync(pedidoData)
      // Limpar carrinho após sucesso
      dispatch(limparCarrinho())
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error)
    }
    }
    
  }, [itens, total, createPedidoMutation, dispatch,user_id])

  const isCarrinhoVazio = itens.length === 0
  const isFinalizandoPedido = createPedidoMutation.isPending

  const renderItens = useMemo(() => {
    return itens.map((item) => (
      <div key={item.id} className="text-xs border-b pb-2">
        <div className="flex justify-between">
          <span className="font-medium">{item.produto.nome}</span>
          <div className="flex flex-col items-center justify-center gap-3">
            <span>{FormatCurrency(item.preco * item.quantidade)}</span>
            <button
              className="bg-red-400 p-2 rounded-full h-4 w-4 flex items-center justify-center transition-colors duration-300 hover:bg-red-600 disabled:opacity-50"
              onClick={() => handleDecrementar(item.id)}
              disabled={isFinalizandoPedido}
            >
              <Minus size={10} className="text-white" />
            </button>
          </div>
        </div>
        <div className="text-muted-foreground">
          <span>{item.quantidade} x {FormatCurrency(item.preco)}</span>
        </div>
      </div>
    ))
  }, [itens, handleDecrementar, isFinalizandoPedido])

  return (
    <div className="fixed w-[20%] right-6 h-[84%] lg:block hidden bottom-2">
      <Card className="h-full p-4">
        <div className="flex justify-between">
          <h4 className="font-medium">Informação pedido</h4>
          <Info size={18} className="text-red-500" />
        </div>

        <div className="h-[90%] overflow-y-scroll item_scroll space-y-4 mt-4 pr-1">
          {isCarrinhoVazio ? (
            <div className="flex items-center justify-center h-full flex-col gap-2">
              <p className="text-sm font-bold text-muted-foreground">Carrinho vazio.</p>
              <Frown className="text-yellow-400/40" />
            </div>
          ) : (
            renderItens
          )}
        </div>

        {!isCarrinhoVazio && (
          <>
            <div className="space-y-2 mt-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{FormatCurrency(total)}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Descontos</span>
                <span>{FormatCurrency(0)}</span>
              </div>
              <Separator className="h-[0.5px]" />
              <div className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span>{FormatCurrency(total)}</span>
              </div>
            </div>

            <div className="mt-4">
              <Button 
                className="w-full bg-red-500 text-white hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleFinalizarPedido}
                disabled={isFinalizandoPedido || isCarrinhoVazio}
              >
                {isFinalizandoPedido ? (
                  <div className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Finalizando...
                  </div>
                ) : (
                  'Finalizar pedido'
                )}
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}

export const InfoProduct = memo(InfoProductComponent)