import React from 'react'
import { UppsertBooking } from './uppsertBooking'
import {  NotebookPen } from 'lucide-react'
import {useAppDispatch,useAuth} from "@/hooks"
import {openModalDialog, openModalAlert} from "@/store/modalSlice"
import { AlertUserDesative } from './alertUserDesative'
function BtnUppsertBooking() {
      const dispatch = useAppDispatch()
      const {user_id} = useAuth()
      const handleOpenReser = () =>{
          if(user_id){
            dispatch(openModalDialog())
          }else{
            dispatch(openModalAlert())
          }
      }
  return (
    <>
    <button className="flex items-center bg-transparent gap-3 lg:px-6  px-3 py-3 rounded-sm text-muted-foreground transition-colors hover:bg-red-500/5 hover:text-primary  w-full"  onClick={handleOpenReser}> 
    <span><NotebookPen size={18} /></span>
    <span>Fazer reserva</span>
    </button>
    <UppsertBooking />
    <AlertUserDesative/>
    </>
  )
}

export {BtnUppsertBooking}