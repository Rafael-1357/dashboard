import NavMobile from "@/components/ui/nav-mobile"
import NavDesktop from "@/components/ui/nav-desktop"
import { Search, Triangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import ProductTableRowSales from "@/components/ui/product-table-row-sales"
import { Button } from "@/components/ui/button"
import SearchProductsSales from "@/components/ui/searchProductsSales"

type Product = {
  id: number;
  name: string;
  value: number;
};

function Sales() {

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0)

  const handleRemoveProduct = (productId: number) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const calculateTotalValue = (qtd: number, productID: number) => {
    products.map(product => {
      if (product.id == productID) {

      }
    })
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:min-w-full">
        <NavDesktop></NavDesktop>
        <NavMobile></NavMobile>
        <div className="w-full h-screen bg-muted/40 flex gap-4 p-4">
          <div className="w-4/6 flex flex-col justify-between gap-4">
            <SearchProductsSales />
            <div className="h-[90%]">
              <Card className="h-full overflow-auto">
                <CardContent>
                  <Table >
                    <TableHeader>
                      <TableRow>
                        <TableHead><div className="flex items-center gap-x-2"> Nome <Triangle className="size-3 rotate-180" /></div></TableHead>
                        <TableHead><div className="flex items-center gap-x-2"> Quantidade </div></TableHead>
                        <TableHead><div className="flex items-center gap-x-2"> Valor </div></TableHead>
                        <TableHead><div className="flex items-center gap-x-2"> Valor total </div></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {
                        products.length != 0
                          ?
                          products && products.map((product: any) => (
                            <ProductTableRowSales
                              key={product.id}
                              product={product}
                              onRemove={() => handleRemoveProduct(product.id)}
                              onCalculate={(qtd, productId) => calculateTotalValue(qtd, productId)}
                            />
                          ))
                          :
                          <TableCell colSpan={4} className="text-center py-12">
                            <Search className="w-full h-40 text-9xl" />
                            <h1 className="text-2xl">Nenhum produto adicionado</h1>
                          </TableCell>
                      }

                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="w-2/6 p-4 bg-card border rounded-xl flex flex-col justify-end gap-2">
            <h1 className="w-full h-9 text-white text-xl bg-purple-400/40 rounded-md flex justify-center items-center">Total R$ {total.toFixed(2)}</h1>
            <Button className="bg-purple-500">Finalizar venda</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sales