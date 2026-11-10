import { useEffect, useState } from 'react';
import { START } from './config.js';

const pad = (n) => String(n).padStart(2, '0');

function timeLeft() {
  const left = START - Date.now();
  if (left <= 0) return null;
  return {
    d: Math.floor(left / 864e5),
    h: pad(Math.floor(left / 36e5) % 24),
    m: pad(Math.floor(left / 6e4) % 60),
    s: pad(Math.floor(left / 1e3) % 60)
  };
}

// Countdown to the marathon start; null once it has started
export function useCountdown() {
  const [left, setLeft] = useState(timeLeft);
  useEffect(() => {
    const timer = setInterval(() => {
      const next = timeLeft();
      setLeft(next);
      if (!next) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return left;
}

// Nav hairline when the page is scrolled
export function useScrolled() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 4);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return scrolled;
}

// Adds .in to every [data-reveal] inside the container once it scrolls into view
export function useReveal(ref) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        observer.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    ref.current.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ref]);
}

// True while none of the given elements is on screen
export function useNoneVisible(refs) {
  const [noneVisible, setNoneVisible] = useState(false);
  useEffect(() => {
    const seen = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((en) => (en.isIntersecting ? seen.add(en.target) : seen.delete(en.target)));
      setNoneVisible(seen.size === 0);
    });
    refs.forEach((r) => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, [refs]);
  return noneVisible;
}

export function formatPhone(digits) {
  return [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7), digits.slice(7, 9)].filter(Boolean).join(' ');
}

export function telegramLink(user, text) {
  // Bots open with a start button; people get the ready message
  if (/bot$/i.test(user)) return 'https://t.me/' + user + '?start=tolov';
  return 'https://t.me/' + user + (text ? '?text=' + encodeURIComponent(text) : '');
}
