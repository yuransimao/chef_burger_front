import React from 'react'
import { Button } from './ui';
import { UpperSetSheetCarinho } from './upperSetSheetCarinho';
import { useAppDispatch, useAuth } from '@/hooks'
import {  openModalSheet,openModalAlert } from '@/store/modalSlice'
import { ShoppingCart } from 'lucide-react';
import { AlertUserDesative } from './alertUserDesative'
function BtnOpenSheetcarrinho() {
    const dispatch = useAppDispatch()
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
    <Button variant="outline" className=' rounded-full h-12 w-12 lg:hidden flex items-center justify-center' onClick={handleOpen}>
        <ShoppingCart/>
    </Button>

    <UpperSetSheetCarinho />
    <AlertUserDesative/>
    </>
  )
}

export { BtnOpenSheetcarrinho}