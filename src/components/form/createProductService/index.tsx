import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { TitleBox } from "../../titleBox";
import InputForm from "../InputForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import useStoreValue from "@/storage/storeValue";
import { v4 as uuidV4 } from "uuid";
import { useCallback, useMemo } from "react";
import useProductService from "@/storage/productService";
import ValueTotalControlle from "../InputForm/ValueTotalControlle";
import formatDataCreate from "@/utils/formatDate";
;


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
  useProductService(state => state.setValueTotal);

  const addData = useStoreValue(state => state.addData);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      quantity: "0",
      valueUnit: "0.00",
      volume: "0",
      weight: "0",
      value: "0",
      textDescription: "",
      dateMin: undefined,
      dateMax: undefined,
    },
  });


  const onSubmit: SubmitHandler<FormData> = useCallback((dataProps) => {
    const formattedData = formatDataCreate(dataProps);
    useProductService.getState().setStatus(formattedData);

    addData({
      ...formattedData,
      id: uuidV4(),
    });

    methods.reset({
      quantity: "0",
      valueUnit: "0.00",
      weight: "0",
      volume: "0",
      value: "0.00",
      textDescription: "",
      dateMin: undefined,
      dateMax: undefined,
    });
  }, [addData, methods]);


  const inputFormComponents = useMemo(() =>
    inputFormValue.map((value) => (
      <InputForm
        key={value.index}
        type={value.type}
        textLabel={value.textLabel}
        name={value.name}
        style={value.style}
      />
    )), []);

  return (
    <section className="sectionForm">
      <TitleBox title="Descrição do Produto/Serviço" />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="grid grid-cols-5 grid-rows-2 w-[65%] gap-6 items-center h-full">

          {inputFormComponents}
          <ValueTotalControlle />

          <Button
            className="w-9 h-9 flex items-center justify-center p-0 ml-4 rounded-full hover:bg-orange-600 bg-orange-400"
            type="submit"
            size="icon"
            variant="outline">
            <Plus className="text-white group-hover:text-black" />
          </Button>
        </form>
      </FormProvider >
    </section>
  );
};
