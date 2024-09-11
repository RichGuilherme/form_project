import { Product } from "@/type";
import formatData from "@/utils/formatData";


const useCalculateTotals = (data: Product[]) => {
  const totals = data.reduce(
    (acc, product) => {
      const _weight = parseFloat(formatData(product.weight, "weight"));
      const _volume = parseFloat(product.volume);
      const _value = parseFloat(formatData(product.value, "money"));

      if (!isNaN(_value)) {
        acc.totalProductService += _value;
        acc.totalNotaValue += _value;
      }

      if (!isNaN(_weight)) {
        acc.totalKg += _weight;
      }

      if (!isNaN(_volume)) {
        acc.totalVolume += _volume;
      }

      return acc;
    },
    {
      totalProductService: 0,
      totalKg: 0,
      totalVolume: 0,
      totalNotaValue: 0,
    }
  );

  return {
    totalProductService: totals.totalProductService.toFixed(2),
    totalNota: totals.totalNotaValue.toFixed(2),
    kg: totals.totalKg.toFixed(2),
    unit: totals.totalVolume.toFixed(0),
  };
};

export default useCalculateTotals;