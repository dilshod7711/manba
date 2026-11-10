// iOS-friendly Web Audio API sounds
// Works without any audio files — generated programmatically

let ctx = null;

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

function play(fn) {
  try {
    const ac = getCtx();
    if (ac.state === 'suspended') ac.resume();
    fn(ac);
  } catch (e) { /* silent fail */ }
}

// iOS "Tock" — form tugmasi bosilganda
export function soundTap() {
  play((ac) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ac.currentTime + 0.06);
    gain.gain.setValueAtTime(0.18, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.08);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + 0.08);
  });
}

// iOS "Sent" — Qabul qilindi ovozi (yuqori, keyin past — ikki nota)
export function soundSuccess() {
  play((ac) => {
    [[880, 0, 0.12], [1320, 0.13, 0.22]].forEach(([freq, start, end]) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ac.currentTime + start);
      gain.gain.setValueAtTime(0, ac.currentTime + start);
      gain.gain.linearRampToValueAtTime(0.22, ac.currentTime + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + end);
      osc.start(ac.currentTime + start);
      osc.stop(ac.currentTime + end + 0.01);
    });
  });
}

// Sahifaga kirish ovozi — yumshoq "pop"
export function soundEnter() {
  play((ac) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, ac.currentTime + 0.1);
    gain.gain.setValueAtTime(0.12, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.12);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + 0.13);
  });
}

// Orqaga qaytish ovozi — pastroq "pop"
export function soundBack() {
  play((ac) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(700, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ac.currentTime + 0.1);
    gain.gain.setValueAtTime(0.13, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.11);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + 0.12);
  });
}

