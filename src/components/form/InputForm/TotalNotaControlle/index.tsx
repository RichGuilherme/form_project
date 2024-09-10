import { useCallback, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";


const TotalNotaControlle = () => {
  const { setValue, getValues } = useFormContext();
  const watchFrete = useWatch({ name: "frete" }) || "0.00";
  const watchDescont = useWatch({ name: "descont" }) || "0.00";

  const updateMoneyValue = useCallback(() => {
    const totalProductServiceStr = getValues("totalProductService");

    const descontValueStr = watchDescont
      .replace("R$ ", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim();

    const freteValueStr = watchFrete
      .replace("R$ ", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim();

    const freteValue = parseFloat(freteValueStr);
    const descontValue = parseFloat(descontValueStr);
    const totalProductServiceValue = parseFloat(totalProductServiceStr);

    if (!isNaN(freteValue) && !isNaN(descontValue)) {
      if (descontValue > totalProductServiceValue) {
        setValue("totalNota", "0.00");

      } else {
        const totalNota = freteValue + totalProductServiceValue - descontValue;
        setValue("totalNota", totalNota.toFixed(2));
      }

    }

  }, [getValues, setValue, watchDescont, watchFrete]);

  useEffect(() => {
    if (watchFrete !== "0.00" || watchDescont !== "0.00") {
      updateMoneyValue();
    }
  }, [watchFrete, watchDescont, updateMoneyValue]);

  return null;
};

export default TotalNotaControlle;