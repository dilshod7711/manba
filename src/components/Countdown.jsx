import { useCountdown } from '../hooks.js';

const UNITS = [['d', 'kun'], ['h', 'soat'], ['m', 'daqiqa'], ['s', 'soniya']];

// Label and timer disappear together once the marathon has started
export default function Countdown({ label, labelTag: Label = 'p', labelClass }) {
  const left = useCountdown();
  if (!left) return null;
  return (
    <>
      <Label className={labelClass}>{label}</Label>
      <div className="count" role="timer">
        {UNITS.map(([key, unit]) => (
          <div key={key}><b>{left[key]}</b><small>{unit}</small></div>
        ))}
      </div>
    </>
  );
}
