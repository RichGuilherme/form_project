import { format } from "date-fns/format";

interface FormDataProps {
  quantity: string,
  valueUnit: string,
  weight: string,
  volume: string,
  value: string,
  textDescription: string
  dateMin: Date
  dateMax: Date
}

const moneyFormatter = Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  currencyDisplay: "symbol",
  currencySign: "standard",
  style: "currency",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatData = (data: FormDataProps) => {
  const quantityClean = data.quantity.replace(" uni", "").trim();
  const valueUnitClean = data.valueUnit.replace("R$ ", "");
  const weightClean = data.weight.replace(" kg", "").trim();
  const volumeClean = data.volume.replace(" uni", "").trim();
  const valueClean = data.value.replace("R$ ", "");

  const formatDate = (date: Date) => {
    return format(date, "PPP");
  };


  return {
    quantity: quantityClean,
    valueUnit: `${moneyFormatter.format(parseFloat(valueUnitClean))}`,
    weight: `${weightClean} kg`,
    volume: `${volumeClean} uni`,
    value: `${moneyFormatter.format(parseFloat(valueClean))}`,
    textDescription: data.textDescription,
    dateMin: formatDate(data.dateMin),
    dateMax: formatDate(data.dateMax)
  };
};