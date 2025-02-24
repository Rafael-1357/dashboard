import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { useProductStore } from "@/store/product"

function ProductTable() {

  const { products, meta, setChangePage } = useProductStore();
  const metaLinks = meta.links;

  const handlePageChange = (page: string | null, label: string) => {

    if (!(label === "Próximo &raquo;" && page === null)) {
      setChangePage(page)
    }
  };

  return (
    <div className="container mx-auto pb-10 border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Categoria </TableHead>
            <TableHead>Em estoque</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.active ? "Ativo" : "Desativado"}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.total_in_stock.value} {product.total_in_stock.unit_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4">

        <Pagination>
          <PaginationContent>
            {metaLinks.map(link => (
              <PaginationItem className="cursor-pointer" key={link.label} onClick={() => handlePageChange(link.url, link.label)}>
                <PaginationLink isActive={link.active} size={link.label === "&laquo; Anterior" || link.label === "Próximo &raquo;" ? "lg" : "default"}>
                  <span dangerouslySetInnerHTML={{ __html: link.label }} />
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default ProductTable;
