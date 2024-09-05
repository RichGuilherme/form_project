import useCalculateTotals from "@/hook/calculateTotals";
import { create } from "zustand";

export interface Product {
  id: string;
  quantity: string;
  valueUnit: string;
  volume: string;
  weight: string;
  value: string;
  textDescription?: string;
  dateMin?: string;
  dateMax?: string;
}

export interface TableState {
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

      const updatedTotals = useCalculateTotals(state.data, updatedMoneyValues);

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
      const updatedTotals = useCalculateTotals(updatedData, state.moneyValues);

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
      const updatedTotals = useCalculateTotals(updatedData, state.moneyValues);

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