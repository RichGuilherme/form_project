
import { ProductServiceStore, Status } from "@/type";
import { create } from "zustand";


const useProductService = create<ProductServiceStore>((set) => ({
  status: {
    quantity: "0",
    valueUnit: "0.00",
    volume: "0",
    weight: "0",
    value: "0.00",
  },

  setValueTotal: (value: string) => set((state) => ({
    status: {
      ...state.status,
      value: value
    }
  })),

  setStatus: (status: Status) => set({ status }),
}));

export default useProductService;