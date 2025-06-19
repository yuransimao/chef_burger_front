export interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
  categoria?: string;
  disponivel: boolean;
}

export interface ItemCarrinho {
  id: number; // produtoId
  produto: Produto;
  quantidade: number;
  preco: number;
}

export interface Pedido {
  id: number;
  dataHora: string;
  total: number;
  status: StatusPedido;
  observacoes?: string;
  clienteId: number;
  mesaId?: number;
  itens: ItemPedido[];
}

export interface ItemPedido {
  id: number;
  quantidade: number;
  preco: number;
  pedidoId: number;
  produtoId: number;
  produto: Produto;
}

export enum StatusPedido {
  PENDENTE = 'PENDENTE',
  CONFIRMADO = 'CONFIRMADO',
  PREPARANDO = 'PREPARANDO',
  PRONTO = 'PRONTO',
  ENTREGUE = 'ENTREGUE',
  CANCELADO = 'CANCELADO'
}

export interface CreatePedidoDto {
  itens: {
    produtoId: number;
    quantidade: number;
    preco: number;
  }[];
  observacoes?: string;
  mesaId?: number;
}