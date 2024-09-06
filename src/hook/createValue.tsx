
import { useCallback, useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";

interface FormData {
  quantity: string;
  valueUnit: string;
  weight: string;
  volume: string;
  value: string;
  textDescription: string;
  dateMin?: Date;
  dateMax?: Date;
}

const useUpdateTotalValue = () => {
  const { setValue } = useFormContext<FormData>();

  const watchValueUnit = useWatch({ name: "valueUnit" });
  const watchQuantity = useWatch({ name: "quantity" });

  const prevWatchValueUnit = useRef(watchValueUnit);
  const prevWatchQuantity = useRef(watchQuantity);

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
      setValue("value", "0,00");
    }
  }, [watchValueUnit, watchQuantity, setValue]);

  useEffect(() => {
    if (watchValueUnit !== prevWatchValueUnit.current || watchQuantity !== prevWatchQuantity.current) {
      calculateTotalValue();
      prevWatchValueUnit.current = watchValueUnit;
      prevWatchQuantity.current = watchQuantity;
    }
  }, [watchValueUnit, watchQuantity, calculateTotalValue]);

  return null;
};

export default useUpdateTotalValue;