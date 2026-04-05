import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { CollectionProvider } from './context/CollectionContext.tsx'
import { Toaster } from '@/components/ui/sonner'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CollectionProvider>
        <App />
        <Toaster position="top-right" />
      </CollectionProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
