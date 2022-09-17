import * as Dialog from '@radix-ui/react-dialog'

import { MagnifyingGlassPlus } from 'phosphor-react'

export function CreateAdBanner() {
  return (
    <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8 overflow-hidden mx-6">
      <div className="bg-[#2A2634] px-8 py-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <div>
          <strong className="text-xl md:text-2xl font-black block">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 text-sm md:text-base">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        <Dialog.Trigger className="py-3 px-4 mt-6 md:mt-0 bg-violet-500 rounded hover:bg-violet-600 transition-colors flex items-center gap-3">
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  )
}
