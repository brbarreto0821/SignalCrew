'use client'
import { useState } from 'react'
import { CURRENT_USER } from '@/lib/data'
import { Check, Plus, X, CheckCircle } from 'lucide-react'

type Tab = 'profile' | 'services' | 'credentials' | 'availability' | 'billing'

const TABS: { key: Tab; label: string }[] = [
  { key: 'profile', label: 'Company profile' },
  { key: 'services', label: 'Services & trades' },
  { key: 'credentials', label: 'Credentials' },
  { key: 'availability', label: 'Availability' },
  { key: 'billing', label: 'Billing & plan' },
]

const TRADE_OPTIONS = [
  'AV / Low-voltage', 'Concrete', 'Drywall', 'Electrical', 'Flooring', 'Framing',
  'General contracting', 'HVAC', 'IT / Networking', 'Insulation', 'Landscaping',
  'Masonry', 'Painting', 'Plumbing', 'Restoration', 'Roofing', 'Security Systems',
  'Steel / Structural', 'Windows / Doors',
]

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>('profile')
  const [saved, setSaved] = useState(false)
  const [equipInput, setEquipInput] = useState('')

  // Editable state seeded from mock data
  const [profile, setProfile] = useState({
    name: CURRENT_USER.name,
    tagline: CURRENT_USER.tagline,
    bio: CURRENT_USER.bio,
    city: CURRENT_USER.city,
    state: CURRENT_USER.state,
    zip: CURRENT_USER.zip,
    website: '',
    phone: '',
    email: '',
    employee_range: CURRENT_USER.employee_range,
    years_experience: CURRENT_USER.years_experience,
  })

  const [trades, setTrades] = useState(CURRENT_USER.trades.map(t => t.name))
  const [primaryTrade, setPrimaryTrade] = useState(CURRENT_USER.primary_trade)
  const [equipment, setEquipment] = useState([...CURRENT_USER.equipment])

  const [creds, setCreds] = useState({
    licensed: CURRENT_USER.licensed,
    license_number: CURRENT_USER.license_number ?? '',
    license_state: CURRENT_USER.license_state ?? '',
    insured: CURRENT_USER.insured,
    bonded: CURRENT_USER.bonded,
    sam_gov: CURRENT_USER.sam_gov,
    sam_gov_id: CURRENT_USER.sam_gov_id ?? '',
    military_base_access: CURRENT_USER.military_base_access,
  })

  const [availability, setAvailability] = useState({
    status: CURRENT_USER.availability,
    note: CURRENT_USER.availability_note,
  })

  function save() {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  function toggleTrade(t: string) {
    setTrades(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }

  function addEquipment() {
    if (equipInput.trim()) {
      setEquipment(e => [...e, equipInput.trim()])
      setEquipInput('')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <p className="eyebrow mb-2">Settings</p>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>Account &amp; profile</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>Manage your company profile, services, and subscription.</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 p-3 rounded-xl mb-4 border border-emerald-500/30 bg-emerald-500/10">
          <CheckCircle size={15} className="text-emerald-400" />
          <p className="text-sm text-emerald-400 font-medium">Changes saved successfully</p>
        </div>
      )}

      <div className="flex gap-5">
        {/* Sidebar nav */}
        <div className="w-44 flex-shrink-0">
          <nav className="space-y-1">
            {TABS.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors"
                style={{
                  background: tab === t.key ? 'rgba(79,70,229,0.1)' : 'transparent',
                  color: tab === t.key ? '#818cf8' : 'var(--text-2)',
                  fontWeight: tab === t.key ? 500 : 400,
                }}>
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">

          {/* Profile tab */}
          {tab === 'profile' && (
            <div className="card p-6 space-y-4">
              <h2 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-1)' }}>Company profile</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="label">Company name</label>
                  <input className="input" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div className="col-span-2">
                  <label className="label">Tagline (one line)</label>
                  <input className="input" placeholder="e.g. Commercial concrete for GCs across Oklahoma" value={profile.tagline} onChange={e => setProfile(p => ({ ...p, tagline: e.target.value }))} />
                </div>
                <div className="col-span-2">
                  <label className="label">Bio ({500 - profile.bio.length} chars left)</label>
                  <textarea className="input resize-none" rows={4} maxLength={500} value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} />
                </div>
                <div>
                  <label className="label">City</label>
                  <input className="input" value={profile.city} onChange={e => setProfile(p => ({ ...p, city: e.target.value }))} />
                </div>
                <div>
                  <label className="label">State</label>
                  <input className="input" value={profile.state} onChange={e => setProfile(p => ({ ...p, state: e.target.value }))} />
                </div>
                <div>
                  <label className="label">ZIP code</label>
                  <input className="input" value={profile.zip} onChange={e => setProfile(p => ({ ...p, zip: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Website (optional)</label>
                  <input className="input" placeholder="https://" value={profile.website} onChange={e => setProfile(p => ({ ...p, website: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Business phone</label>
                  <input className="input" placeholder="(555) 000-0000" value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Contact email</label>
                  <input className="input" type="email" placeholder="you@business.com" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Team size</label>
                  <select className="input" value={profile.employee_range} onChange={e => setProfile(p => ({ ...p, employee_range: e.target.value }))}>
                    {['1', '2–5', '6–15', '16–50', '50+'].map(r => <option key={r} value={r}>{r} employees</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Years in business</label>
                  <input className="input" type="number" min={0} max={100} value={profile.years_experience} onChange={e => setProfile(p => ({ ...p, years_experience: Number(e.target.value) }))} />
                </div>
              </div>
              <div className="pt-2">
                <button onClick={save} className="btn-primary">Save changes</button>
              </div>
            </div>
          )}

          {/* Services tab */}
          {tab === 'services' && (
            <div className="space-y-4">
              <div className="card p-6">
                <h2 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-1)' }}>Services &amp; trades</h2>
                <p className="text-xs mb-4" style={{ color: 'var(--text-3)' }}>
                  Select all services your company performs. Trades marked <span className="text-sc-400">verified</span> are confirmed by peer reviews after you join.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {TRADE_OPTIONS.map(t => (
                    <button key={t} type="button" onClick={() => toggleTrade(t)}
                      className="text-xs px-3 py-1.5 rounded-full border font-medium transition-all"
                      style={{
                        background: trades.includes(t) ? '#4f46e5' : 'transparent',
                        color: trades.includes(t) ? '#fff' : 'var(--text-2)',
                        borderColor: trades.includes(t) ? '#4f46e5' : 'var(--border-2)'
                      }}>
                      {t}
                    </button>
                  ))}
                </div>
                {trades.length > 0 && (
                  <div>
                    <label className="label">Primary trade</label>
                    <select className="input max-w-xs" value={primaryTrade} onChange={e => setPrimaryTrade(e.target.value)}>
                      {trades.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                )}
              </div>

              <div className="card p-6">
                <h2 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-1)' }}>Equipment on hand</h2>
                <p className="text-xs mb-3" style={{ color: 'var(--text-3)' }}>List key equipment you own or have regular access to.</p>
                <div className="flex gap-2 mb-3">
                  <input className="input flex-1" placeholder="e.g. Plate compactor" value={equipInput}
                    onChange={e => setEquipInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addEquipment())} />
                  <button type="button" onClick={addEquipment} className="btn btn-ghost px-3">Add</button>
                </div>
                {equipment.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {equipment.map(item => (
                      <span key={item} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs"
                        style={{ background: 'var(--bg-3)', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                        {item}
                        <button type="button" onClick={() => setEquipment(e => e.filter(x => x !== item))}
                          style={{ color: 'var(--text-3)' }}><X size={11} /></button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-1">
                <button onClick={save} className="btn-primary">Save changes</button>
              </div>
            </div>
          )}

          {/* Credentials tab */}
          {tab === 'credentials' && (
            <div className="card p-6 space-y-5">
              <h2 className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>Credentials &amp; compliance</h2>

              <div className="grid grid-cols-1 gap-5">
                {/* Licensed */}
                <div className="rounded-xl p-4" style={{ background: 'var(--bg-3)', border: '1px solid var(--border)' }}>
                  <label className="flex items-center gap-2 cursor-pointer mb-3">
                    <input type="checkbox" checked={creds.licensed} onChange={e => setCreds(c => ({ ...c, licensed: e.target.checked }))} />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>Licensed contractor</span>
                  </label>
                  {creds.licensed && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="label">License number</label>
                        <input className="input" placeholder="e.g. OK-CM-4421" value={creds.license_number} onChange={e => setCreds(c => ({ ...c, license_number: e.target.value }))} />
                      </div>
                      <div>
                        <label className="label">License state</label>
                        <input className="input" placeholder="e.g. OK" value={creds.license_state} onChange={e => setCreds(c => ({ ...c, license_state: e.target.value }))} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Insured */}
                <div className="rounded-xl p-4" style={{ background: 'var(--bg-3)', border: '1px solid var(--border)' }}>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={creds.insured} onChange={e => setCreds(c => ({ ...c, insured: e.target.checked }))} />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>General liability insurance</span>
                  </label>
                </div>

                {/* Bonded */}
                <div className="rounded-xl p-4" style={{ background: 'var(--bg-3)', border: '1px solid var(--border)' }}>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={creds.bonded} onChange={e => setCreds(c => ({ ...c, bonded: e.target.checked }))} />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>Bonded</span>
                  </label>
                </div>

                {/* SAM.gov */}
                <div className="rounded-xl p-4" style={{ background: 'var(--bg-3)', border: '1px solid var(--border)' }}>
                  <label className="flex items-center gap-2 cursor-pointer mb-3">
                    <input type="checkbox" checked={creds.sam_gov} onChange={e => setCreds(c => ({ ...c, sam_gov: e.target.checked }))} />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>SAM.gov registered (federal contracting)</span>
                  </label>
                  {creds.sam_gov && (
                    <div>
                      <label className="label">CAGE code / UEI</label>
                      <input className="input max-w-xs" placeholder="e.g. CAGE-8XY42" value={creds.sam_gov_id} onChange={e => setCreds(c => ({ ...c, sam_gov_id: e.target.value }))} />
                    </div>
                  )}
                </div>

                {/* Military */}
                <div className="rounded-xl p-4" style={{ background: 'var(--bg-3)', border: '1px solid var(--border)' }}>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={creds.military_base_access} onChange={e => setCreds(c => ({ ...c, military_base_access: e.target.checked }))} />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>Military base access / PIV eligible</span>
                  </label>
                </div>
              </div>

              <div className="pt-1">
                <button onClick={save} className="btn-primary">Save changes</button>
              </div>
            </div>
          )}

          {/* Availability tab */}
          {tab === 'availability' && (
            <div className="card p-6 space-y-5">
              <h2 className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>Availability</h2>
              <p className="text-sm" style={{ color: 'var(--text-2)' }}>Keep this updated so GCs know when to reach out.</p>

              <div>
                <label className="label">Current availability</label>
                <div className="grid grid-cols-3 gap-3">
                  {([['available', 'bg-emerald-400', 'Available now'], ['limited', 'bg-amber-400', 'Limited'], ['unavailable', 'bg-gray-500', 'Unavailable']] as [string, string, string][]).map(([v, dot, label]) => (
                    <button key={v} type="button" onClick={() => setAvailability(a => ({ ...a, status: v as any }))
                    }
                      className="p-3 rounded-xl border text-sm text-center transition-all"
                      style={{
                        borderColor: availability.status === v ? '#4f46e5' : 'var(--border)',
                        background: availability.status === v ? 'rgba(79,70,229,0.1)' : 'var(--bg-3)',
                        color: availability.status === v ? '#818cf8' : 'var(--text-2)',
                      }}>
                      <div className={`w-2 h-2 rounded-full ${dot} mx-auto mb-1.5`} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label">Availability note (shown on profile)</label>
                <input className="input" placeholder="e.g. Booking jobs starting May 1. Crew of 3 available."
                  value={availability.note} onChange={e => setAvailability(a => ({ ...a, note: e.target.value }))} />
              </div>

              <div className="pt-1">
                <button onClick={save} className="btn-primary">Save changes</button>
              </div>
            </div>
          )}

          {/* Billing tab */}
          {tab === 'billing' && (
            <div className="space-y-4">
              <div className="card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow mb-2">Current plan</p>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Pro — Founding Member</h2>
                      <span className="badge-green">Active</span>
                    </div>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>$49 / month · Locked in for life · Renews May 1, 2026</p>
                  </div>
                  <button className="btn btn-ghost text-sm">Manage billing</button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Founding */}
                <div className="card p-5" style={{ borderColor: '#4f46e5', borderWidth: 2 }}>
                  <p className="eyebrow mb-2">Founding member</p>
                  <p className="text-3xl font-bold mb-0.5" style={{ color: 'var(--text-1)' }}>$49<span className="text-base font-normal" style={{ color: 'var(--text-3)' }}>/mo</span></p>
                  <p className="text-xs mb-4" style={{ color: 'var(--text-3)' }}>Locked in forever</p>
                  <ul className="space-y-2">
                    {['Unlimited searches', 'Connection requests', 'Submit peer reviews', 'Full ClearScore', 'Priority support'].map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-2)' }}>
                        <Check size={12} className="text-emerald-400 flex-shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 px-3 py-2 rounded-lg text-xs font-medium text-center" style={{ background: 'var(--bg-3)', color: 'var(--text-3)' }}>
                    Your current plan
                  </div>
                </div>

                {/* Standard */}
                <div className="card p-5 opacity-60">
                  <p className="eyebrow mb-2">Standard</p>
                  <p className="text-3xl font-bold mb-0.5" style={{ color: 'var(--text-1)' }}>$69<span className="text-base font-normal" style={{ color: 'var(--text-3)' }}>/mo</span></p>
                  <p className="text-xs mb-4" style={{ color: 'var(--text-3)' }}>After founding period closes</p>
                  <ul className="space-y-2">
                    {['Everything in founding rate', 'Standard onboarding', 'No locked-in pricing'].map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-2)' }}>
                        <Check size={12} className="text-sc-400 flex-shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <button disabled className="btn btn-ghost w-full mt-4 opacity-50 cursor-not-allowed text-xs">Coming soon</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
