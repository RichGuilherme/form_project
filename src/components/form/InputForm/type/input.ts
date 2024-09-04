/* eslint-disable @typescript-eslint/no-explicit-any */
import { Noop } from "react-hook-form";

export interface InputsProps {
    name: string;
    textLabel: string;
    control: any;
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
    control: any
    name: string
    style?: string
}