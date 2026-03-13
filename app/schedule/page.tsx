'use client'

import { useState, useMemo } from 'react'
import { Search, MapPin, Plus, Trash2 } from 'lucide-react'
import { TRIP_DATES, CATEGORY_STYLE, formatTime } from '@/data/places'
import { usePlaces, UiPlace } from '@/lib/usePlaces'
import { deletePlace } from '@/lib/supabase'
import Link from 'next/link'
import AddEventDrawer from '@/components/AddEventDrawer'

type Tab = 'schedule' | 'places'

function CategoryChip({ category }: { category: UiPlace['category'] }) {
  const s = CATEGORY_STYLE[category] ?? { bg: 'bg-white/10', text: 'text-white/60' }
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>
      {category}
    </span>
  )
}

function TimelineEvent({ place, onDelete }: { place: UiPlace; onDelete: () => void }) {
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!confirming) { setConfirming(true); return }
    setDeleting(true)
    try {
      await deletePlace(place.id)
      onDelete()
    } catch {
      setDeleting(false)
      setConfirming(false)
    }
  }

  return (
    <Link href={`/place/?id=${place.id}`} className="flex gap-4 relative">
      <div className="w-12 flex-shrink-0 text-right pt-4">
        <span className="text-primary font-bold text-sm tabular-nums">{formatTime(place.time!)}</span>
      </div>
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-3 h-3 rounded-full bg-primary mt-[18px] border-2 border-dark ring-2 ring-primary/30 z-10" />
        <div className="w-px flex-1 bg-primary/20 mt-1" />
      </div>
      <div className="glass rounded-[1.25rem] p-3 flex gap-3 flex-1 mb-4 cursor-pointer hover:border-primary/30 transition-colors relative overflow-hidden">
        <div className="flex flex-col gap-1.5 min-w-0 flex-1">
          <p className="font-bold text-sm leading-tight">{place.title}</p>
          <div className="flex items-center gap-1 text-white/40 text-xs">
            <MapPin size={10} />
            <span className="truncate">{place.address}</span>
          </div>
          <CategoryChip category={place.category} />
        </div>
        <div className="flex flex-col items-end justify-between flex-shrink-0 gap-2">
          <img
            src={place.imageUrl}
            alt={place.title}
            className="w-16 h-16 rounded-[0.75rem] object-cover"
          />
          <button
            onClick={handleDelete}
            disabled={deleting}
            onBlur={() => setConfirming(false)}
            className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full transition-colors ${
              confirming
                ? 'bg-red-500/20 text-red-400'
                : 'text-white/25 hover:text-red-400 hover:bg-red-400/10'
            }`}
          >
            <Trash2 size={10} />
            {confirming ? 'Confirm?' : 'Delete'}
          </button>
        </div>
      </div>
    </Link>
  )
}

function PlaceGridCard({ place }: { place: UiPlace }) {
  return (
    <Link href={`/place/?id=${place.id}`} className="relative rounded-[1.25rem] overflow-hidden h-28 cursor-pointer group">
      <img
        src={place.imageUrl}
        alt={place.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white text-xs font-bold leading-tight line-clamp-2">{place.title}</p>
      </div>
    </Link>
  )
}

export default function SchedulePage() {
  const [tab, setTab] = useState<Tab>('schedule')
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date().toISOString().slice(0, 10)
    return TRIP_DATES.some(d => d.iso === today) ? today : '2026-03-14'
  })
  const [query, setQuery] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  const { places, loading, reload } = usePlaces()

  const dayEvents = useMemo(() =>
    places
      .filter(p => p.time && p.time.startsWith(selectedDate))
      .sort((a, b) => a.time!.localeCompare(b.time!)),
    [places, selectedDate]
  )

  const allPlaces = useMemo(() => {
    const visible = places.filter(p => !p.hidden)
    if (!query) return visible
    const q = query.toLowerCase()
    return visible.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    )
  }, [places, query])

  const exploreGrid = useMemo(() => places.filter(p => !p.hidden).slice(0, 6), [places])

  const selectedTripDate = TRIP_DATES.find(d => d.iso === selectedDate)!
  const fullDayName = new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long' })

  return (
    <div className="min-h-dvh bg-dark text-white pb-32">

      {/* Header */}
      <div className="px-5 pt-16 pb-4">
        <div className="flex items-baseline justify-between">
          <div>
            <h1 className="text-3xl font-extrabold">{fullDayName}</h1>
            <p className="text-primary font-semibold text-sm mt-0.5">March {selectedTripDate.label}</p>
          </div>
          <div className="flex items-center gap-2">
            {tab === 'schedule' && (
              <span className="text-white/40 text-xs">{dayEvents.length} events</span>
            )}
            <button
              onClick={() => setShowAdd(true)}
              className="bg-primary text-dark rounded-full p-2"
              aria-label="Add event"
            >
              <Plus size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Date selector */}
      {tab === 'schedule' && (
        <div className="px-5 pb-5">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {TRIP_DATES.map(d => (
              <button
                key={d.iso}
                onClick={() => setSelectedDate(d.iso)}
                className={`flex-shrink-0 flex flex-col items-center px-4 py-2 rounded-full transition-colors duration-150 ${
                  selectedDate === d.iso
                    ? 'bg-primary text-dark font-bold'
                    : 'glass text-white/60 hover:text-white'
                }`}
              >
                <span className="text-sm font-bold">{d.label}</span>
                <span className="text-[10px]">{d.day}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      {tab === 'places' && (
        <div className="px-5 pb-4">
          <div className="relative">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search places…"
              className="w-full pl-10 pr-4 py-3 glass rounded-full text-sm text-white placeholder-white/40 focus:outline-none border border-transparent focus:border-primary/40 transition-colors"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="px-5">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-6 h-6 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          </div>
        ) : tab === 'schedule' ? (
          <>
            {dayEvents.length > 0 ? (
              <div className="flex flex-col">
                {dayEvents.map(p => <TimelineEvent key={p.id} place={p} onDelete={reload} />)}
              </div>
            ) : (
              <div className="glass rounded-[1.25rem] p-8 text-center">
                <p className="text-white/40 text-sm">No events scheduled for this day</p>
                <button
                  onClick={() => setShowAdd(true)}
                  className="mt-4 flex items-center gap-2 mx-auto text-primary text-sm font-semibold"
                >
                  <Plus size={14} /> Add one
                </button>
              </div>
            )}

            <div className="mt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-primary/20" />
                <span className="text-primary text-[11px] font-bold uppercase tracking-widest">Explore Anytime</span>
                <div className="h-px flex-1 bg-primary/20" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {exploreGrid.map(p => <PlaceGridCard key={p.id} place={p} />)}
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {allPlaces.map(p => (
              <Link key={p.id} href={`/place/?id=${p.id}`} className="glass rounded-[1.25rem] p-3 flex gap-3 cursor-pointer hover:border-primary/30 transition-colors">
                <img src={p.imageUrl} alt={p.title} className="w-14 h-14 rounded-[0.75rem] object-cover flex-shrink-0" />
                <div className="flex flex-col gap-1 min-w-0 justify-center">
                  <p className="font-bold text-sm">{p.title}</p>
                  <CategoryChip category={p.category} />
                  <p className="text-white/40 text-xs truncate">{p.address}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Floating toggle */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40">
        <div className="glass rounded-full p-1 flex gap-1 shadow-2xl">
          {(['schedule', 'places'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-150 capitalize ${
                tab === t ? 'bg-primary text-dark' : 'text-white/60 hover:text-white'
              }`}
            >
              {t === 'schedule' ? 'Timeline' : 'Places'}
            </button>
          ))}
        </div>
      </div>

      {showAdd && (
        <AddEventDrawer
          defaultDate={selectedDate}
          onClose={() => setShowAdd(false)}
          onSaved={() => { setShowAdd(false); reload() }}
        />
      )}
    </div>
  )
}
