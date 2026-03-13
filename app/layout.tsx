import type { Metadata, Viewport } from 'next'
import './globals.css'
import BottomNav from '@/components/BottomNav'
import AppHeader from '@/components/AppHeader'

export const metadata: Metadata = {
  title: 'Squaretable',
  description: 'Budapest 2026 — group trip companion',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#161D2C',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark font-display antialiased">
        <AppHeader />
        <main className="min-h-dvh pb-20">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  )
}
