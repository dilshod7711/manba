import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { TITLES } from './config.js';
import { Icon, Sprite } from './components/Icons.jsx';
import Home from './components/Home.jsx';
import Anketa from './components/Anketa.jsx';
import Tolov from './components/Tolov.jsx';

// Lead kept for this browser tab only
function loadLead() {
  try { return JSON.parse(sessionStorage.getItem('lead')); } catch (err) { return null; }
}
function storeLead(value) {
  try { sessionStorage.setItem('lead', JSON.stringify(value)); } catch (err) { /* private mode */ }
}

const hashName = () => window.location.hash.replace('#', '') || 'home';

function resolve(name, lead) {
  if (!TITLES[name]) return 'home';
  if (name === 'tolov' && !lead) return 'anketa';
  return name;
}

// Views: #  /  #anketa  /  #tolov
export default function App() {
  const [lead, setLead] = useState(loadLead);
  const leadRef = useRef(lead);
  const [view, setView] = useState(() => resolve(hashName(), lead));
  const [animate, setAnimate] = useState(false);
  const [toastText, setToastText] = useState('');
  const [toastOn, setToastOn] = useState(false);
  const toastTimer = useRef(null);

  const show = useCallback((name) => {
    const next = resolve(name, leadRef.current);
    setView((current) => {
      if (current !== next) setAnimate(true);
      return next;
    });
  }, []);

  // Switch views in JS so it also works where hash navigation is blocked (previews)
  const go = useCallback((name) => {
    try {
      window.history.pushState(null, '', name === 'home' ? window.location.pathname + window.location.search : '#' + name);
    } catch (err) { /* no history here */ }
    show(name);
  }, [show]);

  useEffect(() => {
    const onNav = () => show(hashName());
    window.addEventListener('popstate', onNav);
    window.addEventListener('hashchange', onNav);
    return () => {
      window.removeEventListener('popstate', onNav);
      window.removeEventListener('hashchange', onNav);
    };
  }, [show]);

  useLayoutEffect(() => {
    document.title = TITLES[view];
    window.scrollTo(0, 0);
  }, [view]);

  const onLead = useCallback((value) => {
    leadRef.current = value;
    setLead(value);
    storeLead(value);
  }, []);

  const toast = useCallback((text) => {
    setToastText(text);
    setToastOn(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastOn(false), 1800);
  }, []);

  const link = (name) => ({
    href: '#' + name,
    onClick: (e) => { e.preventDefault(); go(name); }
  });

  return (
    <>
      <Sprite />
      <div key={view} className={'view' + (animate ? ' enter' : '')}>
        {view === 'home' && <Home link={link} />}
        {view === 'anketa' && <Anketa go={go} onLead={onLead} />}
        {view === 'tolov' && <Tolov go={go} lead={lead} toast={toast} />}
      </div>
      <div className={'toast' + (toastOn ? ' on' : '')} role="status" aria-live="polite">
        <Icon name="check" /><span>{toastText}</span>
      </div>
    </>
  );
}
