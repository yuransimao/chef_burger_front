// interface/reserva.interface.ts
export interface Reserva {
  id: number;
  dataHora: string;
  duracao: number;
  numerosPessoas: number;
  observacoes?: string;
  status: 'ATIVA' | 'CANCELADA' | 'FINALIZADA';
  criadoEm: string;
  clienteId: number;
  mesaId: number;
  cliente?: {
    id: number;
    nome: string;
    email: string;
    telefone?: string;
  };
  mesa?: {
    id: number;
    numero: number;
    capacidade: number;
  };
}

export interface CreateReservaDto {
  dataHora: string;
  duracao: number;
  numerosPessoas: number;
  observacoes?: string;
  mesaId: number;
}

export interface UpdateReservaDto {
  dataHora?: string;
  duracao?: number;
  numerosPessoas?: number;
  observacoes?: string;
  mesaId?: string;
  status?: 'ATIVA' | 'CANCELADA' | 'FINALIZADA';
}