import sprite from '../assets/sprite.svg?raw';

// Icon sprite and official Payme / Click logos, rendered once at the top of the app
export function Sprite() {
  return <div aria-hidden="true" dangerouslySetInnerHTML={{ __html: sprite }} />;
}

export function Icon({ name, className = 'i' }) {
  return <svg className={className}><use href={'#i-' + name} /></svg>;
}

export function PayLogo({ type, label }) {
  const logo = type === 'payme'
    ? <svg className="logo-p" viewBox="0 0 58 20"><use href="#logo-payme" /></svg>
    : <svg className="logo-c" viewBox="0 0 157 40"><use href="#logo-click" /></svg>;
  return label
    ? <span className="pay" role="img" aria-label={label}>{logo}</span>
    : <span className="pay">{logo}</span>;
}
