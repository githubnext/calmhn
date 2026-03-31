export type Theme = 'default' | 'dark' | 'forest' | 'ocean'

export interface ThemeOption {
  id: Theme
  label: string
  swatch: string
}

export const themes: ThemeOption[] = [
  { id: 'default', label: 'Default', swatch: '#f59e0b' },
  { id: 'dark', label: 'Dark', swatch: '#1e1e2e' },
  { id: 'forest', label: 'Forest', swatch: '#4ade80' },
  { id: 'ocean', label: 'Ocean', swatch: '#60a5fa' },
]

export const STORAGE_KEY = 'calmhn-theme'
