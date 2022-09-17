import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import * as yup from 'yup'

import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import { InputControll } from './form/InputControll'
import { WeekDaysControllInput } from './form/WeekDaysControllInput'

import { Check, GameController } from 'phosphor-react'
import { SelectetHeadless } from './form/SelectetHeadless'
import { InputHourControll } from './form/ImputHourControll'

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
  weekDays: string[]
}

const newAdValidationSchema = yup.object({
  name: yup.string().required('Informe o seu nome ou nickname'),
  yearsPlaying: yup
    .number()
    .required('Informe quantos a quantos anos você joga'),
  discord: yup.string().required('Informe o seu discord'),
  hourStart: yup
    .string()
    .required()
    .matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/),
  hourEnd: yup.string().required(),
  weekDays: yup.array().min(1, 'Você deve selecionar um dia da semana'),
})

export function CreateAdModal() {
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)
  const [games, setGames] = useState<GameData[]>([])
  const [selectedgame, setSelectedGame] = useState<GameData>({} as GameData)

  const { handleSubmit, reset, control, watch } = useForm<NewAdData>({
    resolver: yupResolver(newAdValidationSchema),
    defaultValues: {
      discord: '',
      hourEnd: '',
      hourStart: '',
      name: '',
      yearsPlaying: undefined,
    },
  })

  console.log(watch('weekDays'))

  function handleSelectedGame(value: GameData) {
    setSelectedGame(value)
  }

  async function handleCreateNewAd(data: NewAdData) {
    const hasSelectedGame = selectedgame.id

    if (!hasSelectedGame) {
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
          <SelectetHeadless
            dataValue={games}
            selectedGame={selectedgame}
            setSelectedGame={handleSelectedGame}
          />

          <InputControll
            control={control}
            name="name"
            placeholder="Como te chamam dentro do game?"
            labelValue="Seu nome (ou nickname)"
          />

          <div className="grid grid-cols-2 gap-6">
            <InputControll
              control={control}
              type="number"
              name="yearsPlaying"
              placeholder="Tudo bem ser ZERO"
              labelValue="Joga há quantos anos?"
            />

            <InputControll
              control={control}
              name="discord"
              placeholder="Usuario#0000"
              labelValue="Qual seu Discord?"
            />
          </div>

          <div className="flex flex-row justify-between ">
            <WeekDaysControllInput control={control} name="weekDays" />

            <div className="flex flex-col gap-2  h-8  bg-zinc-9002  ">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <InputHourControll
                  type="time"
                  control={control}
                  name="hourStart"
                />
                <InputHourControll
                  type="time"
                  control={control}
                  name="hourEnd"
                />
              </div>
            </div>
          </div>

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
