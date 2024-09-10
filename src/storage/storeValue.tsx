import useCalculateTotals from "@/hook/calculateTotals";
import { TableStore } from "@/type";

import { create } from "zustand";

const useStoreValue = create<TableStore>((set) => ({
  data: [],
  moneyValues: {
    frete: "0.00",
    descont: "0.00",
    totalProductService: "0.00",
    totalNota: "0.00",
    kg: "0.00",
    unit: "0",
  },

  setMoneyValue: (name, value) =>
    set((state) => ({
      moneyValues: {
        ...state.moneyValues,
        [name]: value,
      },
    })),

  addData: (newData) =>
    set((state) => {
      const updatedData = [...state.data, newData];
      const updatedTotals = useCalculateTotals(updatedData);

      return {
        data: updatedData,
        moneyValues: {
          ...state.moneyValues,
          ...updatedTotals,
          frete: state.moneyValues.frete,
          descont: state.moneyValues.descont,
        },
      };
    }),

  removeData: (id) =>
    set((state) => {
      const updatedData = state.data.filter((item) => item.id !== id);
      const updatedTotals = useCalculateTotals(updatedData);

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