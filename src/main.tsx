import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app.tsx'
import './index.css'

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  throw new Error("Element with id 'root' not found.");
}