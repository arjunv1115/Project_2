/**
 * Company details used across the site (header, footer, contact page, SEO).
 *
 * The address, phone number and map location are the real office details.
 * PLACEHOLDERS: the email and social links below are still sample values.
 */

const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://www.smartidealtechnologies.com').replace(/\/$/, '');

const SITE_NAME = 'Smart Ideal Technologies';

const address = {
  lines: ['Pacifica Tech Park'],
  locality: 'Navalur',
  region: 'Tamil Nadu',
  postalCode: '600130',
  countryCode: 'IN',
  country: 'India',
};

// Google Maps listing: https://maps.app.goo.gl/dyFcnF9M7QpF8uKWA
const mapQuery =
  import.meta.env.VITE_MAP_QUERY ||
  `${SITE_NAME}, ${address.lines[0].toUpperCase()}, ${address.locality}, ${address.region} ${address.postalCode}`;

export const SITE = {
  name: SITE_NAME,
  tagline: 'Websites, apps and systems built to last.',
  description:
    'Smart Ideal Technologies blends Symfony and React to build dynamic, high-performance web applications, mobile apps and custom software for growing businesses. Get a clear quote within one business day.',
  url: siteUrl,
  ogImage: '/og-image.png',
  locale: 'en_IN',

  email: 'hello@smartidealtechnologies.com',
  phone: '+91 90801 56420',
  phoneHref: 'tel:+919080156420',
  hours: 'Open from 10 am, Monday to Friday',
  address,

  // Google Maps embed works without an API key.
  mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`,
  // Short link to the official Google Maps listing.
  mapLink: 'https://maps.app.goo.gl/dyFcnF9M7QpF8uKWA',

  social: [
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com' },
    { id: 'x', label: 'X', href: 'https://x.com' },
    { id: 'github', label: 'GitHub', href: 'https://github.com' },
    { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com' },
  ],
};

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact Us', to: '/contact' },
];

export const formatAddress = () =>
  `${address.lines.join(', ')}, ${address.locality}, ${address.region} ${address.postalCode}, ${address.country}`;
