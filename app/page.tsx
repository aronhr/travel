'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Settings, ChevronRight, X, Plus } from 'lucide-react'
import { formatTime, CATEGORY_STYLE } from '@/data/places'
import { fetchPlaces, fetchMembers, saveMembers } from '@/lib/supabase'
import { toPlace, UiPlace } from '@/lib/usePlaces'

const DEPARTURE = new Date('2026-03-13T19:40:00').getTime()
const DEFAULT_MEMBERS = ['Zhivko', 'Emil', 'Anton', 'Steinar', 'Mikael']

function useCountdown() {
  const calc = () => {
    const diff = DEPARTURE - Date.now()
    if (diff <= 0) return null
    return {
      h: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
      m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
      s: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
      days: Math.floor(diff / 86400000),
    }
  }
  const [t, setT] = useState<ReturnType<typeof calc>>(null)
  useEffect(() => {
    setT(calc())
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

function useMembers() {
  const [members, setMembers] = useState<string[]>(DEFAULT_MEMBERS)
  useEffect(() => {
    fetchMembers().then(rows => {
      if (rows.length > 0) setMembers(rows.map(r => r.name))
    })
  }, [])
  const save = async (next: string[]) => {
    setMembers(next)
    await saveMembers(next)
  }
  return { members, save }
}

function SettingsDrawer({
  members,
  onSave,
  onClose,
}: {
  members: string[]
  onSave: (m: string[]) => void
  onClose: () => void
}) {
  const [list, setList] = useState(members)
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const add = () => {
    const name = input.trim()
    if (!name || list.includes(name)) return
    setList([...list, name])
    setInput('')
    inputRef.current?.focus()
  }

  const remove = (i: number) => setList(list.filter((_, idx) => idx !== i))

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-[60]"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed bottom-0 left-0 right-0 z-[70] glass-dark rounded-t-[2rem] px-6 pt-5 pb-10">
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-5" />

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-extrabold text-white">Who's Going</h2>
            <p className="text-white/40 text-xs mt-0.5">{list.length} people on this trip</p>
          </div>
          <button
            onClick={() => { onSave(list); onClose() }}
            className="bg-primary text-dark text-xs font-bold px-4 py-2 rounded-full"
          >
            Done
          </button>
        </div>

        {/* Member list */}
        <div className="flex flex-col gap-2 mb-5 max-h-56 overflow-y-auto">
          {list.map((name, i) => (
            <div key={i} className="flex items-center gap-3 glass rounded-[0.75rem] px-4 py-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                {name[0].toUpperCase()}
              </div>
              <span className="text-white text-sm font-semibold flex-1">{name}</span>
              {list.length > 1 && (
                <button onClick={() => remove(i)} className="text-white/30 hover:text-white/60 transition-colors">
                  <X size={15} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add person */}
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && add()}
            placeholder="Add someone…"
            className="flex-1 glass rounded-full px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none border border-transparent focus:border-primary/40 transition-colors"
          />
          <button
            onClick={add}
            disabled={!input.trim()}
            className="glass rounded-full px-4 py-3 text-primary disabled:text-white/20 transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </>
  )
}

function useTodayEvents() {
  const [events, setEvents] = useState<UiPlace[]>([])
  const [label, setLabel] = useState('Today')
  useEffect(() => {
    fetchPlaces().then(rows => {
      const scheduled = rows
        .map(toPlace)
        .filter(p => p.time)
        .sort((a, b) => a.time.localeCompare(b.time))

      const today = new Date().toISOString().slice(0, 10)
      const todayEvents = scheduled.filter(p => p.time.startsWith(today))

      if (todayEvents.length > 0) {
        setEvents(todayEvents.slice(0, 3))
        setLabel('Today')
      } else {
        const now = new Date().toISOString()
        const next = scheduled.find(p => p.time > now)
        if (next) {
          const nextDate = next.time.slice(0, 10)
          setEvents(scheduled.filter(p => p.time.startsWith(nextDate)).slice(0, 3))
          setLabel(new Date(next.time).toLocaleDateString('en-US', { weekday: 'long' }))
        }
      }
    })
  }, [])
  return { events, label }
}

export default function HomePage() {
  const countdown = useCountdown()
  const { members, save } = useMembers()
  const [showSettings, setShowSettings] = useState(false)
  const { events: upcoming, label: scheduleLabel } = useTodayEvents()

  return (
    <div className="relative overflow-hidden bg-dark" style={{ height: '100dvh' }}>
      {/* Hero image */}
      <img
        src="/landing.webp"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-dark/20 to-dark/95" />

      {/* Settings button — sits in the global header row */}
      <button
        onClick={() => setShowSettings(true)}
        className="fixed top-[10px] right-5 z-40 glass rounded-full p-2.5"
        aria-label="Settings"
      >
        <Settings size={16} className="text-white/70" />
      </button>

      {/* Countdown */}
      <div className="absolute top-0 left-0 right-0 flex flex-col items-center justify-center" style={{ height: '52%' }}>
        {countdown ? (
          <>
            <div className="flex items-end gap-3 tabular-nums leading-none">
              {[countdown.h, countdown.m, countdown.s].map((v, i) => (
                <span key={i} className="text-white font-extrabold" style={{ fontSize: 'clamp(52px, 18vw, 80px)' }}>{v}</span>
              ))}
            </div>
            <p className="text-primary text-[11px] font-semibold uppercase tracking-widest mt-3">
              Until Departure · {countdown.days}d
            </p>
          </>
        ) : (
          <>
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">
              Helgarævintýri í
            </p>
            <p className="text-white font-extrabold leading-none text-center" style={{ fontSize: 'clamp(48px, 16vw, 72px)' }}>
              Budapest
            </p>
            <p className="text-white/50 text-sm mt-3">Við erum hér!</p>
          </>
        )}
      </div>

      {/* Bottom glass sheet */}
      <div className="absolute bottom-0 left-0 right-0 glass-dark rounded-t-[2rem] px-6 pt-6 pb-24">

        {/* Avatar stack */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex -space-x-2">
            {members.slice(0, 6).map((name, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-primary/20 border-2 border-dark flex items-center justify-center text-xs font-bold text-primary"
              >
                {name[0].toUpperCase()}
              </div>
            ))}
          </div>
          <span className="text-white/50 text-sm">{members.length} friends going</span>
        </div>

        <div className="h-px bg-primary/20 mb-5" />

        {/* Upcoming events */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-primary text-[11px] font-bold uppercase tracking-widest">{scheduleLabel}</span>
          <Link href="/schedule" className="flex items-center gap-1 text-white/40 text-xs">
            View full schedule <ChevronRight size={12} />
          </Link>
        </div>

        <div className="flex flex-col gap-3.5">
          {upcoming.length > 0 ? upcoming.map(p => {
            const style = CATEGORY_STYLE[p.category]
            return (
              <Link key={p.id} href={`/place/?id=${p.id}`} className="flex items-start gap-3">
                <span className="text-primary font-bold text-sm tabular-nums w-11 flex-shrink-0 pt-0.5">
                  {formatTime(p.time)}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit ${style.bg} ${style.text}`}>
                    {p.category}
                  </span>
                  <span className="text-white text-sm font-semibold">{p.title}</span>
                </div>
              </Link>
            )
          }) : (
            <p className="text-white/30 text-sm">No events scheduled</p>
          )}
        </div>
      </div>

      {/* Settings drawer */}
      {showSettings && (
        <SettingsDrawer
          members={members}
          onSave={save}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  )
}
