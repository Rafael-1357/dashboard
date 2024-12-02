import { useEffect, useState } from "react";
import { useProductStore } from "@/store/product";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function ProductTableFooter() {

  const { meta, setCurrentPage } = useProductStore();

  const handlePageChange = (page: number) => {

    if (page >= 1 && page <= meta.last_page) {
      setCurrentPage(page)
    }
  };

  const getPageNumbers = () => {
    const { last_page: totalPages, current_page } = meta;
    const maxPagesToShow = 3;

    let startPage = Math.max(1, current_page - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };


  return (
    <>
      <div className="w-full mt-4 flex items-center">
        <div className="w-full text-xs text-muted-foreground">
          Mostrando <strong>{meta.from}</strong> - <strong>{meta.to}</strong> de <strong>{meta.total}</strong> Produtos
        </div>
        <Pagination className="h-auto flex justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious className="cursor-pointer" onClick={() => handlePageChange(meta.current_page - 1)} />
            </PaginationItem>
            {getPageNumbers().map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === meta.current_page}
                  onClick={() => handlePageChange(page)}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext className="cursor-pointer" onClick={() => handlePageChange(meta.current_page + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}

export default ProductTableFooter;