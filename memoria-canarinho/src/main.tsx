import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.tsx'
import { CollectionProvider } from './context/CollectionContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { I18nProvider } from './context/I18nContext.tsx'
import { Toaster } from '@/components/ui/sonner'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <HashRouter>
        <AuthProvider>
          <CollectionProvider>
            <App />
            <Toaster position="top-right" duration={2500} />
          </CollectionProvider>
        </AuthProvider>
      </HashRouter>
    </I18nProvider>
  </React.StrictMode>,
)
