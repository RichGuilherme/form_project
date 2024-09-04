import { create } from "zustand";

interface Product {
  id: string;
  quantity: string;
  valueUnit: string;
  volume: string;
  weight: string;
  value: string;
  textDescription: string;
}

interface TableState {
  data: Product[];

  moneyValues: {
    frete: string;
    descont: string;
    totalProductService: string;
    totalNota: string;
    kg: string;
    unit: string;
  };
}

interface TableActions {
  addData: (newData: Product) => void;
  removeData: (id: string) => void;
  setMoneyValue: (name: string, value: string) => void;
}

type TableStore = TableState & TableActions;

const calculateTotals = (data: Product[], moneyValues: TableState["moneyValues"]) => {
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

const useStoreValue = create<TableStore>((set) => ({
  data: [],
  moneyValues: {
    frete: "0,00",
    descont: "0,00",
    totalProductService: "0,00",
    totalNota: "0,00",
    kg: "0,00",
    unit: "0",
  },

  setMoneyValue: (name, value) =>
    set((state) => {
      const updatedMoneyValues = {
        ...state.moneyValues,
        [name]: value,
      };

      const updatedTotals = calculateTotals(state.data, updatedMoneyValues);

      return {
        moneyValues: {
          ...updatedMoneyValues,
          ...updatedTotals,
        },
      };
    }),

  addData: (newData) =>
    set((state) => {
      const updatedData = [...state.data, newData];
      const updatedTotals = calculateTotals(updatedData, state.moneyValues);

      return {
        data: updatedData,
        moneyValues: {
          ...state.moneyValues,
          ...updatedTotals,
        },
      };
    }),

  removeData: (id) =>
    set((state) => {
      const updatedData = state.data.filter((item) => item.id !== id);
      const updatedTotals = calculateTotals(updatedData, state.moneyValues);

      return {
        data: updatedData,
        moneyValues: {
          ...state.moneyValues,
          ...updatedTotals,
        },
      };
    }),
}));

export default useStoreValue;