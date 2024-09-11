import formatData from "@/utils/formatData";
import { useCallback, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";


const ValueTotalControlle = () => {
  const { setValue } = useFormContext();

  const watchValueUnit = useWatch({ name: "valueUnit" }) || "0.00";
  const watchQuantity = useWatch({ name: "quantity" }) || "0";

  const calculateTotalValue = useCallback(() => {
    const _quantity = parseFloat(formatData(watchQuantity, "uni"));
    const _valueUnit = parseFloat(formatData(watchValueUnit, "money"));

    if (!isNaN(_quantity) && !isNaN(_valueUnit)) {
      const totalValue = _valueUnit * _quantity;
      setValue("value", totalValue.toFixed(0));

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