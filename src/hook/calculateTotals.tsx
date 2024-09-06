import { Product, TableState } from "@/type/store";


const useCalculateTotals = (data: Product[], moneyValues: TableState["moneyValues"]) => {
  let totalProductService = 0;
  let totalKg = 0;
  let totalVolume = 0;
  let totalNota = 0;


  data.forEach((product) => {
    const weight = parseFloat(product.weight.replace(",", "."));
    const volume = parseFloat(product.volume);
    const valueString = product.value.replace("R$", "").replace(/\./g, "").replace(",", ".").trim();
    const value = parseFloat(valueString);


    if (!isNaN(value)) {
      totalProductService += value;
    }

    if (!isNaN(weight)) {
      totalKg += weight;
    }

    if (!isNaN(volume)) {
      totalVolume += volume;
    }
  });



  const frete = parseFloat(moneyValues.frete.replace("R$", "").replace(/\./g, "").replace(",", ".").trim());
  const descont = parseFloat(moneyValues.descont.replace("R$", "").replace(/\./g, "").replace(",", ".").trim());

  const validFrete = isNaN(frete) ? 0 : frete;
  const validDescont = isNaN(descont) ? 0 : descont;

  if (validDescont > totalProductService) {
    totalNota = 0;
  } else {

    totalNota = validFrete + totalProductService - validDescont;
  }

  return {
    totalProductService: totalProductService.toFixed(2),
    totalNota: totalNota.toFixed(2),
    kg: totalKg.toFixed(2),
    unit: totalVolume.toFixed(0),
  };
};

export default useCalculateTotals;