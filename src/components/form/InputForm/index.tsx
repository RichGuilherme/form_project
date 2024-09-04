import { KgInput } from "./KgInput";
import { MoneyInput } from "./MoneyInput";
import { TextInput } from "./TextInput";
import { InputFormProps } from "./type/input";
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
    default:
      return null;
  }
};

export default InputForm;