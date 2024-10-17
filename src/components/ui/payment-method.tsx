import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

// Definição do tipo das props do MethodPayment
interface MethodPaymentProps {
  id: string; // Agora é uma string
  removeMethod: (id: string) => void;
}

// Componente MethodPayment com botão de remover
function MethodPayment({ id, removeMethod }: MethodPaymentProps) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="w-full flex gap-2">
        <Select>
          <SelectTrigger className="focus-visible:ring-0 focus:ring-0 ring-0 bg-white">
            <SelectValue placeholder="Método" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pix">Pix</SelectItem>
            <SelectItem value="credito">Crédito</SelectItem>
            <SelectItem value="debito">Débito</SelectItem>
            <SelectItem value="dinheiro">Dinheiro</SelectItem>
          </SelectContent>
        </Select>
        <Button
          className="bg-red-500"
          onClick={() => removeMethod(id)}
          aria-label="Remover método de pagamento"
        >
          <Trash2 />
        </Button>
      </div>
      <Input className="focus-visible:ring-0 bg-white" placeholder="Valor recebido"></Input>
    </div>
  );
}

// Componente principal
function PaymentMethods() {
  const [methods, setMethods] = useState<string[]>([crypto.randomUUID()]); // Cada método começa com um ID único

  const addMethod = () => {
    setMethods((prevMethods) => [...prevMethods, crypto.randomUUID()]); // Gera um novo UUID
  };

  const removeMethod = (id: string) => {
    // Não permitir remover se houver apenas um método
    if (methods.length > 1) {
      setMethods((prevMethods) => prevMethods.filter((methodId) => methodId !== id));
    }
  };

  return (
    <div>
      
    <div className="flex flex-col gap-2">
      {methods.map((id) => (
        <MethodPayment key={id} id={id} removeMethod={removeMethod} />
      ))}
      <Button onClick={addMethod} className="w-full bg-purple-500">
        Adicionar Método de Pagamento
      </Button>
      <Input className="focus-visible:ring-0 bg-white" placeholder="Valor recebido"></Input>
      </div>
    </div>
  );
}

export default PaymentMethods;
