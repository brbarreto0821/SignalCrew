import { notFound } from 'next/navigation'
import PropertyClient from './PropertyClient'

export async function generateStaticParams() {
  return Object.keys(PROPS).map((id) => ({ id }))
}

const PROPS: Record<string, {
  street: string; city: string; state: string; zip: string
  risk: string; score: number; reports: any[]; summary: any
}> = {
  p1: {
    street: '4821 Elmwood Dr', city: 'Tulsa', state: 'OK', zip: '74105',
    risk: 'high', score: 78,
    summary: { paymentIssue: 75, scope: 75, delay: 75, communication: 100, workAgain: 0, last12: 2, last24: 3, older: 1 },
    reports: [
      { id: 'a', trade: 'General contracting', project: 'Kitchen remodel', value: '$5k–$50k', date: '2025-10', issues: 6, payOk: false, fullOk: false, deposit: true, scope: true, delay: true, comm: 'major', dispute: true, again: 'no', note: 'Significant payment delays. Scope kept expanding. Invoice unpaid after 90 days.' },
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

export default function PropertyPage({ params }: { params: { id: string } }) {
  const prop = PROPS[params.id]
  if (!prop) notFound()

  return <PropertyClient prop={prop} id={params.id} />
}
