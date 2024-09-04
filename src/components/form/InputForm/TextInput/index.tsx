import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { InputsProps } from "../type/input";


export const TextInput = ({ name, textLabel, control, style }: InputsProps) => {
  return (
    <div className={`"mt-3 ${style}`}>
      <div className="flex flex-row gap-2 items-center border-b-[1px] border-gray-500 hover:border-orange-400 hover:border-b-[3px] text-xl text-gray-800 font-thin w-full">
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