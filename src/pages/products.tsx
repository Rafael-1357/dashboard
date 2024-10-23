import { useEffect, useState } from "react";
import NavDesktop from "@/components/ui/nav-desktop";
import NavMobile from "@/components/ui/nav-mobile";
import ProductTableRow from "@/components/ui/product-table-row";
import CreateProduct from "@/components/ui/createProduct";
import { CirclePlus, LucideShoppingCart } from "lucide-react"
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator";

type Product = {
  id: string;
  title: string;
  price: string;
};

function Products() {

  const [products, setProducts] = useState<Product[]>([]);

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
  ];

  useEffect(() => {
    setProducts(arrayProducts);
  }, []);

  function paginate(action: string) {
    action == "prev"
      ?
      // fetch('http://localhost:3000/page=1')
      console.log('Voltar')
      :
      // fetch('http://localhost:3000/page=1')
      console.log('Avançar')
  }


  return (
    <>
      <div className="flex flex-col md:flex-row md:min-w-full">
        <NavDesktop></NavDesktop>
        <NavMobile></NavMobile>
        <div className="w-full h-screen">
          <div className="w-full h-screen bg-muted/40 md:h-full">
            <main className="w-full h-full flex flex-col gap-4 p-4 sm:px-6 sm:py-4 md:gap-4">
              <div className="h-10 flex justify-between items-center">
                <Input
                  placeholder="Filtrar produtos"
                  className=" max-w-sm h-9 bg-white focus-visible:ring-0"
                />
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="bg-purple-500 cursor-pointer"><CirclePlus className="mr-1 flex" />Adicionar novo produto</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle className="pb-4">Novo produto</SheetTitle>
                      <Separator />
                    </SheetHeader>
                    <CreateProduct></CreateProduct>
                  </SheetContent>
                </Sheet>
              </div>
              <div className="overflow-auto">
                <Card>
                  {
                    arrayProducts.length != 0
                      ?
                      <Card className="h-full border-0 grid grid-rows-[90px 1fr 60px]">
                        <CardHeader>
                          <CardTitle>Produtos</CardTitle>
                        </CardHeader>
                        <CardContent className="overflow-auto">
                          <Table >
                            <TableHeader>
                              <TableRow>
                                <TableHead className="cursor-pointer">
                                  <div className="flex items-center gap-x-2">
                                    Nome
                                    <CaretSortIcon />
                                  </div>
                                </TableHead>
                                <TableHead className="cursor-pointer">
                                  <div className="flex items-center gap-x-2">
                                    Estado
                                    <CaretSortIcon />
                                  </div>
                                </TableHead>
                                <TableHead className="cursor-pointer">
                                  <div className="flex items-center gap-x-2">
                                    Valor
                                    <CaretSortIcon />
                                  </div>
                                </TableHead>
                                <TableHead className="hidden md:table-cell cursor-pointer">
                                  <div className="flex items-center gap-x-2">
                                    Total em Estoque
                                    <CaretSortIcon />
                                  </div>
                                </TableHead>
                                <TableHead className="hidden md:table-cell cursor-pointer">
                                  <div className="flex items-center gap-x-2">
                                    Total de Vendas
                                    <CaretSortIcon />
                                  </div>
                                </TableHead>
                                <TableHead className="hidden md:table-cell cursor-pointer">
                                  <div className="flex items-center gap-x-2">
                                    Creado em
                                    <CaretSortIcon />
                                  </div>
                                </TableHead>
                                <TableHead>
                                  <span className="sr-only">Ações</span>
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {products && products.map((product: any) => (
                                <ProductTableRow key={product.id} product={product} />
                              ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                        <CardFooter className="max-h-full">
                          <div className="w-full flex justify-between">
                            <div className="text-xs text-muted-foreground">
                              Mostrando <strong>1-10</strong> de <strong>32</strong>{" "}
                              Produtos
                            </div>
                            <div>

                              <Pagination className="h-auto">
                                <PaginationContent>
                                  <PaginationItem>
                                    <PaginationPrevious onClick={() => paginate('prev')} />
                                  </PaginationItem>
                                  <PaginationItem>
                                    <PaginationLink isActive> 1 </PaginationLink>
                                  </PaginationItem>
                                  <PaginationItem>
                                    <PaginationLink> 2 </PaginationLink>
                                  </PaginationItem>
                                  <PaginationItem>
                                    <PaginationLink> 3 </PaginationLink>
                                  </PaginationItem>
                                  <PaginationItem>
                                    <PaginationEllipsis />
                                  </PaginationItem>
                                  <PaginationItem>
                                    <PaginationNext onClick={() => paginate('next')} />
                                  </PaginationItem>
                                </PaginationContent>
                              </Pagination>
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                      :
                      <div className="text-center py-12">
                        <LucideShoppingCart className="w-full h-40 text-9xl" />
                        <h1 className="text-2xl">Nenhum produto encontrado</h1>
                      </div>
                  }

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