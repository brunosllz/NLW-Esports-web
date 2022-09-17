import { HTMLAttributes, HTMLInputTypeAttribute } from 'react'
import { useController, Control, FieldValues, Path } from 'react-hook-form'

interface InputControllProps<T extends FieldValues = FieldValues>
  extends HTMLAttributes<HTMLInputElement> {
  name: Path<T>
  control: Control<T>
  labelValue?: string
  type?: HTMLInputTypeAttribute
}

export function InputControll<T extends FieldValues = FieldValues>({
  control,
  name,
  type,
  labelValue,
  ...rest
}: InputControllProps<T>) {
  const {
    field: { value, onChange },
    // fieldState: { error },
  } = useController({ name, control })

  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold" htmlFor={name}>
        {labelValue}
      </label>
      <input
        type={type}
        id="name"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-violet-500 appearance-none inputNumber inputTimer`}
        {...rest}
      />
    </div>
  )
}
