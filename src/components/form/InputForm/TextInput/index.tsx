import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { InputsProps } from "../type/input";


export const TextInput = ({ name, textLabel, control, style }: InputsProps) => {
  return (
    <div className={`"mt-3 ${style}`}>
      <div className="inputForm">
        <Controller
          name={name}
          control={control}
          render={({ field: { ...field } }) => (
            <>
              <Input
                {...field}
                type="text"
                className="border-none placeholder:text-xl text-xl pl-0"
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