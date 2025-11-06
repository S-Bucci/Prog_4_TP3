import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CafeteriaProvider } from './cafeteriaContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CafeteriaProvider>
      <App />
    </CafeteriaProvider>
  </StrictMode>,
)