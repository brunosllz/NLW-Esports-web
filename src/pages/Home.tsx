import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdBanner } from '../components/CreateAdBanner'

import LogoImg from '../assets/logo-nlw-esports.svg'
import { CreateAdModal } from '../components/CreateAdModal'
import { Slider } from '../components/Slider'
import axios from 'axios'

interface GameData {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

export function Home() {
  const [games, setGames] = useState<GameData[]>([])

  useEffect(() => {
    axios
      .get('http://localhost:3333/games')
      .then((response) => setGames(response.data))
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20 text-center">
      <img
        src={LogoImg}
        alt=""
        className="w-[235px] md:w-[285px] h-[132px] md:h-[180px]"
      />

      <h1 className="text-[2.625rem] md:text-6xl font-black mt-16 mx-6">
        Seu{' '}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{' '}
        está aqui
      </h1>

      <Slider data={games} />

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}
