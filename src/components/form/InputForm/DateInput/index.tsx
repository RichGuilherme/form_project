import { Calendar } from "@/components/ui/calendar";
import { Controller } from "react-hook-form";
import { InputsProps } from "../type/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";


export const DateInput = ({ name, control, textLabel }: InputsProps) => {
  return (
    <div className="mt-3">
      <div className="flex flex-row gap-2 items-center border-b-[1px] border-gray-500 hover:border-orange-400 hover:border-b-[3px] text-xl text-gray-800 font-thin w-full ">
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
                      "w-[240px] pl-3 text-left font-normal border-none h-[28px]",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>{textLabel}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
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