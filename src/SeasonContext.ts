import { createContext } from 'react'
import type { Season, SeasonTheme } from './seasons'

export interface SeasonContextValue {
  season: Season
  theme: SeasonTheme
  setSeason: (season: Season | 'auto') => void
  isAuto: boolean
}

export const SeasonContext = createContext<SeasonContextValue | null>(null)
