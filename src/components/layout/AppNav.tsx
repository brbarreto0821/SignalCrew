'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Search, Users, MapPin, Zap, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CURRENT_USER, getInitials } from '@/lib/data'
import ThemeToggle from '@/components/ui/ThemeToggle'

const NAV = [
  { href: '/dashboard',       label: 'Dashboard',   icon: LayoutDashboard },
  { href: '/search',          label: 'Find crews',  icon: Search },
  { href: '/connections',     label: 'Connections', icon: Users },
  { href: '/property/search', label: 'Properties',  icon: MapPin },
  { href: '/interest',        label: 'Project needs', icon: Zap },
]

export default function AppNav() {
  const path = usePathname()
  return (
    <nav className="sticky top-0 z-40 border-b" style={{ background: 'var(--bg-2)', borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 bg-sc-600 rounded-lg flex items-center justify-center">
            <Zap size={13} className="text-white" />
          </div>
          <span className="font-semibold text-sm" style={{ color: 'var(--text-1)' }}>Signal Crew</span>
        </Link>

        <div className="flex items-center gap-0.5">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = path.startsWith(href)
            return (
              <Link key={href} href={href}
                className={cn('flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm transition-all',
                  active ? 'bg-sc-600/10 text-sc-400 font-medium' : 'hover:bg-[var(--bg-3)]')}
                style={{ color: active ? undefined : 'var(--text-2)' }}>
                <Icon size={14} />
                <span className="hidden md:inline">{label}</span>
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Settings link */}
          <Link href="/settings"
            className={cn('p-1.5 rounded-lg transition-colors', path.startsWith('/settings') ? 'text-sc-400' : '')}
            style={{ color: path.startsWith('/settings') ? undefined : 'var(--text-3)' }}>
            <Settings size={16} />
          </Link>
          <Link href={`/profile/${CURRENT_USER.slug}`}
            className="flex items-center gap-2 pl-2 border-l" style={{ borderColor: 'var(--border)' }}>
            <div className="w-7 h-7 rounded-full bg-sc-600/20 flex items-center justify-center text-sc-300 text-xs font-semibold">
              {getInitials(CURRENT_USER.name)}
            </div>
            <span className="text-sm hidden sm:block font-medium" style={{ color: 'var(--text-2)' }}>
              {CURRENT_USER.name.split(' ')[0]}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
