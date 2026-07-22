import { useEffect, useState, type ReactNode } from 'react'
import { getSeason, getSeasonTheme, allSeasons, type Season } from './seasons'
import { SeasonContext } from './SeasonContext'

const STORAGE_KEY = 'calmhn-season'

function loadPreference(): Season | 'auto' {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && (allSeasons as string[]).includes(stored)) return stored as Season
  } catch { /* ignore */ }
  return 'auto'
}

export function SeasonThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<Season | 'auto'>(loadPreference)
  const season = preference === 'auto' ? getSeason() : preference
  const theme = getSeasonTheme(season)

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--season-gradient', theme.gradient)
    root.style.setProperty('--season-accent-bg', theme.accentBg)
    root.style.setProperty('--season-accent-bg-hover', theme.accentBgHover)
    root.style.setProperty('--season-accent-text', theme.accentText)
  }, [theme])

  const setSeason = (value: Season | 'auto') => {
    setPreference(value)
    try {
      if (value === 'auto') {
        localStorage.removeItem(STORAGE_KEY)
      } else {
        localStorage.setItem(STORAGE_KEY, value)
      }
    } catch { /* ignore */ }
  }

  return (
    <SeasonContext.Provider value={{ season, theme, setSeason, isAuto: preference === 'auto' }}>
      {children}
    </SeasonContext.Provider>
  )
}
