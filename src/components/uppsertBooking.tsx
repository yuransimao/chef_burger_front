import React from 'react'
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger
  } from "./ui"
import{FormBooking} from "./formBooking"
import { useAppSelector, useAppDispatch } from "@/hooks"
import { closeModalDialog } from "@/store/modalSlice"

function UppsertBooking() {
  const isOpen = useAppSelector(state => state.modal.isOpenDialog)
  const dispatch = useAppDispatch()
  return (
    <div>
        <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) dispatch(closeModalDialog())
    }}>
      <DialogTrigger asChild>
      
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reserva</DialogTitle>
          <DialogDescription>
           Faça sua reserva
          </DialogDescription>
        </DialogHeader>
        <FormBooking/>
          
        
      </DialogContent>
    </Dialog>
    </div>
  )
}

export { UppsertBooking}