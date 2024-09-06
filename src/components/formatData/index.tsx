import { format } from "date-fns/format";
import { FormDataProps } from "../type/formatDate";

const moneyFormatter = Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  currencyDisplay: "symbol",
  currencySign: "standard",
  style: "currency",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatDate = (date: Date | string) => {
  if (typeof date === "string") {
    return "";
  }
  return format(date, "PPP");
};

export const formatData = (data: FormDataProps) => {
  const quantityClean = data.quantity.replace("uni", "").trim();
  const valueUnitClean = data.valueUnit.replace("R$", "");
  const weightClean = data.weight.replace("kg", "").trim();
  const volumeClean = data.volume.replace("uni", "").trim();
  const valueClean = data.value.replace("R$", "");


  return {
    quantity: quantityClean,
    valueUnit: `${moneyFormatter.format(parseFloat(valueUnitClean))}`,
    weight: `${weightClean} kg`,
    volume: `${volumeClean} uni`,
    value: `${moneyFormatter.format(parseFloat(valueClean))}`,
    textDescription: data.textDescription,
    dateMin: formatDate(data.dateMin || ""),
    dateMax: formatDate(data.dateMax || "")
  };
};