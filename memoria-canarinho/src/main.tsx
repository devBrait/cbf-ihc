import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.tsx'
import { CollectionProvider } from './context/CollectionContext.tsx'
import { Toaster } from '@/components/ui/sonner'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <CollectionProvider>
        <App />
        <Toaster position="top-right" />
      </CollectionProvider>
    </HashRouter>
  </React.StrictMode>,
)
