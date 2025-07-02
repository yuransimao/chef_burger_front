import React from 'react'
import { Button } from './'
import { openModalOrderDialog,closeModalSheet } from "@/store/modalSlice"
import { useAppDispatch } from '@/hooks'
import { UpperSetDialogOrder } from './upperSetDialogOrder'
interface FinalizarPedidoButtonProps {
  className?: string
}

export function FinalizarPedidoButton({ 
  className = ""
}: FinalizarPedidoButtonProps) {
  const dispatch = useAppDispatch();

  function handleFinalizarPedido(){
    dispatch(closeModalSheet());
    dispatch( openModalOrderDialog());
  }

  return (
    <>
    <Button 
      className={`w-full bg-red-500 text-white hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={handleFinalizarPedido}
     
    >
      Finalizar o pedido
    </Button>
    <UpperSetDialogOrder/>
    </>
  )
}