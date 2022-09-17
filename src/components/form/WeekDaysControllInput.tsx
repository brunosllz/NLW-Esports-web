import { useController, Control, FieldValues, Path } from 'react-hook-form'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

interface Day {
  label: string
  title: string
}

const days: Day[] = [
  { label: 'D', title: 'Domingo' },
  { label: 'S', title: 'Segunda' },
  { label: 'T', title: 'Terça' },
  { label: 'Q', title: 'Quarta' },
  { label: 'Q', title: 'Quinta' },
  { label: 'S', title: 'Sexta' },
  { label: 'S', title: 'Sábado' },
]

interface WeekDaysControllInputProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  control: Control<T>
}

export function WeekDaysControllInput<T extends FieldValues = FieldValues>({
  control,
  name,
}: WeekDaysControllInputProps<T>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control })

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="weekDays" className="font-semibold">
        Quando costuma jogar?
      </label>

      <ToggleGroup.Root
        type="multiple"
        className="grid grid-cols-4 gap-2"
        value={value}
        onValueChange={(newValue) => onChange(newValue)}
      >
        {days.map((day, index) => (
          <ToggleGroup.Item
            key={day.title}
            value={index.toString()}
            type="button"
            className="[&[data-state='on']]:bg-violet-500 aspect-square w-10 rounded bg-zinc-900 font-bold outline-none transition-colors hover:bg-zinc-800 focus:ring-1 focus:ring-violet-500"
            title={day.title}
            tabIndex={0}
          >
            {day.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
      {!!error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  )
}
