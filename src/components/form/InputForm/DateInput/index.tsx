import { Calendar } from "@/components/ui/calendar";
import { Controller, useFormContext } from "react-hook-form";
import { InputsProps } from "@/type";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";


export const DateInput = ({ name, textLabel }: InputsProps) => {
  const { control } = useFormContext();

  return (
    <div className="mt-3 group">
      <div className="inputForm">
        <Controller
          name={name}
          control={control}
          render={({ field: { ...field } }) => (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[260px] text-left font-normal border-none h-[28px] text-lg p-1 justify-start gap-8",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "dd/MM/yyyy", { locale: ptBR })
                    ) : (
                      <span className="text-xl">{textLabel}</span>
                    )}
                    <CalendarIcon className={`h-4 w-4 opacity-50 ${field.value ? "hidden" : "block"}`} />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value || ""}
                    onSelect={field.onChange || ""}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </>
          )}
        />
      </div>
    </div>
  );
};