'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Search, Users, MapPin, Zap, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabaseClient'
import ThemeToggle from '@/components/ui/ThemeToggle'

const NAV = [
  { href: '/dashboard',            label: 'Dashboard',     icon: LayoutDashboard },
  { href: '/demo-search',          label: 'Find crews',    icon: Search },
  { href: '/demo-connections',     label: 'Connections',   icon: Users },
  { href: '/demo-property/search', label: 'Properties',    icon: MapPin },
  { href: '/demo-interest',        label: 'Project needs', icon: Zap },
]

function UserNav() {
  const path = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/home')
  }

  const firstName = user?.user_metadata?.firstName || user?.email?.split('@')[0] || 'Account'
  const initials = (() => {
    const first = user?.user_metadata?.firstName?.[0] ?? ''
    const last = user?.user_metadata?.lastName?.[0] ?? ''
    return (first + last).toUpperCase() || firstName[0]?.toUpperCase() || '?'
  })()

  return (
    <nav className="sticky top-0 z-40 border-b" style={{ background: 'var(--bg-2)', borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo — links to home */}
        <Link href="/home" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 bg-sc-600 rounded-lg flex items-center justify-center">
            <Zap size={13} className="text-white" />
          </div>
          <span className="font-semibold text-sm" style={{ color: 'var(--text-1)' }}>Signal Crew</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-0.5">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = path === href || (href !== '/dashboard' && path.startsWith(href))
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

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/demo-settings"
            className={cn('p-1.5 rounded-lg transition-colors', path.startsWith('/demo-settings') ? 'text-sc-400' : '')}
            style={{ color: path.startsWith('/demo-settings') ? undefined : 'var(--text-3)' }}>
            <Settings size={16} />
          </Link>
          {/* User profile */}
          <div className="flex items-center gap-2 pl-2 border-l" style={{ borderColor: 'var(--border)' }}>
            <div className="w-7 h-7 rounded-full bg-sc-600/20 flex items-center justify-center text-sc-300 text-xs font-semibold">
              {initials}
            </div>
            <span className="text-sm hidden sm:block font-medium" style={{ color: 'var(--text-2)' }}>
              {firstName}
            </span>
          </div>
          {/* Sign out */}
          <button onClick={handleSignOut}
            className="p-1.5 rounded-lg transition-colors hover:text-red-400"
            style={{ color: 'var(--text-3)' }}
            title="Sign out">
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <UserNav />
      <main>{children}</main>
    </div>
  )
}
