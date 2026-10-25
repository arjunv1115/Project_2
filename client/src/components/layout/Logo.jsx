import { Link } from 'react-router-dom';
import logoDark from '@/assets/logo/logo-full.png';
import logoLight from '@/assets/logo/logo-full-light.png';

/** Company logo (orange mark plus wordmark). Use variant="light" on dark backgrounds. */
export default function Logo({ variant = 'dark', className = '' }) {
  const light = variant === 'light';

  return (
    <Link
      to="/"
      aria-label="Smart Ideal Technology, home"
      className={`inline-flex items-center ${className}`}
    >
      <img
        src={light ? logoLight : logoDark}
        alt=""
        width="152"
        height="37"
        className="h-10 w-auto"
      />
    </Link>
  );
}
