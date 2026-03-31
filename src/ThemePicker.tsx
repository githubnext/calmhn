import { useState, useRef, useEffect } from 'react'
import { Palette, Check } from '@phosphor-icons/react'
import { themes } from './themeConfig'
import { useTheme } from './useTheme'

export default function ThemePicker() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="p-1.5 rounded-md hover:bg-theme-card-hover text-theme-meta hover:text-theme-heading transition-colors duration-200"
        aria-label="Change theme"
        title="Change theme"
      >
        <Palette size={20} weight="regular" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-theme-picker-bg border border-theme-picker-border rounded-lg shadow-lg p-2 flex gap-1.5 z-50">
          {themes.map(t => (
            <button
              key={t.id}
              onClick={() => { setTheme(t.id); setOpen(false) }}
              className="relative w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 cursor-pointer flex items-center justify-center"
              style={{
                backgroundColor: t.swatch,
                borderColor: theme === t.id ? 'var(--color-picker-check)' : 'transparent',
              }}
              aria-label={t.label}
              title={t.label}
            >
              {theme === t.id && (
                <Check
                  size={14}
                  weight="bold"
                  className={t.id === 'dark' ? 'text-white' : 'text-white'}
                  style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
