'use client'
import { useState } from 'react'
import { CREWS, getInitials, availDot } from '@/lib/data'
import { Check, X, MessageSquare, Send } from 'lucide-react'

const MOCK_MSGS = [
  { id: 1, me: false, body: 'Hey — happy to chat about the project in Perry. What are the scope details?', time: '9:14 AM' },
  { id: 2, me: true, body: "It's a 3,000 sqft driveway and parking apron. Targeting May 1 start. What's your availability?", time: '9:22 AM' },
  { id: 3, me: false, body: 'May works. Can we do a quick site walk next week before I quote it?', time: '9:31 AM' },
]

const PENDING = [{
  id: 'req-1',
  company: CREWS[3],
  type: 'Concrete flatwork',
  location: 'Perry, OK',
  message: "We have a 3,000 sqft driveway and parking apron coming up. Saw your profile and work looks solid.",
}]

export default function ConnectionsPage() {
  const [tab, setTab] = useState<'pending' | 'active'>('pending')
  const [active, setActive] = useState<string | null>(null)
  const [msgs, setMsgs] = useState(MOCK_MSGS)
  const [input, setInput] = useState('')
  const [accepted, setAccepted] = useState<string[]>([])
  const [declined, setDeclined] = useState<string[]>([])

  const pending = PENDING.filter(p => !accepted.includes(p.id) && !declined.includes(p.id))
  const activeCrews = CREWS.slice(1, 3)

  function send() {
    if (!input.trim()) return
    setMsgs(m => [...m, { id: m.length + 1, me: true, body: input, time: 'Just now' }])
    setInput('')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <p className="eyebrow mb-2">Connections</p>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>Your network</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-5" style={{ height: 560 }}>
        {/* List */}
        <div className="card flex flex-col overflow-hidden">
          <div className="flex border-b" style={{ borderColor: 'var(--border)' }}>
            {(['pending', 'active'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className="flex-1 py-3 text-sm font-medium capitalize transition-colors"
                style={{ borderBottom: tab === t ? '2px solid #6366f1' : '2px solid transparent', color: tab === t ? '#818cf8' : 'var(--text-3)' }}>
                {t}
                {t === 'pending' && pending.length > 0 && (
                  <span className="ml-1.5 w-4 h-4 bg-amber-500 text-white rounded-full text-xs inline-flex items-center justify-center">{pending.length}</span>
                )}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto">
            {tab === 'pending' && (
              <>
                {pending.length === 0 && <div className="p-6 text-center text-sm" style={{ color: 'var(--text-3)' }}>No pending requests</div>}
                {pending.map(req => (
                  <div key={req.id} className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-full bg-sc-600/10 flex items-center justify-center text-sc-300 text-xs font-semibold">{getInitials(req.company.name)}</div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>{req.company.name}</p>
                        <p className="text-xs" style={{ color: 'var(--text-3)' }}>{req.type} · {req.location}</p>
                      </div>
                    </div>
                    <p className="text-xs italic p-2 rounded-lg mb-3" style={{ background: 'var(--bg-3)', color: 'var(--text-2)' }}>&ldquo;{req.message}&rdquo;</p>
                    <div className="flex gap-2">
                      <button onClick={() => setAccepted(a => [...a, req.id])} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                        <Check size={12} /> Accept
                      </button>
                      <button onClick={() => setDeclined(d => [...d, req.id])} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                        <X size={12} /> Decline
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
            {tab === 'active' && activeCrews.map(c => (
              <button key={c.id} onClick={() => setActive(c.id)}
                className="w-full flex items-center gap-3 p-3 border-b text-left transition-colors"
                style={{ borderColor: 'var(--border)', background: active === c.id ? 'var(--bg-3)' : undefined }}>
                <div className="w-8 h-8 rounded-full bg-sc-600/10 flex items-center justify-center text-sc-300 text-xs font-semibold">{getInitials(c.name)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text-1)' }}>{c.name}</p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-3)' }}>{c.city}, {c.state}</p>
                </div>
                <span className={`w-1.5 h-1.5 rounded-full ${availDot(c.availability)}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Thread */}
        <div className="md:col-span-2 card flex flex-col overflow-hidden">
          {active ? (
            <>
              <div className="p-4 border-b flex items-center gap-3" style={{ borderColor: 'var(--border)' }}>
                <div className="w-8 h-8 rounded-full bg-sc-600/10 flex items-center justify-center text-sc-300 text-xs font-semibold">
                  {getInitials(activeCrews.find(c => c.id === active)?.name ?? '')}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>{activeCrews.find(c => c.id === active)?.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-3)' }}>Connected crew</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {msgs.map(m => (
                  <div key={m.id} className={`flex ${m.me ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs rounded-2xl px-3.5 py-2.5 ${m.me ? 'bg-sc-600 text-white' : ''}`}
                      style={{ background: m.me ? undefined : 'var(--bg-3)', color: m.me ? undefined : 'var(--text-1)' }}>
                      <p className="text-sm leading-relaxed">{m.body}</p>
                      <p className={`text-xs mt-1 ${m.me ? 'text-sc-200' : ''}`} style={{ color: m.me ? undefined : 'var(--text-3)' }}>{m.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t flex gap-2" style={{ borderColor: 'var(--border)' }}>
                <input className="input flex-1" placeholder="Type a message…" value={input}
                  onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} />
                <button onClick={send} className="btn-primary px-3"><Send size={14} /></button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <MessageSquare size={32} className="mb-3" style={{ color: 'var(--text-3)' }} />
              <p className="font-medium" style={{ color: 'var(--text-2)' }}>Select a connection to message</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>Messaging unlocks after a request is accepted</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
