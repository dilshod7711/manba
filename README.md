# Zarina Orzimurodovna — 7 kunlik ozish marafoni

React (Vite) sayti: asosiy sahifa → anketa → to'lov.

## Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda `http://localhost:5173` ochiladi.

## Build

```bash
npm run build
```

Tayyor sayt `dist/` papkasida bo'ladi.

## Sozlamalar

`src/config.js` faylida:
- `admin` — skrinshot yuboriladigan Telegram (hozir `zarina_dietolog`)
- `support` — yordamchi Telegram
- `cards` — to'lov kartalari
- `payme`, `click` — to'lov havolalari (bo'lsa)

## Anketalar Telegram botga

`api/lead.js` anketa to'ldirilganda @zarina_dietolog_bot orqali "Yangi lead keldi" xabarini yuboradi.
Xabarlar chat `7150930064` ga boradi (`CHAT_ID` bilan boshqasiga o'zgartirish mumkin).

**Vercel'da:** Project → Settings → Environment Variables → `BOT_TOKEN` = @BotFather bergan token. Keyin Redeploy qiling.

**Kompyuterda (`npm run dev`):** `.env.example` faylini `.env.local` deb nusxalang va `BOT_TOKEN` ni yozing.
`.env.local` GitHub'ga yuklanmaydi.

Tokenni hech qachon `src/` ichidagi fayllarga yozmang: u saytda hammaga ko'rinib qoladi.

## Vercel'ga joylash

```bash
npm i -g vercel
vercel login
vercel --prod
```
