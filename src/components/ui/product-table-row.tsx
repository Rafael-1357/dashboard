import { format, parseISO } from "date-fns"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"


type ProductTableRowProps = {
  product: {
    id: string;
    active: string;
    name: string;
    category: string;
    created_at: string;
    total_revenue: number;
    total_in_stock: {
      value: number;
      unit_name: string;
    };
    price: string;
  };
};

function ProductTableRow({ product }: ProductTableRowProps) {

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          {product.name}
        </TableCell>
        <TableCell>
          <Badge variant="outline">{product.active ? 'Ativo' : 'Desativado'}</Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {product.total_in_stock.value}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {
            Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(product.total_revenue)
          }
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {
            format(parseISO(product.created_at), 'dd/MM/yyyy HH:mm:ss')
          }
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-haspopup="true"
                size="icon"
                variant="ghost"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer">Editar</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Deletar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </>
  )
}

export default ProductTableRow

