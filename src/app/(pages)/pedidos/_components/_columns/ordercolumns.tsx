import { Pedido, StatusPedido } from "@/interface/order.interface"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,Checkbox,Badge,Button
} from "@/components"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ColumnDef} from "@tanstack/react-table"
import { ArrowUpDown,Eye,MoreHorizontal } from "lucide-react"
import {getStatusColor} from "./getStatusColor"
import {translateStatus} from "./translateStatus";


export const columns: ColumnDef<Pedido>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="font-medium">#{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "dataHora",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data/Hora
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("dataHora"))
      return (
        <div className="text-sm">
          <div>{format(date, "dd/MM/yyyy", { locale: ptBR })}</div>
          <div className="text-muted-foreground">{format(date, "HH:mm", { locale: ptBR })}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as StatusPedido
      return (
        <Badge className={getStatusColor(status)}>
          {translateStatus(status)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "mesa",
    header: "Mesa",
    cell: ({ row }) => {
      const mesa = row.original.mesa
      return <div>{mesa?.numero || 'N/A'}</div>
    },
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Valor Total</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total") || "0")
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "AOA",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "itens",
    header: "Itens",
    cell: ({ row }) => {
      const itens = row.original.itens || []
      return (
        <div className="text-sm">
          <div>{itens.length} item(s)</div>
          <div className="text-muted-foreground text-xs">
            {itens.slice(0, 2).map(item => item.produto?.nome).join(", ")}
            {itens.length > 2 && "..."}
          </div>
        </div>
      )
    },
  },
  
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const pedido = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(pedido.id.toString())}
            >
              Copiar ID do pedido
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="w-4 h-4 mr-2" />
              Ver detalhes
            </DropdownMenuItem>
            {pedido.status === 'PENDENTE' && (
              <DropdownMenuItem className="text-red-600">
                Cancelar pedido
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]