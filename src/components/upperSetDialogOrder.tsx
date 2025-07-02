import React from 'react'
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger
  } from "./ui"

import { useAppSelector, useAppDispatch } from "@/hooks"
import { closeModalOrderDialog } from "@/store/modalSlice"
import { FinalizeOrderForm } from './finalizeOrderForm'
function UpperSetDialogOrder() {
    const isOpen = useAppSelector(state => state.modal.isOpenOrderDialog)
    const dispatch = useAppDispatch();

  return (
    <div>
         <Dialog open={isOpen} onOpenChange={(open) => {
              if (!open) dispatch(closeModalOrderDialog())
            }}>
              <DialogTrigger asChild>
              
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Pedido</DialogTitle>
                  <DialogDescription>
                   Preencha os campos para finalizar o pedido
                  </DialogDescription>
                </DialogHeader>
                <FinalizeOrderForm/>
                  
                
              </DialogContent>
            </Dialog>
    </div>
  )
}

export  {UpperSetDialogOrder}