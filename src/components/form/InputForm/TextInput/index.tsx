import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { InputsProps } from "@/type";


export const TextInput = ({ name, textLabel, style }: InputsProps) => {
  const { control } = useFormContext();

  return (
    <div className={`"mt-3 group ${style}`}>
      <div className="inputForm group-focus-within:border-orange-500">
        <Controller
          name={name}
          control={control}
          render={({ field: { ...field } }) => (
            <>
              <Input
                {...field}
                type="text"
                className="border-none placeholder:text-xl text-xl pl-0 peer"
                placeholder={textLabel}
                value={field.value}
              />
            </>
          )}
        />
      </div>
    </div>
  );
};