'use client'
import Link from 'next/link'
import { CREWS, CURRENT_USER, scoreBg, availDot, getInitials } from '@/lib/data'
import { Search, Users, ArrowRight, Zap } from 'lucide-react'

export default function DemoDashboard() {
  const recent = CREWS.filter(c => c.id !== CURRENT_USER.id).slice(0, 4)
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="eyebrow mb-2">Demo Dashboard</p>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>Welcome back, {CURRENT_USER.name.split(' ')[0]}.</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-2)' }}>You are connected to the Signal Crew network.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'ClearScore', value: `${CURRENT_USER.clearscore}`, sub: 'out of 100' },
          { label: 'Verified jobs', value: '41', sub: 'on record' },
          { label: 'Searches this month', value: '14', sub: 'profiles viewed' },
          { label: 'Active connections', value: '7', sub: 'crews connected' },
        ].map(m => (
          <div key={m.label} className="card p-4 text-center">
            <p className="text-xs mb-1" style={{ color: 'var(--text-3)' }}>{m.label}</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>{m.value}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>{m.sub}</p>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="card p-5">
          <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-1)' }}>Quick actions</h2>
          <div className="space-y-2">
            {[
              { href: '/demo-search', icon: Search, title: 'Find crews', sub: 'Search by trade, state, certifications' },
              { href: '/demo-connections', icon: Users, title: 'View connections', sub: '1 pending request' },
              { href: '/demo-interest', icon: Zap, title: 'Post a project need', sub: 'Let qualified crews come to you' },
            ].map(a => (
              <Link key={a.href} href={a.href}
                className="flex items-center gap-3 p-3 rounded-xl border transition-colors hover:border-sc-500 hover:bg-sc-600/5"
                style={{ borderColor: 'var(--border)' }}>
                <div className="w-8 h-8 rounded-lg bg-sc-600/10 flex items-center justify-center flex-shrink-0">
                  <a.icon size={15} className="text-sc-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>{a.title}</p>
                  <p className="text-xs" style={{ color: 'var(--text-3)' }}>{a.sub}</p>
                </div>
                <ArrowRight size={14} style={{ color: 'var(--text-3)' }} />
              </Link>
            ))}
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>Recently active crews</h2>
            <Link href="/demo-search" className="text-xs text-sc-400 hover:text-sc-300">View all</Link>
          </div>
          {/* ...existing code for recently active crews... */}
        </div>
      </div>
    </div>
  )
}
