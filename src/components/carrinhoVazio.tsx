import React from 'react'
import { Frown } from 'lucide-react'

interface CarrinhoVazioProps {
  mensagem?: string
  className?: string
}

export function CarrinhoVazio({ 
  mensagem = "Carrinho vazio.",
  className = ""
}: CarrinhoVazioProps) {
  return (
    <div className={`flex items-center justify-center h-full flex-col gap-2 ${className}`}>
      <p className="text-sm font-bold text-muted-foreground">{mensagem}</p>
      <Frown className="text-yellow-400/40" />
    </div>
  )
}