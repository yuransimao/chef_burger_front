import {Pedido} from "@/interface/order.interface"




export const GetFilteredPedidos = (
  pedidos: Pedido[],
  statusFilter: string,
  dateFilter: string
): Pedido[] => {
  if (!Array.isArray(pedidos) || pedidos.length === 0) return []

  let filtered = [...pedidos]

  // Filtro por status
  if (statusFilter !== "todos") {
    filtered = filtered.filter(pedido => pedido.status === statusFilter)
  }

  // Filtro por data
  if (dateFilter !== "todos") {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    filtered = filtered.filter(pedido => {
      const pedidoDate = new Date(pedido.dataHora)
      if (isNaN(pedidoDate.getTime())) return false

      switch (dateFilter) {
        case "hoje":
          return pedidoDate >= today
        case "semana":
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
          return pedidoDate >= weekAgo
        case "mes":
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
          return pedidoDate >= monthAgo
        default:
          return true
      }
    })
  }

  return filtered
}
