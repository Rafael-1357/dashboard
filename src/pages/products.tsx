import { useEffect, useState } from "react";
import NavDesktop from "@/components/ui/nav-desktop";
import NavMobile from "@/components/ui/nav-mobile";
import ProductTableRow from "@/components/ui/product-table-row";
import CreateProduct from "@/components/ui/createProduct";
import { CirclePlus, LucideShoppingCart } from "lucide-react";
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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

type Product = {
  id: string;
  active: string;
  name: string;
  category: string;
  created_at: string;
  total_revenue: number;
  total_in_stock: {
    value: number;
    unit_name: string;
  };
};

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [sortOptions, setSortOptions] = useState<{
    field: string | null;
    direction: "asc" | "desc" | null;
  }>({
    field: null,
    direction: null,
  });

  const [activeFilter, setActiveFilter] = useState<1 | 0 | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, sortOptions, activeFilter]);

  const fetchProducts = () => {
    const baseUrl = `${import.meta.env.VITE_API_URL}/api/products?page=${currentPage}`;
    const sortParam = sortOptions.field
      ? `&sort[0]=${sortOptions.field}${sortOptions.direction === "desc" ? ":desc" : ""}`
      : "";
    const activeParam = activeFilter !== null
      ? `&filters[active][$eq]=${activeFilter}`
      : "";
    const url = baseUrl + sortParam + activeParam;

    console.log(url);

    fetch(url, {
      headers: {
        "Content-type": "application/json",
        Authorization: import.meta.env.VITE_API_TOKEN,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setProducts(response.data);
        setMeta(response.meta);
      });
  };

  const handleSort = (field: string) => {
    setSortOptions((prevSort) => {
      if (prevSort.field === field) {
        const newDirection =
          prevSort.direction === "asc" ? "desc" : prevSort.direction === "desc" ? null : "asc";
        return { field: newDirection ? field : null, direction: newDirection };
      } else {
        return { field, direction: "asc" };
      }
    });
  };

  const toggleActiveFilter = () => {
    setActiveFilter((prev) => (prev === 1 ? 0 : prev === 0 ? null : 1));
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= meta?.last_page) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const totalPages = meta?.last_page || 1;
    const maxPagesToShow = 3;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:min-w-full">
        <NavDesktop />
        <NavMobile />
        <div className="w-full h-screen">
          <div className="w-full h-screen bg-muted/40 md:h-full">
            <main className="w-full h-full flex flex-col gap-4 p-4 sm:px-6 sm:py-4 md:gap-4">
              <div className="h-10 flex justify-between items-center">
                <Input
                  placeholder="Filtrar produtos"
                  className="max-w-sm h-9 bg-white focus-visible:ring-0"
                />
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="bg-purple-500 cursor-pointer">
                      <CirclePlus className="mr-1 flex" />
                      Adicionar novo produto
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle className="pb-4">Novo produto</SheetTitle>
                      <Separator />
                    </SheetHeader>
                    <CreateProduct />
                  </SheetContent>
                </Sheet>
              </div>
              <div className="h-[90%]">
                <Card className="h-full overflow-auto">
                  {products.length !== 0 ? (
                    <Card className="h-full overflow-auto border-0 grid grid-rows-[25px_1fr_60px]">
                      <CardHeader></CardHeader>
                      <CardContent className="pb-0 overflow-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="cursor-pointer">
                                <Button
                                  variant={"ghost"}
                                  className="w-full p-0 flex justify-start items-center gap-x-2"
                                  onClick={() => handleSort("name")}
                                >
                                  Nome
                                  <CaretSortIcon />
                                </Button>
                              </TableHead>
                              <TableHead className="cursor-pointer">
                                <Button
                                  variant={"ghost"}
                                  className="w-full p-0 flex justify-start items-center gap-x-2"
                                  onClick={toggleActiveFilter}
                                >
                                  Estado
                                  <CaretSortIcon />
                                </Button>
                              </TableHead>
                              <TableHead className="hidden md:table-cell cursor-pointer">
                                <Button
                                  variant={"ghost"}
                                  className="w-full p-0 flex justify-start items-center gap-x-2"
                                  onClick={() => handleSort("total_in_stock")}
                                >
                                  Total em Estoque
                                  <CaretSortIcon />
                                </Button>
                              </TableHead>
                              <TableHead className="hidden md:table-cell cursor-pointer">
                                <Button
                                  variant={"ghost"}
                                  className="w-full p-0 flex justify-start items-center gap-x-2"
                                  onClick={() => handleSort("total_revenue")}
                                >
                                  Total de Vendas
                                  <CaretSortIcon />
                                </Button>
                              </TableHead>
                              <TableHead className="hidden md:table-cell cursor-pointer">
                                <Button
                                  variant={"ghost"}
                                  className="w-full p-0 flex justify-start items-center gap-x-2"
                                  onClick={() => handleSort("created_at")}
                                >
                                  Criado em
                                  <CaretSortIcon />
                                </Button>
                              </TableHead>
                              <TableHead>
                                <span className="sr-only">Ações</span>
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {products.map((product) => (
                              <ProductTableRow key={product.id} product={product} />
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                      <CardFooter className="max-h-full">
                        <div className="w-full flex">
                          <div className="w-full text-xs text-muted-foreground">
                            Mostrando <strong>{meta?.from}</strong> - <strong>{meta?.to}</strong> de <strong>{meta?.total}</strong> Produtos
                          </div>
                          <Pagination className="h-auto flex justify-end">
                            <PaginationContent>
                              <PaginationItem>
                                <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                              </PaginationItem>
                              {getPageNumbers().map((page) => (
                                <PaginationItem key={page}>
                                  <PaginationLink
                                    isActive={page === currentPage}
                                    onClick={() => handlePageChange(page)}
                                  >
                                    {page}
                                  </PaginationLink>
                                </PaginationItem>
                              ))}
                              <PaginationItem>
                                <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                              </PaginationItem>
                            </PaginationContent>
                          </Pagination>
                        </div>
                      </CardFooter>
                    </Card>
                  ) : (
                    <div className="h-[500px] grid place-content-center">Nenhum produto encontrado</div>
                  )}
                </Card>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
