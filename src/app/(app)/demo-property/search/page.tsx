'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { MapPin, Search, Clock, FileText, AlertTriangle, Info, X } from 'lucide-react'

const ALL_PROPERTIES = [
  { id: 'p1', street: '4821 Elmwood Dr', city: 'Tulsa', state: 'OK', zip: '74105', risk: 'high', score: 78, reports: 4, last: '2025-11-03', confidence: 'high' },
  { id: 'p2', street: '312 Maple Ave', city: 'Edmond', state: 'OK', zip: '73034', risk: 'medium', score: 52, reports: 2, last: '2025-08-14', confidence: 'medium' },
  { id: 'p3', street: '908 Birchwood Ln', city: 'Norman', state: 'OK', zip: '73069', risk: 'low', score: 18, reports: 1, last: '2024-02-19', confidence: 'low' },
  { id: 'p4', street: '1447 S Sheridan Rd', city: 'Tulsa', state: 'OK', zip: '74112', risk: 'medium', score: 44, reports: 3, last: '2025-09-22', confidence: 'medium' },
  { id: 'p5', street: '77 Commerce Blvd', city: 'Lawton', state: 'OK', zip: '73501', risk: 'none', score: 0, reports: 0, last: '', confidence: 'low' },
]

const RECENT = ['4821 Elmwood Dr, Tulsa OK', '312 Maple Ave, Edmond OK', '1447 S Sheridan Rd, Tulsa OK']

function riskBadge(r: string) {
  if (r === 'high') return 'bg-red-500/10 text-red-400 border border-red-500/20'
  if (r === 'medium') return 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
  if (r === 'low') return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
  return 'border text-gray-400' + ' ' + 'bg-gray-500/10 border-gray-500/20'
}
function riskLabel(r: string) {
  if (r === 'high') return 'High risk'
  if (r === 'medium') return 'Medium risk'
  if (r === 'low') return 'Low risk'
  return 'No data'
}

export default function PropertySearchPage() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Fix 3: results always populated — filter by query when present, show all when empty
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ALL_PROPERTIES
    return ALL_PROPERTIES.filter(p =>
      `${p.street} ${p.city} ${p.state} ${p.zip}`.toLowerCase().includes(q)
    )
  }, [query])

  function onInput(v: string) {
    setQuery(v)
    if (v.length > 1) {
      const q = v.toLowerCase()
      setSuggestions(
        ALL_PROPERTIES
          .filter(p => `${p.street} ${p.city} ${p.state} ${p.zip}`.toLowerCase().includes(q))
          .map(p => `${p.street}, ${p.city}, ${p.state} ${p.zip}`)
          .slice(0, 5)
      )
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  function pickSuggestion(addr: string) {
    setQuery(addr)
    setSuggestions([])
    setShowSuggestions(false)
  }

  function clear() {
    setQuery('')
    setSuggestions([])
    setShowSuggestions(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <p className="eyebrow mb-2">Property intelligence</p>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>Search a property address</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>View historical project signals before you bid. Private · Verified users only.</p>
      </div>

      <div className="flex items-start gap-2 p-4 rounded-xl border mb-5" style={{ borderColor: '#3730a3', background: 'rgba(79,70,229,0.05)' }}>
        <Info size={14} className="text-sc-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
          Reports reflect project history at an address — not any specific person. Property ownership may have changed. Use your own judgment before making any business decision.
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-3)' }} />
            <input
              className="input pl-9 pr-8"
              placeholder="Start typing an address… or browse all below"
              value={query}
              onChange={e => onInput(e.target.value)}
              onFocus={() => query.length > 1 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              autoComplete="off"
            />
            {query && (
              <button onClick={clear} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-3)' }}>
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border overflow-hidden z-20"
            style={{ background: 'var(--bg-2)', borderColor: 'var(--border)' }}>
            <div className="px-3 py-2 border-b" style={{ borderColor: 'var(--border)' }}>
              <p className="text-xs font-medium" style={{ color: 'var(--text-3)' }}>Matching addresses</p>
            </div>
            {suggestions.map((s, i) => (
              <button key={i} onMouseDown={() => pickSuggestion(s)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left border-b last:border-0 hover:bg-[var(--bg-3)] transition-colors"
                style={{ borderColor: 'var(--border)' }}>
                <MapPin size={12} style={{ color: 'var(--text-3)' }} className="flex-shrink-0" />
                <div>
                  <p className="text-sm" style={{ color: 'var(--text-1)' }}>{s.split(',')[0]}</p>
                  <p className="text-xs" style={{ color: 'var(--text-3)' }}>{s.split(',').slice(1).join(',').trim()}</p>
                </div>
              </button>
            ))}
            <div className="px-4 py-2 border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg-3)' }}>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                In production: powered by Google Places Autocomplete
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Recent searches — always shown when no active query */}
      {!query && (
        <div className="mb-5">
          <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-3)' }}>Recent searches</p>
          <div className="flex flex-wrap gap-2">
            {RECENT.map((addr, i) => (
              <button key={i} onClick={() => setQuery(addr.split(',')[0])}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border transition-colors hover:border-sc-500"
                style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}>
                <Clock size={10} />{addr}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results — always shown */}
      <div>
        <p className="text-sm mb-4" style={{ color: 'var(--text-3)' }}>
          {query
            ? `${results.length} propert${results.length !== 1 ? 'ies' : 'y'} matching "${query}"`
            : `${results.length} properties in the network`}
        </p>
        <div className="space-y-3">
          {results.map(p => (
            <Link key={p.id} href={`/demo-property/${p.id}`}
              className="card p-4 flex items-start gap-4 block hover:border-sc-500 transition-all">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--bg-3)' }}>
                <MapPin size={16} style={{ color: 'var(--text-3)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>{p.street}</p>
                    <p className="text-xs" style={{ color: 'var(--text-3)' }}>{p.city}, {p.state} {p.zip}</p>
                  </div>
                  <span className={`badge text-xs flex-shrink-0 ${riskBadge(p.risk)}`}>{riskLabel(p.risk)}</span>
                </div>
                <div className="flex items-center gap-4 mt-2 flex-wrap text-xs" style={{ color: 'var(--text-3)' }}>
                  <span className="flex items-center gap-1">
                    <FileText size={10} />
                    {p.reports === 0 ? 'No reports on file' : `${p.reports} report${p.reports !== 1 ? 's' : ''} on file`}
                  </span>
                  {p.last && (
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      Last report: {new Date(p.last).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </div>
              </div>
              {p.risk === 'high' && <AlertTriangle size={15} className="text-red-400 flex-shrink-0 mt-1" />}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
