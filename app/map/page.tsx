'use client'

import { useState, useCallback } from 'react'
import Map, { Marker, GeolocateControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MapPin, Clock, Search, ChevronRight, Navigation } from 'lucide-react'
import { distanceKm, CATEGORY_STYLE } from '@/data/places'
import { usePlaces, UiPlace } from '@/lib/usePlaces'
import Link from 'next/link'

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''

type Filter = 'All' | 'Bars' | 'Wellness' | 'Sights' | 'Food'
const FILTERS: Filter[] = ['All', 'Bars', 'Wellness', 'Sights', 'Food']

function matchesFilter(p: UiPlace, f: Filter): boolean {
  if (f === 'All') return true
  return p.category === f || (f === 'Bars' && p.category === 'Nightlife')
}

export default function MapPage() {
  const [filter, setFilter] = useState<Filter>('All')
  const [selected, setSelected] = useState<UiPlace | null>(null)
  const [search, setSearch] = useState('')

  const { places } = usePlaces()

  const mapPlaces = places.filter(p => p.category !== 'Stay')
  const filteredMarkers = mapPlaces.filter(p => matchesFilter(p, filter))

  const listPlaces = places
    .filter(p => !p.hidden && matchesFilter(p, filter))
    .filter(p => {
      if (!search) return true
      const q = search.toLowerCase()
      return (
        p.title.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    })

  const handleMarker = useCallback((place: UiPlace) => setSelected(place), [])

  return (
    <div className="min-h-dvh bg-dark text-white flex flex-col">

      {/* Map section */}
      <div className="relative flex-shrink-0" style={{ height: '44vh' }}>
        <Map
          mapboxAccessToken={TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          initialViewState={{ longitude: 19.05, latitude: 47.498, zoom: 12.5 }}
          style={{ width: '100%', height: '100%', borderRadius: '0 0 1.5rem 1.5rem' }}
          onClick={() => setSelected(null)}
        >
          <GeolocateControl position="bottom-right" trackUserLocation showUserHeading />
          {filteredMarkers.map(p => (
            <Marker
              key={p.id}
              longitude={p.coordinates.lng}
              latitude={p.coordinates.lat}
              anchor="bottom"
              onClick={e => { e.originalEvent.stopPropagation(); handleMarker(p) }}
            >
              <div className={`flex items-center justify-center rounded-full cursor-pointer shadow-lg transition-all duration-150 ${
                selected?.id === p.id ? 'w-9 h-9 bg-primary' : 'w-6 h-6 bg-primary/80 hover:bg-primary'
              }`}>
                <MapPin size={selected?.id === p.id ? 16 : 12} className="text-dark" fill="currentColor" strokeWidth={0} />
              </div>
            </Marker>
          ))}
        </Map>

        {/* Search bar floating over map — starts below the global header */}
        <div className="absolute top-16 left-4 right-4 z-10">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Budapest…"
              className="w-full pl-10 pr-4 py-2.5 glass rounded-full text-sm text-white placeholder-white/40 focus:outline-none border border-transparent focus:border-primary/40 transition-colors"
            />
          </div>
        </div>

        {/* Filter chips */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-150 backdrop-blur-md ${
                  filter === f ? 'bg-primary text-dark' : 'glass text-white/80'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected place mini-card */}
      {selected && (
        <div className="mx-5 mt-4 glass rounded-[1.25rem] overflow-hidden flex-shrink-0">
          <div className="flex gap-3 p-3">
            <img src={selected.imageUrl} alt={selected.title} className="w-14 h-14 rounded-[0.75rem] object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm">{selected.title}</p>
              {selected.openingHours && (
                <div className="flex items-center gap-1 text-white/40 text-xs mt-0.5">
                  <Clock size={10} />
                  <span>{selected.openingHours}</span>
                </div>
              )}
            </div>
            <Link
              href={`/place/?id=${selected.id}`}
              className="flex items-center gap-1 text-primary text-xs font-semibold flex-shrink-0"
            >
              Details <ChevronRight size={12} />
            </Link>
          </div>
          <div className="border-t border-white/5 px-3 py-2 flex gap-2">
            <Link href={`/place/?id=${selected.id}`} className="flex-1 bg-primary text-dark text-xs font-bold rounded-full py-2 text-center">
              View Details
            </Link>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selected.coordinates.lat},${selected.coordinates.lng}&travelmode=walking`}
              target="_blank" rel="noreferrer"
              className="glass flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-white/70"
            >
              <Navigation size={12} /> Directions
            </a>
          </div>
        </div>
      )}

      {/* Places list */}
      <div className="flex-1 px-5 mt-5 pb-28">
        <div className="flex items-center justify-between mb-4">
          <span className="text-primary text-[11px] font-bold uppercase tracking-widest">Nearby Places</span>
          <span className="text-white/30 text-xs">{listPlaces.length} places</span>
        </div>

        <div className="flex flex-col">
          {listPlaces.map((p, i) => {
            const style = CATEGORY_STYLE[p.category]
            return (
              <Link key={p.id} href={`/place/?id=${p.id}`}
                className={`flex items-center gap-3 py-3.5 cursor-pointer ${i < listPlaces.length - 1 ? 'border-b border-white/5' : ''}`}
              >
                <img src={p.imageUrl} alt={p.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm">{p.title}</p>
                  {p.openingHours && (
                    <p className="text-white/40 text-xs mt-0.5 truncate">{p.openingHours}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
                    {distanceKm(p.coordinates.lat, p.coordinates.lng)}
                  </span>
                  <ChevronRight size={14} className="text-white/20" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
