import React from 'react'
import { Button } from './'
import { Loader2 } from 'lucide-react'
import { UseCarrinho } from '@/hooks'

interface FinalizarPedidoButtonProps {
  className?: string
}

export function FinalizarPedidoButton({ 
  className = ""
}: FinalizarPedidoButtonProps) {
  const { handleFinalizarPedido, isFinalizandoPedido, isCarrinhoVazio } = UseCarrinho()

  return (
    <Button 
      className={`w-full bg-red-500 text-white hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
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
  )
}