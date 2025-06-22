'use client'
import React from 'react'
import { MeusPedidosTable} from "./_components/meuspedidos"
import { useAuth } from '@/hooks/useAuth'
function Pedidos() {
   const { token, loading } = useAuth()

  if (loading || !token) {
    return <p className="text-center mt-10">Carregando...</p>
  }

  return (
    <div>
     
      < MeusPedidosTable/>
      </div>
  )
}

export default Pedidos



