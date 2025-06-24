import React from 'react'
import { MeusPedidosTable} from "./_components/meuspedidos"

import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Pedidos | Chef Burguer",
  description: "Aproveite o melhor do nosso cardápio.",
};


function Pedidos() {
  

  return (
    <div>
     
      < MeusPedidosTable/>
      </div>
  )
}

export default Pedidos



