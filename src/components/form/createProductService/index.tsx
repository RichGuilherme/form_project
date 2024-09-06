import { useForm, SubmitHandler } from "react-hook-form";
import { TitleBox } from "../../titleBox";
import InputForm from "../InputForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../ui/button";
import { useCallback, useEffect } from "react";
import useProductService from "@/storage/productService";
import { Plus } from "lucide-react";
import { formatDate } from "../../formatDate";
import useStoreValue from "@/storage/storeValue";
import { v4 as uuidV4 } from "uuid";

const schema = z.object({
  quantity: z.string(),
  valueUnit: z.string(),
  weight: z.string(),
  volume: z.string(),
  value: z.string(),
  textDescription: z.string(),
  dateMin: z.date().optional(),
  dateMax: z.date().optional(),
});

type FormData = z.infer<typeof schema>;

const inputFormValue = [
  {
    index: uuidV4(),
    type: "uni",
    name: "quantity",
    textLabel: "Quantidade"
  },
  {
    index: uuidV4(),
    type: "money",
    name: "valueUnit",
    textLabel: "Valor unitário"
  },
  {
    index: uuidV4(),
    type: "kg",
    name: "weight",
    textLabel: "Peso"
  },
  {
    index: uuidV4(),
    type: "uni",
    name: "volume",
    textLabel: "Volume"
  },
  {
    index: uuidV4(),
    type: "money",
    name: "value",
    textLabel: "Valor"
  },
  {
    index: uuidV4(),
    type: "text",
    name: "textDescription",
    textLabel: "Descrição",
    style: "col-span-2"
  },
  {
    index: uuidV4(),
    type: "date",
    name: "dateMin",
    textLabel: "Prazo mínimo",
  },
  {
    index: uuidV4(),
    type: "date",
    name: "dateMax",
    textLabel: "Prazo máximo",
  }
];

export const CreateProductService = () => {
  const {
    status: { value },
    setValueTotal
  } = useProductService();

  const addData = useStoreValue(state => state.addData);

  const { control, handleSubmit, watch, setValue, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      quantity: "0",
      valueUnit: "0.00",
      volume: "0",
      weight: "0",
      value: value,
      textDescription: "",
      dateMin: undefined,
      dateMax: undefined,
    },
  });

  const watchValueUnit = watch("valueUnit");
  const watchQuantity = watch("quantity");

  const formatData = useCallback(() => {
    const quantityStr = watchQuantity.replace(" uni", "").trim();
    const valueUnitStr = watchValueUnit
      .replace("R$ ", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim();

    const uniFormat = parseFloat(quantityStr);
    const moneyFormat = parseFloat(valueUnitStr);

    return {
      uniFormat,
      moneyFormat
    };
  }, [watchQuantity, watchValueUnit]);

  useEffect(() => {
    const { uniFormat, moneyFormat } = formatData();

    if (!isNaN(uniFormat) && !isNaN(moneyFormat)) {
      if (moneyFormat === 0 || uniFormat === 0) {
        setValueTotal("0,00");

      } else if (moneyFormat > 0) {
        const totalValue = moneyFormat * uniFormat;
        setValueTotal(totalValue.toFixed(2));
      }
    }

  }, [formatData, setValueTotal, watchQuantity, watchValueUnit]);

  useEffect(() => {
    setValue("value", value);
  }, [setValue, value]);

  const onSubmit: SubmitHandler<FormData> = useCallback((dataProps) => {
    const formattedData = formatDate(dataProps);
    useProductService.getState().setStatus(formattedData);

    addData({
      ...formattedData,
      id: uuidV4(),
    });

    reset({
      quantity: "0",
      valueUnit: "0.00",
      weight: "0",
      volume: "0",
      value: value,
      textDescription: "",
      dateMin: undefined,
      dateMax: undefined,
    });
  }, [addData, reset, value]);


  return (
    <section>
      <TitleBox title="Descrição do Produto/Serviço" />

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-5 grid-rows-2 w-[65%] gap-6 items-center">
        {inputFormValue.map(value => {
          return (
            <InputForm
              key={value.index}
              type={value.type}
              textLabel={value.textLabel}
              control={control}
              name={value.name}
              style={value.style} />
          );
        }

        )}
        <Button
          className="w-9 h-9 flex items-center justify-center p-0 ml-4 rounded-full hover:bg-orange-600 bg-orange-400"
          type="submit"
          size="icon"
          variant="outline">
          <Plus className="text-white group-hover:text-black" />
        </Button>
      </form>
    </section>
  );
};
