
import { NumericFormat } from "react-number-format";

import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { FieldParams, InputsProps } from "../type/input";

export const UniInput = ({ name, textLabel, control }: InputsProps) => {
  const handleBlur = (field: FieldParams) => () => {
    if (field.value === "" || field.value === "0 uni") {
      field.onChange("0");
    }
  };

  return (
    <div className="mt-3 group">
      <Label htmlFor={name} className="font-thin text-gray-500 text-base group-focus-within:text-orange-500 ">
        {textLabel}
      </Label>


      <div className="inputForm">
        <Controller
          name={name}
          control={control}
          render={({ field: { ref, ...field } }) => (
            <>
              <NumericFormat
                {...field}
                className="border-none pl-0 focus-visible:ring-none focus-visible:outline-none outline-none text-xl font-thin w-full peer"
                suffix=" uni"
                allowNegative={false}
                getInputRef={ref}
                onValueChange={(values) => {

                  field.onChange(values.value || "0");
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
