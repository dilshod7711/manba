import { useRef, useState } from 'react';
import { CONFIG } from '../config.js';
import { formatPhone, useScrolled } from '../hooks.js';
import { Icon } from './Icons.jsx';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const NAME_ERROR = 'Ismingizni yozing.';
const PHONE_ERROR = 'Raqamni to’liq yozing: 9 ta raqam.';

async function sendLead(value) {
  if (!CONFIG.leadEndpoint || !/^https?:$/.test(window.location.protocol)) return;
  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), 6000);
  try {
    await fetch(CONFIG.leadEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
      signal: ctrl.signal
    });
  } catch (err) {
    /* network or bot problem: continue to payment */
  } finally {
    clearTimeout(timeout);
  }
}

function Done() {
  return (
    <div className="done">
      <div className="done-box">
        <svg viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="28" /><path d="M17 29l7 7 15-16" /></svg>
        Qabul qilindi
      </div>
    </div>
  );
}

// The form starts empty every time this page opens (it remounts on each visit)
export default function Anketa({ go, onLead }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bad, setBad] = useState({ name: false, phone: false });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const scrolled = useScrolled();

  // A message goes away as soon as the field it was about is fixed
  function onName(e) {
    setName(e.target.value);
    if (e.target.value.trim().length < 2) return;
    setBad((b) => ({ ...b, name: false }));
    setError((msg) => (msg === NAME_ERROR ? '' : msg));
  }

  function onPhone(e) {
    let d = e.target.value.replace(/\D/g, '');
    if (d.startsWith('998') && d.length > 9) d = d.slice(3);
    setPhone(formatPhone(d.slice(0, 9)));
    if (d.length < 9) return;
    setBad((b) => ({ ...b, phone: false }));
    setError((msg) => (msg === PHONE_ERROR ? '' : msg));
  }

  async function submit(e) {
    e.preventDefault();
    const clean = name.trim();
    const digits = phone.replace(/\D/g, '');
    const nameOk = clean.length >= 2;
    const phoneOk = digits.length === 9;
    setBad({ name: !nameOk, phone: !phoneOk });
    if (!nameOk) { setError(NAME_ERROR); nameRef.current.focus(); return; }
    if (!phoneOk) { setError(PHONE_ERROR); phoneRef.current.focus(); return; }
    setError('');

    const value = { name: clean, phone: '+998' + digits };
    setBusy(true);
    // A failed lead must not stop the sale: the admin still gets name and phone with the screenshot
    await sendLead(value);
    onLead(value);
    setDone(true);
    await wait(1100);
    go('tolov');
  }

  return (
    <>
      <header className={'nav' + (scrolled ? ' scrolled' : '')}>
        <div className="wrap bar-grid">
          <button className="back" type="button" onClick={() => go('home')}><Icon name="left" />Orqaga</button>
          <span />
          <span />
        </div>
      </header>
      <main className="page">
        <h1 className="large">Anketani to’ldiring</h1>
        <p className="lead">Marafonga qo’shilish uchun ismingiz va telefon raqamingizni yozing.</p>

        <form className="form" noValidate autoComplete="off" onSubmit={submit}>
          <div className={'field' + (bad.name ? ' bad' : '')}>
            <div className={'box' + (name ? ' filled' : '')}>
              <input ref={nameRef} id="name" name="m_name" type="text" autoComplete="off" autoCapitalize="words"
                placeholder=" " enterKeyHint="next" value={name} onChange={onName} />
              <label htmlFor="name">Ismingizni kiriting</label>
            </div>
          </div>
          <div className={'field' + (bad.phone ? ' bad' : '')}>
            <div className={'box' + (phone ? ' filled' : '')}>
              <span className="pre">+998</span>
              <input ref={phoneRef} id="phone" name="m_phone" type="tel" inputMode="numeric" autoComplete="off"
                placeholder="90 123 45 67" enterKeyHint="done" value={phone} onChange={onPhone} />
              <label htmlFor="phone">Telefon raqamingizni kiriting</label>
            </div>
          </div>
          {error && <p className="f-err" role="alert">{error}</p>}
          <p className="foot">Raqamingiz faqat marafon bo’yicha bog’lanish uchun ishlatiladi.</p>
          <button className="btn btn-lg" type="submit" disabled={busy}>
            {busy ? <><span className="spin" />Yuborilmoqda</> : 'Davom etish'}
          </button>
        </form>
      </main>
      {done && <Done />}
    </>
  );
}
