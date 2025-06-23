
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { categoriaService } from '@/services/categoriaService';
import { Categoria } from "@/interface/categoria.interface";

interface UseCategoriasAtivasParams {
  options?: Omit<UseQueryOptions<Categoria[]>, 'queryKey' | 'queryFn'>;
}

export const useCategoriasAtivas = ({ 
  options = {},
}: UseCategoriasAtivasParams = {}) => {
  return useQuery({
    queryKey: ['categorias', 'ativas'],
    queryFn: () => categoriaService.getCategoriasAtivas(),
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false, // Categorias não mudam com tanta frequência
    ...options,
  });
};