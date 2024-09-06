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