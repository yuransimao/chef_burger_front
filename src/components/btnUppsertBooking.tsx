import React from 'react'
import { UppsertBooking } from './uppsertBooking'
import {  NotebookPen } from 'lucide-react'
import {useAppDispatch} from "@/hooks"
import {openModalDialog} from "@/store/modalSlice"
function BtnUppsertBooking() {
      const dispatch = useAppDispatch()
  return (
    <>
    <button className="flex items-center bg-transparent gap-3 lg:px-6  px-3 py-3 rounded-sm text-muted-foreground transition-colors hover:bg-red-500/5 hover:text-primary  w-full"  onClick={() => dispatch(openModalDialog())}> 
    <span><NotebookPen size={18} /></span>
    <span>Fazer reserva</span>
    </button>
    <UppsertBooking />
    </>
  )
}

export {BtnUppsertBooking}