import React, { useState } from 'react';
import { Card, Separator } from '@/components'
import { Reserva } from '@/interface/reserva.interface'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Clock, Users, MapPin, X,Download} from 'lucide-react';
import { useCancelarReserva } from '@/hooks/useReserva';
import { formatarDataHora } from '@/helps/formatarData';
import { formatarDuracao } from '@/helps/formatarDuracao';
import { getStatusColor,getStatusText } from './getStatusColor';


interface CardReservaProps{
    reserva:Reserva
}
function CardReserva({reserva}: CardReservaProps) {
    const [reservaCancelando, setReservaCancelando] = useState<number | null>(null);
    const cancelarReservaMutation = useCancelarReserva();
    
    const handleCancelarReserva = async (reservaId: number) => {
    if (window.confirm('Tem certeza que deseja cancelar esta reserva?')) {
      setReservaCancelando(reservaId);
      try {
        await cancelarReservaMutation.mutateAsync(reservaId);
      } finally {
        setReservaCancelando(null);
      }
    }
  };
     
    
      

    const podeSerCancelada = (reserva: Reserva) => {
    return reserva.status === 'ATIVA' && new Date(reserva.dataHora) > new Date();
  };
  return (
    <Card className=" rounded-lg shadow-md border b p-6">
           
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(reserva.status)}`}>
                  {getStatusText(reserva.status)}
                </span>
              </div>
              {podeSerCancelada(reserva) && (
                <button
                  onClick={() => handleCancelarReserva(reserva.id)}
                  disabled={reservaCancelando === reserva.id}
                  className="p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                  title="Cancelar reserva"
                >
                  <X className="h-4 w-4 text-blue-600" />
                </button>
              )}
            </div>

            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">
                  {formatarDataHora(reserva.dataHora)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="h-4 w-4 text-green-500" />
                <span className="text-sm">
                  Duração: {formatarDuracao(reserva.duracao)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <Users className="h-4 w-4 text-purple-500" />
                <span className="text-sm">
                  {reserva.numerosPessoas} {reserva.numerosPessoas === 1 ? 'pessoa' : 'pessoas'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span className="text-sm">
                  Mesa {reserva?.mesa?.numero} 
                </span>
              </div>

              {reserva.observacoes && (
                <div className="mt-3 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-400">
                    <strong>Observações:</strong> {reserva.observacoes}
                  </p>
                </div>
              )}
            </div>

           
            <div className="mt-2  space-y-3 ">
                 <Separator/>
              <div className='flex justify-between items-center'>
                <p className="text-xs text-gray-300">
                  Criada em {format(new Date(reserva.criadoEm), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </p>

                <button className='p-2 rounded-full cursor-pointer'>
                  <Download size={18}/>
                </button>
              </div>


            </div>

           
            {reservaCancelando === reserva.id && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
              </div>
            )}
          </Card>
  )
}

export {CardReserva}