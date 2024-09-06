import { InputsProps } from "@/components/type/inputForm";
import { Label } from "@/components/ui/label";
import useUpdateTotalValue from "@/hook/createValue";
import { Controller, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";


const ValueTotalInput = ({ name, textLabel }: InputsProps) => {
  const { control } = useFormContext();

  useUpdateTotalValue();

  return (
    <div className="mt-3 group">
      <Label htmlFor={name} className="font-thin text-gray-500 text-base whitespace-nowrap group-focus-within:text-orange-500 ">
        {textLabel}
      </Label>

      <div className="inputForm ">
        <Controller
          control={control}
          name={name}
          render={({ field: { value, onChange, ref } }) => {
            return <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              className="border-none pl-0 focus-visible:ring-none focus-visible:outline-none outline-none text-xl font-thin w-full peer"
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale={true}
              allowNegative={false}
              getInputRef={ref}
              onChange={onChange}
              value={value} />;
          }}
        />
      </div>
    </div>
  );
};

export default ValueTotalInput;