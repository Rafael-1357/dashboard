import NavMobile from "@/components/ui/nav-mobile"
import NavDesktop from "@/components/ui/nav-desktop"
import { Search, Triangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import ProductTableRowSales from "@/components/ui/product-table-row-sales"

type Product = {
  id: number;
  name: string;
  value: number;
};

function Sales() {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // fetch('https://fakestoreapi.com/products?limit=10')
    //   .then(res => res.json())
    //   .then(json => setProducts(json));

    const arrayProducts = [
      {
        id: 1,
        name: 'Coca cola 2L',
        value: 12,
      },
      {
        id: 2,
        name: 'Guaraná 2L',
        value: 10,
      },
      {
        id: 3,
        name: 'Kuat',
        value: 5,
      },
      {
        id: 4,
        name: 'Papsi',
        value: 12,
      },
    ]

    setProducts(arrayProducts);
  }, []);

  const handleRemoveProduct = (productId: number) => {
    setProducts(products.filter(product => product.id !== productId));
  };


  return (
    <>
      <div className="flex flex-col md:flex-row md:min-w-full">
        <NavDesktop></NavDesktop>
        <NavMobile></NavMobile>
        <div className="w-full h-screen bg-muted/40 flex gap-4 p-4">
          <div className="w-4/6 flex flex-col gap-4">
            <div className="w-full h-20">
              <form className="ml-auto flex-1 sm:flex-initial">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Procurar produto..."
                    className="focus-visible:ring-0 pl-8 bg-white"
                  />
                </div>
              </form>
            </div>
            <div>
              <Card className="grid grid-rows-[90px 1fr 60px]">
                <CardContent className="overflow-auto">
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
                              <ProductTableRowSales key={product.id} product={product} onRemove={() => handleRemoveProduct(product.id)}/>
                            ))
                          :
                          <TableCell colSpan={4} className="text-center">
                            <Search/>
                          </TableCell>
                      }

                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="w-2/6 flex flex-col justify-end gap-2">

          </div>
        </div>
      </div>
    </>
  )
}

export default Sales