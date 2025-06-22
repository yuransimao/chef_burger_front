import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { mesaService} from '@/services/mesaService';
import {Mesa} from "@/interface/mesa.interface"

interface UseMesasDisponiveisParams {
  options?: Omit<UseQueryOptions<Mesa[]>, 'queryKey' | 'queryFn'>;
}
export const useMesasDisponiveis = ({ 
  options = {},
  refetchInterval 
}: UseMesasDisponiveisParams & { 
  refetchInterval?: number 
} = {}) => {
  return useQuery({
    queryKey: ['mesas', 'disponiveis'],
    queryFn: () => mesaService.getMesasDisponiveis(),
    staleTime: 2 * 60 * 1000,
    refetchInterval: refetchInterval || 30000, // Atualiza a cada 30s por padrão
    refetchOnWindowFocus: true,
    ...options,
  });
};