import { useEffect, useState } from "react";
import NavDesktop from "@/components/ui/nav-desktop";
import NavMobile from "@/components/ui/nav-mobile";
import ProductTableHeader from "@/components/page-components/product-table-header";
import ProductTableBody from "@/components/page-components/product-table-body";
import ProductTableRow from "@/components/page-components/product-table-row";
import CreateProduct from "@/components/ui/createProduct";
import { CirclePlus, LucideShoppingCart } from "lucide-react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
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
import { ProductList } from "@/types/products.types";

function Products() {

  return (
    <>
      <div className="flex flex-col md:flex-row md:min-w-full">
        <NavDesktop />
        <NavMobile />
        <div className="w-full h-screen">
          <main className="w-full h-full p-4 bg-muted/40 flex flex-col sm:px-6 sm:py-4">
            <div className="h-10 mb-4 flex justify-between items-center">
              <Input
                placeholder="Filtrar produtos"
                className="max-w-sm h-9 bg-white focus-visible:ring-0"
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="h-full bg-purple-500 cursor-pointer">
                    <CirclePlus className="mr-1 flex" />
                    Adicionar novo produto
                  </Button>
                </SheetTrigger>
                <SheetContent className="min-w-[500px] overflow-auto">
                  <SheetHeader>
                    <SheetTitle className="pb-4">Novo produto</SheetTitle>
                    <Separator />
                  </SheetHeader>
                  <CreateProduct />
                </SheetContent>
              </Sheet>
            </div>
            <div className="max-h-[90%] p-4 border bg-white rounded-md flex flex-col shadow-sm">
              <div className="mb-1 px-2">
                Produtos
              </div>
              <Separator />
              <div className="overflow-auto">
                <Table>
                  <ProductTableHeader />
                  <ProductTableBody />
                </Table>
              </div>
              <Separator />
              <div className="mt-1 px-2">Footer</div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Products;
