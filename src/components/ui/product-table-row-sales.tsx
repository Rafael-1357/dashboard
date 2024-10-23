import { Minus, Plus } from "lucide-react"
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  value: number;
};

type ProductTableRowProps = {
  product: Product;
  onRemove: () => void; 
  onCalculate: (qtd: number, product: number) => void;
};

function ProductTableRowSales({ product, onRemove, onCalculate }: ProductTableRowProps) {

  const [productQuantity, setProductQuantity] = useState(1)
  const [total, setTotal] = useState(product.value)

  const handleIncrement = () => {
    setProductQuantity(productQuantity + 1)
    setTotal(prevValue => prevValue + product.value)
  }
  
  const handleDecrement = () => {
    if (productQuantity - 1 === 0) {
      onRemove(); 
    } else {
      setProductQuantity(productQuantity - 1);
      setTotal(prevValue => prevValue - product.value)
    }
  }

  useEffect(() => {
    onCalculate(productQuantity, product.id)
  }, [productQuantity])

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          {product.name}
        </TableCell>
        <TableCell>
          <div className="flex">

            <button
              className="size-8 cenTER text-white bg-purple-500 rounded-l-sm flex justify-center items-center"
              onClick={handleDecrement}
            >
              <Minus></Minus>
            </button>

            <Input
              className="w-12 h-8 text-center rounded-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              // value={0}
              value={productQuantity}
              onChange={(e) => {
                setProductQuantity(parseInt(e.target.value))
              }}
            />

            <button
              className="size-8 text-white bg-purple-500 rounded-r-sm flex justify-center items-center"
              onClick={handleIncrement}
            >
              <Plus></Plus>
            </button>
          </div>
        </TableCell>
        <TableCell>R$ {product.value}</TableCell>
        <TableCell>R$ {total}</TableCell>
      </TableRow>
    </>
  )
}

export default ProductTableRowSales

