import { Clock, Mail, Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { NAV_LINKS, SITE } from '@/data/site';
import Logo from './Logo';

const desktopLink = ({ isActive }) =>
  `relative px-1 py-2 text-[0.95rem] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[3px] after:origin-left after:rounded-full after:bg-amber-400 after:transition-transform ${
    isActive
      ? 'text-navy-900 after:scale-x-100'
      : 'text-body hover:text-navy-900 after:scale-x-0 hover:after:scale-x-100'
  }`;

const mobileLink = ({ isActive }) =>
  `block rounded-xl px-4 py-3 text-lg font-semibold transition-colors ${
    isActive ? 'bg-teal-50 text-teal-700' : 'text-navy-900 hover:bg-mist'
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  // Close with the Escape key.
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-navy-900 text-sm text-navy-100 lg:block">
        <Container className="flex items-center justify-between py-2">
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-teal-300" aria-hidden="true" />
            {SITE.hours}
          </p>
          <div className="flex items-center gap-6">
            <a href={SITE.phoneHref} className="flex items-center gap-2 rounded hover:text-white">
              <Phone className="h-4 w-4 text-teal-300" aria-hidden="true" />
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 rounded hover:text-white">
              <Mail className="h-4 w-4 text-teal-300" aria-hidden="true" />
              {SITE.email}
            </a>
          </div>
        </Container>
      </div>

      <div className="border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <Container className="flex h-[72px] items-center justify-between">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={desktopLink}>
                {link.label}
              </NavLink>
            ))}
            <Button to="/contact" className="!px-5 !py-2.5">
              Get a quote
            </Button>
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-navy-900 hover:bg-mist md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </Container>

        {open && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="border-t border-line bg-white md:hidden"
          >
            <Container className="space-y-1 py-4">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.to === '/'} className={mobileLink}>
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-3">
                <Button to="/contact" className="w-full">
                  Get a quote
                </Button>
              </div>
            </Container>
          </nav>
        )}
      </div>
    </header>
  );
}
