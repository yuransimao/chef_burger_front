// interface/order.interface.ts

export enum StatusPedido {
  PENDENTE = 'PENDENTE',
  EM_PREPARO = 'EM_PREPARO',
  PRONTO = 'PRONTO',
  ENTREGUE = 'ENTREGUE',
  CANCELADO = 'CANCELADO'
}

export interface ItemPedido {
  id: number
  pedidoId: number
  produtoId: number
  quantidade: number
  precoUnitario: number
  observacoes?: string
  produto?: Produto
}

export interface Produto {
  id: number
  nome: string
  descricao?: string
  preco: number
  categoria?: string
  disponivel: boolean
}

export interface Mesa {
  id: number
  numero: number
  capacidade: number
  ocupada: boolean
}

export interface Cliente {
  id: number
  firebaseUid: string
  nome: string
  email: string
  telefone?: string
  endereco?: string
}

export interface Pedido {
  id: number
  clienteId: string
  mesaId?: number
  status: StatusPedido
  dataHora: string | Date
  valorTotal: number
  observacoes?: string
  cliente?: Cliente
  mesa?: Mesa
  itens?: ItemPedido[]
  createdAt?: string | Date
  updatedAt?: string | Date
}

export interface CreatePedidoDto {
  total:number
  mesaId?: number
  observacoes?: string
  itens: {
    produtoId: number
    quantidade: number
    precoUnitario?: number
    observacoes?: string
  }[]
}

export interface UpdatePedidoDto {
  status?: StatusPedido
  observacoes?: string
}

export interface PedidoFilters {
  status?: StatusPedido
  clienteId?: string
  mesaId?: number
  dataInicio?: string | Date
  dataFim?: string | Date
}