import { StatusPedido } from "@/interface/order.interface";
export const translateStatus = (status: StatusPedido) => {
  const translations = {
    'PENDENTE': 'Pendente',
    'EM_PREPARO': 'Em Preparo',
    'PRONTO': 'Pronto',
    'ENTREGUE': 'Entregue',
    'CANCELADO': 'Cancelado'
  }
  return translations[status] || status
}
