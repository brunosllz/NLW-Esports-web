import LogoImg from '../assets/logo-nlw-esports.svg'
import { MagnifyingGlassPlus } from 'phosphor-react'
import { GameBanner } from '../components/GameBanner'
import { CreateAdBanner } from '../components/CreateAdBanner'

export function Home() {
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={LogoImg} alt="" />

      <h1 className="text-6xl font-black mt-20">
        Seu{' '}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{' '}
        está aqui
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        <GameBanner />
      </div>

      <CreateAdBanner />
    </div>
  )
}
