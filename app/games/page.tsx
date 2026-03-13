'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  Clock, Crown, RotateCw, HelpCircle, Shuffle,
  ThumbsDown, Timer, Tag, Dices, Bomb, Moon, Users
} from 'lucide-react'
import { fetchMembers } from '@/lib/supabase'

type Difficulty = 'Easy' | 'Medium' | 'Hard'
type Game = {
  name: string
  slug: string
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>
  description: string
  difficulty: Difficulty
  players: string
}

const FEATURED: Game = {
  name: 'Kings Cup', slug: 'kingscup', icon: Crown,
  description: 'Draw cards, face the rules', difficulty: 'Medium', players: '3–8 players'
}

const games: Game[] = [
  { name: 'Power Hour',        slug: 'powerhour',        icon: Clock,      description: '60 tasks in 60 minutes',  difficulty: 'Hard',   players: '2+' },
  { name: 'Spin the Bottle',   slug: 'spinthebottle',    icon: RotateCw,   description: 'Spin and dare',           difficulty: 'Easy',   players: '3+' },
  { name: 'Quiz Game',         slug: 'quizgame',         icon: HelpCircle, description: 'Test your knowledge',     difficulty: 'Easy',   players: '2+' },
  { name: 'Drink Roulette',    slug: 'dringroulette',    icon: Shuffle,    description: 'Spin the wheel of fate',  difficulty: 'Easy',   players: '2–8' },
  { name: 'Never Have I Ever', slug: 'neverhaveiever',   icon: ThumbsDown, description: 'Reveal your secrets',     difficulty: 'Easy',   players: '3+' },
  { name: 'Flip Cup',          slug: 'flipcup',          icon: Timer,      description: 'Race to the bottom',      difficulty: 'Medium', players: '2+ teams' },
  { name: 'Category Game',     slug: 'categorygame',     icon: Tag,        description: 'Name it or drink it',     difficulty: 'Medium', players: '3+' },
  { name: 'Dice Drinking',     slug: 'dicedrinkinggame', icon: Dices,      description: 'Roll your fate',          difficulty: 'Medium', players: '2–6' },
  { name: 'Pass the Bomb',     slug: 'passthebomb',      icon: Bomb,       description: "Don't let it explode",    difficulty: 'Hard',   players: '3–8' },
  { name: 'Blackout',          slug: 'blackout',         icon: Moon,       description: 'Cards to chaos',          difficulty: 'Hard',   players: '2+' },
]

const diffClass: Record<Difficulty, string> = {
  Easy:   'text-emerald-400 bg-emerald-400/10',
  Medium: 'text-primary bg-primary/10',
  Hard:   'text-red-400 bg-red-400/10',
}

export default function GamesPage() {
  const FeaturedIcon = FEATURED.icon
  const [playerCount, setPlayerCount] = useState(5)
  useEffect(() => {
    fetchMembers().then(rows => { if (rows.length > 0) setPlayerCount(rows.length) })
  }, [])

  return (
    <div className="min-h-dvh bg-dark text-white">
      {/* Header */}
      <div className="px-5 pt-14 pb-5 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold">Game Night</h1>
          <p className="text-white/50 mt-1 text-sm">Pick a game to get the party started</p>
        </div>
        <div className="glass rounded-full px-3 py-1.5 flex items-center gap-1.5">
          <Users size={12} className="text-primary" />
          <span className="text-primary text-xs font-bold">{playerCount} players</span>
        </div>
      </div>

      <div className="px-5 pb-28 flex flex-col gap-6">
        {/* Featured card */}
        <Link
          href={`/games/${FEATURED.slug}`}
          className="relative rounded-[1.5rem] overflow-hidden cursor-pointer group"
          style={{ background: 'linear-gradient(135deg, #1a0040 0%, #0f1a3a 60%, #161D2C 100%)' }}
        >
          {/* Most popular badge */}
          <div className="absolute top-4 left-4 bg-primary/20 border border-primary/30 rounded-full px-3 py-1">
            <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Most Popular</span>
          </div>

          <div className="flex flex-col items-center py-8 px-6">
            <div className="w-16 h-16 rounded-[1rem] bg-white/10 flex items-center justify-center mb-4">
              <FeaturedIcon size={32} className="text-white" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-1">{FEATURED.name}</h2>
            <p className="text-white/50 text-sm mb-6">{FEATURED.description} · {FEATURED.players}</p>

            <div className="flex items-center gap-2 bg-primary text-dark font-bold rounded-full px-6 py-2.5">
              <span className="text-sm tracking-wide">PLAY →</span>
            </div>
          </div>

          {/* Subtle glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(195,175,141,0.08), transparent 70%)' }}
          />
        </Link>

        {/* All games section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-primary text-[11px] font-bold uppercase tracking-widest">All Games</span>
            <span className="text-white/30 text-xs">{games.length + 1} total</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {games.map(game => {
              const Icon = game.icon
              return (
                <Link
                  key={game.slug}
                  href={`/games/${game.slug}`}
                  className="glass rounded-[1.25rem] p-4 flex flex-col gap-3 cursor-pointer hover:border-primary/30 transition-colors duration-200"
                >
                  <div className="w-9 h-9 rounded-[0.6rem] bg-primary/10 flex items-center justify-center">
                    <Icon size={18} className="text-primary" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-bold text-sm leading-tight">{game.name}</p>
                    <p className="text-white/40 text-xs mt-0.5">{game.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${diffClass[game.difficulty]}`}>
                      {game.difficulty}
                    </span>
                    <span className="text-white/30 text-[10px]">{game.players}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
