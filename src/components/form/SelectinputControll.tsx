import { Fragment } from 'react'
import { useController, Path, Control, FieldValues } from 'react-hook-form'
import { Listbox, Transition } from '@headlessui/react'

import { CaretDown, Check } from 'phosphor-react'
import classNames from 'classnames'

type DataValue = {
  id: string
  title: string
}

interface SelectInputControllProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  control: Control<T>
  dataValue: DataValue[]
}

export function SelectinputControll<T extends FieldValues = FieldValues>({
  control,
  name,
  dataValue,
}: SelectInputControllProps<T>) {
  const {
    field: { value, onChange, ref },
    fieldState: { error },
  } = useController({ name, control })
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative mt-1">
        <Listbox.Button
          ref={ref}
          className={classNames(
            'relative w-full cursor-default rinline-flex justify-between bg-zinc-900 py-3 px-4 rounded text-sm',
            {
              'ring-1 ring-red-500': error,
            },
          )}
        >
          {value ? (
            <span className="block truncate">{value.title}</span>
          ) : (
            <span className="block truncate text-zinc-500 text-left">
              Selecione o game que deseja jogar
            </span>
          )}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <CaretDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-zinc-900 py-1 px-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {dataValue.map((game) => (
              <Listbox.Option
                key={game.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4  transition-colors ${
                    active
                      ? 'bg-zinc-500 text-zinc-100 rounded-md'
                      : 'text-white hover:bg-zinc-500 '
                  }`
                }
                value={game}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {game.title}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-emerald-500">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
