import 'keen-slider/keen-slider.min.css'
import { SwiperSlide } from 'swiper/react'

interface GameBannerProps {
  banneUrl: string
  title: string
  adsCount: number
}

export function GameBanner({
  adsCount,
  banneUrl,
  title,
  ...rest
}: GameBannerProps) {
  return (
    <SwiperSlide className="relative rounded-lg overflow-hidden">
      <img src={banneUrl} alt="" />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold block">{title}</strong>
        <span className="text-zinc-300 text-sm block">
          {adsCount} anúncio(s)
        </span>
      </div>
    </SwiperSlide>
  )
}
