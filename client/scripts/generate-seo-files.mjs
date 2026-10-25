/**
 * Writes public/robots.txt and public/sitemap.xml using VITE_SITE_URL.
 * Runs automatically before "npm run build" (see the "prebuild" script).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const env = loadEnv(process.env.NODE_ENV || 'production', rootDir, '');
const siteUrl = (process.env.VITE_SITE_URL || env.VITE_SITE_URL || 'https://www.smartidealtechnologies.com').replace(/\/$/, '');

const pages = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/services', changefreq: 'monthly', priority: '0.9' },
  { path: '/about', changefreq: 'yearly', priority: '0.7' },
  { path: '/contact', changefreq: 'yearly', priority: '0.8' },
];

const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml
`;

fs.writeFileSync(path.join(rootDir, 'public/sitemap.xml'), sitemap);
fs.writeFileSync(path.join(rootDir, 'public/robots.txt'), robots);
console.log(`SEO files written for ${siteUrl}`);
