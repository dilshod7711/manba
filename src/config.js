// Saytni ishga tushirishdan oldin shu qiymatlarni tekshiring
export const CONFIG = {
  leadEndpoint: '/api/lead', // anketa shu server funksiyasi orqali Telegram botga boradi (api/lead.js)
  admin: 'zarina_dietolog', // skrinshot yuboriladigan Telegram username, @ belgisisiz
  support: 'zarina_dietolog', // yordamchi Telegram username, @ belgisisiz
  payme: '', // Payme to'lov havolasi (bo'lmasa bo'sh qoldiring)
  click: '', // Click to'lov havolasi (bo'lmasa bo'sh qoldiring)
  cards: [
    { label: 'Uzcard', amount: '66 000 so’m', number: '8600 3141 1531 8208', holder: 'NORBOBOYEVA ZARINA' }
  ]
};

export const START = new Date('2026-11-26T00:00:00+05:00').getTime();
export const VIDEO_ID = 'WLeiz5Te_os';
export const VIDEO_TITLE = 'Osh va somsani tashlamasdan qanday ozish mumkin?';

export const TITLES = {
  home: '7 kunlik ozish marafoni | Dietolog Zarina Orzimurodovna',
  anketa: 'Anketa | 7 kunlik ozish marafoni',
  tolov: 'To’lov | 7 kunlik ozish marafoni'
};
