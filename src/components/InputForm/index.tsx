import { NumericFormat } from "react-number-format"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Controller } from "react-hook-form"


type typeInput = "money" | "uni" | "kg"

interface InputFormProps {
  type: typeInput
  textLabel: string,
  control: any;
  name: string
}

export const InputForm = ({ type, textLabel, control, name }: InputFormProps) => {

  switch (type) {
    case "money":
      return (
        <div className="mt-3">
          <Label
            htmlFor="freightValue"
            className="font-thin text-gray-500 text-base" >
            {textLabel}
          </Label>

          <div className="flex flex-row gap-2 items-center border-b-[1px] border-gray-500 hover:border-orange-400 hover:border-b-[3px] text-xl text-gray-800 font-thin w-48">
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <>
                  <div>R$</div>
                  <NumericFormat
                    {...field}
                    customInput={Input}
                    className="border-none pl-0 focus-visible:ring-none focus-visible:outline-none outline-none text-xl text-gray-000 font-thin"
                    decimalScale={2}
                    decimalSeparator=","
                    allowNegative
                    fixedDecimalScale
                    value={0}
                  />
                </>
              )}
            />
          </div>
        </div>
      )

    case "kg":
      return (
        <div className="mt-3">
          <Label
            htmlFor="freightValue"
            className="font-thin text-gray-500 text-lg" >
            {textLabel}
          </Label>

          <div className="flex flex-row gap-2 items-center border-b-[1px] border-gray-500 hover:border-orange-400 hover:border-b-[3px] text-xl text-gray-800 font-thin w-48">
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <>
                  <NumericFormat
                    {...field}
                    customInput={Input}
                    className="border-none pl-0 focus-visible:ring-none focus-visible:outline-none outline-none text-xl text-gray-000 font-thin "
                    decimalScale={2}
                    decimalSeparator=","
                    allowNegative
                    fixedDecimalScale
                    value={0}
                  />
                  <div>kg</div>
                </>
              )}
            />
          </div>
        </div>
      )

    case "uni":
      return (
        <div className="mt-3">
          <Label
            htmlFor="freightValue"
            className="font-thin text-gray-500 text-lg" >
            {textLabel}
          </Label>

          <div className="flex flex-row gap-2 items-center border-b-[1px] border-gray-500 hover:border-orange-400 hover:border-b-[3px] text-xl text-gray-800 font-thin w-48">
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <>
                  <NumericFormat
                    {...field}
                    customInput={Input}
                    className="border-none pl-0 focus-visible:ring-none focus-visible:outline-none outline-none text-xl text-gray-000 font-thin "
                    decimalScale={2}
                    decimalSeparator=","
                    allowNegative
                    fixedDecimalScale
                    value={0}
                  />
                  <div>uni</div>
                </>
              )}
            />
          </div>
        </div>
      )
  }
}
