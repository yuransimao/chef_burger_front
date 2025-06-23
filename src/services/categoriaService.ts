import { api } from '@/lib/axios';
import { Categoria } from "@/interface/categoria.interface";

export const categoriaService = {
  async getCategoriasAtivas(): Promise<Categoria[]> {
    const response = await api.get('/categorias/ativas');
    return response.data;
  },

  async create(categoria: { nome: string; descricao?: string; imageUrl: string }) {
    const response = await api.post('/categorias', categoria);
    return response.data;
  }
};