import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import zarinaPhoto from './assets/zarina.jpg';

// The photo is used as a CSS background in several places (avatar, about card, chat)
document.documentElement.style.setProperty('--zarina', `url("${zarinaPhoto}")`);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
