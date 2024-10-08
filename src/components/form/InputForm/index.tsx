import { InputFormProps } from "@/type";
import { DateInput } from "./DateInput";
import { KgInput } from "./KgInput";
import { MoneyInput } from "./MoneyInput";
import { TextInput } from "./TextInput";
import { UniInput } from "./UnitInput";


const InputForm: React.FC<InputFormProps> = ({ type, ...props }) => {
  switch (type) {
    case "money":
      return <MoneyInput {...props} />;
    case "kg":
      return <KgInput {...props} />;
    case "uni":
      return <UniInput {...props} />;
    case "text":
      return <TextInput {...props} />;
    case "date":
      return <DateInput {...props} />;
    default:
      return null;
  }
};

export default InputForm;