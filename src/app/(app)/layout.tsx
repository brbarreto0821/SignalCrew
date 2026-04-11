import Link from 'next/link'
import AppNav from '@/components/layout/AppNav'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Demo banner with home link — Fix 3 */}
      <div className="flex items-center justify-between px-4 py-2"
        style={{ background: 'rgba(79,70,229,0.12)', borderBottom: '1px solid rgba(79,70,229,0.2)' }}>
        <span className="text-xs font-medium" style={{ color: '#a5b4fc' }}>
          Demo Prototype — Sample data only. Some actions are simulated.
        </span>
        <Link href="/home"
          className="text-xs font-medium px-3 py-1 rounded-lg transition-colors hover:bg-sc-600/20"
          style={{ color: '#818cf8', border: '1px solid rgba(99,102,241,0.3)' }}>
          ← Back to home
        </Link>
      </div>
      <AppNav />
      <main>{children}</main>
    </div>
  )
}
