import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useProductStore } from "@/store/product";
import { format, parseISO, set } from "date-fns"
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { sortOptionType } from "@/types/products.types";
import { Input } from "./ui/input";
import { Filter, Search } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import ProductsActions from "./helpers/productsActions";

function ProductTable() {

  const [sortption, setSortOption] = useState<sortOptionType>({ label: '', direction: '' });
  const [search, setSearch] = useState<string>('');

  const { products, meta, setChangePage, setSortOptions, setStateProduct, clearFilters, setSearchFilter } = useProductStore();
  const metaLinks = meta.links;

  useEffect(() => {
    setSearchFilter(search)
  }, [search])

  const handlePageChange = (page: string | null, label: string) => {
    if (!(label === "Próximo &raquo;" && page === null)) {
      setChangePage(page)
    }
  };

  const handleSortOption = (label: string) => {
    setSortOption(prev => {
      const newSortOption = prev.label !== label
        ? { label, direction: '' }
        : { label, direction: prev.direction === ":desc" ? ' ' : ":desc" };

      setSortOptions(newSortOption);

      return newSortOption;
    });
  };

  const handleProductState = () => {
    setStateProduct()
  }

  const handleClearFilters = () => {
    clearFilters()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="text" placeholder={"Cola-cola"} className="pl-10" onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Button onClick={handleClearFilters}><Filter />Limpar filtros</Button>
      </div>
      <div className="container max-w-full mx-auto pb-10 border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>

              <TableHead>
                <Button
                  variant={"ghost"}
                  className="w-full justify-start p-0"
                  onClick={() => handleSortOption("name")}
                >
                  Nome
                </Button>
              </TableHead>

              <TableHead>
                <Button
                  variant={"ghost"}
                  className="w-full justify-start p-0"
                  onClick={() => handleProductState()}
                >
                  Estado
                </Button>
              </TableHead>

              <TableHead>
                <Button
                  variant={"ghost"}
                  className="w-full justify-start p-0"
                  onClick={() => handleSortOption("created_at")}
                >
                  Criado em
                </Button>
              </TableHead>

              <TableHead>
                <Button
                  variant={"ghost"}
                  className="w-full justify-start p-0"
                  onClick={() => handleSortOption("category")}
                >
                  Categoria
                </Button>
              </TableHead>

              <TableHead>
                <Button
                  variant={"ghost"}
                  className="w-full justify-start p-0"
                >
                  Em estoque
                </Button>
              </TableHead>

              <TableHead>
                <Button
                  variant={"ghost"}
                  className="w-full justify-start p-0"
                  onClick={() => handleSortOption("currently_monthly_revenue")}
                >
                  Total em vendas/mês
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant={"ghost"}
                  className="w-full justify-start p-0"
                >
                  Ações
                </Button>
              </TableHead>
            </TableRow>

          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.active ? "Ativo" : "Desativado"}</TableCell>
                <TableCell>{format(parseISO(product.created_at), 'dd/MM/yyyy HH:mm:ss')}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.total_in_stock.value} {product.total_in_stock.unit_name}</TableCell>
                <TableCell>R$ {product.currently_monthly_revenue}</TableCell>
                <TableCell className="p-0"><ProductsActions id={product.id} total_in_stock={product.total_in_stock.value}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Separator className="border-t" orientation="horizontal" />
        <div className="mt-4 mx-4">
          <Pagination className="flex justify-between">
            <div className="w-full text-muted-foreground flex items-center gap-1">
              Exibindo <strong>{meta.from}</strong> - <strong>{meta.to}</strong> de <strong>{meta.total}</strong> Produtos
            </div>
            <div>
              <PaginationContent className="text-muted-foreground">
              </PaginationContent>
              <PaginationContent className="text-muted-foreground">
                {metaLinks.map(link => (
                  link.label != "..." &&

                  <PaginationItem className="cursor-pointer" key={link.label} onClick={() => handlePageChange(link.url, link.label)}>
                    <PaginationLink isActive={link.active} size={link.label === "&laquo; Anterior" || link.label === "Próximo &raquo;" ? "lg" : "default"}>
                      <span dangerouslySetInnerHTML={{ __html: link.label }} />
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </PaginationContent>
            </div>
          </Pagination>
        </div>
      </div>
    </div>
  )
}

export default ProductTable;
