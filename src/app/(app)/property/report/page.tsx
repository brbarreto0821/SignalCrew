'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Info } from 'lucide-react'

const CATEGORIES = ['General contracting','Concrete','Electrical','Plumbing','HVAC','Roofing','Framing','Drywall','AV / Low-voltage','IT / Networking','Landscaping','Restoration','Other']

function Tri({ label, value, onChange, opts }: { label: string; value: string; onChange: (v: string) => void; opts: [string,string][] }) {
  return (
    <div>
      <label className="label">{label}</label>
      <div className="flex gap-2">
        {opts.map(([v,l]) => (
          <button key={v} type="button" onClick={() => onChange(v)}
            className="flex-1 py-2 rounded-lg border text-xs font-medium transition-all"
            style={{ background: value === v ? '#4f46e5' : 'var(--bg-3)', color: value === v ? '#fff' : 'var(--text-2)', borderColor: value === v ? '#4f46e5' : 'var(--border)' }}>
            {l}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function PropertyReportPage() {
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    project_type: '', category: '', value: '', date: '', status: '',
    pay_time: '', pay_full: '', deposit: '', scope: '', change_order: '',
    delay: '', comm: '', dispute: '', again: '', notes: ''
  })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setDone(true); setLoading(false) }, 800)
  }

  if (done) return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
        <CheckCircle size={26} className="text-emerald-400" />
      </div>
      <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-1)' }}>Report submitted</h2>
      <p className="text-sm mb-6" style={{ color: 'var(--text-2)' }}>Your report is in the moderation queue and will be published within 24 hours after review.</p>
      <div className="flex gap-3 justify-center">
        <Link href="/property/search" className="btn-primary">Search another address</Link>
        <button onClick={() => setDone(false)} className="btn btn-ghost">Submit another</button>
      </div>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <p className="eyebrow mb-2">Property intelligence</p>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>Submit a property report</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>Structured, moderated, and private. No names or personal info.</p>
      </div>

      <div className="flex items-start gap-2 p-4 rounded-xl border mb-5" style={{ borderColor: '#3730a3', background: 'rgba(79,70,229,0.05)' }}>
        <Info size={13} className="text-sc-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs space-y-0.5" style={{ color: 'var(--text-2)' }}>
          <p>· Do not include homeowner names or personal identifying information</p>
          <p>· Reports are tied to the property address, not to any specific person</p>
          <p>· All reports are moderated before publishing</p>
        </div>
      </div>

      <div className="card p-6">
        <form onSubmit={submit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Project type</label>
              <input className="input" placeholder="e.g. Kitchen remodel" value={form.project_type} onChange={e => set('project_type', e.target.value)} required />
            </div>
            <div>
              <label className="label">Service category</label>
              <select className="input" value={form.category} onChange={e => set('category', e.target.value)} required>
                <option value="">Select…</option>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Contract value</label>
              <select className="input" value={form.value} onChange={e => set('value', e.target.value)} required>
                <option value="">Select range…</option>
                {[['under_1k','Under $1k'],['1k_5k','$1k–$5k'],['5k_15k','$5k–$15k'],['15k_50k','$15k–$50k'],['50k_plus','$50k+']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Work date (approx.)</label>
              <input className="input" type="month" value={form.date} onChange={e => set('date', e.target.value)} required />
            </div>
          </div>

          <Tri label="Completion status" value={form.status} onChange={v => set('status', v)}
            opts={[['completed','Completed'],['incomplete','Incomplete'],['abandoned','Abandoned'],['disputed','Disputed']]} />

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
            <p className="eyebrow mb-4">Risk indicators</p>
            <div className="space-y-4">
              <Tri label="Payment completed on time?" value={form.pay_time} onChange={v => set('pay_time', v)} opts={[['yes','Yes'],['no','No']]} />
              <Tri label="Payment completed in full?" value={form.pay_full} onChange={v => set('pay_full', v)} opts={[['yes','Yes'],['no','No']]} />
              <Tri label="Deposit issue?" value={form.deposit} onChange={v => set('deposit', v)} opts={[['no','No issues'],['yes','Issue occurred']]} />
              <Tri label="Scope expanded beyond agreement?" value={form.scope} onChange={v => set('scope', v)} opts={[['no','Stayed in scope'],['yes','Scope expanded']]} />
              <Tri label="Customer caused delays?" value={form.delay} onChange={v => set('delay', v)} opts={[['no','No delays'],['yes','Caused delays']]} />
              <Tri label="Communication issues?" value={form.comm} onChange={v => set('comm', v)} opts={[['none','None'],['minor','Minor'],['major','Major']]} />
              <Tri label="Dispute occurred?" value={form.dispute} onChange={v => set('dispute', v)} opts={[['no','No'],['yes','Yes']]} />
              <Tri label="Would you work at this address again?" value={form.again} onChange={v => set('again', v)} opts={[['yes','Yes'],['maybe','Maybe'],['no','No']]} />
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
            <label className="label">Notes — optional ({300 - form.notes.length} chars left)</label>
            <textarea className="input resize-none" rows={3} maxLength={300}
              placeholder="Brief context. No homeowner names or personal info. Moderated before publishing."
              value={form.notes} onChange={e => set('notes', e.target.value)} />
          </div>

          <button type="submit" disabled={loading || !form.again} className="btn-primary w-full">
            {loading ? 'Submitting…' : 'Submit for moderation'}
          </button>
        </form>
      </div>
    </div>
  )
}
