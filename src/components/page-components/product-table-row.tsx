import EditProductDialog from "@/components/page-components/edit-product-dialog"
import { format, parseISO } from "date-fns"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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
    }
  };
};

function ProductTableRow({ product }: ProductTableRowProps) {

  const deleteProduct = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products/${product.id}`, {
      method: "DELETE",
      headers: {
        authorization: import.meta.env.VITE_API_TOKEN
      }
    })
  }

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
          {product.total_in_stock.value} {product.total_in_stock.unit_name}
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
              <EditProductDialog />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    role="menuitem"
                    className="w-full text-sm text-left font-normal px-2 py-1.5 border-0 justify-start shadow-none outline-none"
                    variant="outline"
                    disabled={product.total_in_stock.value > 0}
                  >
                    Deletar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Deletando produto</AlertDialogTitle>
                    <AlertDialogDescription>
                      Deseja deletar o produto {product.name} de forma permantente de sua lista de produtos?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteProduct}>Deletar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

    </>
  )
}

export default ProductTableRow

