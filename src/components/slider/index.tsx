import { SwiperSlide, Swiper, SwiperProps } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css'
import './slider.css'

type GameData = {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

interface SliderProps {
  data: GameData[]
}

export function Slider({ data }: SliderProps) {
  const swipersSettings: SwiperProps = {
    spaceBetween: 24,
    slidesPerView: 1,
    navigation: true,
    draggable: true,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      900: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      1146: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
      1330: {
        slidesPerView: 5,
        spaceBetween: 24,
      },
    },
  }

  return (
    <Swiper
      modules={[Navigation]}
      className="flex flex-1 w-[360px] -z-0 mt-16 md:min-w-[560px] slide-900:min-w-[760px]  slide-1146:min-w-[1060px] slide-1344:min-w-[1260px] "
      {...swipersSettings}
    >
      {data.map((game) => {
        return (
          <SwiperSlide
            key={game.id}
            className="relative rounded-lg overflow-hidden"
          >
            <img src={game.bannerUrl} alt="" className="object-cover w-full" />

            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
              <strong className="font-bold block">{game.title}</strong>
              <span className="text-zinc-300 text-sm block">
                {game._count.ads} anúncio(s)
              </span>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
