import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: string
  setValueAsNumber?: boolean
}

export function Input(props: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <input
      className={`bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 appearance-none inputNumber inputTimer ${
        errors[props.register] ? ' focus:ring-red-500 ' : ''
      }`}
      {...register(props.register, { valueAsNumber: props.setValueAsNumber })}
      {...props}
    />
  )
}
