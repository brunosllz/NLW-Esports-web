import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  setvalueasnumber?: boolean
}

export function Input(props: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <input
      className={`bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 appearance-none inputNumber inputTimer ${
        errors[props.name] ? ' focus:ring-red-500 ' : ''
      }`}
      {...register(props.name, { valueAsNumber: props.setvalueasnumber })}
      {...props}
    />
  )
}
