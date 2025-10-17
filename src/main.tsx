import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Detect color vision deficiency preference
// Users can set this via browser extension or URL parameter
const params = new URLSearchParams(window.location.search)
const cvdParam = params.get('cvd')
if (cvdParam === 'protanopia' || cvdParam === 'deuteranopia') {
  document.body.setAttribute('data-cvd', cvdParam)
  localStorage.setItem('cvd-preference', cvdParam)
} else {
  const stored = localStorage.getItem('cvd-preference')
  if (stored === 'protanopia' || stored === 'deuteranopia') {
    document.body.setAttribute('data-cvd', stored)
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
