import { useCallback, useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '@/hooks/redux'
import { decrementarQuantidade, limparCarrinho } from '@/store/carrinho'
import { useCreatePedido } from '@/hooks/usePedidos'
import { useAuth } from '@/hooks/useAuth'
import { useMinhasReservas } from '@/hooks/useReserva'
import { CreatePedidoDto } from '@/interface/order.interface'
import { closeModalSheet } from '@/store/modalSlice'

export function UseCarrinho() {
  const { itens, total } = useAppSelector((state) => state.carrinho)
  const { user_id } = useAuth()
  const dispatch = useAppDispatch()
  const createPedidoMutation = useCreatePedido()
  
 
  const { data: reservas } = useMinhasReservas()

  const isCarrinhoVazio = useMemo(() => itens.length === 0, [itens.length])
  const isFinalizandoPedido = createPedidoMutation.isPending

  
  const getMesaIdAtiva = useCallback(() => {
    if (!reservas || reservas.length === 0) return undefined

    const agora = new Date()
    
    
    const reservaAtiva = reservas
      .filter(reserva => reserva.status === 'ATIVA') 
      .find(reserva => {
        const inicioReserva = new Date(reserva.dataHora)
        const fimReserva = new Date(inicioReserva.getTime() + (reserva.duracao * 60 * 1000)) 
        
       
        return agora >= inicioReserva && agora <= fimReserva
      })

    return reservaAtiva?.mesaId
  }, [reservas])

  const handleDecrementar = useCallback(
    (id: number) => dispatch(decrementarQuantidade(id)),
    [dispatch]
  )

  const handleFinalizarPedido = useCallback(async () => {
    if (itens.length === 0 || !user_id) return

    
    const mesaId = getMesaIdAtiva()

    const pedidoData: CreatePedidoDto = {
      total: Number(total),
      itens: itens.map(item => ({
        produtoId: item.produto.id,
        quantidade: item.quantidade,
        preco: Number(item.preco)
      })),
      observacoes: undefined,
      mesaId: mesaId, 
    }

    try {
      await createPedidoMutation.mutateAsync(pedidoData)
      
      dispatch(limparCarrinho())
      dispatch(closeModalSheet())
      
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error)
      dispatch(limparCarrinho())
      dispatch(closeModalSheet())
    }
  }, [itens, total, createPedidoMutation, dispatch, user_id, getMesaIdAtiva])

  return {
    itens,
    total,
    isCarrinhoVazio,
    isFinalizandoPedido,
    handleDecrementar,
    handleFinalizarPedido,
    mesaAtiva: getMesaIdAtiva() 
  }
}