import { FormProvider, useForm } from "react-hook-form";
import InputForm from "../InputForm";
import { TitleBox } from "../../titleBox";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useStoreValue from "@/storage/storeValue";
import { useEffect, useMemo } from "react";
import { v4 as uuaiV4 } from "uuid";
import { useShallow } from "zustand/react/shallow";
import TotalNotaControlle from "../InputForm/TotalNotaControlle";

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
  const { moneyValues } = useStoreValue(useShallow(state => ({
    moneyValues: state.moneyValues,
  })));

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: useMemo(() => moneyValues, [moneyValues]),
  });


  useEffect(() => {
    Object.keys(moneyValues).forEach((key) => {
      methods.setValue(key as keyof FormData, moneyValues[key as keyof typeof moneyValues]);
    });
  }, [methods, moneyValues]);


  const inputFormComponents = useMemo(() =>
    inputFormValue.map((value) => (
      <InputForm
        key={value.index}
        type={value.type}
        textLabel={value.textLabel}
        name={value.name}
        style={value.style}
      />
    )), []
  );

  return (
    <section className="sectionForm">
      <TitleBox title="Mais informações" />

      <FormProvider {...methods}>
        <form className="grid grid-cols-6 grid-rows-2 w-4/5 gap-6 h-full">
          {inputFormComponents}
          <TotalNotaControlle />
        </form>
      </FormProvider>
    </section>
  );
};

