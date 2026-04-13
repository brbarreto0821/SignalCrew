'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Check, ArrowRight, Shield, Star, Zap, Globe, Users, Search, ChevronRight, AlertCircle } from 'lucide-react'
import ThemeToggle from '@/components/ui/ThemeToggle'

const INDUSTRIES = [
  'General Contracting','Electrical','Plumbing','HVAC','Concrete','Roofing',
  'AV Integration','Low-Voltage','IT / Networking','Restoration','Steel / Structural',
  'Flooring','Drywall','Painting','Landscaping','Security Systems','Government Subs',
]

const FEATURES = [
  { icon: Search, title: 'Find crews by trade, location, and availability', body: 'Search verified contractors across every service category. Filter by state, city, certifications, and more.' },
  { icon: Shield, title: 'Verified profiles with structured trust signals', body: 'Every profile shows license status, insurance, bonding, SAM.gov registration, ClearScore, and peer-reviewed work history.' },
  { icon: Star, title: 'Peer-sourced reputation — no self-promotion', body: 'Reviews come only from verified contractors who have worked with them. No fake testimonials. No gaming.' },
  { icon: Zap, title: 'Request and connect — messaging unlocks after acceptance', body: 'Send a structured connection request. They review your profile before accepting. Then messaging opens.' },
  { icon: Globe, title: 'Built for every service industry', body: 'Construction, AV, IT, HVAC, restoration, government subs, and more. One network for all field service businesses.' },
  { icon: Users, title: 'Private. Verified. Not a public directory.', body: "Only authenticated verified companies can browse profiles. Never indexed publicly. Your competitors can't see your network." },
]

const ROLE_OPTIONS = [
  { value: 'gc', label: 'General Contractor / Prime', sub: 'I hire subs and need to vet them' },
  { value: 'sub', label: 'Subcontractor / Specialty Trade', sub: 'I want to be found by verified GCs' },
  { value: 'both', label: 'Both GC and Sub', sub: 'I do both depending on the project' },
  { value: 'gov', label: 'Government / Federal Contractor', sub: 'SAM.gov registered, federal work' },
  { value: 'other', label: 'Other / Just curious', sub: '' },
]

const VALUE_OPTIONS = [
  'Finding reliable subs in my area',
  'Vetting subs before I hire',
  'Property / client risk intelligence',
  'Building my own reputation as a sub',
  'Getting found by GCs in my trade',
  'SAM.gov / government sub discovery',
  'Replacing my current referral process',
]

const WAITLIST_API = '/api/waitlist'

export default function LandingPage() {
  type SavedEntry = {
    email: string
    company: string
    submittedAt: string
  }

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [values, setValues] = useState<string[]>([])
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [savedEntries, setSavedEntries] = useState<SavedEntry[]>([])

  const isDuplicate = Boolean(email && company && savedEntries.some(entry =>
    entry.email.toLowerCase() === email.trim().toLowerCase() &&
    entry.company.toLowerCase() === company.trim().toLowerCase()
  ))

  useEffect(() => {
    if (typeof window === 'undefined') return

    const saved = window.localStorage.getItem('signalcrewWaitlist')
    if (!saved) return

    try {
      const entries = JSON.parse(saved)
      if (Array.isArray(entries)) {
        setSavedEntries(entries)
      }
    } catch {
      // ignore invalid local data
    }
  }, [])

  function toggleValue(v: string) {
    setValues(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])
  }

  function hasSavedEntry(emailValue: string, companyValue: string) {
    return savedEntries.some(entry =>
      entry.email.toLowerCase() === emailValue.trim().toLowerCase() &&
      entry.company.toLowerCase() === companyValue.trim().toLowerCase()
    )
  }

  function saveEntry(entry: SavedEntry) {
    const nextEntries = savedEntries.filter(existing =>
      !(existing.email.toLowerCase() === entry.email.toLowerCase() &&
        existing.company.toLowerCase() === entry.company.toLowerCase())
    )
    const updated = [...nextEntries, entry]
    setSavedEntries(updated)
    window.localStorage.setItem('signalcrewWaitlist', JSON.stringify(updated))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    if (!email || !company) {
      setError('Please provide both email and company before submitting.')
      setSubmitting(false)
      return
    }

    if (hasSavedEntry(email, company)) {
      setError('You have already requested early access for this company with this email.')
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch(WAITLIST_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          role: ROLE_OPTIONS.find(r => r.value === role)?.label ?? role,
          state,
          city,
          interested_in: values.join(', ') || 'None selected',
        }),
      })
      const data = await res.json()
      if (res.ok) {
        const payload = {
          email,
          company,
          submittedAt: new Date().toISOString(),
        }
        saveEntry(payload)
        setSubmitted(true)
      } else {
        setError(data?.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>

      <nav className="border-b sticky top-0 z-50 backdrop-blur-sm"
        style={{ borderColor: 'var(--border)', background: 'rgba(15,15,18,0.9)' }}>
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-sc-600 rounded-lg flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="font-semibold text-sm" style={{ color: 'var(--text-1)' }}>Signal Crew</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login"
              className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:border-sc-500"
              style={{ borderColor: 'var(--border-2)', color: 'var(--text-2)' }}>
              Sign in
            </Link>
            <Link href="/dashboard"
              className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:border-sc-500"
              style={{ borderColor: 'var(--border-2)', color: 'var(--text-2)' }}>
              View demo
            </Link>
            <a href="#waitlist" className="btn-primary text-xs px-3 py-1.5">Request access</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-8"
          style={{ borderColor: 'var(--border-2)', color: 'var(--text-2)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Early access — founding members only
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6"
          style={{ color: 'var(--text-1)', lineHeight: 1.1 }}>
          Find trusted professionals<br />
          <span className="text-sc-400">nationwide.</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: 'var(--text-2)' }}>
          Signal Crew is the private network where verified contractors and service providers
          find, vet, and connect with trusted crews — before the job starts.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <a href="#waitlist" className="btn-primary px-6 py-3 text-base gap-2">
            Request early access <ChevronRight size={16} />
          </a>
          <Link href="/login" className="btn btn-ghost px-6 py-3 text-base gap-2">
            Sign in <ArrowRight size={15} />
          </Link>
          <Link href="/dashboard" className="btn btn-ghost px-6 py-3 text-base gap-2">
            Explore the demo <ArrowRight size={15} />
          </Link>
        </div>
        <p className="text-xs mt-5" style={{ color: 'var(--text-3)' }}>
          Verified contractors only · Private network · Not a public directory
        </p>
      </section>

      {/* Industry ticker */}
      <section className="border-y py-5" style={{ borderColor: 'var(--border)' }}>
        <div className="flex gap-3 flex-wrap justify-center max-w-6xl mx-auto px-4">
          {INDUSTRIES.map(i => (
            <span key={i} className="text-xs font-medium px-3 py-1.5 rounded-full"
              style={{ background: 'var(--bg-3)', color: 'var(--text-3)', border: '1px solid var(--border)' }}>
              {i}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <p className="eyebrow mb-3">Why Signal Crew</p>
          <h2 className="text-3xl font-bold" style={{ color: 'var(--text-1)' }}>Everything you need before you hire</h2>
          <p className="mt-3 max-w-xl mx-auto" style={{ color: 'var(--text-2)' }}>
            Stop asking around. Stop getting burned. Get structured, verified intelligence on every crew before you commit.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(f => (
            <div key={f.title} className="card p-5">
              <div className="w-9 h-9 rounded-lg bg-sc-500/10 flex items-center justify-center mb-4">
                <f.icon size={17} className="text-sc-400" />
              </div>
              <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-1)' }}>{f.title}</h3>
              <p className="text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y py-24" style={{ borderColor: 'var(--border)', background: 'var(--bg-2)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="eyebrow mb-3">How it works</p>
          <h2 className="text-3xl font-bold mb-16" style={{ color: 'var(--text-1)' }}>Three steps to a trusted crew</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: '1', title: 'Get verified', body: 'Create your company profile and submit for admin review. Verified within 1–2 business days.' },
              { n: '2', title: 'Search and vet', body: 'Filter by trade, location, certifications, SAM.gov status, and trust score. Review structured peer signals.' },
              { n: '3', title: 'Request and connect', body: 'Send a connection request with project context. They review your profile before accepting. Messaging opens after.' },
            ].map(s => (
              <div key={s.n} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-sc-600 text-white font-bold text-lg flex items-center justify-center mb-4">{s.n}</div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-1)' }}>{s.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.65 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist form */}
      <section className="max-w-2xl mx-auto px-4 py-24" id="waitlist">
        <div className="text-center mb-10">
          <p className="eyebrow mb-3">Early access</p>
          <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Join the founding network</h2>
          <p className="text-sm" style={{ color: 'var(--text-2)' }}>
            We are building Signal Crew with a small group of founding contractors.
            Tell us about yourself and we will reach out within 2 business days.
          </p>
        </div>

        <div className="card-md p-8">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-sc-600/10 flex items-center justify-center mx-auto mb-4">
                <Check size={26} className="text-sc-400" />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-1)' }}>You&apos;re on the list</h3>
              <p className="text-sm mb-6" style={{ color: 'var(--text-2)' }}>
                We will reach out within 2 business days. In the meantime, explore the prototype.
              </p>
              <Link href="/dashboard" className="btn-primary inline-flex items-center gap-2">
                Explore the demo <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl border border-red-500/30 bg-red-500/10">
                  <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                  <p className="text-xs text-red-400">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Your name</label>
                  <input className="input" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div>
                  <label className="label">Company name</label>
                  <input className="input" placeholder="Your business name" value={company} onChange={e => setCompany(e.target.value)} required />
                  {isDuplicate && (
                    <p className="text-xs mt-2" style={{ color: '#f97316' }}>
                      This email and company combination was already submitted. Use a different company or email if you want another request.
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Work email</label>
                  <input className="input" type="email" placeholder="you@business.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div>
                  <label className="label">City</label>
                  <input className="input" placeholder="e.g. Oklahoma City" value={city} onChange={e => setCity(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">State</label>
                  <input className="input" placeholder="e.g. OK, TX, KS" value={state} onChange={e => setState(e.target.value)} />
                </div>
                <div>
                  {/* Empty div to maintain grid layout */}
                </div>
              </div>

              <div>
                <label className="label">Which best describes you?</label>
                <div className="space-y-2">
                  {ROLE_OPTIONS.map(r => (
                    <button key={r.value} type="button" onClick={() => setRole(r.value)}
                      className="w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all"
                      style={{
                        borderColor: role === r.value ? '#4f46e5' : 'var(--border)',
                        background: role === r.value ? 'rgba(79,70,229,0.08)' : 'var(--bg-3)',
                      }}>
                      <div className="w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center"
                        style={{ borderColor: role === r.value ? '#6366f1' : 'var(--border-2)', background: role === r.value ? '#4f46e5' : 'transparent' }}>
                        {role === r.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>{r.label}</p>
                        {r.sub && <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>{r.sub}</p>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label">What interests you most? (select all that apply)</label>
                <div className="flex flex-wrap gap-2">
                  {VALUE_OPTIONS.map(v => (
                    <button key={v} type="button" onClick={() => toggleValue(v)}
                      className="text-xs px-3 py-1.5 rounded-full border font-medium transition-all"
                      style={{
                        background: values.includes(v) ? '#4f46e5' : 'transparent',
                        color: values.includes(v) ? '#fff' : 'var(--text-2)',
                        borderColor: values.includes(v) ? '#4f46e5' : 'var(--border-2)',
                      }}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={submitting || !email || !name || !role || isDuplicate}
                className="btn-primary w-full text-base py-3 gap-2">
                {submitting ? 'Submitting…' : <span className="flex items-center justify-center gap-2">Request early access <ChevronRight size={16} /></span>}
              </button>

              <p className="text-xs text-center" style={{ color: 'var(--text-3)' }}>
                No credit card. No commitment. We verify your business before granting access.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-sc-600 rounded-md flex items-center justify-center">
              <Zap size={12} className="text-white" />
            </div>
            <span className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>Signal Crew</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-3)' }}>Private network · Verified contractors only · Not a public directory</p>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/dashboard" className="text-xs" style={{ color: 'var(--text-3)' }}>Explore demo →</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
