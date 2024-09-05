import { useForm } from "react-hook-form";
import InputForm from "../InputForm";
import { TitleBox } from "../../titleBox";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useStoreValue from "@/storage/storeValue";
import { useCallback, useEffect } from "react";
import { v4 as uuaiV4 } from "uuid";

const schema = z.object({
  descont: z.string(),
  totalProductService: z.string(),
  frete: z.string(),
  totalNota: z.string(),
  kg: z.string(),
  unit: z.string(),
});

type FormData = z.infer<typeof schema>;

const inputFormValue = [
  {
    index: uuaiV4(),
    type: "money",
    name: "frete",
    textLabel: "Valor do frete",
  },
  {
    index: uuaiV4(),
    type: "money",
    name: "descont",
    textLabel: "Desconto",
  },
  {
    index: uuaiV4(),
    type: "money",
    name: "totalProductService",
    textLabel: "Total dos Produtos/Serviços",
  },
  {
    index: uuaiV4(),
    type: "money",
    name: "totalNota",
    textLabel: "Total da Nota",
  },
  {
    index: uuaiV4(),
    type: "kg",
    name: "kg",
    textLabel: "Peso total",
  },
  {
    index: uuaiV4(),
    type: "uni",
    name: "unit",
    textLabel: "Volume total",
  },
  {
    index: uuaiV4(),
    type: "text",
    name: "reference",
    textLabel: "Pedido de referência",
    style: "col-span-2 w-[70%] relative",
  },
  {
    index: uuaiV4(),
    type: "text",
    name: "obs",
    textLabel: "Obs",
    style: "col-span-2 w-[85%] relative right-[128px]",
  },
];

export const MoreInfor = () => {
  const { moneyValues, setMoneyValue } = useStoreValue(state => ({
    moneyValues: state.moneyValues,
    setMoneyValue: state.setMoneyValue,
  }));

  const { control, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: moneyValues,
  });

  const watchFrete = watch("frete");
  const watchDescont = watch("descont");

  const updateMoneyValue = useCallback((field: keyof FormData, value: string) => {
    if (value !== "0,00" && value !== "") {
      setMoneyValue(field, value);
    }
  }, [setMoneyValue]);

  useEffect(() => {
    updateMoneyValue("frete", watchFrete);
    updateMoneyValue("descont", watchDescont);
  }, [watchFrete, watchDescont, updateMoneyValue]);

  useEffect(() => {
    Object.keys(moneyValues).forEach((key) => {
      setValue(key as keyof FormData, moneyValues[key as keyof typeof moneyValues]);
    });
  }, [moneyValues, setValue]);



  return (
    <section>
      <TitleBox title="Mais informações" />

      <form className="grid grid-cols-6 grid-rows-2 w-4/5 gap-6 ">
        {inputFormValue.map((value) => (
          <InputForm
            key={value.index}
            type={value.type}
            textLabel={value.textLabel}
            control={control}
            name={value.name}
            style={value.style}
          />
        ))}
      </form>
    </section>
  );
};

