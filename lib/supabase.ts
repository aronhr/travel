import { createClient } from '@supabase/supabase-js'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const key  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(url, key)

// ---- types ----------------------------------------------------------------

export type DbPlace = {
  id:            number
  title:         string
  description:   string
  category:      string
  address:       string
  opening_hours: string
  time:          string | null
  image_url:     string
  coordinates:   { lat: number; lng: number }
  rating:        number | null
  hidden:        boolean
  created_at:    string
}

export type DbMember = {
  id:       number
  name:     string
  position: number
}

// ---- helpers --------------------------------------------------------------

export async function fetchPlaces(): Promise<DbPlace[]> {
  const { data, error } = await supabase
    .from('places')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function fetchMembers(): Promise<DbMember[]> {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .order('position', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function insertPlace(place: Omit<DbPlace, 'id' | 'created_at'>): Promise<DbPlace> {
  const { data, error } = await supabase
    .from('places')
    .insert(place)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function uploadEventImage(file: File): Promise<string> {
  const ext  = file.name.split('.').pop()
  const path = `${Date.now()}.${ext}`
  const { error } = await supabase.storage
    .from('event-images')
    .upload(path, file, { upsert: false })
  if (error) throw error
  const { data } = supabase.storage.from('event-images').getPublicUrl(path)
  return data.publicUrl
}

export async function deletePlace(id: number): Promise<void> {
  const { error } = await supabase.from('places').delete().eq('id', id)
  if (error) throw error
}

export async function fetchPlaceById(id: number): Promise<DbPlace | null> {
  const { data, error } = await supabase
    .from('places')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return data
}

export async function saveMembers(names: string[]): Promise<void> {
  await supabase.from('members').delete().neq('id', 0)
  await supabase.from('members').insert(
    names.map((name, position) => ({ name, position }))
  )
}
