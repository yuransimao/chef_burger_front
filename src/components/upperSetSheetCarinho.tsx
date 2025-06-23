import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Toaster
} from "./ui"
import { closeModalSheet } from '@/store/modalSlice'

import { useAppDispatch, useAppSelector,useWebSocket,UseCarrinho } from '@/hooks'

import { FinalizarPedidoButton } from './btnFineshOreder'
import { ResumoPedido } from './resumoPedido'
import { ListaItensCarrinho } from './listaItensCarrinho'
function UpperSetSheetCarinho() {
    const isOpen = useAppSelector(state => state.modal.isOpenSheet)
    const dispatch = useAppDispatch()
    const { isCarrinhoVazio } = UseCarrinho()
      
      useWebSocket()

  return (
    <div>
        <Sheet open={isOpen} onOpenChange={(open) => { if(!open) dispatch(closeModalSheet())}}>
  <SheetTrigger></SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Informação pedido</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>

     <div className='h-full px-4'>
        <Toaster/>
         
                <div className="h-[70%] overflow-hidden transition duration-300 ease-in-out hover:overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md scrollbar-track-zinc-200 item_scroll mt-4 pr-1">
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
     </div>
    <SheetFooter>
        
        </SheetFooter>
  </SheetContent>
</Sheet>
    </div>
  )
}

export {UpperSetSheetCarinho}