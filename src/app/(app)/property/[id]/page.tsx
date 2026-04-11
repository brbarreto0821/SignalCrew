'use client'
import { useState } from 'react'
import Link from 'next/link'
import { MapPin, ChevronDown, ChevronUp, Info, Plus, Clock } from 'lucide-react'

const PROPS: Record<string, {
  street: string; city: string; state: string; zip: string
  risk: string; score: number; reports: any[]; summary: any
}> = {
  p1: {
    street: '4821 Elmwood Dr', city: 'Tulsa', state: 'OK', zip: '74105',
    risk: 'high', score: 78,
    summary: { paymentIssue: 75, scope: 75, delay: 75, communication: 100, workAgain: 0, last12: 2, last24: 3, older: 1 },
    reports: [
      { id: 'a', trade: 'General contracting', project: 'Kitchen remodel', value: '$15k–$50k', date: '2025-10', issues: 6, payOk: false, fullOk: false, deposit: true, scope: true, delay: true, comm: 'major', dispute: true, again: 'no', note: 'Significant payment delays. Scope kept expanding. Invoice unpaid after 90 days.' },
      { id: 'b', trade: 'Electrical', project: 'Panel upgrade + EV charger', value: '$5k–$15k', date: '2025-06', issues: 3, payOk: false, fullOk: true, deposit: false, scope: true, delay: false, comm: 'minor', dispute: false, again: 'maybe', note: 'Paid eventually but required multiple follow-ups.' },
      { id: 'c', trade: 'Concrete', project: 'Driveway replacement', value: '$5k–$15k', date: '2024-09', issues: 5, payOk: false, fullOk: false, deposit: true, scope: false, delay: true, comm: 'major', dispute: true, again: 'no', note: 'Check bounced on deposit. Final balance disputed.' },
      { id: 'd', trade: 'AV / Low-voltage', project: 'Camera system install', value: '$1k–$5k', date: '2024-04', issues: 4, payOk: false, fullOk: false, deposit: false, scope: true, delay: true, comm: 'major', dispute: false, again: 'no', note: 'Job stopped midway. Owner stopped responding.' },
    ]
  },
  p2: {
    street: '312 Maple Ave', city: 'Edmond', state: 'OK', zip: '73034',
    risk: 'medium', score: 52,
    summary: { paymentIssue: 50, scope: 50, delay: 50, communication: 50, workAgain: 50, last12: 1, last24: 2, older: 0 },
    reports: [
      { id: 'e', trade: 'Concrete', project: 'Concrete patio', value: '$5k–$15k', date: '2025-07', issues: 2, payOk: true, fullOk: true, deposit: false, scope: true, delay: false, comm: 'minor', dispute: false, again: 'maybe', note: 'Paid on time. Owner added square footage mid-job without a change order.' },
      { id: 'f', trade: 'Electrical', project: 'Electrical rough-in', value: '$5k–$15k', date: '2024-11', issues: 2, payOk: false, fullOk: true, deposit: false, scope: false, delay: true, comm: 'minor', dispute: false, again: 'yes', note: 'Payment was 3 weeks late but paid in full. Owner caused some access delays.' },
    ]
  },
  p3: {
    street: '908 Birchwood Ln', city: 'Norman', state: 'OK', zip: '73069',
    risk: 'low', score: 18,
    summary: { paymentIssue: 0, scope: 0, delay: 0, communication: 0, workAgain: 100, last12: 0, last24: 1, older: 0 },
    reports: [
      { id: 'g', trade: 'General contracting', project: 'Bathroom remodel', value: '$15k–$50k', date: '2024-01', issues: 0, payOk: true, fullOk: true, deposit: false, scope: false, delay: false, comm: 'none', dispute: false, again: 'yes', note: 'Straightforward project. Easy to work with. Paid on time.' },
    ]
  },
  p4: {
    street: '1447 S Sheridan Rd', city: 'Tulsa', state: 'OK', zip: '74112',
    risk: 'medium', score: 44,
    summary: { paymentIssue: 67, scope: 33, delay: 67, communication: 67, workAgain: 33, last12: 1, last24: 2, older: 1 },
    reports: [
      { id: 'h', trade: 'AV / Low-voltage', project: 'AV system install', value: '$5k–$15k', date: '2025-08', issues: 2, payOk: true, fullOk: true, deposit: false, scope: true, delay: false, comm: 'minor', dispute: false, again: 'yes', note: 'Good client overall. Added items but signed change orders.' },
      { id: 'i', trade: 'Concrete', project: 'Foundation repair', value: '$15k–$50k', date: '2024-10', issues: 3, payOk: false, fullOk: true, deposit: false, scope: false, delay: true, comm: 'minor', dispute: false, again: 'maybe', note: 'Paid in full but late. Property access was an issue.' },
      { id: 'j', trade: 'HVAC', project: 'HVAC replacement', value: '$5k–$15k', date: '2023-06', issues: 4, payOk: false, fullOk: false, deposit: true, scope: false, delay: false, comm: 'major', dispute: true, again: 'no', note: 'Note: this report is over 2 years old. Property may have changed ownership.' },
    ]
  },
  p5: {
    street: '77 Commerce Blvd', city: 'Lawton', state: 'OK', zip: '73501',
    risk: 'none', score: 0,
    summary: { paymentIssue: 0, scope: 0, delay: 0, communication: 0, workAgain: 0, last12: 0, last24: 0, older: 0 },
    reports: []
  },
}

function riskBadge(r: string) {
  if (r === 'high') return 'bg-red-500/10 text-red-400 border border-red-500/20'
  if (r === 'medium') return 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
  if (r === 'low') return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
  return 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
}
function riskLabel(r: string) {
  if (r === 'high') return 'High risk'
  if (r === 'medium') return 'Medium risk'
  if (r === 'low') return 'Low risk'
  return 'No data'
}
function barColor(pct: number) {
  if (pct >= 75) return 'bg-red-400'
  if (pct >= 40) return 'bg-amber-400'
  return 'bg-emerald-400'
}
function recency(d: string) {
  const mo = Math.floor((Date.now() - new Date(d + '-01').getTime()) / (30 * 24 * 60 * 60 * 1000))
  if (mo < 12) return { label: 'Within last 12 months', weight: 'Full weight', color: 'text-emerald-400' }
  if (mo < 24) return { label: '12–24 months ago', weight: 'Medium weight', color: 'text-amber-400' }
  if (mo < 60) return { label: '2–5 years ago', weight: 'Low weight', color: 'text-gray-400' }
  return { label: 'Over 5 years', weight: 'Historical only', color: 'text-gray-500' }
}

export default function PropertyPage({ params }: { params: { id: string } }) {
  const prop = PROPS[params.id]
  if (!prop) return <div className="p-8 text-center" style={{ color: 'var(--text-2)' }}>Property not found. <Link href="/property/search" className="text-sc-400 underline">Back to search</Link></div>

  const [expanded, setExpanded] = useState<string | null>(null)
  const s = prop.summary

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/property/search" className="text-xs mb-5 inline-flex items-center gap-1" style={{ color: 'var(--text-3)' }}>← Property search</Link>

      {/* Header */}
      <div className="card p-6 mb-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--bg-3)' }}>
              <MapPin size={18} style={{ color: 'var(--text-3)' }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>{prop.street}</h1>
                <span className="badge text-xs" style={{ background: 'var(--bg-3)', color: 'var(--text-3)', border: '1px solid var(--border)' }}>Private data</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-2)' }}>{prop.city}, {prop.state} {prop.zip}</p>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className={`badge text-xs ${riskBadge(prop.risk)}`}>{riskLabel(prop.risk)}</span>
                <span className="text-xs" style={{ color: 'var(--text-3)' }}>{prop.reports.length} report{prop.reports.length !== 1 ? 's' : ''} on file</span>
              </div>
            </div>
          </div>
          <Link href={`/property/report?id=${params.id}`} className="btn-primary flex items-center gap-2 flex-shrink-0">
            <Plus size={14} /> Submit report
          </Link>
        </div>
        <div className="flex items-start gap-2 mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
          <Info size={12} className="text-sc-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>
            Reports reflect historical project activity at this address. Ownership or occupancy may have changed. All data is private and only visible to verified Signal Crew members.
          </p>
        </div>
      </div>

      {prop.reports.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text-1)' }}>No project history on file</p>
          <p className="text-sm max-w-sm mx-auto mb-6" style={{ color: 'var(--text-2)' }}>
            No verified contractors have submitted a report for {prop.street} yet.
            <br /><strong>No reports does not mean a clean record.</strong>
          </p>
          <Link href={`/property/report?id=${params.id}`} className="btn-primary inline-flex gap-2 items-center">
            <Plus size={14} /> Submit the first report
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">

          {/* Risk sidebar */}
          <div className="space-y-4">
            <div className="card p-5 text-center">
              <p className="eyebrow mb-3">Risk score</p>
              <div className={`inline-flex flex-col items-center px-6 py-4 rounded-2xl border ${riskBadge(prop.risk)}`}>
                <span className="text-4xl font-bold">{prop.score}</span>
                <span className="text-xs font-medium mt-0.5 opacity-80">{riskLabel(prop.risk)}</span>
              </div>
              <p className="text-xs mt-3" style={{ color: 'var(--text-3)' }}>
                Based on {prop.reports.length} report{prop.reports.length !== 1 ? 's' : ''} · Recency-weighted
              </p>
            </div>

            <div className="card p-4">
              <p className="eyebrow mb-3">Report timeline</p>
              {[['Last 12 months', s.last12, 'Full weight'], ['12–24 months', s.last24 - s.last12, 'Medium'], ['Older', s.older, 'Low']].map(([l, n, w]) => (
                <div key={l as string} className="flex justify-between text-xs mb-2">
                  <span style={{ color: 'var(--text-2)' }}>{l}</span>
                  <span style={{ color: 'var(--text-3)' }}>{n as number} · {w}</span>
                </div>
              ))}
            </div>

            <div className="card p-4">
              <p className="eyebrow mb-3">Risk breakdown</p>
              {[['Payment issues', s.paymentIssue], ['Scope expansion', s.scope], ['Customer delays', s.delay], ['Communication', s.communication]].map(([l, v]) => (
                <div key={l as string} className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: 'var(--text-2)' }}>{l}</span>
                    <span className={barColor(v as number).replace('bg-', 'text-').replace('-400', '-400')} style={{ color: (v as number) >= 75 ? '#f87171' : (v as number) >= 40 ? '#fbbf24' : '#34d399' }}>{v}%</span>
                  </div>
                  <div className="score-bar">
                    <div className={`h-1.5 rounded-full ${barColor(v as number)}`} style={{ width: `${v}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="card p-4 text-center">
              <p className="eyebrow mb-2">Would work there again</p>
              <p className={`text-3xl font-bold ${s.workAgain >= 60 ? 'text-emerald-400' : s.workAgain >= 30 ? 'text-amber-400' : 'text-red-400'}`}>{s.workAgain}%</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>of contractors said yes</p>
            </div>
          </div>

          {/* Report history */}
          <div className="md:col-span-2">
            <div className="card overflow-hidden">
              <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>Project history</p>
                <span className="text-xs" style={{ color: 'var(--text-3)' }}>{prop.reports.length} reports</span>
              </div>
              <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                {prop.reports.map(r => {
                  const rec = recency(r.date)
                  const open = expanded === r.id
                  return (
                    <div key={r.id}>
                      <button onClick={() => setExpanded(open ? null : r.id)} className="w-full p-4 text-left hover:bg-[var(--bg-3)] transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <p className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>{r.project}</p>
                              <span className="badge-gray text-xs">{r.trade}</span>
                              {r.dispute && <span className="badge-red text-xs">Disputed</span>}
                            </div>
                            <div className="flex items-center gap-3 flex-wrap text-xs" style={{ color: 'var(--text-3)' }}>
                              <span className="flex items-center gap-1"><Clock size={10} />{r.date} · <span className={rec.color}>{rec.label}</span></span>
                              <span className={r.issues >= 4 ? 'text-red-400' : r.issues >= 2 ? 'text-amber-400' : 'text-emerald-400'}>{r.issues} issue{r.issues !== 1 ? 's' : ''} flagged</span>
                              <span className={r.again === 'yes' ? 'text-emerald-400' : r.again === 'maybe' ? 'text-amber-400' : 'text-red-400'}>Work again: {r.again}</span>
                            </div>
                          </div>
                          {open ? <ChevronUp size={14} style={{ color: 'var(--text-3)' }} /> : <ChevronDown size={14} style={{ color: 'var(--text-3)' }} />}
                        </div>
                      </button>
                      {open && (
                        <div className="px-4 pb-4 border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg-3)' }}>
                          <div className="pt-4 grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                            {[
                              ['Paid on time', r.payOk],
                              ['Paid in full', r.fullOk],
                              ['Deposit issue', !r.deposit],
                              ['Scope expansion', !r.scope],
                              ['Customer delays', !r.delay],
                              ['Communication', r.comm === 'none'],
                            ].map(([l, good]) => (
                              <div key={l as string} className="rounded-lg p-2" style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
                                <p className="text-xs mb-0.5" style={{ color: 'var(--text-3)' }}>{l}</p>
                                <p className={`text-xs font-semibold ${good ? 'text-emerald-400' : 'text-red-400'}`}>{good ? 'OK' : 'Issue'}</p>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between text-xs mb-2" style={{ color: 'var(--text-3)' }}>
                            <span>Recency: <span className={rec.color}>{rec.weight}</span></span>
                            <span>Submitted by verified contractor · Moderated</span>
                          </div>
                          {r.note && (
                            <div className="rounded-lg p-3" style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
                              <p className="text-xs mb-1 font-medium" style={{ color: 'var(--text-3)' }}>Contractor notes</p>
                              <p className="text-xs italic" style={{ color: 'var(--text-2)' }}>&ldquo;{r.note}&rdquo;</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
