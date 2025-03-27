import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react"
import { Link } from "react-router-dom";


interface ProductsActionsProps {
  id: string;
  total_in_stock: number;
}

function ProductsActions({ id, total_in_stock }: ProductsActionsProps) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="h-auto">
        <Button variant="outline"><Ellipsis /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link to={"/produtos/detalhes/" + id} >
            Detalhes
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" disabled={total_in_stock > 0}>
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProductsActions
