import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { deleteBatch, getProductBatch } from '@/services/batch';
import { BatchType } from '@/types/batch.types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"
import ProductBatchForm from './productBatchForm';
import { format, parseISO } from 'date-fns';
import { Button } from './ui/button';
import { LoaderCircle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useProductStore } from '@/store/product';
import { ProductDetailsSkeleton } from './helpers/ProductDetailsSkeleton';

type ProductDetailsInfoProps = {
  id: string;
};

function ProductBatch({ id }: ProductDetailsInfoProps) {
  const { productDetails } = useProductStore();
  const [productInfos, setProductInfos] = useState<BatchType | null>(null);
  const [loading, setLoading] = useState(false);

  function updateBatchList() {
    getProductBatch(id)
      .then((response) => {
        setProductInfos(response);
      })
      .catch((error) => {
        console.error("Error fetching products:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getProductBatch(id)
      .then((response) => {
        setProductInfos(response);
        console.log(response)
      })
      .catch((error) => {
        console.error("Error fetching products:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  function batchDelete(idBatch: string) {
    deleteBatch(idBatch)
      .then(() => {
        toast.success("Lote deletado com sucesso!");
        updateBatchList()
      })
      .catch((error) => {
        toast.error("Erro ao tentar deletar lote", { description: error.message });
      })
  }

  function handlePageChange(page: string | null, label: string) {
    if (!(label === "Próximo &raquo;" && page === null)) {
      getProductBatch(id, page)
        .then((response) => {
          setProductInfos(response);
          console.log(response)
        })
        .catch((error) => {
          console.error("Error fetching products:", error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  if (!productDetails) {
    return <ProductDetailsSkeleton />
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="text-2xl">Lotes</CardTitle>
          <CardDescription>Visualize e edite os lotes do produto</CardDescription>
        </div>
        <ProductBatchForm selectedProduct={id} updateBatchList={updateBatchList} />
      </CardHeader>
      {
        productInfos != null && productInfos.data.length > 0 ? (
          <Card className="border-none shadow-lg">
            <CardContent className="">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-800">
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Código de barras</TableHead>
                    <TableHead>Data de expiração</TableHead>
                    <TableHead>Esgotado</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productInfos.data.map((batch) => (
                    <TableRow
                      key={batch.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <TableCell className="font-medium">{batch.id}</TableCell>
                      <TableCell>{batch.barcode}</TableCell>
                      <TableCell>{format(parseISO(batch.created_at), 'dd/MM/yyyy')}</TableCell>
                      <TableCell>{batch.sold_out ? "Sim" : "Não"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <ProductBatchForm formType={"edit"} editingBatch={batch} selectedProduct={id} updateBatchList={updateBatchList} />
                          <span className="sr-only">Edit</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => batchDelete(batch.id)}
                            className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Separator className="border-t" orientation="horizontal" />
              <div className="mt-4 mx-4">
                <Pagination className="flex justify-between">
                  <div className="w-full text-muted-foreground flex items-center gap-1">
                    Exibindo <strong>{productInfos.meta.from}</strong> - <strong>{productInfos.meta.to}</strong> de <strong>{productInfos.meta.total}</strong> Produtos
                  </div>
                  <div>
                    <PaginationContent className="text-muted-foreground mb-6">
                      {productInfos.meta.links.map(link => (
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
            </CardContent>
          </Card>
        ) : (
          <div className="p-4 text-muted-foreground">Nenhum lote encontrado para o produto selecionado.</div>
        )
      }
    </Card>
  )
}

export default ProductBatch