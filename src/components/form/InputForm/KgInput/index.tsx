import { NumericFormat } from "react-number-format";

import { Controller, } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { FieldParams, InputsProps } from "../type/input";


export const KgInput = ({ name, textLabel, control }: InputsProps) => {

  const handleBlur = (field: FieldParams) => () => {
    if (field.value === "" || field.value === "0,00 kg") {
      field.onChange("0,00");
    }
  };

  return (
    <div className="mt-3">
      <Label htmlFor={name} className="font-thin text-gray-500 text-base">
        {textLabel}
      </Label>

      <div className="flex flex-row gap-2 items-center border-b-[1px] border-gray-500 hover:border-orange-400 hover:border-b-[3px] text-xl text-gray-800 font-thin w-full">
        <Controller
          name={name}
          control={control}
          render={({ field: { ref, ...field } }) => (
            <>
              <NumericFormat
                {...field}
                className="border-none pl-0 focus-visible:ring-none focus-visible:outline-none outline-none text-xl font-thin w-full"
                suffix=" kg"
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                allowNegative={false}
                getInputRef={ref}
                onValueChange={(values) => {
                  const value = values.value || "0,00";
                  field.onChange(value);
                }}
                onBlur={handleBlur(field)}
                value={field.value}
              />
            </>
          )}
        />
      </div>
    </div>
  );
};