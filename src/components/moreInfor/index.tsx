import { SubmitHandler, useForm } from "react-hook-form";
import { InputForm } from "../InputForm";
import { TitleForm } from "../titleForm"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"

const schema = z.object({
  descont: z.string(),
  totalProductService: z.string(),
  frete: z.string(),
  totalNota: z.string(),
  kg: z.string(),
  unit: z.string()
});

type FormData = z.infer<typeof schema>;

export const MoreInfor = () => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      descont: "0",
      totalProductService: "0",
      totalNota: "0",
      frete: "0",
      kg: "0",
      unit: "0"
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data); // Aqui você pode enviar os dados para onde quiser
  };


  const inputFormValue = [
    {
      index: 1,
      type: "money",
      name: "frete",
      textLabel: "Valor do frete"
    },
    {
      index: 2,
      type: "money",
      name: "decont",
      textLabel: "Desconto"
    }, 
    {
      index: 3,
      type: "money",
      name: "totalProductService",
      textLabel: "Total dos Produtos/Serviços"
    }, 
    {
      index: 4,
      type: "money",
      name: "totalNota",
      textLabel: "Total da Nota"
    },
    {
      index: 5,
      type: "kg",
      name: "kg",
      textLabel: "Peso total"
    },
    {
      index: 6,
      type: "uni",
      name: "unit",
      textLabel: "Volume total"
    }

  ]

  return (
    <section>
      <TitleForm title="Mais informações" />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-6">
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
