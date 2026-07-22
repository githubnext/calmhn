export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export interface SeasonTheme {
  season: Season
  label: string
  gradient: string
  accentBg: string
  accentBgHover: string
  accentText: string
}

const themes: Record<Season, SeasonTheme> = {
  spring: {
    season: 'spring',
    label: 'Spring',
    gradient: 'rgb(167 243 208)', // emerald-200
    accentBg: 'rgb(167 243 208)', // emerald-200
    accentBgHover: 'rgb(167 243 208)', // emerald-200
    accentText: 'rgb(71 85 105)', // slate-600
  },
  summer: {
    season: 'summer',
    label: 'Summer',
    gradient: 'rgb(254 215 170)', // orange-200
    accentBg: 'rgb(254 215 170)', // orange-200
    accentBgHover: 'rgb(254 215 170)', // orange-200
    accentText: 'rgb(71 85 105)', // slate-600
  },
  autumn: {
    season: 'autumn',
    label: 'Autumn',
    gradient: 'rgb(253 186 116)', // amber-300
    accentBg: 'rgb(253 186 116)', // amber-300
    accentBgHover: 'rgb(253 186 116)', // amber-300
    accentText: 'rgb(71 85 105)', // slate-600
  },
  winter: {
    season: 'winter',
    label: 'Winter',
    gradient: 'rgb(199 210 254)', // indigo-200
    accentBg: 'rgb(199 210 254)', // indigo-200
    accentBgHover: 'rgb(199 210 254)', // indigo-200
    accentText: 'rgb(71 85 105)', // slate-600
  },
}

export function getSeason(date: Date = new Date()): Season {
  const month = date.getMonth() // 0-indexed
  if (month >= 2 && month <= 4) return 'spring'
  if (month >= 5 && month <= 7) return 'summer'
  if (month >= 8 && month <= 10) return 'autumn'
  return 'winter'
}

export function getSeasonTheme(season: Season): SeasonTheme {
  return themes[season]
}

export const allSeasons: Season[] = ['spring', 'summer', 'autumn', 'winter']
