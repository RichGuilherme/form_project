/* eslint-disable @typescript-eslint/no-explicit-any */

import { KgInput } from "./KgInput";
import { MoneyInput } from "./MoneyInput";
import { UniInput } from "./UnitInput";

type typeInput = "money" | "uni" | "kg"

interface InputFormProps {
  type: typeInput | string
  textLabel: string,
  control: any;
  name: string
}

export const InputForm = ({ type, ...props }: InputFormProps) => {
  switch (type) {
    case "money":
      return <MoneyInput {...props} />;
    case "kg":
      return <KgInput {...props} />;
    case "uni":
      return <UniInput {...props} />;
    default:
      return null;
  }
};
