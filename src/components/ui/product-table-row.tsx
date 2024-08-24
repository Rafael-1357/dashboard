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
import { Button } from "@/components/ui/button"

type ProductTableRowProps = {
  product: {
    id: string;
    title: string;
    price: string;
  };
};

function ProductTableRow( {product}: ProductTableRowProps ) {

  console.log(product)
  
  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          {product.title}
        </TableCell>
        <TableCell>
          <Badge variant="outline">Ativo</Badge>
        </TableCell>
        <TableCell>R$ {product.price}</TableCell>
        <TableCell className="hidden md:table-cell">
          50
        </TableCell>
        <TableCell className="hidden md:table-cell">
          24/06/2024 08:38
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
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </>
  )
}

export default ProductTableRow

