import { useForm } from "react-hook-form";
import InputForm from "../InputForm";
import { TitleForm } from "../../titleBox";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useStoreValue from "@/storage/storeValue";
import { useEffect, useMemo, useRef } from "react";

const schema = z.object({
  descont: z.string(),
  totalProductService: z.string(),
  frete: z.string(),
  totalNota: z.string(),
  kg: z.string(),
  unit: z.string(),
});

type FormData = z.infer<typeof schema>;

export const MoreInfor = () => {
  const { moneyValues, setMoneyValue } = useStoreValue();

  const { control, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: moneyValues,
  });

  const watchFrete = watch("frete");
  const watchDescont = watch("descont");

  const prevFreteRef = useRef<string | null>(null);
  const prevDescontRef = useRef<string | null>(null);

  useEffect(() => {
    if (watchFrete !== prevFreteRef.current && watchFrete !== "0,00" && watchFrete !== "") {
      prevFreteRef.current = watchFrete;
      setMoneyValue("frete", watchFrete);
    }

    if (watchDescont !== prevDescontRef.current && watchDescont !== "0,00" && watchDescont !== "") {
      prevDescontRef.current = watchDescont;
      setMoneyValue("descont", watchDescont);
    }
  }, [watchFrete, watchDescont, setMoneyValue]);

  useEffect(() => {
    Object.keys(moneyValues).forEach((key) => {
      setValue(key as keyof FormData, moneyValues[key as keyof typeof moneyValues]);
    });
  }, [moneyValues, setValue]);


  const inputFormValue = useMemo(() => [
    {
      index: 1,
      type: "money",
      name: "frete",
      textLabel: "Valor do frete",
    },
    {
      index: 2,
      type: "money",
      name: "descont",
      textLabel: "Desconto",
    },
    {
      index: 3,
      type: "money",
      name: "totalProductService",
      textLabel: "Total dos Produtos/Serviços",
    },
    {
      index: 4,
      type: "money",
      name: "totalNota",
      textLabel: "Total da Nota",
    },
    {
      index: 5,
      type: "kg",
      name: "kg",
      textLabel: "Peso total",
    },
    {
      index: 6,
      type: "uni",
      name: "unit",
      textLabel: "Volume total",
    },
    {
      index: 7,
      type: "text",
      name: "reference",
      textLabel: "Pedido de referência",
      style: "col-span-2 w-[70%] relative",
    },
    {
      index: 8,
      type: "text",
      name: "obs",
      textLabel: "Obs",
      style: "col-span-2 w-[85%] relative right-[128px]",
    },
  ], []);

  return (
    <section>
      <TitleForm title="Mais informações" />

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

