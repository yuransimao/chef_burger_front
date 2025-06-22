// services/reserva.service.ts
import { api } from '@/lib/axios';
import { Reserva, CreateReservaDto, UpdateReservaDto } from '@/interface/reserva.interface';

export const reservaService = {
  // Criar nova reserva
  async criarReserva(data: CreateReservaDto): Promise<Reserva> {
    const response = await api.post('/reservas', data);
    return response.data;
  },

  
  async getMinhasReservas(): Promise<Reserva[]> {
    const response = await api.get('/reservas/minhas');
    return response.data;
  },

  
  async verificarDisponibilidade(
    mesaId: string,
    dataHora: string,
    duracao: number
  ): Promise<{ disponivel: boolean; conflitos?: any[] }> {
    const response = await api.get('/reservas/disponibilidade', {
      params: {
        mesaId,
        dataHora,
        duracao: duracao.toString()
      }
    });
    return response.data;
  },

  
  async atualizarReserva(
    id: number,
    data: UpdateReservaDto
  ): Promise<Reserva> {
    const response = await api.put(`/reservas/${id}`, data);
    return response.data;
  },

  
  async cancelarReserva(id: number): Promise<Reserva> {
    const response = await api.put(`/reservas/${id}/cancelar`);
    return response.data;
  },

 
  async getReservaPorId(id: number): Promise<Reserva> {
    const response = await api.get(`/reservas/${id}`);
    return response.data;
  }
};