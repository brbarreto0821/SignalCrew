import { notFound } from 'next/navigation'
import { CREWS, CURRENT_USER } from '@/lib/data'
import ProfileClient from './ProfileClient'

export async function generateStaticParams() {
  return CREWS.map((crew) => ({ slug: crew.slug }))
}

export default function ProfilePage({ params }: { params: { slug: string } }) {
  const crew = CREWS.find((c) => c.slug === params.slug)
  if (!crew) notFound()

  return <ProfileClient crew={crew} currentUser={CURRENT_USER} />
}