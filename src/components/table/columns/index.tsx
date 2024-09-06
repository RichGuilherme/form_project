import useStoreValue from "@/storage/storeValue";
import { ColumnDef } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Payment } from "../type/table";


export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const removeData = useStoreValue(state => state.removeData);
      const handleRemove = () => {
        removeData(row.original.id);
      };

      return (
        <button onClick={handleRemove} className="text-red-900 hover:text-red-500">
          <X />
        </button>
      );
    }
  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
  },
  {
    accessorKey: "valueUnit",
    header: "Valor unitário",
  },
  {
    accessorKey: "value",
    header: "Valor",
  },
  {
    accessorKey: "weight",
    header: "Peso",
  },
  {
    accessorKey: "volume",
    header: "Volume",
  },
  {
    accessorKey: "dateMin",
    header: "Prazo mínimo",
  },
  {
    accessorKey: "dateMax",
    header: "Prazo máximo",
  },
  {
    accessorKey: "textDescription",
    header: "Descrição",
  }
];

