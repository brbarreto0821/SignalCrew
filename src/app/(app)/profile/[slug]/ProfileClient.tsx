'use client'

import { useState } from 'react'
import Link from 'next/link'
import { timeAgo } from '@/lib/utils'
import type { Crew } from '@/lib/data'
import { Shield, ShieldCheck, Star, Wrench, Award, CheckCircle, MapPin, Users, X, Briefcase, Clock } from 'lucide-react'

type ProfileClientProps = {
  crew: Crew
  currentUser: { id: string }
}

export default function ProfileClient({ crew, currentUser }: ProfileClientProps) {
  const isOwn = crew.id === currentUser.id
  const [showRequest, setShowRequest] = useState(false)
  const [requested, setRequested] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [reviewDone, setReviewDone] = useState(false)

  const avgR = (crew.reviews.reduce((a, r) => a + r.reliability, 0) / (crew.reviews.length || 1)).toFixed(1)
  const avgQ = (crew.reviews.reduce((a, r) => a + r.quality, 0) / (crew.reviews.length || 1)).toFixed(1)
  const avgC = (crew.reviews.reduce((a, r) => a + r.communication, 0) / (crew.reviews.length || 1)).toFixed(1)
  const hireAgain = crew.reviews.length
    ? Math.round(crew.reviews.filter(r => r.hire_again === 'yes').length / crew.reviews.length * 100) : 0

  return (
    <>
      {showRequest && !requested && (
        <RequestModal crew={crew} onClose={() => setShowRequest(false)} onSend={() => { setRequested(true); setShowRequest(false) }} />
      )}
      {showReview && !reviewDone && (
        <ReviewModal crew={crew} onClose={() => setShowReview(false)} onSend={() => { setReviewDone(true); setShowReview(false) }} />
      )}

      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link href="/search" className="text-xs mb-6 inline-flex items-center gap-1" style={{ color: 'var(--text-3)' }}>
          ← Back to search
        </Link>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-sc-600/10 flex items-center justify-center text-sc-300 text-xl font-bold flex-shrink-0">
                  {crew.name.split(' ').map((word) => word[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-2 flex-wrap mb-1">
                    <h1 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>{crew.name}</h1>
                    <span className="badge-green"><CheckCircle size={10} />Verified</span>
                    {crew.sam_gov && <span className="badge-blue"><ShieldCheck size={10} />SAM.gov</span>}
                    {crew.military_base_access && <span className="badge-gray">Military access</span>}
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-2)' }}>{crew.primary_trade} · {crew.city}, {crew.state}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs" style={{ color: 'var(--text-3)' }}>
                    <span className="flex items-center gap-1"><MapPin size={10} />{crew.city}, {crew.state} · {crew.radius_miles}mi radius</span>
                    <span className="flex items-center gap-1"><Users size={10} />{crew.employee_range} employees</span>
                    <span className="flex items-center gap-1"><Clock size={10} />{crew.years_experience}yr experience</span>
                  </div>
                  {crew.availability_note && (
                    <p className="text-xs mt-2 italic" style={{ color: 'var(--text-2)' }}>
                      <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${crew.availability === 'available' ? 'bg-emerald-400' : crew.availability === 'limited' ? 'bg-amber-400' : 'bg-gray-600'}`} />
                      {crew.availability_note}
                    </p>
                  )}
                </div>
              </div>
              {crew.bio && (
                <p className="text-sm mt-4 pt-4 leading-relaxed" style={{ borderTop: '1px solid var(--border)', color: 'var(--text-2)' }}>
                  {crew.bio}
                </p>
              )}
            </div>

            <div className="card p-5">
              <h2 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                <Shield size={14} className="text-sc-400" /> Credentials &amp; compliance
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { label: 'Licensed', val: crew.licensed, detail: crew.license_number ? `${crew.license_state} ${crew.license_number}` : undefined },
                  { label: 'Insured', val: crew.insured },
                  { label: 'Bonded', val: crew.bonded },
                  { label: 'SAM.gov', val: crew.sam_gov, detail: crew.sam_gov_id },
                  { label: 'Military base access', val: crew.military_base_access },
                ].map(c => (
                  <div key={c.label} className="rounded-xl p-3" style={{ background: 'var(--bg-3)', border: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${c.val ? 'bg-emerald-400' : 'bg-gray-600'}`} />
                      <span className="text-xs font-medium" style={{ color: 'var(--text-2)' }}>{c.label}</span>
                    </div>
                    <p className="text-xs" style={{ color: c.val ? 'var(--text-1)' : 'var(--text-3)' }}>
                      {c.val ? (c.detail ?? 'Confirmed') : 'Not on file'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h2 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                <Briefcase size={14} className="text-sc-400" /> Services offered
              </h2>
              <div className="flex flex-wrap gap-2 mb-3">
                {crew.trades.filter(t => t.verified).map(t => (
                  <span key={t.name} className="pill-verified">{t.name} {t.job_count > 0 && `(${t.job_count})`}</span>
                ))}
              </div>
              {crew.trades.some(t => !t.verified) && (
                <>
                  <p className="text-xs mb-2" style={{ color: 'var(--text-3)' }}>Self-reported — not yet confirmed by a peer</p>
                  <div className="flex flex-wrap gap-2">
                    {crew.trades.filter(t => !t.verified).map(t => <span key={t.name} className="pill-claimed">{t.name}</span>)}
                  </div>
                </>
              )}
            </div>

            <div className="card p-5">
              <h2 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                <Award size={14} className="text-sc-400" /> Certifications
              </h2>
              <div className="space-y-2.5">
                {crew.certifications.map(cert => (
                  <div key={cert.name} className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>{cert.name}</p>
                      <p className="text-xs" style={{ color: 'var(--text-3)' }}>{cert.issuer}{cert.expires && ` · Expires ${cert.expires}`}</p>
                    </div>
                    {cert.verified && <span className="badge-green flex-shrink-0"><CheckCircle size={9} />Verified</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h2 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                <Wrench size={14} className="text-sc-400" /> Equipment on hand
              </h2>
              <div className="flex flex-wrap gap-2">
                {crew.equipment.map(e => (
                  <span key={e} className="text-xs px-2.5 py-1 rounded-lg" style={{ background: 'var(--bg-3)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>{e}</span>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                  <Star size={14} className="text-sc-400" /> Peer reviews
                  <span className="ml-1 text-xs font-normal" style={{ color: 'var(--text-3)' }}>{crew.review_count} verified</span>
                </h2>
                {!isOwn && (
                  <button onClick={() => setShowReview(true)}
                    className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors hover:border-sc-500 hover:text-sc-400"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-3)' }}>
                    <Star size={11} /> Leave a review
                  </button>
                )}
              </div>
              {reviewDone && (
                <div className="flex items-center gap-2 p-3 rounded-xl mb-3 border border-emerald-500/30 bg-emerald-500/10">
                  <CheckCircle size={14} className="text-emerald-400" />
                  <p className="text-xs text-emerald-400">Your review has been submitted and is pending moderation.</p>
                </div>
              )}
              <div className="space-y-4">
                {crew.reviews.map(r => (
                  <div key={r.id} className="rounded-xl p-4" style={{ background: 'var(--bg-3)', border: '1px solid var(--border)' }}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-sc-600/10 flex items-center justify-center text-sc-300 text-xs font-semibold">
                          {r.reviewer.split(' ').map((word) => word[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-medium" style={{ color: 'var(--text-1)' }}>{r.reviewer}</p>
                          <p className="text-xs" style={{ color: 'var(--text-3)' }}>{r.relationship} · {timeAgo(r.date)}</p>
                        </div>
                      </div>
                      <span className="text-xs" style={{ color: 'var(--text-3)' }}>{r.value}</span>
                    </div>
                    <p className="text-xs mb-2" style={{ color: 'var(--text-3)' }}>{r.project}</p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className={`badge text-xs ${r.hire_again === 'yes' ? 'badge-green' : r.hire_again === 'maybe' ? 'badge-amber' : 'badge-red'}`}>
                        {r.hire_again === 'yes' ? 'Would hire again' : r.hire_again === 'maybe' ? 'Maybe' : 'Would not rehire'}
                      </span>
                      <span className={`badge text-xs ${r.timeline === 'yes' ? 'badge-green' : 'badge-amber'}`}>Timeline: {r.timeline}</span>
                      <span className={`badge text-xs ${r.scope === 'yes' ? 'badge-green' : 'badge-amber'}`}>Scope: {r.scope}</span>
                    </div>
                    {r.notes && <p className="text-xs italic" style={{ color: 'var(--text-2)' }}>&ldquo;{r.notes}&rdquo;</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="card p-5 text-center">
              <p className="eyebrow mb-3">ClearScore</p>
              <div className={`inline-flex flex-col items-center px-6 py-4 rounded-2xl ${crew.clearscore >= 75 ? 'bg-emerald-500/10' : crew.clearscore >= 40 ? 'bg-amber-500/10' : 'bg-red-500/10'}`}>
                <span className="text-4xl font-bold">{crew.clearscore}</span>
                <span className="text-xs font-medium mt-0.5 opacity-80">out of 100</span>
              </div>
              <div className="mt-4 space-y-2.5">
                {[['Reliability', avgR], ['Quality', avgQ], ['Communication', avgC]].map(([l, v]) => (
                  <div key={l as string}>
                    <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--text-2)' }}>
                      <span>{l}</span><span className="font-medium">{v}/5</span>
                    </div>
                    <div className="score-bar">
                      <div className="h-1.5 rounded-full bg-sc-500" style={{ width: `${(Number(v) / 5) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                <p className={`text-2xl font-bold ${hireAgain >= 60 ? 'text-emerald-400' : hireAgain >= 30 ? 'text-amber-400' : 'text-red-400'}`}>{hireAgain}%</p>
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>would hire again</p>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="rounded-lg p-2 text-center" style={{ background: 'var(--bg-3)' }}>
                  <p className="text-sm font-bold" style={{ color: 'var(--text-1)' }}>{crew.on_time_rate}%</p>
                  <p className="text-xs" style={{ color: 'var(--text-3)' }}>on-time</p>
                </div>
                <div className="rounded-lg p-2 text-center" style={{ background: 'var(--bg-3)' }}>
                  <p className="text-sm font-bold" style={{ color: 'var(--text-1)' }}>{crew.review_count}</p>
                  <p className="text-xs" style={{ color: 'var(--text-3)' }}>reviews</p>
                </div>
              </div>
            </div>

            <div className="card p-4 space-y-2">
              {isOwn ? (
                <button onClick={() => window.location.href = '/settings'} className="btn btn-ghost w-full">
                  Edit profile
                </button>
              ) : requested ? (
                <div className="text-center py-3">
                  <CheckCircle size={22} className="text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>Request sent</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>You will be notified when they respond</p>
                </div>
              ) : (
                <button onClick={() => setShowRequest(true)} className="btn-primary w-full">
                  Request this crew
                </button>
              )}

              {!isOwn && !reviewDone && (
                <button onClick={() => setShowReview(true)}
                  className="btn btn-ghost w-full flex items-center justify-center gap-2">
                  <Star size={13} /> Leave a review
                </button>
              )}
              {!isOwn && (
                <p className="text-xs text-center" style={{ color: 'var(--text-3)' }}>
                  Reviews require a verified connection
                </p>
              )}
            </div>

            <div className="card p-4">
              <p className="eyebrow mb-2">Availability</p>
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${crew.availability === 'available' ? 'bg-emerald-400' : crew.availability === 'limited' ? 'bg-amber-400' : 'bg-gray-600'}`} />
                <span className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>{crew.availability === 'available' ? 'Available' : crew.availability === 'limited' ? 'Limited' : 'Unavailable'}</span>
              </div>
              {crew.availability_note && (
                <p className="text-xs" style={{ color: 'var(--text-2)' }}>{crew.availability_note}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function RequestModal({ crew, onClose, onSend }: { crew: Crew; onClose: () => void; onSend: () => void }) {
  const [form, setForm] = useState({ type: '', location: '', date: '', message: '' })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div className="card-md w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold" style={{ color: 'var(--text-1)' }}>Request {crew.name}</h2>
          <button onClick={onClose} style={{ color: 'var(--text-3)' }}><X size={18} /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="label">Project type</label>
            <select className="input" value={form.type} onChange={e => set('type', e.target.value)}>
              <option value="">Select…</option>
              {['Concrete flatwork','Foundation','Electrical rough-in','HVAC install','AV integration','IT / Cabling','Roofing','Other'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Project location</label>
            <input className="input" placeholder="City, State" value={form.location} onChange={e => set('location', e.target.value)} />
          </div>
          <div>
            <label className="label">Estimated start</label>
            <input className="input" type="date" value={form.date} onChange={e => set('date', e.target.value)} />
          </div>
          <div>
            <label className="label">Message ({200 - form.message.length} chars)</label>
            <textarea className="input resize-none" rows={3} maxLength={200}
              placeholder="Brief description of the project and why you're reaching out…"
              value={form.message} onChange={e => set('message', e.target.value)} />
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="btn btn-ghost flex-1">Cancel</button>
          <button onClick={onSend} className="btn-primary flex-1">Send request</button>
        </div>
        <p className="text-xs text-center mt-2" style={{ color: 'var(--text-3)' }}>They see your profile before accepting.</p>
      </div>
    </div>
  )
}

function ReviewModal({ crew, onClose, onSend }: { crew: Crew; onClose: () => void; onSend: () => void }) {
  const [form, setForm] = useState({
    relationship: '', project: '', value: '',
    reliability: 0, quality: 0, communication: 0,
    timeline: '', scope: '', hire_again: '', notes: ''
  })
  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }))

  function Stars({ field }: { field: 'reliability' | 'quality' | 'communication' }) {
    return (
      <div className="flex gap-1.5">
        {[1,2,3,4,5].map(n => (
          <button key={n} type="button" onClick={() => set(field, n)}
            className="w-8 h-8 rounded-lg border text-sm font-semibold transition-all"
            style={{
              background: n <= form[field] ? '#4f46e5' : 'var(--bg-3)',
              color: n <= form[field] ? '#fff' : 'var(--text-3)',
              borderColor: n <= form[field] ? '#4f46e5' : 'var(--border)',
            }}>
            {n}
          </button>
        ))}
      </div>
    )
  }

  function Tri({ label, field, opts }: { label: string, field: string, opts: string[] }) {
    return (
      <div>
        <label className="label">{label}</label>
        <div className="flex gap-2">
          {opts.map(v => (
            <button key={v} type="button" onClick={() => set(field, v)}
              className="flex-1 py-1.5 rounded-lg border text-xs font-medium transition-all"
              style={{
                background: (form as any)[field] === v ? '#4f46e5' : 'transparent',
                color: (form as any)[field] === v ? '#fff' : 'var(--text-2)',
                borderColor: (form as any)[field] === v ? '#4f46e5' : 'var(--border-2)',
              }}>
              {v}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, overflowY: 'auto' }}>
      <div className="card-md w-full max-w-lg p-6 my-4">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-semibold" style={{ color: 'var(--text-1)' }}>Leave a review for {crew.name}</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>Reviews are moderated before publishing. No personal names in notes.</p>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-3)' }}><X size={18} /></button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Your relationship</label>
              <select className="input" value={form.relationship} onChange={e => set('relationship', e.target.value)}>
                <option value="">Select…</option>
                <option>GC hired sub</option>
                <option>Sub worked for GC</option>
                <option>Peer / partner</option>
                <option>Vendor</option>
              </select>
            </div>
            <div>
              <label className="label">Project value</label>
              <select className="input" value={form.value} onChange={e => set('value', e.target.value)}>
                <option value="">Select…</option>
                {['Under $1k','$1k–$5k','$5k–$15k','$15k–$50k','$50k+'].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="label">Project type</label>
            <input className="input" placeholder="e.g. Commercial electrical rough-in" value={form.project} onChange={e => set('project', e.target.value)} />
          </div>

          <div className="space-y-3">
            <div>
              <label className="label">Reliability</label>
              <Stars field="reliability" />
            </div>
            <div>
              <label className="label">Quality of work</label>
              <Stars field="quality" />
            </div>
            <div>
              <label className="label">Communication</label>
              <Stars field="communication" />
            </div>
          </div>

          <Tri label="Timeline adherence" field="timeline" opts={['yes', 'partial', 'no']} />
          <Tri label="Scope adherence" field="scope" opts={['yes', 'partial', 'no']} />
          <Tri label="Would you hire this crew again?" field="hire_again" opts={['yes', 'maybe', 'no']} />

          <div>
            <label className="label">Notes — optional ({300 - form.notes.length} chars)</label>
            <textarea className="input resize-none" rows={2} maxLength={300}
              placeholder="Brief context. No personal names. Moderated before publishing."
              value={form.notes} onChange={e => set('notes', e.target.value)} />
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="btn btn-ghost flex-1">Cancel</button>
          <button onClick={onSend} disabled={!form.reliability || !form.hire_again} className="btn-primary flex-1">
            Submit review
          </button>
        </div>
      </div>
    </div>
  )
}
