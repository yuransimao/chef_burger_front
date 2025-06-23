import React from 'react'
import { Separator } from './'
import { FormatCurrency } from '@/helps/formatCurrency'
import { UseCarrinho } from '@/hooks/useCarrinho'

interface ResumoPedidoProps {
  desconto?: number
  className?: string
}

export function ResumoPedido({ 
  desconto = 0, 
  className = ""
}: ResumoPedidoProps) {
  const { total } = UseCarrinho()
  
  return (
    <div className={`space-y-2 text-xs ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Subtotal</span>
        <span>{FormatCurrency(total)}</span>
      </div>
      
      <Separator />
      
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Descontos</span>
        <span>{FormatCurrency(desconto)}</span>
      </div>
      
      <Separator className="h-[0.5px]" />
      
      <div className="flex items-center justify-between font-semibold">
        <span>Total</span>
        <span>{FormatCurrency(total - desconto)}</span>
      </div>
    </div>
  )
}