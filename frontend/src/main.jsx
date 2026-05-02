import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          gutter={12}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#181818',
              color: '#f5f5f5',
              border: '1px solid #2a2a2a',
              borderRadius: '10px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              padding: '14px 18px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
            },
            success: {
              iconTheme: { primary: '#ff1e1e', secondary: '#f5f5f5' },
              style: {
                border: '1px solid rgba(255,30,30,0.3)',
                boxShadow: '0 8px 32px rgba(255,30,30,0.1)',
              },
            },
            error: {
              iconTheme: { primary: '#ff4444', secondary: '#f5f5f5' },
            },
          }}
        />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
