import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import { FollowContext } from './context/FollowContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FollowContext>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </FollowContext>
  </StrictMode>,
)
