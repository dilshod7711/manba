import { useMemo, useRef, useState } from 'react';
import { VIDEO_ID, VIDEO_TITLE } from '../config.js';
import { useNoneVisible, useReveal, useScrolled } from '../hooks.js';
import Countdown from './Countdown.jsx';
import { Icon, PayLogo } from './Icons.jsx';

const FIT = [
  ['Ozganingizdan keyin vazningiz yana qaytsa', 'Dieta tugaydi, oddiy ovqatga qaytasiz va vazn yana joyiga keladi.'],
  ['To’g’ri ovqatlanishni bilmasangiz', 'Har kim har xil maslahat beradi. Qaysi biriga ishonishni bilmay qolasiz.'],
  ['Irodangiz kuchsizlik qilsa', '2–3 kun ushlab turasiz, keyin tashlab qo’yasiz. Sizni nazorat qiladigan odam kerak.'],
  ['Kam xarajat bilan tez ozmoqchi bo’lsangiz', 'Qimmat kursdan oldin mutaxassis bilan 7 kun ishlab ko’rmoqchisiz.']
];

const INCLUDED = [
  ['7 kunlik kurator nazorati', 'Marafon boshidan oxirigacha.'],
  ['Zarina dietologdan onlayn jonli efir', 'Dietologning o’zi o’tkazadi.'],
  ['7 kunlik to’g’ri ovqatlanish tizimi', 'Har kuni nima va qancha yeyish kerakligini aniq bilib, shu tizim bilan ovqatlanasiz.'],
  ['G’oliblar uchun 3 ta katta sovg’a', 'Marafonda eng yaxshi natija ko’rsatgan ishtirokchilar 3 ta katta sovg’a bilan taqdirlanadi.']
];

// Kunlik dastur kelganda 1-kun...7-kun bilan almashtiriladi
const STEPS = [
  ['Hozir', 'Joyingizni band qilasiz', 'Anketani to’ldirasiz, to’lov qilasiz va skrinshotni adminga yuborasiz.'],
  ['26-noyabr', 'Marafon boshlanadi', 'Shu kundan boshlab kurator nazorati ostidasiz.'],
  ['7 kun davomida', 'To’g’ri ovqatlanib ozasiz', 'Marafon mavzusi bitta: ozishga to’g’ri ovqatlanish orqali erishish.'],
  ['Marafon ichida', 'Zarina dietolog bilan jonli efir', 'Zarina dietolog onlayn efirga chiqadi, dietologni to’g’ridan-to’g’ri eshitasiz.']
];

const FAQ = [
  ['Qanday qatnashaman?', 'Anketaga ismingiz va raqamingizni yozasiz, 66 000 so’mni kartaga o’tkazasiz va to’lov skrinshotini adminga yuborasiz.'],
  ['Marafon qachon boshlanadi?', '26-noyabrda boshlanadi va 7 kun davom etadi.'],
  ['Joylar soni cheklanganmi?', 'Ha, marafon 2 000 kishi uchun.'],
  ['Jonli efirni kim o’tkazadi?', 'O’zim o’tkazaman. Marafon davomida bitta onlayn jonli efir bo’ladi.'],
  ['Kasalligim bo’lsa yoki homilador bo’lsam-chi?', 'Marafon shifokor ko’rigi o’rnini bosmaydi. Surunkali kasallik yoki homiladorlik bo’lsa, qatnashishdan oldin shifokoringiz bilan maslahatlashing.']
];

function OldPrice() {
  return <p className="old-price"><s>147 000 so’m</s><span className="off">−55%</span></p>;
}

function Video() {
  const [playing, setPlaying] = useState(false);
  function play() {
    // YouTube refuses embeds outside a real website (error 153), so open it there instead
    if (!/^https?:$/.test(window.location.protocol)) {
      window.open('https://www.youtube.com/watch?v=' + VIDEO_ID, '_blank', 'noopener');
      return;
    }
    setPlaying(true);
  }
  return (
    <div className="video-wrap">
      <div className="video">
        {playing ? (
          <iframe
            src={'https://www.youtube-nocookie.com/embed/' + VIDEO_ID + '?autoplay=1&rel=0&playsinline=1&modestbranding=1'}
            title={VIDEO_TITLE}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button className="video-btn" type="button" onClick={play} aria-label={'Videoni ko’rish: ' + VIDEO_TITLE}>
            <img src={'https://i.ytimg.com/vi/' + VIDEO_ID + '/maxresdefault.jpg'} alt="" width="1280" height="720" />
            <span className="play"><svg viewBox="0 0 24 24"><use href="#i-play" /></svg></span>
          </button>
        )}
      </div>
      <p className="video-note"><Icon name="yt" />Zarina dietolog: osh va somsani tashlamasdan qanday ozish mumkin</p>
    </div>
  );
}

export default function Home({ link }) {
  const root = useRef(null);
  const heroBtn = useRef(null);
  const joinBtn = useRef(null);
  const ctaRefs = useMemo(() => [heroBtn, joinBtn], []);
  const scrolled = useScrolled();
  const showSticky = useNoneVisible(ctaRefs);
  useReveal(root);

  return (
    <div ref={root}>
      <header className={'nav' + (scrolled ? ' scrolled' : '')}>
        <div className="wrap nav-in">
          <span className="avatar" role="img" aria-label="Zarina Orzimurodovna" />
          <span className="nav-name"><b>Zarina Orzimurodovna</b><span>Dietolog</span></span>
          <a className="btn btn-sm" {...link('anketa')}>Qo’shilish</a>
        </div>
      </header>

      <main className="wrap">
        <section className="hero">
          <div className="hero-text">
            <Countdown label="Boshlanishiga qoldi" labelClass="count-label" />
            <h1 className="large">To’g’ri ovqatlanib ozishni <em>7 kunda</em> boshlang</h1>
            <p className="lead">Dietolog <b>Zarina Orzimurodovna</b> bilan marafon. 7 kun kurator nazoratida bo’lasiz, Zarina dietolog esa onlayn jonli efir o’tkazadi.</p>
          </div>

          <Video />

          <div className="buy">
            <div>
              <OldPrice />
              <p className="price">66 000 so’m</p>
              <p className="price-sub">7 kunlik marafon · 26-noyabrdan · 2 000 ta joy</p>
            </div>
            <a className="btn btn-lg" ref={heroBtn} {...link('anketa')}>Marafonga qo’shilish</a>
          </div>

          <ul className="stats">
            <li><b>4 yil</b><span>tajriba</span></li>
            <li><b>1000+</b><span>o’quvchi</span></li>
            <li><b>7 kun</b><span>kurator nazorati</span></li>
          </ul>
        </section>

        <section className="sec narrow">
          <div className="sec-head" data-reveal><h2>Bu marafon siz uchun, agar...</h2></div>
          <ol className="tl" data-reveal>
            {FIT.map(([title, text], i) => (
              <li key={title} style={{ '--i': i }}>
                <span className="dot num" aria-hidden="true">{i + 1}</span><b>{title}</b><span className="d">{text}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="sec narrow">
          <div className="sec-head" data-reveal><h2>Marafon qanday o’tadi</h2></div>
          <ol className="tl" data-reveal>
            {STEPS.map(([when, title, text], i) => (
              <li key={title} style={{ '--i': i }}>
                <span className="dot num" aria-hidden="true">{i + 1}</span>
                <span className="cap">{when}</span><b>{title}</b><span className="d">{text}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="sec narrow">
          <div className="sec-head" data-reveal><h2>66 000 so’mga nimalar kiradi</h2></div>
          <ol className="tl" data-reveal>
            {INCLUDED.map(([title, text], i) => (
              <li key={title} className={i === INCLUDED.length - 1 ? 'end' : undefined} style={{ '--i': i }}>
                <span className="dot num" aria-hidden="true">{i + 1}</span><b>{title}</b><span className="d">{text}</span>
              </li>
            ))}
            <li className="tl-total">
              <span>Jami</span><span className="total-v"><s>147 000 so’m</s><b>66 000 so’m</b></span>
            </li>
          </ol>
        </section>

        <section className="sec narrow">
          <div className="sec-head" data-reveal><h2>Marafonni kim olib boradi</h2></div>
          <div className="about" data-reveal>
            <div className="photo" role="img" aria-label="Dietolog Zarina Orzimurodovna" />
            <div className="about-t">
              <h3>Zarina Orzimurodovna</h3>
              <p className="role">Dietologiyadan ustoz</p>
              <p className="text">Zarina dietolog 4 yildan beri dietologiya bilan shug’ullanadi va shu vaqt ichida 1000 dan ziyod o’quvchi chiqargan.</p>
            </div>
          </div>
        </section>

        <section className="sec narrow">
          <div className="sec-head" data-reveal><h2>Ko’p beriladigan savollar</h2></div>
          <div className="chat" data-reveal>
            <div className="chat-top">
              <span className="avatar sm" role="img" aria-label="Zarina Orzimurodovna" />
              <span className="chat-who"><b>Zarina Orzimurodovna</b><span>Dietolog · savollarga javoblar</span></span>
            </div>
            <div className="thread">
              {FAQ.map(([q, a], i) => [
                <p key={'q' + i} className="msg me" style={{ '--i': i }}>{q}</p>,
                <div key={'a' + i} className="msg-row" style={{ '--i': i }}>
                  <span className="avatar xs" aria-hidden="true" /><p className="msg her">{a}</p>
                </div>
              ])}
            </div>
            <a className="composer" href="https://t.me/zarina_dietolog" target="_blank" rel="noopener">
              <span>Savolingiz qoldimi? Telegramda yozing</span>
              <span className="send" aria-hidden="true"><Icon name="tg" /></span>
            </a>
          </div>
        </section>

        <section className="sec" id="royxat">
          <div className="join" data-reveal>
            <Countdown label="Boshlanishiga qoldi:" labelTag="h2" />
            <div className="join-card">
              <OldPrice />
              <p className="price">66 000 so’m</p>
              <p className="price-sub">7 kunlik marafon · 2 000 ta joy</p>
              <a className="btn btn-lg" ref={joinBtn} {...link('anketa')}>Marafonga qo’shilish <Icon name="right" /></a>
              <div className="chips">
                <PayLogo type="payme" label="Payme" />
                <PayLogo type="click" label="Click" />
                <span className="pay pay-card"><Icon name="wallet" />Karta</span>
              </div>
              <p className="safe"><Icon name="lock" />Ma’lumotlar faqat marafon uchun</p>
            </div>
          </div>
        </section>
        <div className="home-end" />
      </main>

      <div className={'sticky' + (showSticky ? '' : ' off')}>
        <span className="p"><b>66 000 so’m</b><span><s>147 000 so’m</s> · −55%</span></span>
        <a className="btn" {...link('anketa')}>Qo’shilish</a>
      </div>
    </div>
  );
}
