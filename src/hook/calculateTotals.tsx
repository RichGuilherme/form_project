import { Product } from "@/type";


const useCalculateTotals = (data: Product[]) => {
  const totals = data.reduce(
    (acc, product) => {
      const weight = parseFloat(product.weight.replace(",", "."));
      const volume = parseFloat(product.volume);

      const valueString = product.value.replace("R$", "").replace(/\./g, "").replace(",", ".").trim();
      const value = parseFloat(valueString);

      if (!isNaN(value)) {
        acc.totalProductService += value;
        acc.totalNotaValue += value;
      }

      if (!isNaN(weight)) {
        acc.totalKg += weight;
      }

      if (!isNaN(volume)) {
        acc.totalVolume += volume;
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