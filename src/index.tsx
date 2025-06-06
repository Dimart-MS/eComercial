import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/app' // Ajustado para importar desde la ubicación correcta
import { AuthProvider } from './contexts/AuthContext'
import { HashRouter } from 'react-router-dom'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Could not find root element to mount to')
}

const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        {/* Render the main App component */}
        <App />
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
)
