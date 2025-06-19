export interface Categoria {
  id: number;
  nome: string;
}

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  disponivel: boolean;
  categoria: Categoria;
  categoriaId: number;
  imageUrl: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ProdutoFilters {
  search?: string;
  categoriaId?: number;
}