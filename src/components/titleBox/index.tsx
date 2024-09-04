import { memo } from "react";

type TitleFormProp = {
  title: string
}

export const TitleBox = memo(({ title }: TitleFormProp) => {

  return (
    <div className="text-slate-700 text-2xl">{title}</div>
  );
});
