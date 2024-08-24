import NavDesktop from "@/components/ui/nav-desktop"
import NavMobile from "@/components/ui/nav-mobile"

import {
  File,
  PlusCircle,
  Triangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import ProductTableRow from "@/components/ui/product-table-row"
import { useEffect, useState } from "react"

type Product = {
  id: string;
  title: string;
  price: string;
};

function Products() {

  const [products, setProducts] = useState<Product[]>([]);;


  useEffect(() => {
    // fetch('https://fakestoreapi.com/products?limit=10')
    //   .then(res => res.json())
    //   .then(json => setProducts(json));

    const arrayProducts = [
      {
        id: '1',
        title: 'Coca Cola 2L',
        price: '12.50'
      },
      {
        id: '2',
        title: 'Guaraná 2L',
        price: '10.20'
      },
      {
        id: '3',
        title: 'Vodka',
        price: '17.30'
      },
      {
        id: '3',
        title: 'Vodka',
        price: '17.30'
      },
      {
        id: '3',
        title: 'Vodka',
        price: '17.30'
      },
      {
        id: '3',
        title: 'Vodka',
        price: '17.30'
      },
      {
        id: '3',
        title: 'Vodka',
        price: '17.30'
      },
      {
        id: '3',
        title: 'Vodka',
        price: '17.30'
      },
      {
        id: '3',
        title: 'Vodka',
        price: '17.30'
      },
      {
        id: '3',
        title: 'Vodka',
        price: '17.30'
      },
      {
        id: '3',
        title: 'Vodka',
        price: '17.30'
      },
    ];

    setProducts(arrayProducts);
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row md:min-w-full">
        <NavDesktop></NavDesktop>
        <NavMobile></NavMobile>
        <div className="w-full">
          <div className="hidden h-14 items-center border-b px-4 md:flex lg:h-[60px] lg:px-6"></div>
          <div className="w-full p-4 bg-muted/40">
            <main className="flex flex-col w-full gap-4 p-4 overflow-y-auto sm:px-6 sm:py-4 md:gap-4">
              <div className="flex items-center">
                <div className="ml-auto flex items-center gap-2">
                  <Button size="sm" variant="outline" className="h-7 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Exportar
                    </span>
                  </Button>
                  <Button size="sm" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Adicionar produto
                    </span>
                  </Button>
                </div>
              </div>
              <div>
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Produtos</CardTitle>
                    <CardDescription>
                      Gerencie seus produtos e visualize seu desempenho de vendas.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead><div className="flex items-center gap-x-2">Nome <Triangle className="size-3 rotate-180"/></div></TableHead>
                          <TableHead><div className="flex items-center gap-x-2">Estado </div></TableHead>
                          <TableHead><div className="flex items-center gap-x-2">Valor </div></TableHead>
                          <TableHead className="hidden md:table-cell"><div className="flex items-center gap-x-2">Total de vendas </div></TableHead>
                          <TableHead className="hidden md:table-cell"><div className="flex items-center gap-x-2">Creado em</div></TableHead>
                          <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products && products.map((product: any) => (
                          <ProductTableRow key={product.id} product={product} />
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <div className="text-xs text-muted-foreground">
                      Mostrando <strong>1-10</strong> de <strong>32</strong>{" "}
                      Produtos
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default Products