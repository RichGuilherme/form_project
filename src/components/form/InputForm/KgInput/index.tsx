import { NumericFormat } from "react-number-format";
import { FieldParams, InputsProps } from "@/type";
import { Controller, useFormContext, } from "react-hook-form";
import { Label } from "@/components/ui/label";


export const KgInput = ({ name, textLabel }: InputsProps) => {
  const { control } = useFormContext();

  const handleBlur = (field: FieldParams) => () => {
    if (field.value === "" || field.value === "0.00 kg") {
      field.onChange("0.00");
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
                suffix=" kg"
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                allowNegative={false}
                getInputRef={ref}
                onValueChange={(values) => {
                  const value = values.value || "0.00";
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