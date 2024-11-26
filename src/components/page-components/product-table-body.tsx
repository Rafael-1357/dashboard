import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useProductStore } from "@/store/product";
import { useEffect, useState } from "react";
import ProductTableRow from "@/components/page-components/product-table-row";
import { LucideShoppingCart } from "lucide-react";

function ProductTableBody() {

  const { products, requestProducts } = useProductStore()

  useEffect(() => {
    requestProducts();
  }, []);

  return (
    <>
      <TableBody>
        {products.length !== 0 ? (
          products.map((product) => (
            <ProductTableRow key={product.id} product={product} />
          ))
        ) : (
          <TableRow className="h-[300px]">
            <TableCell colSpan={5}>
              <div className="flex flex-col items-center justify-center col">
                <LucideShoppingCart size={40} className="text-muted-foreground mb-4" />
                <h2 className="text-2xl font-bold text-muted-foreground">Nenhum produto encontrado</h2>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </>
  )
}

export default ProductTableBody;