import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { IsLoggedIn } from './context/IsLoggedIn.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IsLoggedIn>
    <App />
    </IsLoggedIn>
  </StrictMode>,
)
