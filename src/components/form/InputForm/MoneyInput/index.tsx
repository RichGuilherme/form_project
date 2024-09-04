/* eslint-disable @typescript-eslint/no-explicit-any */
import { NumericFormat } from "react-number-format";

import { Controller, Noop } from "react-hook-form";
import { Label } from "@/components/ui/label";

interface MoneyInputProps {
  name: string;
  textLabel: string;
  control: any;
}

interface FieldParams {
  onChange: any;
  onBlur?: Noop;
  value: any;
  disabled?: boolean | undefined;
  name?: string;
}

export const MoneyInput = ({ name, textLabel, control }: MoneyInputProps) => {
  const handleBlur = (field: FieldParams) => () => {
    if (field.value === "" || field.value === "0,00") {
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
                thousandSeparator="."
                decimalSeparator=","
                className="border-none pl-0 focus-visible:ring-none focus-visible:outline-none outline-none text-xl text-gray-000 font-thin w-full"
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale={true}
                allowNegative={false}
                getInputRef={ref}
                onValueChange={(values) => {
                  field.onChange(values.value || "0,00");
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