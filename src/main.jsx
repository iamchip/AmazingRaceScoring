import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Challenge from './Challenge.jsx'

function Root() {
  const path = window.location.pathname;
  if (path === '/challenge' || path === '/challenge/') {
    return <Challenge />;
  }
  return <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
