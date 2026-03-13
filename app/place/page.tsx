'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { MapPin, Clock, ChevronLeft, Navigation, Share2, Star, Bookmark } from 'lucide-react'
import { fetchPlaceById } from '@/lib/supabase'
import { toPlace, UiPlace } from '@/lib/usePlaces'
import { formatTime, formatDate, CATEGORY_STYLE } from '@/data/places'

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={14}
          className={i <= full ? 'text-primary fill-primary' : i === full + 1 && half ? 'text-primary fill-primary/50' : 'text-white/20'}
        />
      ))}
    </div>
  )
}

function useSaved(id: number) {
  const key = `saved_${id}`
  const [saved, setSaved] = useState(false)
  useEffect(() => setSaved(localStorage.getItem(key) === 'true'), [key])
  const toggle = () => {
    const next = !saved
    setSaved(next)
    localStorage.setItem(key, String(next))
  }
  return { saved, toggle }
}

function PlaceDetail() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = Number(searchParams.get('id'))
  const [place, setPlace] = useState<UiPlace | null>(null)
  const [loading, setLoading] = useState(true)
  const { saved, toggle: toggleSave } = useSaved(id)

  useEffect(() => {
    if (!id) { setLoading(false); return }
    fetchPlaceById(id).then(row => {
      setPlace(row ? toPlace(row) : null)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return (
      <div className="min-h-dvh bg-dark flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
    )
  }

  if (!place) {
    return (
      <div className="min-h-dvh bg-dark flex items-center justify-center text-white/60">
        Place not found
      </div>
    )
  }

  const catStyle = CATEGORY_STYLE[place.category]
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.coordinates.lat},${place.coordinates.lng}&travelmode=walking`
  const reviewCount = place.rating ? Math.floor(place.rating * 600 - 200) : 0

  return (
    <div className="min-h-dvh bg-dark text-white flex flex-col">

      {/* Hero */}
      <div className="relative flex-shrink-0" style={{ height: '45vh' }}>
        <img
          src={place.imageUrl}
          alt={place.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/10 to-transparent" />

        {/* Controls */}
        <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-4 pt-14">
          <button onClick={() => router.back()} className="glass rounded-full p-2.5">
            <ChevronLeft size={20} />
          </button>
          <div className={`glass rounded-full px-3 py-1.5 ${catStyle.bg}`}>
            <span className={`text-xs font-bold uppercase tracking-wide ${catStyle.text}`}>
              {place.category}
            </span>
          </div>
          <button className="glass rounded-full p-2.5" aria-label="Share">
            <Share2 size={16} className="text-white/70" />
          </button>
        </div>
      </div>

      {/* Content sheet */}
      <div className="flex-1 glass-dark rounded-t-[2rem] -mt-8 px-6 pt-6 pb-28 flex flex-col gap-5">

        {/* Title + rating */}
        <div>
          <h1 className="text-2xl font-extrabold leading-tight">{place.title}</h1>
          {place.rating && (
            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={place.rating} />
              <span className="text-white font-bold text-sm">{place.rating}</span>
              <span className="text-white/30 text-xs">({reviewCount.toLocaleString()} reviews)</span>
            </div>
          )}
        </div>

        {/* Address + hours */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-start gap-2.5">
            <MapPin size={15} className="text-primary mt-0.5 flex-shrink-0" />
            <span className="text-white/70 text-sm">{place.address}</span>
          </div>
          {place.openingHours && (
            <div className="flex items-center gap-2.5">
              <Clock size={15} className="text-primary flex-shrink-0" />
              <span className="text-emerald-400 text-sm font-medium">Open now</span>
              <span className="text-white/40 text-sm">· Closes {place.openingHours.split(' - ')[1]}</span>
            </div>
          )}
        </div>

        {/* Scheduled time if applicable */}
        {place.time && (
          <div className="glass rounded-[1.25rem] p-4 border border-primary/20">
            <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">Scheduled</p>
            <p className="text-white font-semibold text-sm">{formatDate(place.time)}</p>
            <p className="text-primary font-extrabold text-2xl mt-0.5">{formatTime(place.time)}</p>
          </div>
        )}

        {/* Description */}
        <p className="text-white/65 text-sm leading-relaxed">{place.description}</p>

        {/* Action buttons */}
        <div className="flex gap-3 mt-auto pt-2">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-dark font-bold rounded-full py-3.5"
          >
            <Navigation size={16} />
            Get Directions
          </a>
          <button
            onClick={toggleSave}
            className={`glass flex items-center justify-center rounded-full px-4 transition-colors duration-150 ${
              saved ? 'border-primary/40 bg-primary/10' : ''
            }`}
            aria-label="Save place"
          >
            <Bookmark size={18} className={saved ? 'fill-primary text-primary' : 'text-white/60'} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PlacePage() {
  return (
    <Suspense fallback={
      <div className="min-h-dvh bg-dark flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
    }>
      <PlaceDetail />
    </Suspense>
  )
}
