"use client"
import React from "react"
import {TableOrder} from "./tableorder"
import { useAuth } from '@/hooks/useAuth'
export function MeusPedidosTable() {
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
     <>
     <TableOrder/>
     </>
  )
}