
import { FormData } from "@/type";
import { useCallback, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";


const useUpdateTotalValue = () => {
  const { setValue } = useFormContext<FormData>();

  const watchValueUnit = useWatch({ name: "valueUnit" });
  const watchQuantity = useWatch({ name: "quantity" });

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
};

export default useUpdateTotalValue;