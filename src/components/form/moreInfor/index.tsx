import { useForm } from "react-hook-form";
import { InputForm } from "../InputForm";
import { TitleForm } from "../../titleForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useStoreValue from "@/storage/storeValue";
import { useEffect, useMemo } from "react";

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

  useEffect(() => {
    if (watchFrete !== "0,00") {
      setMoneyValue("frete", watchFrete);
    }
    if (watchDescont !== "0,00") {
      setMoneyValue("descont", watchDescont);
    }
  }, [setMoneyValue, moneyValues.frete, moneyValues.descont, watchFrete, watchDescont]);


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
  ], []);

  return (
    <section>
      <TitleForm title="Mais informações" />

      <form className="flex flex-row gap-6">
        {inputFormValue.map((value) => (
          <InputForm
            key={value.index}
            type={value.type}
            textLabel={value.textLabel}
            control={control}
            name={value.name}
          />
        ))}
      </form>
    </section>
  );
};

