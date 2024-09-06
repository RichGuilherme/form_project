
import { NumericFormat } from "react-number-format";

import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { InputsProps } from "../../../type/inputForm";

export const UniInput = ({ name, textLabel }: InputsProps) => {
  const { control } = useFormContext();

  // const handleBlur = (field: FieldParams) => () => {
  //   if (field.value === "" || field.value === "0 uni") {
  //     field.onChange("0");
  //   }
  // };

  return (
    <div className="mt-3 group">
      <Label htmlFor={name} className="font-thin text-gray-500 text-base group-focus-within:text-orange-500 ">
        {textLabel}
      </Label>


      <div className="inputForm">
        <Controller
          name={name}
          control={control}
          render={({ field: { ref, onChange, value } }) => (
            <>
              <NumericFormat
                className="border-none pl-0 focus-visible:ring-none focus-visible:outline-none outline-none text-xl font-thin w-full peer"
                suffix=" uni"
                allowNegative={false}
                getInputRef={ref}
                onChange={onChange}
                defaultValue="0,00"
                value={value || "0,00"} />
            </>
          )}
        />
      </div>
    </div>
  );
};
