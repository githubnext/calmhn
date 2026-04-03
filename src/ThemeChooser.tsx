import { useTheme, type Theme } from './ThemeContext'

const themes: { name: Theme; color: string }[] = [
  { name: 'purple', color: '#a855f7' },
  { name: 'red', color: '#ef4444' },
  { name: 'blue', color: '#3b82f6' },
  { name: 'green', color: '#22c55e' },
]

export default function ThemeChooser() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-1.5">
      {themes.map((t) => (
        <button
          key={t.name}
          onClick={() => setTheme(t.name)}
          aria-label={`${t.name} theme`}
          className={`size-3.5 rounded-full transition-all duration-200 cursor-pointer ${
            theme === t.name
              ? 'ring-2 ring-offset-2 ring-slate-400 scale-110'
              : 'opacity-50 hover:opacity-100 hover:scale-110'
          }`}
          style={{ backgroundColor: t.color }}
        />
      ))}
    </div>
  )
}
