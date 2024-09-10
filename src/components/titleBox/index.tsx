import { TitleFormProp } from "@/type";
import { memo } from "react";

export const TitleBox = memo(({ title }: TitleFormProp) => {
  return (
    <div className="text-slate-700 text-2xl">{title}</div>
  );
});
