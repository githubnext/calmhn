import { useEffect, useState, type ReactNode } from 'react'
import { themes, STORAGE_KEY, type Theme } from './themeConfig'
import { ThemeContext } from './themes'

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && themes.some(t => t.id === stored)) {
      return stored as Theme
    }
  } catch {
    // localStorage unavailable
  }
  return 'default'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // localStorage unavailable
    }
  }, [theme])

  const setTheme = (t: Theme) => setThemeState(t)

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
