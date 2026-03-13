'use client'

import { useState, useRef } from 'react'
import { X, Upload, Link as LinkIcon, Loader } from 'lucide-react'
import { insertPlace, uploadEventImage } from '@/lib/supabase'
import { Category, CATEGORY_STYLE } from '@/data/places'

const CATEGORIES: Category[] = ['Adventure', 'Food', 'Nightlife', 'Wellness', 'Sights', 'Bars', 'Stay']

type ImageMode = 'upload' | 'url'

export default function AddEventDrawer({
  defaultDate,
  onClose,
  onSaved,
}: {
  defaultDate: string
  onClose: () => void
  onSaved: () => void
}) {
  const [title, setTitle]             = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory]       = useState<Category>('Sights')
  const [address, setAddress]         = useState('')
  const [date, setDate]               = useState(defaultDate)
  const [time, setTime]               = useState('12:00')
  const [imageMode, setImageMode]     = useState<ImageMode>('upload')
  const [imageUrl, setImageUrl]       = useState('')
  const [imageFile, setImageFile]     = useState<File | null>(null)
  const [preview, setPreview]         = useState('')
  const [saving, setSaving]           = useState(false)
  const [error, setError]             = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setImageFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleSave = async () => {
    if (!title.trim()) { setError('Title is required'); return }
    setSaving(true)
    setError('')
    try {
      let finalImageUrl = '/logo.png'

      if (imageMode === 'upload' && imageFile) {
        finalImageUrl = await uploadEventImage(imageFile)
      } else if (imageMode === 'url' && imageUrl.trim()) {
        finalImageUrl = imageUrl.trim()
      }

      await insertPlace({
        title:         title.trim(),
        description:   description.trim(),
        category,
        address:       address.trim(),
        opening_hours: '',
        time:          `${date}T${time}:00+00:00`,
        image_url:     finalImageUrl,
        coordinates:   { lat: 47.4979, lng: 19.0402 },
        rating:        null,
        hidden:        true,
      })
      onSaved()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
      setSaving(false)
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[60]" onClick={onClose} />

      <div className="fixed bottom-0 left-0 right-0 z-[70] glass-dark rounded-t-[2rem] flex flex-col max-h-[92dvh]">
        {/* Handle + header */}
        <div className="px-6 pt-5 pb-4 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-5" />
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-white">Add Event</h2>
            <button onClick={onClose} className="text-white/40 hover:text-white/70 transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 pb-6 flex flex-col gap-4">

          {/* Title */}
          <div>
            <label className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-1.5 block">Title *</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Dinner at Retek"
              className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none border border-transparent focus:border-primary/40 transition-colors"
            />
          </div>

          {/* Date + time */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-1.5 block">Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full glass rounded-xl px-4 py-3 text-sm text-white focus:outline-none border border-transparent focus:border-primary/40 transition-colors"
              />
            </div>
            <div className="flex-1">
              <label className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-1.5 block">Time</label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full glass rounded-xl px-4 py-3 text-sm text-white focus:outline-none border border-transparent focus:border-primary/40 transition-colors"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-1.5 block">Category</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(c => {
                const s = CATEGORY_STYLE[c]
                return (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                      category === c ? `${s.bg} ${s.text} ring-1 ring-current` : 'glass text-white/50'
                    }`}
                  >
                    {c}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-1.5 block">Address</label>
            <input
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Street, district, Budapest"
              className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none border border-transparent focus:border-primary/40 transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-1.5 block">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What's happening here?"
              rows={3}
              className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none border border-transparent focus:border-primary/40 transition-colors resize-none"
            />
          </div>

          {/* Image */}
          <div>
            <label className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-1.5 block">Image</label>

            {/* Toggle */}
            <div className="glass rounded-full p-1 flex gap-1 mb-3 w-fit">
              {(['upload', 'url'] as ImageMode[]).map(m => (
                <button
                  key={m}
                  onClick={() => setImageMode(m)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    imageMode === m ? 'bg-primary text-dark' : 'text-white/50'
                  }`}
                >
                  {m === 'upload' ? <Upload size={11} /> : <LinkIcon size={11} />}
                  {m === 'upload' ? 'Upload' : 'URL'}
                </button>
              ))}
            </div>

            {imageMode === 'upload' ? (
              <div
                onClick={() => fileRef.current?.click()}
                className={`glass rounded-xl border border-dashed border-white/20 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/40 transition-colors ${preview ? 'p-0 overflow-hidden h-36' : 'py-8'}`}
              >
                {preview ? (
                  <img src={preview} alt="" className="w-full h-36 object-cover" />
                ) : (
                  <>
                    <Upload size={20} className="text-white/30" />
                    <span className="text-white/40 text-xs">Tap to choose a photo</span>
                  </>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              </div>
            ) : (
              <input
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="https://…"
                className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none border border-transparent focus:border-primary/40 transition-colors"
              />
            )}

            <p className="text-white/25 text-xs mt-1.5">Leave blank to use the Square Table logo</p>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 bg-primary text-dark font-bold rounded-full py-4 disabled:opacity-60 transition-opacity"
          >
            {saving ? <Loader size={16} className="animate-spin" /> : null}
            {saving ? 'Saving…' : 'Add to Schedule'}
          </button>
        </div>
      </div>
    </>
  )
}
