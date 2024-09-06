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

export interface TableActions {
    addData: (newData: Product) => void;
    removeData: (id: string) => void;
    setMoneyValue: (name: string, value: string) => void;
}

export type TableStore = TableState & TableActions;

export interface Status {
    quantity: string;
    valueUnit: string;
    volume: string;
    weight: string;
    value: string;
}


export interface ProductServiceActions {
    setValueTotal: (value: string) => void;
    setStatus: (status: Status) => void;
}

export interface ProductServiceState {
    status: Status;
}

export type ProductServiceStore = ProductServiceState & ProductServiceActions;
