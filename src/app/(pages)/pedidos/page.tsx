'use client'
import React from 'react'
import { MeusPedidosTable} from "./_components/meuspedidos"
import { useAuth } from '@/hooks/useAuth'
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Pedidos | Chef Burguer",
  description: "Aproveite o melhor do nosso cardápio.",
};


function Pedidos() {
   const { token, loading } = useAuth()

  if (loading || !token) {
    return  (
        <div className="w-full">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-400"></div>
          </div>
        </div>
      )
  }

  return (
    <div>
     
      < MeusPedidosTable/>
      </div>
  )
}

export default Pedidos



