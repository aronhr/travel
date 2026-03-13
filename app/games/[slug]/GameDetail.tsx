'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft, Construction } from 'lucide-react'

export default function GameDetail({ name }: { name: string }) {
  const router = useRouter()

  return (
    <div className="min-h-dvh bg-dark text-white flex flex-col">
      {/* Back */}
      <div className="px-5 pt-14 pb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-white/60 hover:text-white transition-colors mb-6"
        >
          <ChevronLeft size={18} />
          <span className="text-sm font-semibold">Games</span>
        </button>
        <h1 className="text-4xl font-extrabold">{name}</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4 px-5 pb-28">
        <div className="glass rounded-[1.5rem] p-8 text-center flex flex-col items-center gap-4 w-full max-w-sm">
          <div className="w-16 h-16 rounded-[1rem] bg-primary/10 flex items-center justify-center">
            <Construction size={32} className="text-primary" strokeWidth={1.5} />
          </div>
          <div>
            <p className="font-bold text-lg">{name}</p>
            <p className="text-white/50 text-sm mt-1">Coming soon — game logic being built</p>
          </div>
        </div>
      </div>
    </div>
  )
}
