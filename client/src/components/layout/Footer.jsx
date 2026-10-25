import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '@/components/ui/Container';
import SocialIcon from '@/components/ui/SocialIcons';
import { SERVICES } from '@/data/services';
import { NAV_LINKS, SITE } from '@/data/site';
import Logo from './Logo';

const linkClass =
  'rounded text-navy-200 transition-colors hover:text-white';

export default function Footer() {
  const year = new Date().getFullYear();

  // Google Maps location URL
  const address = [
    ...SITE.address.lines,
    SITE.address.locality,
    SITE.address.region,
    SITE.address.postalCode,
  ]
    .filter(Boolean)
    .join(', ');

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;

  // WhatsApp direct chat URL
  // Use the international format without +, spaces, or hyphens.
  const whatsappNumber = SITE.phone.replace(/\D/g, '');

  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <footer className="bg-navy-950 text-navy-200">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.1fr_1.3fr]">
        {/* Company Information */}
        <div>
          <Logo variant="light" />

          <p className="mt-5 max-w-xs leading-relaxed">
            {SITE.tagline} We build websites, mobile apps and custom
            software for growing businesses.
          </p>

          <ul className="mt-6 flex gap-3">
            {SITE.social.map((profile) => (
              <li key={profile.id}>
                <a
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${SITE.name} on ${profile.label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-amber-400 hover:text-navy-900"
                >
                  <SocialIcon
                    name={profile.id}
                    className="h-[18px] w-[18px]"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <nav aria-label="Company">
          <h2 className="font-display text-lg font-bold !text-white">
            Company
          </h2>

          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav aria-label="Services">
          <h2 className="font-display text-lg font-bold !text-white">
            Services
          </h2>

          <ul className="mt-5 space-y-3">
            {SERVICES.map((service) => (
              <li key={service.id}>
                <Link
                  to={{
                    pathname: '/services',
                    hash: `#${service.id}`,
                  }}
                  className={linkClass}
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Information */}
        <div>
          <h2 className="font-display text-lg font-bold !text-white">
            Contact
          </h2>

          <address className="mt-5 space-y-4 not-italic">
            {/* Click address to open Google Maps */}
            <p className="flex gap-3">
              <MapPin
                className="mt-1 h-5 w-5 shrink-0 text-teal-300"
                aria-hidden="true"
              />

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} hover:underline`}
                aria-label="View our location on Google Maps"
              >
                {SITE.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}

                {SITE.address.locality}, {SITE.address.region}{' '}
                {SITE.address.postalCode}
              </a>
            </p>

            {/* Click phone number to open WhatsApp */}
            <p className="flex gap-3">
              <Phone
                className="mt-1 h-5 w-5 shrink-0 text-teal-300"
                aria-hidden="true"
              />

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} hover:underline`}
                aria-label="Chat with us on WhatsApp"
              >
                {SITE.phone}
              </a>
            </p>


            {/* Email - Open Gmail with recipient prefilled */}
            <p className="flex gap-3">
              <Mail
                className="mt-1 h-5 w-5 shrink-0 text-teal-300"
                aria-hidden="true"
              />

              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                  SITE.email
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} break-all hover:underline`}
                aria-label={`Send an email to ${SITE.email} using Gmail`}
              >
                {SITE.email}
              </a>
            </p>

            {/* Business Hours */}
            <p className="flex gap-3">
              <Clock
                className="mt-1 h-5 w-5 shrink-0 text-teal-300"
                aria-hidden="true"
              />

              <span>{SITE.hours}</span>
            </p>
          </address>
        </div>
      </Container>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {SITE.name}. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
