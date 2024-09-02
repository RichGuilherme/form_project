
type TitleFormProp = {
    title: string
}

export const TitleForm = ({title}:TitleFormProp ) => {

  return (
    <div className="text-slate-700 text-2xl">{title}</div>
  )
}
