import React from 'react'
import { Button } from './ui';
import { UpperSetSheetCarinho } from './upperSetSheetCarinho';
import { useAppDispatch, useAuth, useAppSelector } from '@/hooks'
import {  openModalSheet,openModalAlert } from '@/store/modalSlice'
import { ShoppingCart } from 'lucide-react';
import { AlertUserDesative } from './alertUserDesative'

function BtnOpenSheetcarrinho() {
    const dispatch = useAppDispatch()
    const {itens} = useAppSelector((state) => state.carrinho)

    const {user_id} = useAuth()

    function handleOpen(){
        if(user_id){
            dispatch(openModalSheet())
        }else{
          dispatch(openModalAlert())
        }
    }
  return (
    <>
    <Button variant="outline" className=' border-0 rounded-none bg-transparent lg:hidden flex items-center justify-center flex-col text-muted-foreground hover:text-primary gap-3 hover:bg-transparent cursor-pointer relative' onClick={handleOpen}>
        <ShoppingCart size={18}/>
        <span>Carrinho</span>
        <span className="absolute -top-5 p-1 bg-red-500 rounded-full w-5 h-5 right-7 text-xs text-white">{itens.length}</span>
    </Button>

    <UpperSetSheetCarinho />
    <AlertUserDesative/>
    </>
  )
}

export { BtnOpenSheetcarrinho}