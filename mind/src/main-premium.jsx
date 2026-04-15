import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppPremium from './AppPremium.jsx'
import './premium.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppPremium />
  </StrictMode>,
)
