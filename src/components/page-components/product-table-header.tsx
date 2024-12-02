import { useProductStore } from "@/store/product";
import { TableHeaders } from "@/types/products.types";
import { Button } from "@/components/ui/button";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CaretSortIcon } from "@radix-ui/react-icons";

function ProductTableHeader() {
  
  const { setStateFilter, setSortOptions } = useProductStore()

  const handleSort = (field: string) => {
    setSortOptions(field)
  };

  const handleActiveFilter = () => {
    setStateFilter();
  };

  const tableHeaders: TableHeaders[] = [
    {
      label: "Nome",
      title: 'name',
      Action: (field: string) => handleSort(field),
    },
    {
      label: "Estado",
      title: 'state',
      Action: handleActiveFilter,
    },
    {
      label: "Total em estoque",
      title: 'total_in_stock',
      Action: (field: string) => handleSort(field),
    },
    {
      label: "Total de vendas",
      title: 'total_revenue',
      Action: (field: string) => handleSort(field),
    },
    {
      label: "Criado em",
      title: 'created_at',
      Action: (field: string) => handleSort(field),
    },
    {
      label: "",
      title: '',
      Action: (field: string) => handleSort(field),
    },
  ]

  return (
    <>
      <TableHeader>
        <TableRow>
          {
            tableHeaders.map(({ label, title, Action }) => (
              <TableHead
                key={title}
                className="cursor-pointer"
              >
                <Button
                  variant={"ghost"}
                  className="w-full p-0 flex justify-start items-center gap-x-2"
                  onClick={() => {
                    if (Action.length === 0) {
                      Action();
                    } else {
                      Action(title);
                    }
                  }}
                >
                  {
                    label != ''
                      ?
                      <>
                        {label}
                        < CaretSortIcon />
                      </>
                      :
                      <span className="sr-only">{label}</span>
                  }
                </Button>
              </TableHead>
            ))
          }
        </TableRow>
      </TableHeader>
    </>
  )
}

export default ProductTableHeader;