import React from 'react';

import type { Metadata } from "next";
import { MinhasReservas } from './_components/minhasReservas';


export const metadata: Metadata = {
  title: "Reservas | Chef Burguer",
  description: "Aproveite o melhor do nosso cardápio.",
};

function Reservas() {
  

  return (
    <>
      <MinhasReservas/>
    </>
  );
}

export default Reservas;
