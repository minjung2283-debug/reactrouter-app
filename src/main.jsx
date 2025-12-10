import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.jsx'
import RoutingBasic from './RoutingBasic.jsx'
import CartApp from './cart/CartApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartApp />
  </StrictMode>,
)
