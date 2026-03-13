'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, CalendarDays, Map, Dices } from 'lucide-react'

const links = [
  { href: '/',         icon: Home,         label: 'Home'     },
  { href: '/schedule', icon: CalendarDays, label: 'Schedule' },
  { href: '/map',      icon: Map,          label: 'Map'      },
  { href: '/games',    icon: Dices,        label: 'Games'    },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="glass-dark fixed bottom-0 left-0 right-0 z-50 h-20 flex items-center">
      <div className="flex w-full">
        {links.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors duration-150 ${
                active ? 'text-primary' : 'text-white/40 hover:text-white/70'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.75} />
              <span className="text-[10px] font-semibold tracking-wide">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
