import { useContext } from 'react'
import { SeasonContext, type SeasonContextValue } from './SeasonContext'

export function useSeasonTheme(): SeasonContextValue {
  const ctx = useContext(SeasonContext)
  if (!ctx) throw new Error('useSeasonTheme must be used within SeasonThemeProvider')
  return ctx
}
