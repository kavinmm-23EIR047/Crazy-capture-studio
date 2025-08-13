import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
 import { HelmetProvider } from "react-helmet-async";
const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
   
    
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
}
