import { CONFIG } from '../config.js';
import { formatPhone, telegramLink, useScrolled } from '../hooks.js';
import { Icon, PayLogo } from './Icons.jsx';

async function copyText(value, toast) {
  try {
    await navigator.clipboard.writeText(value);
    toast('Karta raqami nusxalandi');
  } catch (err) {
    // Older fallback for pages without clipboard permission
    const area = Object.assign(document.createElement('textarea'), { value, readOnly: true });
    area.style.cssText = 'position:fixed;opacity:0';
    document.body.append(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    toast(ok ? 'Karta raqami nusxalandi' : 'Nusxalab bo’lmadi, qo’lda yozing');
  }
}

function Card({ card, toast }) {
  return (
    <div className="list card">
      <div className="row"><span className="card-k">{card ? card.label : 'Plastik karta'}</span><span className="card-sum">{card ? card.amount : '66 000 so’m'}</span></div>
      <div className="row">
        <span className="row-t">
          {card ? (
            <><span className="card-no">{card.number}</span><span className="card-who">{card.holder}</span></>
          ) : (
            <span className="card-no todo">[Karta raqami kiritilishi kerak]</span>
          )}
        </span>
        {card && (
          <button className="copy" type="button" aria-label="Karta raqamini nusxalash" onClick={() => copyText(card.number.replace(/\s/g, ''), toast)}>
            <Icon name="copy" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function Tolov({ go, lead, toast }) {
  const scrolled = useScrolled();
  const initials = lead.name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const tiles = [['payme', 'Payme'], ['click', 'Click']].filter(([key]) => CONFIG[key]);
  const cards = CONFIG.cards.length ? CONFIG.cards : [null];
  const message = 'Assalomu alaykum! Marafon uchun to’lov qildim.\nIsm: ' + lead.name + '\nTelefon: ' + lead.phone + '\nSkrinshotni yuboryapman.';

  return (
    <>
      <header className={'nav' + (scrolled ? ' scrolled' : '')}>
        <div className="wrap bar-grid">
          <button className="back" type="button" onClick={() => go('anketa')}><Icon name="left" />Anketa</button>
          <span className="bar-title">To’lov</span>
          <span />
        </div>
      </header>
      <main className="page">
        <div className="list">
          <div className="row me">
            <span className="initials">{initials}</span>
            <span className="row-t"><b>{lead.name}</b><span>{'+998 ' + formatPhone(lead.phone.slice(4))}</span></span>
            <button className="edit" type="button" onClick={() => go('anketa')}>O’zgartirish</button>
          </div>
        </div>

        <div className="plan">
          <p className="k">7 kunlik ozish marafoni</p>
          <p className="old-price"><s>147 000 so’m</s><span className="off">−55%</span></p>
          <p className="price">66 000 so’m</p>
          <dl>
            <div><dt>Boshlanishi</dt><dd>26-noyabr</dd></div>
            <div><dt>Davomiyligi</dt><dd>7 kun</dd></div>
          </dl>
        </div>

        <p className="step-h"><span className="num">1</span>Quyidagi kartaga to’lovni amalga oshiring</p>
        {tiles.length > 0 && (
          <div className="tiles">
            {tiles.map(([key, label]) => (
              <a key={key} className="tile" href={CONFIG[key]} target="_blank" rel="noopener" aria-label={label + ' orqali to’lash'}>
                <PayLogo type={key} /><span className="sub">orqali to’lash</span>
              </a>
            ))}
          </div>
        )}
        <div className="cards">
          {cards.map((card, i) => <Card key={i} card={card} toast={toast} />)}
        </div>

        <p className="step-h"><span className="num">2</span>To’lov muvaffaqiyatli o’tganini tasdiqlovchi rasmni saqlab oling (skrinshot)</p>

        <p className="step-h"><span className="num">3</span>Skrinshotni adminga yuboring</p>
        {CONFIG.admin ? (
          <a className="btn btn-lg btn-tg" href={telegramLink(CONFIG.admin, message)} target="_blank" rel="noopener"><Icon name="tg" />Skrinshotni adminga yuborish</a>
        ) : (
          <p className="text-card todo">[Admin Telegram manzili kiritilishi kerak]</p>
        )}

        <div className="help">
          <h3>Yordam kerakmi?</h3>
          <p>Yordamchimiz bilan bog’laning</p>
          {CONFIG.support ? (
            <a className="btn btn-soft" href={telegramLink(CONFIG.support)} target="_blank" rel="noopener"><Icon name="chat" />Yordamchi bilan bog’lanish</a>
          ) : (
            <p className="todo">[Yordamchi Telegram manzili kiritilishi kerak]</p>
          )}
        </div>

        <p className="legal">Barcha huquqlar himoyalangan · 2026</p>
      </main>
    </>
  );
}
