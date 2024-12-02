import { useEffect, useState } from "react";
import NavDesktop from "@/components/page-components/nav-desktop";
import NavMobile from "@/components/page-components/nav-mobile";
import ProductTableHeader from "@/components/page-components/product-table-header";
import ProductTableBody from "@/components/page-components/product-table-body";
import ProductTableFooter from "@/components/page-components/product-table-footer";
import CreateProduct from "@/components/page-components/create-product";
import { useProductStore } from "@/store/product";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";


function Products() {

  const [searchTerm, setSearchTermInput] = useState("");
  const { setSearchTerm } = useProductStore()

  useEffect(() => {
    setSearchTerm(searchTerm)
  }, [searchTerm])

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
                value={searchTerm}
                onChange={(e) => setSearchTermInput(e.target.value)}
              />
              <CreateProduct />
            </div>
            <div className="max-h-[90%] p-4 border bg-white rounded-md flex flex-col shadow-sm">
              <div className="mb-1 px-2 text-sm font-medium">
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
              <ProductTableFooter />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Products;
