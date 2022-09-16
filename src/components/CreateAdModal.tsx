import { useEffect, useState } from 'react'
import classNames from 'classnames'

import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Input } from './form/Input'
import { SelectInput } from './form/SelectInput'

import { Check, GameController } from 'phosphor-react'

interface GameData {
  id: string
  title: string
}

export function CreateAdModal() {
  const [games, setGames] = useState<GameData[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then((response) => response.json())
      .then((data) => setGames(data))
  }, [])

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-[2rem] font-black">
          Publique um anúncio
        </Dialog.Title>

        <form className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <SelectInput dataValue={games} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input id="name" placeholder="Como te chamam dentro do game?" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input id="yearsPlaying" placeholder="Tudo bem ser ZERO" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input id="discord" placeholder="Usuario#0000" />
            </div>
          </div>

          <div className="flex flex-row gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  className={classNames('w-8 h-8 rounded ', {
                    'bg-violet-500': weekDays.includes('0'),
                    'bg-zinc-900': !weekDays.includes('0'),
                  })}
                  title="Domingo"
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  className={classNames('w-8 h-8 rounded ', {
                    'bg-violet-500': weekDays.includes('1'),
                    'bg-zinc-900': !weekDays.includes('1'),
                  })}
                  title="Segunda"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  className={classNames('w-8 h-8 rounded ', {
                    'bg-violet-500': weekDays.includes('2'),
                    'bg-zinc-900': !weekDays.includes('2'),
                  })}
                  title="Terça"
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  className={classNames('w-8 h-8 rounded ', {
                    'bg-violet-500': weekDays.includes('3'),
                    'bg-zinc-900': !weekDays.includes('3'),
                  })}
                  title="Quarta"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  className={classNames('w-8 h-8 rounded ', {
                    'bg-violet-500': weekDays.includes('4'),
                    'bg-zinc-900': !weekDays.includes('4'),
                  })}
                  title="Quinta"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  className={classNames('w-8 h-8 rounded ', {
                    'bg-violet-500': weekDays.includes('5'),
                    'bg-zinc-900': !weekDays.includes('5'),
                  })}
                  title="Sexta"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  className={classNames('w-8 h-8 rounded ', {
                    'bg-violet-500': weekDays.includes('6'),
                    'bg-zinc-900': !weekDays.includes('6'),
                  })}
                  title="Sábado"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className="flex flex-col gaw-8 h-8 rounded bg-zinc-9002 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input id="hourStart" placeholder="De" type="time" />
                <Input id="hourEnd" placeholder="Até" type="time" />
              </div>
            </div>
          </div>

          <label className="mt-2 flex gap-2 text-sm items-center">
            <Checkbox.Root className="w-6 h-6 rounded bg-zinc-900 p-1">
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-500" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar a o chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 hover:bg-zinc-600 transition-colors px-5 h-12 rounded-md font-semibold"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 hover:bg-violet-600 transition-colors px-5 h-12 rounded-md font-semibold flex items-center gap-3"
            >
              <GameController size={20} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}