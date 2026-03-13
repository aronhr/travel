'use client'

import Link from 'next/link'
import { MapPin, Clock, Star } from 'lucide-react'
import { Place, formatTime, formatDate } from '@/data/places'
import { useEffect, useState } from 'react'

function useFavorite(id: number) {
  const key = `fav_${id}`
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    setIsFav(localStorage.getItem(key) === 'true')
  }, [key])

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault()
    const next = !isFav
    setIsFav(next)
    localStorage.setItem(key, String(next))
  }

  return { isFav, toggle }
}

export default function PlaceCard({ place }: { place: Place }) {
  const { isFav, toggle } = useFavorite(place.id)

  return (
    <Link href={`/place/?id=${place.id}`} className="block">
      <div className="relative rounded-[1.25rem] overflow-hidden min-h-64 cursor-pointer group">
        {/* Background image */}
        <img
          src={place.imageUrl}
          alt={place.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent" />

        {/* Favorite button */}
        <button
          onClick={toggle}
          aria-label="Toggle favourite"
          className="absolute top-3 right-3 glass rounded-full p-2 z-10"
        >
          <Star
            size={16}
            className={isFav ? 'text-primary fill-primary' : 'text-white/70'}
          />
        </button>

        {/* Title pill */}
        <div className="absolute top-3 left-3 glass rounded-full px-3 py-1.5 z-10 max-w-[65%]">
          <p className="text-sm font-bold text-white truncate">{place.title}</p>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 glass p-4 z-10">
          <p className="text-white/70 text-xs italic line-clamp-2 mb-3">{place.description}</p>
          <div className="flex flex-col gap-1.5">
            {place.time && (
              <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                <Clock size={12} />
                <span>{formatTime(place.time)} · {formatDate(place.time)}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-xs text-white/60">
              <MapPin size={12} />
              <span className="line-clamp-1">{place.address}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
