export interface Mesa {
  id: number;
  numero: number;
  capacidade: number;
  localizacao?: string;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}
