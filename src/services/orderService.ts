import {api} from '@/lib/axios'
import {CreatePedidoDto, Pedido, StatusPedido} from "@/interface/order.interface"

export const pedidoService = {
  async createPedido(data: CreatePedidoDto): Promise<Pedido> {
    const response = await api.post('/pedidos', data);
    return response.data;
  },

  async getMeusPedidos(): Promise<Pedido[]> {
    const response = await api.get('/pedidos/meus-pedidos');
    return response.data;
  },

  async getPedidosByStatus(status?: StatusPedido): Promise<Pedido[]> {
    const params = status ? `?status=${status}` : '';
    const response = await api.get(`/pedidos${params}`);
    return response.data;
  },

  async updateStatusPedido(id: number, status: StatusPedido): Promise<Pedido> {
    const response = await api.put(`/pedidos/${id}/status`, { status });
    return response.data;
  },

  async getPedidoById(id: number): Promise<Pedido> {
    const response = await api.get(`/pedidos/${id}`);
    return response.data;
  },
};