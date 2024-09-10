import { Product } from "@/storage/type/store";


const useCalculateTotals = (data: Product[]) => {
  let totalProductService = 0;
  let totalKg = 0;
  let totalVolume = 0;
  let totalNotaValue = 0;


  data.forEach((product) => {
    const weight = parseFloat(product.weight.replace(",", "."));
    const volume = parseFloat(product.volume);

    const valueString = product.value.replace("R$", "").replace(/\./g, "").replace(",", ".").trim();
    const value = parseFloat(valueString);


    if (!isNaN(value)) {
      totalProductService += value;
      totalNotaValue += value;
    }

    if (!isNaN(weight)) {
      totalKg += weight;
    }

    if (!isNaN(volume)) {
      totalVolume += volume;
    }
  });

  return {
    totalProductService: totalProductService.toFixed(2),
    totalNota: totalNotaValue.toFixed(2),
    kg: totalKg.toFixed(2),
    unit: totalVolume.toFixed(0),
  };
};

export default useCalculateTotals;