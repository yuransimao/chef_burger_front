
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reservaService } from '@/services/reservaService';
import { CreateReservaDto, UpdateReservaDto } from '@/interface/reserva.interface';
import { toast } from 'sonner'; 
import axios from 'axios';

export const useMinhasReservas = () => {
  return useQuery({
    queryKey: ['minhas-reservas'],
    queryFn: reservaService.getMinhasReservas,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

export const useVerificarDisponibilidade = (
  mesaId: string,
  dataHora: string,
  duracao: number,
  enabled: boolean = false
) => {
  return useQuery({
    queryKey: ['disponibilidade', mesaId, dataHora, duracao],
    queryFn: () => reservaService.verificarDisponibilidade(mesaId, dataHora, duracao),
    enabled: enabled && !!mesaId && !!dataHora && !!duracao,
    staleTime: 1000 * 30, // 30 segundos
  });
};


export const useCriarReserva = () => {
  const queryClient = useQueryClient();
  

  return useMutation({
    mutationFn: (data: CreateReservaDto) => reservaService.criarReserva(data),
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ['minhas-reservas'] });
      
     
      queryClient.invalidateQueries({ queryKey: ['mesas-disponiveis'] });
      
      toast("Reserva criada com sucesso", {
            description: "Sua reserva foi agendada",
                action: {
                  label: "Ver",
                  onClick: () => console.log("reservas"),
                },
        })
    },
     onError: (error: unknown) => {
  let errorMessage = 'Erro ao criar reservas';

  if (axios.isAxiosError(error) && error.response?.data?.message) {
    errorMessage = error.response.data.message;
  }
   toast.error(errorMessage);
  }});
};


export const useAtualizarReserva = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateReservaDto }) =>
      reservaService.atualizarReserva(id, data),
    onSuccess: (data) => {
     
      queryClient.invalidateQueries({ queryKey: ['minhas-reservas'] });
      
      
      queryClient.setQueryData(['reserva', data.id], data);
      
      toast.success('Reserva atualizada com sucesso!');
    },
     onError: (error: unknown) => {
      let errorMessage = 'Erro ao alualizar resrva';
    
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
     toast.error(errorMessage);
  }});
};

// Hook para cancelar reserva
export const useCancelarReserva = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => reservaService.cancelarReserva(id),
    onSuccess: (data) => {
     
      queryClient.invalidateQueries({ queryKey: ['minhas-reservas'] });
      
     
      queryClient.setQueryData(['reserva', data.id], data);
      
      toast.success('Reserva cancelada com sucesso!');
    },
     onError: (error: unknown) => {
      let errorMessage = 'Erro ao cancelar reserva';
    
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
       toast.error(errorMessage);
  }});
};


export const useReserva = (id: number) => {
  return useQuery({
    queryKey: ['reserva', id],
    queryFn: () => reservaService.getReservaPorId(id),
    enabled: !!id,
  });
};