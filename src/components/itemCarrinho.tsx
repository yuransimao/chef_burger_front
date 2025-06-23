import React from 'react'
import { Minus } from 'lucide-react'
import { FormatCurrency } from '@/helps/formatCurrency'

interface ItemCarrinhoProps {
  id: number
  nome: string
  quantidade: number
  preco: number
  total: number
  onDecrementar: (id: number) => void
  disabled?: boolean
}

export function ItemCarrinho({ 
  id, 
  nome, 
  quantidade, 
  preco, 
  total, 
  onDecrementar,
  disabled = false
}: ItemCarrinhoProps) {
  return (
    <div className="text-xs border-b pb-2">
      <div className="flex justify-between">
        <span className="font-medium">{nome}</span>
        <div className="flex flex-col items-center justify-center gap-3">
          <span>{FormatCurrency(total)}</span>
          <button
            className="bg-red-400 p-2 rounded-full h-4 w-4 flex items-center justify-center transition-colors duration-300 hover:bg-red-600 disabled:opacity-50"
            onClick={() => onDecrementar(id)}
            disabled={disabled}
          >
            <Minus size={12} className="text-white" />
          </button>
        </div>
      </div>
      <div className="text-muted-foreground">
        <span>{quantidade} x {FormatCurrency(preco)}</span>
      </div>
    </div>
  )
}