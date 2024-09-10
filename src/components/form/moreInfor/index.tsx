import { FormProvider, useForm, useFormContext, useWatch } from "react-hook-form";
import InputForm from "../InputForm";
import { TitleBox } from "../../titleBox";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useStoreValue from "@/storage/storeValue";
import { useCallback, useEffect, useMemo } from "react";
import { v4 as uuaiV4 } from "uuid";
import { useShallow } from "zustand/react/shallow";

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

const MoneyValuesUpdater = () => {
  const { setValue, getValues } = useFormContext();
  const watchFrete = useWatch({ name: "frete" });
  const watchDescont = useWatch({ name: "descont" });

  const updateMoneyValue = useCallback(() => {
    const totalProductService = getValues("totalProductService");
    const descontValueStr = watchDescont
      .replace("R$ ", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim();

    const freteValueStr = watchFrete
      .replace("R$ ", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim();

    const freteFormat = parseFloat(freteValueStr);
    const descontFormat = parseFloat(descontValueStr);

    if (!isNaN(freteFormat) && !isNaN(descontFormat)) {
      const totalNota = freteFormat + totalProductService - descontFormat;
      setValue("totalNota", totalNota);
    } else {
      setValue("totalNota", "0,00");
    }

  }, [getValues, setValue, watchDescont, watchFrete]);

  useEffect(() => {
    if (watchFrete !== "0,00" || watchDescont !== "0,00") {
      updateMoneyValue();
    }
  }, [watchFrete, watchDescont, updateMoneyValue]);

  return null;
};

export const MoreInfor = () => {
  const { moneyValues } = useStoreValue(useShallow(state => ({
    moneyValues: state.moneyValues,
  })));

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: useMemo(() => moneyValues, [moneyValues]),
  });

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

  useEffect(() => {
    Object.keys(moneyValues).forEach((key) => {
      methods.setValue(key as keyof FormData, moneyValues[key as keyof typeof moneyValues]);
    });
  }, [methods, moneyValues]);


  return (
    <section>
      <TitleBox title="Mais informações" />

      <FormProvider {...methods}>
        <form className="grid grid-cols-6 grid-rows-2 w-4/5 gap-6 ">
          <MoneyValuesUpdater />
          {inputFormComponents}
        </form>
      </FormProvider>
    </section>
  );
};

