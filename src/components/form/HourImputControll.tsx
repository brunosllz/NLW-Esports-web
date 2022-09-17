import { HTMLAttributes, HTMLInputTypeAttribute } from 'react'
import { useController, FieldValues, Control, Path } from 'react-hook-form'
import classNames from 'classnames'

interface HourInputControllProps<T extends FieldValues = FieldValues>
  extends HTMLAttributes<HTMLInputElement> {
  name: Path<T>
  control: Control<T>
  type?: HTMLInputTypeAttribute
}

export function HourInputControll<T extends FieldValues = FieldValues>({
  control,
  name,
  type,
}: HourInputControllProps<T>) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control })

  return (
    <input
      id={name}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={classNames(
        `bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-violet-500 appearance-none inputNumber inputTimer`,
        {
          'ring-1 ring-red-500': !!error,
        },
      )}
    />
  )
}
