import {api} from '@/lib/axios'
import { Produto, PaginatedResponse, ProdutoFilters } from '@/interface/produto.interface';

export const produtoService = {
    
  async getProdutos(
    page: number = 1,
    limit: number = 10,
    filters: ProdutoFilters = {}
  ): Promise<PaginatedResponse<Produto>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (filters.search) {
      params.append('search', filters.search);
    }

    if (filters.categoriaId) {
      params.append('categoriaId', filters.categoriaId.toString());
    }

    const response = await api.get(`/produtos?${params.toString()}`);
    return response.data;
  },

  async getProdutoById(id: number): Promise<Produto> {
    const response = await api.get(`/produtos/${id}`);
    return response.data;
  },

  async createProduto(produto: Omit<Produto, 'id' | 'categoria'>): Promise<Produto> {
    const response = await api.post('/produtos', produto);
    return response.data;
  },
};