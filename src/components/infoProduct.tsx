'use client'

import React, { memo } from 'react'
import { Card, Toaster } from './'
import { Info } from 'lucide-react'
import { useWebSocket,UseCarrinho } from '@/hooks'


// Importar os componentes inteligentes
import { FinalizarPedidoButton } from './btnFineshOreder'
import { ResumoPedido } from './resumoPedido'
import { ListaItensCarrinho } from './listaItensCarrinho'

function InfoProductComponent() {
  const { isCarrinhoVazio } = UseCarrinho()
  
  useWebSocket()

  return (
    <div className="fixed w-[20%] right-6 h-[calc(100%-7rem)] lg:block hidden bottom-2">
      <Toaster />
      <Card className="h-full p-4">
        <div className="flex justify-between">
          <h4 className="font-medium">Informação pedido</h4>
          <Info size={18} className="text-red-500" />
        </div>

        <div className="h-[90%] overflow-hidden transition duration-300 ease-in-out hover:overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md scrollbar-track-zinc-200 item_scroll mt-4 pr-1">
          <ListaItensCarrinho />
        </div>

        {!isCarrinhoVazio && (
          <>
            <ResumoPedido className="mt-4" />

            <div className="mt-4">
              <FinalizarPedidoButton />
            </div>
          </>
        )}
      </Card>
    </div>
  )
}

export const InfoProduct = memo(InfoProductComponent)