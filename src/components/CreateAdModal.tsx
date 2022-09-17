import { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import zod from 'zod'
import * as yup from 'yup'
import classNames from 'classnames'

import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Input } from './form/Input'

import { Check, GameController } from 'phosphor-react'
import { SelectetHeadless } from './form/SelectetHeadless'
import { WeekDaysInput } from './form/WeekDaysInput'
import { WeekDaysControlledInput } from './form/WeekDaysControlledInput'
import { WeekdaysInputControl } from './form/WeekdaysInputControl'
import { WeekDaysControllInput } from './form/WeekDaysControllInput'

interface GameData {
  id: string
  title: string
}

interface NewAdData {
  name: string
  yearsPlaying: number
  discord: string
  hourStart: string
  hourEnd: string
  weekdays: string[]
}

const newAdValidationSchema = yup.object({
  name: yup.string().required(),
  yearsPlaying: yup.number().required(),
  discord: yup.string().required(),
  hourStart: yup.string().required(),
  hourEnd: yup.string().required(),
  weekdays: yup.string().required(),
})

// type NewAdData = zod.infer<typeof newAdValidationSchema>

export function CreateAdModal() {
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)
  const [games, setGames] = useState<GameData[]>([])
  const [selectedgame, setSelectedGame] = useState<GameData>({} as GameData)

  const newAdForm = useForm<NewAdData>({
    resolver: yupResolver(newAdValidationSchema),
    defaultValues: {
      discord: '',
      hourEnd: '',
      hourStart: '',
      name: '',
      yearsPlaying: undefined,
    },
  })

  const { handleSubmit, reset, control, watch } = newAdForm

  function handleSelectedGame(value: GameData) {
    setSelectedGame(value)
  }

  console.log(watch('weekdays'))
  async function handleCreateNewAd(data: NewAdData) {
    const hasSelectedGame = selectedgame.id
    const hasSelectWeekDays = weekDays.length > 0

    if (!hasSelectedGame) {
      return
    }

    if (!hasSelectWeekDays) {
      return
    }

    try {
      axios
        .post(`http://localhost:3333/games/${selectedgame!.id}/ads`, {
          name: data.name,
          yearsPlaying: data.yearsPlaying,
          discord: data.discord,
          weekDays: weekDays.map(Number),
          hourStart: data.hourStart,
          hourEnd: data.hourEnd,
          useVoiceChannel,
        })
        .then((response) => console.log(response.data))

      reset()
      setWeekDays([])
      setUseVoiceChannel(false)
      setSelectedGame({} as GameData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:3333/games')
      .then((response) => setGames(response.data))
  }, [])

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-[2rem] font-black">
          Publique um anúncio
        </Dialog.Title>

        <form
          onSubmit={handleSubmit(handleCreateNewAd)}
          className="mt-8 flex flex-col gap-4"
        >
          {/* <FormProvider {...newAdForm}> */}
          {/* <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">
                Qual o game?
              </label>
              <SelectetHeadless
                dataValue={games}
                selectedGame={selectedgame}
                setSelectedGame={handleSelectedGame}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input
                name="name"
                id="name"
                placeholder="Como te chamam dentro do game?"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                <Input
                  type="number"
                  id="yearsPlaying"
                  name="yearsPlaying"
                  setvalueasnumber={true}
                  placeholder="Tudo bem ser ZERO"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual seu Discord?</label>
                <Input name="discord" id="discord" placeholder="Usuario#0000" />
              </div>
            </div> */}

          <div className="flex flex-row gap-6">
            <div className="flex flex-col gap-2">
              {/* <label htmlFor="weekDays">Quando costuma jogar?</label> */}
              {/* <WeekDaysControlledInput control={control} name="weekDays" /> */}
              {/* <FormProvider {...newAdForm}> */}
              <WeekDaysControllInput control={control} name="weekdays" />
              {/* </FormProvider> */}

              {/* <WeekDaysInput name="weekDays" control={control} /> */}

              {/* <ToggleGroup.Root
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
                </ToggleGroup.Root> */}
            </div>

            {/* <div className="flex flex-col gaw-8 h-8 rounded bg-zinc-9002 flex-1">
                <label htmlFor="hourStart">Qual horário do dia?</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    id="hourStart"
                    placeholder="De"
                    type="time"
                    name="hourStart"
                  />
                  <Input
                    id="hourEnd"
                    placeholder="Até"
                    type="time"
                    name="hourEnd"
                  />
                </div>
              </div> */}
          </div>
          {/* </FormProvider> */}

          <label className="mt-2 flex gap-2 text-sm items-center">
            <Checkbox.Root
              checked={useVoiceChannel}
              className="w-6 h-6 rounded bg-zinc-900 p-1"
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true)
                } else {
                  setUseVoiceChannel(false)
                }
              }}
            >
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
