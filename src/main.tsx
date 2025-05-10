import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'

// Define future flags for React Router v7
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
}

// Ensure the root element exists
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Failed to find the root element')
}

// Create root and render
const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Router future={router.future}>
        <App />
      </Router>
    </HelmetProvider>
  </React.StrictMode>
)
