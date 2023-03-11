import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css"

const { publishableKey } = await fetch('http://localhost:3000/config').then(res => res.json())
const stripePromise = loadStripe(publishableKey)


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />

    </Elements>
  </React.StrictMode>,
)
