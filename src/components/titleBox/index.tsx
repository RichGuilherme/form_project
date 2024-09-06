import { memo } from "react";
import { TitleFormProp } from "../type/titleForm";

export const TitleBox = memo(({ title }: TitleFormProp) => {
  return (
    <div className="text-slate-700 text-2xl">{title}</div>
  );
});
