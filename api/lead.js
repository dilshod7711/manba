// Vercel serverless function: anketadan kelgan ism va raqamni Telegram botga yuboradi.
// Token sayt kodida emas, Vercel'ning yashirin sozlamasida turadi:
//   BOT_TOKEN  — @BotFather bergan token (majburiy)
//   CHAT_ID    — leadlar boradigan chat; berilmasa quyidagi chatga boradi

const DEFAULT_CHAT_ID = '7150930064'; // @aktamjon_murodullayev, botga /start bosgan
const NAME_MAX = 60;
const PHONE_RE = /^\+998\d{9}$/;

function tashkentTime(date) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Tashkent',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: false
  }).formatToParts(date).map((p) => [p.type, p.value]));
  return `${parts.day}.${parts.month}.${parts.year} ${parts.hour}:${parts.minute}`;
}

function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  try { return JSON.parse(req.body || '{}'); } catch (err) { return {}; }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID || DEFAULT_CHAT_ID;
  if (!BOT_TOKEN) {
    return res.status(500).json({ ok: false, error: 'not_configured' });
  }

  const body = readBody(req);
  const name = String(body.name || '').trim().slice(0, NAME_MAX);
  const phone = String(body.phone || '').replace(/\s/g, '');
  if (name.length < 2 || !PHONE_RE.test(phone)) {
    return res.status(400).json({ ok: false, error: 'invalid' });
  }

  const text = [
    'Yangi lead keldi',
    '',
    'Ism: ' + name,
    'Telefon: ' + phone,
    'Vaqt: ' + tashkentTime(new Date()),
    'Manba: marafon sayti'
  ].join('\n');

  try {
    const tg = await fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text })
    });
    if (!tg.ok) return res.status(502).json({ ok: false, error: 'telegram' });
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(502).json({ ok: false, error: 'telegram' });
  }
}
