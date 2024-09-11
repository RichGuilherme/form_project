import formatData from "@/utils/formatData";
import { useCallback, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";


const TotalNotaControlle = () => {
  const { setValue, getValues } = useFormContext();

  const watchFrete = useWatch({ name: "frete" }) || "0.00";
  const watchDescont = useWatch({ name: "descont" }) || "0.00";

  const updateMoneyValue = useCallback(() => {
    const _totalProductService = parseFloat(getValues("totalProductService"));
    const _descont = parseFloat(formatData(watchDescont, "money"));
    const _frete = parseFloat(formatData(watchFrete, "money"));

    if (!isNaN(_frete) && !isNaN(_descont)) {
      if (_descont > _totalProductService) {
        setValue("totalNota", "0.00");

      } else {
        const totalNota = _frete + _totalProductService - _descont;
        console.log(totalNota);
        setValue("totalNota", totalNota.toFixed(2));
      }
    }
  }, [getValues, setValue, watchDescont, watchFrete]);


  useEffect(() => {
    updateMoneyValue();
  }, [watchFrete, watchDescont, updateMoneyValue]);

  return null;
};

export default TotalNotaControlle;