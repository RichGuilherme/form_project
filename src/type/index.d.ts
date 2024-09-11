/* eslint-disable @typescript-eslint/no-explicit-any */
// store
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


// formatDate
export interface FormDataCreateProps {
  quantity: string,
  valueUnit: string,
  weight: string,
  volume: string,
  value: string,
  textDescription: string
  dateMin?: Date | string
  dateMax?: Date | string
}


// inputForm

import { Noop } from "react-hook-form";

export interface InputsProps {
  name: string;
  textLabel: string;
  style?: string
}

export interface FieldParams {
  onChange: any;
  onBlur?: Noop;
  value: any;
  disabled?: boolean | undefined;
  name?: string;
  style?: string;
}

export type typeInput = "money" | "uni" | "kg" | "text"

export interface InputFormProps {
  type: typeInput | string
  textLabel: string
  name: string
  style?: string
}

// TitleForm
export type TitleFormProp = {
  title: string
}

// table
import { ColumnDef } from "@tanstack/react-table";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}


export type Payment = {
  id: string
  actions?: boolean
  quantity: string
  valueUnit: string
  value: string
  weight: string
  volume: string
  dateMin: string
  dateMax: string
  description: string
}

// form

export interface FormData {
  quantity: string;
  valueUnit: string;
  weight: string;
  volume: string;
  value: string;
  textDescription: string;
  dateMin?: Date;
  dateMax?: Date;
}