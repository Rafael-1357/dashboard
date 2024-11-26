import { TableHeaders } from "@/types/products.types";
import { Button } from "@/components/ui/button";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CaretSortIcon } from "@radix-ui/react-icons";

function ProductTableHeader() {

  const handleSort = (field: string) => {
    console.log(field)
  };

  const handleActiveFilter = () => {
    console.log('Estado')
  };

  const tableHeaders: TableHeaders[] = [
    {
      title: 'Nome',
      Action: (field: string) => handleSort(field),
    },
    {
      title: 'Estado',
      Action: handleActiveFilter,
    },
    {
      title: 'Total em Estoque',
      Action: (field: string) => handleSort(field),
    },
    {
      title: 'Total de Vendas',
      Action: (field: string) => handleSort(field),
    },
    {
      title: 'Criado em',
      Action: (field: string) => handleSort(field),
    },
    {
      title: '',
      Action: (field: string) => handleSort(field),
    },
  ]

  return (
    <>
      <TableHeader>
        <TableRow>
          {
            tableHeaders.map(({ title, Action }) => (
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
                    title != ''
                      ?
                      <>
                        {title}
                        < CaretSortIcon />
                      </>
                      :
                      <span className="sr-only">{title}</span>
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