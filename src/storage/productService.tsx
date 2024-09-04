import { create } from "zustand";

interface Status {
  quantity: string;
  valueUnit: string;
  volume: string;
  weight: string;
  value: string;
}


interface ProductServiceActions {
  setValueTotal: (value: string) => void;
  setStatus: (status: Status) => void;
}

interface ProductServiceState {
  status: Status;
}

type ProductServiceStore = ProductServiceState & ProductServiceActions;

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