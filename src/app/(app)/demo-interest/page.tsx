'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CREWS, getInitials, scoreBg } from '@/lib/data'
import { Plus, MapPin, Clock, CheckCircle, Shield, ShieldCheck, ChevronRight, X, Zap, Users } from 'lucide-react'

// Mock project needs posted by companies
const MOCK_NEEDS = [
  {
    id: 'n1',
    posted_by: 'Bowhead Federal Services',
    trade: 'AV / Low-voltage',
    location: 'Lawton, OK',
    state: 'OK',
    scope: 'AV system installation across 4 conference rooms at a federal facility near Fort Sill. Full rack integration, display mounting, and control system.',
    timeline: 'May 2026',
    value_range: '$15k–$50k',
    requirements: ['SAM.gov registered', 'Military base access', 'Licensed'],
    posted: '2026-04-08',
    responses: 2,
    status: 'open',
  },
  {
    id: 'n2',
    posted_by: 'Meridian Commercial Build',
    trade: 'Electrical',
    location: 'Oklahoma City, OK',
    state: 'OK',
    scope: 'Commercial electrical rough-in for a 22,000 sqft retail build-out. Panel, service entrance, branch circuits.',
    timeline: 'June 2026',
    value_range: '$15k–$50k',
    requirements: ['Licensed', 'Insured', 'Bonded'],
    posted: '2026-04-07',
    responses: 3,
    status: 'open',
  },
  {
    id: 'n3',
    posted_by: 'Summit Property Group',
    trade: 'Concrete',
    location: 'Tulsa, OK',
    state: 'OK',
    scope: 'Parking lot and apron — approx. 8,000 sqft of 4" reinforced concrete. Demo of existing asphalt included.',
    timeline: 'May 2026',
    value_range: '$50k+',
    requirements: ['Licensed', 'Insured'],
    posted: '2026-04-05',
    responses: 4,
    status: 'open',
  },
]

const TRADES = [
  'AV / Low-voltage','Concrete','Drywall','Electrical','Flooring','Framing',
  'General contracting','HVAC','IT / Networking','Masonry','Painting','Plumbing',
  'Restoration','Roofing','Security Systems','Steel / Structural','Other',
]

type View = 'list' | 'post' | 'detail' | 'success_post' | 'success_interest'

export default function InterestPage() {
  const [view, setView] = useState<View>('list')
  const [selectedNeed, setSelectedNeed] = useState<typeof MOCK_NEEDS[0] | null>(null)
  const [tab, setTab] = useState<'browse' | 'mine'>('browse')

  // Post form state
  const [postForm, setPostForm] = useState({
    trade: '', location: '', state: '', scope: '', timeline: '',
    value_range: '', req_licensed: false, req_insured: false,
    req_bonded: false, req_sam: false, req_military: false,
  })

  // Interest form state
  const [interestForm, setInterestForm] = useState({
    available: '', qualified: '', note: '',
  })

  const setP = (k: string, v: unknown) => setPostForm(f => ({ ...f, [k]: v }))
  const setI = (k: string, v: string) => setInterestForm(f => ({ ...f, [k]: v }))

  if (view === 'success_post') {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-14 h-14 rounded-full bg-sc-600/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={26} className="text-sc-400" />
        </div>
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-1)' }}>Project need posted</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-2)' }}>
          Verified crews matching your trade and location will be able to express interest.
          You&apos;ll review their profiles before deciding who to engage further.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => { setView('list'); setTab('mine') }} className="btn-primary">View my posts</button>
          <button onClick={() => setView('list')} className="btn btn-ghost">Browse all needs</button>
        </div>
      </div>
    )
  }

  if (view === 'success_interest') {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={26} className="text-emerald-400" />
        </div>
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-1)' }}>Interest submitted</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-2)' }}>
          The company will review your profile and qualifications before deciding who to reach out to.
          No pricing submitted — they&apos;ll contact you directly if they want to proceed.
        </p>
        <button onClick={() => setView('list')} className="btn-primary">Back to project needs</button>
      </div>
    )
  }

  if (view === 'post') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button onClick={() => setView('list')} className="text-xs mb-5 inline-flex items-center gap-1" style={{ color: 'var(--text-3)' }}>
          ← Back
        </button>
        <div className="mb-6">
          <p className="eyebrow mb-2">Post a project need</p>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>What are you looking for?</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>
            Verified crews matching your trade and location will see this and express interest.
            No pricing — you review their profiles first.
          </p>
        </div>

        <div className="card p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Trade needed</label>
              <select className="input" value={postForm.trade} onChange={e => setP('trade', e.target.value)} required>
                <option value="">Select…</option>
                {TRADES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Project location</label>
              <input className="input" placeholder="City, State" value={postForm.location} onChange={e => setP('location', e.target.value)} />
            </div>
          </div>

          <div>
            <label className="label">Project scope (high-level, no pricing)</label>
            <textarea className="input resize-none" rows={4}
              placeholder="Describe the type of work, approximate scale, and any key requirements. Do not include pricing or invite bids."
              value={postForm.scope} onChange={e => setP('scope', e.target.value)} />
            <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>
              This is not a bid request. Describe the project scope — crews express interest, you review their profiles.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Estimated timeline</label>
              <input className="input" placeholder="e.g. May 2026" value={postForm.timeline} onChange={e => setP('timeline', e.target.value)} />
            </div>
            <div>
              <label className="label">Rough value range</label>
              <select className="input" value={postForm.value_range} onChange={e => setP('value_range', e.target.value)}>
                <option value="">Select…</option>
                {['Under $5k', '$5k–$15k', '$15k–$50k', '$50k–$100k', 'Over $100k'].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="label">Required credentials (optional)</label>
            <div className="flex flex-wrap gap-2">
              {([
                ['req_licensed', 'Licensed'],
                ['req_insured', 'Insured'],
                ['req_bonded', 'Bonded'],
                ['req_sam', 'SAM.gov registered'],
                ['req_military', 'Military base access'],
              ] as [string, string][]).map(([key, label]) => (
                <button key={key} type="button"
                  onClick={() => setP(key, !(postForm as any)[key])}
                  className="text-xs px-3 py-1.5 rounded-full border font-medium transition-all"
                  style={{
                    background: (postForm as any)[key] ? '#4f46e5' : 'transparent',
                    color: (postForm as any)[key] ? '#fff' : 'var(--text-2)',
                    borderColor: (postForm as any)[key] ? '#4f46e5' : 'var(--border-2)',
                  }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-xl" style={{ background: 'rgba(79,70,229,0.06)', border: '1px solid rgba(79,70,229,0.2)' }}>
            <Zap size={13} className="text-sc-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs" style={{ color: 'var(--text-2)' }}>
              <strong style={{ color: 'var(--text-1)' }}>This is not a bidding platform.</strong> Crews express interest — you review their profiles, qualifications, and reviews before deciding who to engage. Pricing happens outside Signal Crew.
            </p>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setView('list')} className="btn btn-ghost">Cancel</button>
            <button onClick={() => setView('success_post')} className="btn-primary" disabled={!postForm.trade || !postForm.scope}>
              Post project need
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (view === 'detail' && selectedNeed) {
    const relevantCrews = CREWS.filter(c => c.trades.some(t => t.name === selectedNeed.trade)).slice(0, 3)
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button onClick={() => setView('list')} className="text-xs mb-5 inline-flex items-center gap-1" style={{ color: 'var(--text-3)' }}>
          ← Back to project needs
        </button>

        <div className="grid md:grid-cols-3 gap-5">
          {/* Need detail */}
          <div className="md:col-span-2 space-y-4">
            <div className="card p-6">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="badge-blue text-xs">{selectedNeed.trade}</span>
                    <span className="badge-green text-xs">Open</span>
                  </div>
                  <p className="text-xs mb-3" style={{ color: 'var(--text-3)' }}>
                    Posted by <strong style={{ color: 'var(--text-2)' }}>{selectedNeed.posted_by}</strong> · {new Date(selectedNeed.posted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <span className="text-xs flex-shrink-0" style={{ color: 'var(--text-3)' }}>{selectedNeed.responses} crews interested</span>
              </div>

              <div className="flex items-center gap-4 mb-4 flex-wrap text-xs" style={{ color: 'var(--text-3)' }}>
                <span className="flex items-center gap-1"><MapPin size={10} />{selectedNeed.location}</span>
                <span className="flex items-center gap-1"><Clock size={10} />Timeline: {selectedNeed.timeline}</span>
                <span>{selectedNeed.value_range}</span>
              </div>

              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-2)' }}>{selectedNeed.scope}</p>

              {selectedNeed.requirements.length > 0 && (
                <div>
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-3)' }}>Required credentials</p>
                  <div className="flex gap-2 flex-wrap">
                    {selectedNeed.requirements.map(r => <span key={r} className="badge-blue text-xs">{r}</span>)}
                  </div>
                </div>
              )}
            </div>

            {/* Express interest form */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-1)' }}>Express interest</h3>
              <p className="text-xs mb-4" style={{ color: 'var(--text-3)' }}>
                No pricing. They will review your profile and reach out if they want to proceed.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="label">Are you available for this timeline?</label>
                  <div className="flex gap-2">
                    {['Yes', 'Possibly — let\'s discuss', 'No'].map(v => (
                      <button key={v} type="button" onClick={() => setI('available', v)}
                        className="flex-1 py-2 rounded-lg border text-xs font-medium transition-all"
                        style={{
                          background: interestForm.available === v ? '#4f46e5' : 'transparent',
                          color: interestForm.available === v ? '#fff' : 'var(--text-2)',
                          borderColor: interestForm.available === v ? '#4f46e5' : 'var(--border-2)',
                        }}>
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="label">Do you meet the listed requirements?</label>
                  <div className="flex gap-2">
                    {['Yes — fully qualified', 'Partially', 'No'].map(v => (
                      <button key={v} type="button" onClick={() => setI('qualified', v)}
                        className="flex-1 py-2 rounded-lg border text-xs font-medium transition-all"
                        style={{
                          background: interestForm.qualified === v ? '#4f46e5' : 'transparent',
                          color: interestForm.qualified === v ? '#fff' : 'var(--text-2)',
                          borderColor: interestForm.qualified === v ? '#4f46e5' : 'var(--border-2)',
                        }}>
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="label">Brief note (optional, 200 chars)</label>
                  <textarea className="input resize-none" rows={2} maxLength={200}
                    placeholder="Any relevant context — e.g. similar projects, crew size, relevant certifications not on profile."
                    value={interestForm.note} onChange={e => setI('note', e.target.value)} />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={() => setView('success_interest')}
                  disabled={!interestForm.available || !interestForm.qualified}
                  className="btn-primary flex-1">
                  Submit interest — they review my profile
                </button>
              </div>
              <p className="text-xs text-center mt-2" style={{ color: 'var(--text-3)' }}>
                No pricing submitted. They see your full Signal Crew profile.
              </p>
            </div>
          </div>

          {/* Matching crews sidebar */}
          <div>
            <div className="card p-4">
              <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-3)' }}>Verified crews for this trade</p>
              <div className="space-y-3">
                {relevantCrews.map(c => (
                  <Link key={c.id} href={`/demo-profile/${c.slug}`} className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 rounded-full bg-sc-600/10 flex items-center justify-center text-sc-300 text-xs font-semibold flex-shrink-0">
                      {getInitials(c.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate group-hover:text-sc-400 transition-colors" style={{ color: 'var(--text-1)' }}>{c.name}</p>
                      <p className="text-xs" style={{ color: 'var(--text-3)' }}>{c.city}, {c.state}</p>
                    </div>
                    <span className={`badge text-xs ${scoreBg(c.clearscore)}`}>{c.clearscore}</span>
                  </Link>
                ))}
              </div>
              <Link href="/demo-search" className="text-xs mt-3 block text-sc-400 hover:text-sc-300">
                Search all crews →
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default: list view
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <p className="eyebrow mb-2">Project needs</p>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>Project needs</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>
            Post a project need and let qualified crews come to you. No bidding. No pricing. Just interest.
          </p>
        </div>
        <button onClick={() => setView('post')} className="btn-primary flex items-center gap-2">
          <Plus size={15} /> Post a project need
        </button>
      </div>

      {/* Info callout */}
      <div className="flex items-start gap-3 p-4 rounded-xl border mb-6" style={{ borderColor: 'rgba(79,70,229,0.3)', background: 'rgba(79,70,229,0.05)' }}>
        <Zap size={15} className="text-sc-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium mb-0.5" style={{ color: 'var(--text-1)' }}>This is not a bidding platform</p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Companies post a high-level project need. Verified crews express interest — no pricing, no race to the bottom.
            You review their full profiles, qualifications, and peer reviews before deciding who to reach out to directly.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-5" style={{ borderColor: 'var(--border)' }}>
        {[['browse', 'Browse open needs'], ['mine', 'My posts']].map(([t, l]) => (
          <button key={t} onClick={() => setTab(t as any)}
            className="px-4 py-2.5 text-sm font-medium transition-colors"
            style={{
              borderBottom: tab === t ? '2px solid #6366f1' : '2px solid transparent',
              color: tab === t ? '#818cf8' : 'var(--text-3)',
              marginBottom: -1,
            }}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'browse' && (
        <div className="space-y-3">
          {MOCK_NEEDS.map(need => (
            <button key={need.id} onClick={() => { setSelectedNeed(need); setView('detail') }}
              className="card w-full p-5 text-left hover:border-sc-500 transition-all block">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="badge-blue text-xs">{need.trade}</span>
                    <span className="badge-green text-xs">Open</span>
                    {need.requirements.includes('SAM.gov registered') && <span className="badge-blue text-xs"><ShieldCheck size={9} />SAM.gov</span>}
                    {need.requirements.includes('Military base access') && <span className="badge-gray text-xs">Military</span>}
                  </div>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-1)' }}>{need.posted_by}</p>
                  <p className="text-xs mb-2 line-clamp-2" style={{ color: 'var(--text-2)' }}>{need.scope}</p>
                  <div className="flex items-center gap-3 text-xs flex-wrap" style={{ color: 'var(--text-3)' }}>
                    <span className="flex items-center gap-1"><MapPin size={10} />{need.location}</span>
                    <span className="flex items-center gap-1"><Clock size={10} />{need.timeline}</span>
                    <span>{need.value_range}</span>
                    <span className="flex items-center gap-1"><Users size={10} />{need.responses} interested</span>
                  </div>
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-3)' }} className="flex-shrink-0 mt-1" />
              </div>
            </button>
          ))}
        </div>
      )}

      {tab === 'mine' && (
        <div className="card p-12 text-center">
          <Plus size={28} className="mx-auto mb-3" style={{ color: 'var(--text-3)' }} />
          <p className="font-medium" style={{ color: 'var(--text-1)' }}>No project needs posted yet</p>
          <p className="text-sm mt-1 mb-4" style={{ color: 'var(--text-3)' }}>Post a high-level project need and let verified crews find you.</p>
          <button onClick={() => setView('post')} className="btn-primary inline-flex gap-2">
            <Plus size={14} /> Post your first need
          </button>
        </div>
      )}
    </div>
  )
}
