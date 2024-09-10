import { useCallback, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";


const ValueTotalControlle = () => {
  const { setValue } = useFormContext();

  const watchValueUnit = useWatch({ name: "valueUnit" }) || "0.00";
  const watchQuantity = useWatch({ name: "quantity" }) || "0";

  const calculateTotalValue = useCallback(() => {
    const quantityStr = watchQuantity.replace(" uni", "").trim();
    const valueUnitStr = watchValueUnit
      .replace("R$ ", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim();

    const uniFormat = parseFloat(quantityStr);
    const moneyFormat = parseFloat(valueUnitStr);

    if (!isNaN(uniFormat) && !isNaN(moneyFormat)) {
      const totalValue = moneyFormat * uniFormat;
      setValue("value", totalValue.toFixed(2));
    } else {
      setValue("value", "0.00");
    }
  }, [watchValueUnit, watchQuantity, setValue]);

  useEffect(() => {
    if (watchValueUnit !== "0.00" || watchQuantity !== "0") {
      calculateTotalValue();
    }
  }, [watchValueUnit, watchQuantity, calculateTotalValue]);

  return null;
};

export default ValueTotalControlle;