import { Link } from 'react-router-dom';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60';

const variants = {
  primary: 'bg-navy-900 text-white hover:bg-navy-700',
  accent: 'bg-amber-400 text-navy-900 hover:bg-amber-300',
  secondary: 'border-2 border-navy-900/15 text-navy-900 hover:border-navy-900/40 hover:bg-white',
  outlineLight: 'border-2 border-white/25 text-white hover:border-white/60 hover:bg-white/10',
};

/**
 * Renders a router link (`to`), a plain anchor (`href`) or a <button>,
 * so every call to action looks the same.
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  icon: Icon,
  className = '',
  children,
  ...rest
}) {
  const classes = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      {Icon && <Icon className="h-[1.1em] w-[1.1em]" aria-hidden="true" />}
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
