import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Signal Crew — Find trusted professionals nationwide.',
  description: 'The private network for verified contractors and service providers. Find, vet, and connect.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){var t=localStorage.getItem('sc-theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}})()`
        }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
