import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface FormInputFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}

export const TextInputField = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: FormInputFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage className="text-left" />
        </FormItem>
      )}
    />
  );
};
