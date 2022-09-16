import * as Select from '@radix-ui/react-select'
import { CaretDown, CaretUp, Check } from 'phosphor-react'

type DataValue = {
  id: string
  title: string
}

interface SelectInputProps {
  dataValue: DataValue[]
  selectedGame: string | undefined
  setSelectedGame: (game: string) => void
}

export function SelectInput({
  dataValue,
  setSelectedGame,
  selectedGame,
}: SelectInputProps) {
  return (
    <Select.Root
      value={selectedGame}
      onValueChange={(value) => setSelectedGame(value)}
    >
      <Select.Trigger
        aria-label="game"
        className="inline-flex justify-between bg-zinc-900 py-3 px-4 rounded text-sm"
      >
        <Select.Value placeholder="Selecione o game que deseja jogar" />
        <Select.Icon>
          <CaretDown className="w-6 h-6 text-zinc-400" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={`fixed top-[45.6%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 py-5 rounded-lg w-[400px] shadow-lg shadow-black/25 `}
        >
          <Select.ScrollUpButton>
            <CaretUp className="w-6 h-6 fill-zinc-400" />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-2">
            {dataValue.map((item) => {
              return (
                <Select.Item
                  key={item.id}
                  value={item.id}
                  className="flex items-center py-2 px-8 relative select-none hover:bg-zinc-500 rounded-sm"
                >
                  <Select.ItemIndicator className="absolute left-2 ">
                    <Check
                      className="w-4 h-4 text-emerald-500 "
                      weight="bold"
                    />
                  </Select.ItemIndicator>
                  <Select.ItemText>{item.title}</Select.ItemText>
                </Select.Item>
              )
            })}
          </Select.Viewport>
          <Select.ScrollDownButton>
            <CaretDown className="w-6 h-6 fill-zinc-400" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
