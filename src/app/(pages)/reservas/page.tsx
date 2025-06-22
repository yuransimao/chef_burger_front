"use client"
import React from 'react';
import { useMinhasReservas} from '@/hooks/useReserva';

import { Calendar,  AlertCircle } from 'lucide-react';
import { CardReserva } from './_components/cardReserva';


function Reservas() {
  const { data: reservas, isLoading, error } = useMinhasReservas();
  
  

 

  if (isLoading) {
    return (
      <div className="flex h-[calc(100svh-20rem)] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando suas reservas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[calc(100svh-20rem)] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">Erro ao carregar reservas</p>
          <p className="text-gray-500 text-sm mt-2">Tente novamente mais tarde</p>
        </div>
      </div>
    );
  }

  if (!reservas || reservas.length === 0) {
    return (
      <div className="flex h-[calc(100svh-20rem)] items-center justify-center">
        <div className="text-center">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-xl font-semibold text-gray-700 mb-2">Nenhuma reserva encontrada</h4>
          <p className="text-gray-500">Você ainda não possui reservas</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Minhas Reservas</h1>
        <p className="text-gray-300">Gerencie suas reservas de mesa</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reservas.map((reserva, index) => <CardReserva reserva={reserva} key={index}/>) }
      </div>
    </div>
  );
}

export default Reservas;