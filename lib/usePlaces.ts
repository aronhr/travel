'use client'

import { useState, useEffect } from 'react'
import { fetchPlaces, DbPlace } from './supabase'
import { CATEGORY_STYLE, Category } from '@/data/places'

// Convert a DB row to the shape the UI already uses
export function toPlace(p: DbPlace) {
  return {
    id:           p.id,
    title:        p.title,
    description:  p.description,
    category:     p.category as Category,
    address:      p.address,
    openingHours: p.opening_hours,
    time:         p.time ?? '',
    imageUrl:     p.image_url || '/logo.png',
    coordinates:  p.coordinates,
    rating:       p.rating ?? undefined,
    hidden:       p.hidden,
  }
}

export type UiPlace = ReturnType<typeof toPlace>

export function usePlaces() {
  const [places, setPlaces]   = useState<UiPlace[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const rows = await fetchPlaces()
    setPlaces(rows.map(toPlace))
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  return { places, loading, reload: load }
}

export { CATEGORY_STYLE }
