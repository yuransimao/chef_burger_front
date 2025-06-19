import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { produtoService } from '@/services/produtoService';
import { Produto, PaginatedResponse, ProdutoFilters } from '@/interface/produto.interface';

interface UseProdutosParams {
  page?: number;
  limit?: number;
  filters?: ProdutoFilters;
  options?: Omit<UseQueryOptions<PaginatedResponse<Produto>>, 'queryKey' | 'queryFn'>;
}

export const useProdutos = ({
  page = 1,
  limit = 10,
  filters = {},
  options = {},
}: UseProdutosParams = {}) => {
  return useQuery({
    queryKey: ['produtos', page, limit, filters],
    queryFn: () => produtoService.getProdutos(page, limit, filters),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};