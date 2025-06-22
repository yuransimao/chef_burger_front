import { api } from '@/lib/axios';
import {Mesa} from "@/interface/mesa.interface"
export const mesaService = {
  

  async getMesasDisponiveis(): Promise<Mesa[]> {
    const response = await api.get('/mesas/disponiveis');
    return response.data;
  },

 

 
};