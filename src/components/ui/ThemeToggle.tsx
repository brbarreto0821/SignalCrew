'use client'
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('sc-theme')
    const isDark = stored !== 'light'
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    localStorage.setItem('sc-theme', next ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <button onClick={toggle} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
      style={{ background: 'var(--bg-3)', color: 'var(--text-2)' }}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
      {dark ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  )
}
