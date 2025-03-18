import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importe o BrowserRouter
import App from './App';
import './index.css'
import { Toaster } from "@/components/ui/sonner"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* Envolva o App com o BrowserRouter */}
      <App />
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>
);