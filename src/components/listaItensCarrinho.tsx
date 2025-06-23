import React from 'react'
import { UseCarrinho } from '@/hooks'
import { ItemCarrinho } from './itemCarrinho'
import { CarrinhoVazio } from './carrinhoVazio'

interface ListaItensCarrinhoProps {
  className?: string
}

export function ListaItensCarrinho({ className = "" }: ListaItensCarrinhoProps) {
  const { itens, handleDecrementar, isFinalizandoPedido, isCarrinhoVazio } = UseCarrinho()

  if (isCarrinhoVazio) {
    return <CarrinhoVazio />
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {itens.map((item) => (
        <ItemCarrinho
          key={item.id}
          id={item.id}
          nome={item.produto.nome}
          quantidade={item.quantidade}
          preco={item.preco}
          total={item.preco * item.quantidade}
          onDecrementar={handleDecrementar}
          disabled={isFinalizandoPedido}
        />
      ))}
    </div>
  )
}