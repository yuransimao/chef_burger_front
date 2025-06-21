import { StatusPedido } from "@/interface/order.interface";

export const getStatusColor = (status: StatusPedido) => {
  switch (status) {
    case 'PENDENTE':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
    case 'EM_PREPARO':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200'
    case 'PRONTO':
      return 'bg-green-100 text-green-800 hover:bg-green-200'
    case 'ENTREGUE':
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    case 'CANCELADO':
      return 'bg-red-100 text-red-800 hover:bg-red-200'
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200'
  }
}