'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { CREWS, US_STATES, ALL_TRADES, scoreBg, availDot, availLabel, getInitials, type Crew } from '@/lib/data'
import { Search, SlidersHorizontal, X, Shield, ShieldCheck, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [trade, setTrade] = useState('All trades')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [radius, setRadius] = useState(500)
  const [availOnly, setAvailOnly] = useState(false)
  const [filterLicensed, setFilterLicensed] = useState(false)
  const [filterInsured, setFilterInsured] = useState(false)
  const [filterBonded, setFilterBonded] = useState(false)
  const [filterSam, setFilterSam] = useState(false)
  const [filterMilitary, setFilterMilitary] = useState(false)
  const [showFilters, setShowFilters] = useState(true)

  // Fix 2: normalize trade comparison — strip extra spaces, case-insensitive, handle "All trades"
  const results = useMemo(() => {
    return CREWS.filter(c => {
      const q = query.toLowerCase().trim()
      const matchQ = !q ||
        c.name.toLowerCase().includes(q) ||
        c.trades.some(t => t.name.toLowerCase().includes(q)) ||
        c.city.toLowerCase().includes(q) ||
        c.bio.toLowerCase().includes(q) ||
        c.primary_trade.toLowerCase().includes(q)

      const selectedTrade = trade.trim()
      const matchTrade = selectedTrade === 'All trades' || selectedTrade === '' ||
        c.trades.some(t => t.name.toLowerCase() === selectedTrade.toLowerCase()) ||
        c.primary_trade.toLowerCase() === selectedTrade.toLowerCase()

      const matchState = !state || c.state === state
      const matchCity = !city || c.city.toLowerCase().includes(city.toLowerCase().trim())
      const matchAvail = !availOnly || c.availability === 'available'
      const matchLicensed = !filterLicensed || c.licensed
      const matchInsured = !filterInsured || c.insured
      const matchBonded = !filterBonded || c.bonded
      const matchSam = !filterSam || c.sam_gov
      const matchMilitary = !filterMilitary || c.military_base_access

      return matchQ && matchTrade && matchState && matchCity && matchAvail &&
        matchLicensed && matchInsured && matchBonded && matchSam && matchMilitary
    })
  }, [query, trade, state, city, radius, availOnly, filterLicensed, filterInsured, filterBonded, filterSam, filterMilitary])

  const activeCount = [
    trade !== 'All trades', !!state, !!city, availOnly,
    filterLicensed, filterInsured, filterBonded, filterSam, filterMilitary
  ].filter(Boolean).length

  function clearAll() {
    setQuery(''); setTrade('All trades'); setState(''); setCity(''); setRadius(500)
    setAvailOnly(false); setFilterLicensed(false); setFilterInsured(false)
    setFilterBonded(false); setFilterSam(false); setFilterMilitary(false)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <p className="eyebrow mb-2">Search</p>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>Find verified crews</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>Search by trade, location, and credentials. All profiles are verified.</p>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-3)' }} />
          <input className="input pl-9" placeholder="Trade, company name, or keyword…"
            value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <button onClick={() => setShowFilters(!showFilters)}
          className={cn('btn btn-ghost gap-2', showFilters && 'border-sc-500 text-sc-400')}>
          <SlidersHorizontal size={14} />
          Filters
          {activeCount > 0 && <span className="w-4 h-4 bg-sc-600 text-white rounded-full text-xs flex items-center justify-center">{activeCount}</span>}
        </button>
        {activeCount > 0 && (
          <button onClick={clearAll} className="btn btn-ghost text-xs gap-1.5">
            <X size={12} /> Clear
          </button>
        )}
      </div>

      {showFilters && (
        <div className="card p-5 mb-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="label">Trade / service</label>
              <select className="input" value={trade} onChange={e => setTrade(e.target.value)}>
                {ALL_TRADES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="label">State</label>
              <select className="input" value={state} onChange={e => setState(e.target.value)}>
                <option value="">Any state</option>
                {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="label">City</label>
              <input className="input" placeholder="e.g. Tulsa" value={city} onChange={e => setCity(e.target.value)} />
            </div>
            <div>
              <label className="label">Max radius: <span className="text-sc-400 font-bold">{radius} mi</span></label>
              <input type="range" min={25} max={500} step={25} value={radius}
                onChange={e => setRadius(Number(e.target.value))} className="w-full mt-2" />
            </div>
          </div>
          <div>
            <label className="label mb-2">Credentials &amp; access</label>
            <div className="flex flex-wrap gap-2">
              {([
                ['Available now', availOnly, setAvailOnly],
                ['Licensed', filterLicensed, setFilterLicensed],
                ['Insured', filterInsured, setFilterInsured],
                ['Bonded', filterBonded, setFilterBonded],
                ['SAM.gov registered', filterSam, setFilterSam],
                ['Military base access', filterMilitary, setFilterMilitary],
              ] as [string, boolean, (v: boolean) => void][]).map(([label, active, setter]) => (
                <button key={label} type="button" onClick={() => setter(!active)}
                  className="text-xs px-3 py-1.5 rounded-full border font-medium transition-all"
                  style={{
                    background: active ? '#4f46e5' : 'transparent',
                    color: active ? '#fff' : 'var(--text-2)',
                    borderColor: active ? '#4f46e5' : 'var(--border-2)'
                  }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="text-sm mb-4" style={{ color: 'var(--text-3)' }}>
        {results.length} verified crew{results.length !== 1 ? 's' : ''} found
      </p>

      {results.length === 0 ? (
        <div className="card p-12 text-center">
          <Search size={28} className="mx-auto mb-3" style={{ color: 'var(--text-3)' }} />
          <p className="font-medium" style={{ color: 'var(--text-1)' }}>No crews match your filters</p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>Try adjusting your search or clearing filters</p>
          <button onClick={clearAll} className="btn btn-ghost mt-4 text-xs">Clear all filters</button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map(c => <CrewCard key={c.id} crew={c} />)}
        </div>
      )}
    </div>
  )
}

function CrewCard({ crew: c }: { crew: Crew }) {
  const verifiedTrades = c.trades.filter(t => t.verified).slice(0, 3)
  return (
    <Link href={`/demo-profile/${c.slug}`}
      className="card p-4 block transition-all hover:border-sc-500"
      style={{ borderColor: 'var(--border)' }}>
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-sc-600/10 flex items-center justify-center text-sc-300 text-sm font-semibold flex-shrink-0">
          {getInitials(c.name)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-1)' }}>{c.name}</p>
            <span className={`badge text-xs flex-shrink-0 ${scoreBg(c.clearscore)}`}>{c.clearscore}</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-3)' }}>{c.primary_trade}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-3)' }}>
          <MapPin size={10} />{c.city}, {c.state}
        </span>
        {c.licensed && <span className="badge-blue text-xs px-1.5 gap-1"><Shield size={10} />Licensed</span>}
        {c.insured && <span className="badge-green text-xs px-1.5">Insured</span>}
        {c.sam_gov && <span className="badge-blue text-xs px-1.5 gap-1"><ShieldCheck size={10} />SAM.gov</span>}
        {c.military_base_access && <span className="badge-gray text-xs px-1.5">Military</span>}
      </div>
      {verifiedTrades.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {verifiedTrades.map(t => <span key={t.name} className="pill-verified">{t.name}</span>)}
        </div>
      )}
      <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
        <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-3)' }}>
          <span className={`w-1.5 h-1.5 rounded-full ${availDot(c.availability)}`} />
          {availLabel(c.availability)}
        </span>
        <span className="text-xs" style={{ color: 'var(--text-3)' }}>{c.review_count} reviews</span>
      </div>
    </Link>
  )
}
