import { useForm, SubmitHandler } from "react-hook-form";
import { TitleBox } from "../../titleBox";
import InputForm from "../InputForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../ui/button";
import { useEffect, useMemo } from "react";
import useProductService from "@/storage/productService";
import { Plus } from "lucide-react";
import { formatData } from "../../formatData";
import useStoreValue from "@/storage/storeValue";

const schema = z.object({
  quantity: z.string(),
  valueUnit: z.string(),
  weight: z.string(),
  volume: z.string(),
  value: z.string(),
  textDescription: z.string()
});

type FormData = z.infer<typeof schema>;

export const DescriptionProductService = () => {
  const {
    status: { value },
    setValueTotal
  } = useProductService();

  const { addData } = useStoreValue();

  const { control, handleSubmit, watch, setValue, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      quantity: "0",
      valueUnit: "0.00",
      volume: "0",
      weight: "0",
      value: value,
      textDescription: ""
    },
  });

  const watchValueUnit = watch("valueUnit");
  const watchQuantity = watch("quantity");

  useEffect(() => {
    const quantityStr = watchQuantity.replace(" uni", "").trim();
    const valueUnitStr = watchValueUnit
      .replace("R$ ", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim();

    const uniFormat = parseFloat(quantityStr);
    const moneyFormat = parseFloat(valueUnitStr);

    if (!isNaN(uniFormat) && !isNaN(moneyFormat)) {
      if (moneyFormat === 0 || uniFormat === 0) {
        setValueTotal("0,00");

      } else if (moneyFormat > 0) {
        const totalValue = moneyFormat * uniFormat;
        setValueTotal(totalValue.toFixed(2));
      }
    }

  }, [setValueTotal, watchQuantity, watchValueUnit]);


  useEffect(() => {
    setValue("value", value);
  }, [setValue, value]);


  const onSubmit: SubmitHandler<FormData> = (dataProps) => {
    const fomattedData = formatData(dataProps);
    useProductService.getState().setStatus(fomattedData);

    addData({
      ...fomattedData,
      id: Date.now().toString(),
    });

    reset();
  };


  const inputFormValue = useMemo(() => [
    {
      index: 1,
      type: "uni",
      name: "quantity",
      textLabel: "Quantidade"
    },
    {
      index: 2,
      type: "money",
      name: "valueUnit",
      textLabel: "Valor unitário"
    },
    {
      index: 3,
      type: "kg",
      name: "weight",
      textLabel: "Peso"
    },
    {
      index: 4,
      type: "uni",
      name: "volume",
      textLabel: "Volume"
    },
    {
      index: 5,
      type: "money",
      name: "value",
      textLabel: "Valor"
    },
    {
      index: 6,
      type: "text",
      name: "textDescription",
      textLabel: "Descrição",
      style: "col-span-2"
    }
  ], []);


  return (
    <section>
      <TitleBox title="Descrição do Produto/Serviço" />

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-5 grid-rows-2 w-[65%] gap-6 items-center">
        {inputFormValue.map(value => (
          <InputForm
            key={value.index}
            type={value.type}
            textLabel={value.textLabel}
            control={control}
            name={value.name}
            style={value.style} />
        )
        )}
        <Button
          className="w-9 h-9 flex items-center justify-center p-0 ml-4 rounded-full bg-orange-400"
          type="submit"
          size="icon"
          variant="outline">
          <Plus className="text-white" />
        </Button>
      </form>
    </section>
  );
};
