/* eslint-disable @typescript-eslint/no-explicit-any */
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