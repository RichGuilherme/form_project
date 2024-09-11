import { FormDataCreateProps } from "@/type";
import { format } from "date-fns/format";
import { ptBR } from "date-fns/locale";
import formatData from "./formatData";

const moneyFormatter = Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  currencyDisplay: "symbol",
  currencySign: "standard",
  style: "currency",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatDateString = (date: Date | string) => {
  if (typeof date === "string") {
    return "";
  }
  return format(date, "dd/MM/yyyy", { locale: ptBR });
};

const formatDataCreate = (data: FormDataCreateProps) => {
  const quantityClean = formatData(data.quantity, "uni");
  const valueUnitClean = parseFloat(formatData(data.valueUnit, "money"));
  const weightClean = formatData(data.weight, "weight");
  const volumeClean = formatData(data.volume, "uni");
  const valueClean = parseFloat(formatData(data.value, "money"));


  return {
    quantity: quantityClean.toString(),
    valueUnit: `${moneyFormatter.format(valueUnitClean)}`,
    weight: `${weightClean} kg`,
    volume: `${volumeClean} uni`,
    value: `${moneyFormatter.format(valueClean)}`,
    textDescription: data.textDescription,
    dateMin: formatDateString(data.dateMin || ""),
    dateMax: formatDateString(data.dateMax || "")
  };
};

export default formatDataCreate;