# Smart Ideal Technologies: Company Website

A responsive company website with a working contact form.

| Layer    | Technology                                                |
| -------- | --------------------------------------------------------- |
| Frontend | React 19, Vite, Tailwind CSS 3, React Router, React Helmet |
| Backend  | Node.js 18+, Express 5, Zod validation                    |
| Database | MySQL 8 (or MariaDB 10.5+)                                |

**Pages:** Home, About Us, Services, Contact Us (form with validation and a Google Map), plus a 404 page.

---

## 1. Folder structure

```
smart-ideal-technologies/
├── README.md
├── package.json              Convenience scripts for the whole project
├── database/
│   └── schema.sql            MySQL schema (contact_messages table)
├── server/                   Node.js + Express API
│   ├── .env.example
│   ├── src/
│   │   ├── index.js          Starts the server, checks MySQL
│   │   ├── app.js            Express app: security headers, routes, serves the built site
│   │   ├── config/           env.js (settings), db.js (MySQL pool)
│   │   ├── routes/           URL -> controller mapping
│   │   ├── controllers/      Request handling (contact, health)
│   │   ├── validators/       Zod rules for the contact form
│   │   ├── models/           SQL queries
│   │   ├── middleware/       Rate limiter, error handler
│   │   └── scripts/initDb.js Creates the database and tables
│   └── tests/                Validator tests (node --test)
└── client/                   React + Vite + Tailwind
    ├── index.html
    ├── tailwind.config.js    Brand colours, fonts, shadows
    ├── vite.config.js        "@" alias and /api proxy
    ├── public/               favicon, app icons, og-image.png, robots.txt, sitemap.xml, manifest
    ├── scripts/              generate-seo-files.mjs (runs before every build)
    └── src/
        ├── assets/
        │   ├── logo/         logo-mark.svg, logo-mark-light.svg, PNG exports
        │   ├── images/       hero-illustration.svg, about-illustration.svg
        │   └── services/     One illustration per service (6 SVGs)
        ├── components/
        │   ├── layout/       Navbar, Footer, Logo, Layout, ScrollToTop
        │   ├── ui/           Button, Field, FeatureGrid, PageHeader, CtaBand ...
        │   ├── contact/      ContactForm, OfficeMap
        │   └── seo/          Seo (title, meta, Open Graph, JSON-LD)
        ├── pages/            Home, About, Services, Contact, NotFound
        ├── data/             site.js (company details), services.js, content.js
        ├── hooks/            useContactForm
        ├── services/         api.js (fetch wrapper)
        └── utils/            validators.js, structuredData.js
```

---

## 2. Requirements

- Node.js 18.18 or newer (Node 20 or 22 recommended)
- MySQL 8 or MariaDB 10.5+

## 3. Run it locally (development)

**Step 1. Install packages**

```bash
npm run install:all
```

**Step 2. Configure the server**

```bash
cd server
cp .env.example .env
```

Open `server/.env` and set `DB_USER`, `DB_PASSWORD` and (optionally) `DB_NAME`.

**Step 3. Create the database and table**

```bash
npm run db:init          # from /server (or "npm run db:init" in the project root)
```

You can also import `database/schema.sql` in phpMyAdmin or MySQL Workbench.

**Step 4. Start both apps** (two terminals)

```bash
# Terminal 1: API on http://localhost:5000
npm run dev:server

# Terminal 2: website on http://localhost:5173
npm run dev:client
```

Open **http://localhost:5173**. The Vite dev server forwards `/api` requests to the Express server, so no CORS setup is needed.

Check the API: <http://localhost:5000/api/health> should return `{"status":"ok","database":"up", ...}`.

## 4. Run it as a live site (production)

Express serves the built React app and the API from one address, so you deploy a single Node process.

```bash
# 1. Set the public address (used for SEO tags, sitemap.xml and robots.txt)
#    in client/.env:  VITE_SITE_URL=https://your-domain.com

# 2. Build the frontend (also regenerates sitemap.xml and robots.txt)
npm run build

# 3. Start the server in production mode
cd server
NODE_ENV=production PORT=5000 node src/index.js
```

Recommended on a Linux server:

- Keep it running with **PM2**: `pm2 start src/index.js --name smart-ideal --cwd server` (set `NODE_ENV=production` in the environment).
- Put **Nginx** in front for HTTPS and forward everything to `http://127.0.0.1:5000`. The server already trusts one proxy hop, so rate limiting sees real visitor IPs.
- Use a dedicated MySQL user with rights on `smart_ideal_db` only, not `root`.

## 5. Contact form

1. The browser validates each field on blur and on submit (`client/src/utils/validators.js`).
2. `POST /api/contact` validates again on the server (`server/src/validators/contact.validator.js`), so the API stays safe even if someone skips the form.
3. Valid messages are stored in the `contact_messages` table with a prepared statement.

Protection included: server-side validation, parameterised SQL, rate limit (5 messages per IP per 15 minutes, configurable in `.env`), a hidden honeypot field for bots, Helmet security headers, a 20 KB body limit.

Read incoming messages:

```sql
SELECT id, name, email, subject, message, created_at
FROM contact_messages WHERE status = 'new' ORDER BY created_at DESC;
```

If MySQL is unreachable the website still loads. The form shows a clear error and `/api/health` reports `"database": "down"`.

**API**

| Method | Route         | Purpose                                      |
| ------ | ------------- | -------------------------------------------- |
| GET    | `/api/health` | Server and database status                   |
| POST   | `/api/contact` | Body: `name, email, phone?, subject, message` |

`POST /api/contact` returns `201` on success, `422` with `{ errors: { field: "message" } }` for invalid input, `429` when rate limited and `503` when the database is down.

## 6. SEO

- Unique title, description, canonical URL, Open Graph and Twitter tags on every page (`components/seo/Seo.jsx`)
- JSON-LD structured data: Organization and WebSite (home), FAQPage (services), ContactPage (contact)
- `robots.txt` and `sitemap.xml` generated from `VITE_SITE_URL` on each build
- One `h1` per page, semantic landmarks, descriptive image `alt` text, a skip link
- `og-image.png` (1200 x 630) for link previews, favicons and a web manifest
- Unknown URLs return a real 404 status with a `noindex` page
- Self-hosted fonts and lazy-loaded pages and images for fast loading

Note: this is a single-page app. Google renders it well, but some social crawlers read only the static tags in `index.html`. If you later need per-page previews for those, add pre-rendering (for example `vite-plugin-prerender`).

## 7. Replace the sample content before launch

The brief did not include real company details, so these are **placeholders**:

| What                                              | Where                                |
| ------------------------------------------------- | ------------------------------------ |
| Phone, email, address, hours, social links        | `client/src/data/site.js`            |
| Google Map location                               | `VITE_MAP_QUERY` in `client/.env`, or the address in `site.js` |
| Company numbers, promises, FAQ answers, about text | `client/src/data/content.js`, `client/src/pages/About.jsx` |
| Service names and descriptions                    | `client/src/data/services.js`        |
| Domain name                                       | `VITE_SITE_URL` in `client/.env`     |
| `hello@smartidealtechnologies.com` in the no-JS message | `client/index.html`            |

## 8. Logos, icons and images

- **Logo:** `client/src/assets/logo/`. The mark is an "S" drawn as a connected path with two nodes. Light and dark versions as SVG, plus PNG exports (`logo-mark-512.png`, `logo-full.png`, `logo-full-light.png`) for documents and social profiles. The header and footer wordmark is live text, so it stays sharp and uses the site font.
- **Icons:** [Lucide](https://lucide.dev) icons (via `lucide-react`) for services, contact details and UI. Social brand icons are inline SVGs in `components/ui/SocialIcons.jsx`.
- **Illustrations:** original SVG artwork (hero, about, six services). They are lightweight and recolourable. To use photos instead, put them in `src/assets/images/` and change the imports in the page files.
- **Favicons and sharing image:** `client/public/` (`favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `og-image.png`).
- **Fonts:** Bricolage Grotesque (headings) and Instrument Sans (text), self-hosted through npm, so the site makes no calls to Google Fonts.

## 9. Customising the design

Colours, fonts and shadows live in `client/tailwind.config.js` (navy, teal and amber palettes). Change them there and the whole site follows.

## 10. Useful commands

| Command                     | What it does                          |
| --------------------------- | ------------------------------------- |
| `npm run install:all`       | Install server and client packages    |
| `npm run dev:server`        | API with auto-restart                 |
| `npm run dev:client`        | Vite dev server with hot reload       |
| `npm run build`             | Production build into `client/dist`   |
| `npm run start`             | Start the Express server              |
| `npm run db:init`           | Create the database and tables        |
| `npm test`                  | Run the validator tests               |

## 11. Troubleshooting

- **"Cannot reach MySQL" in the server log:** check `DB_*` values in `server/.env` and that MySQL is running. Run `npm run db:init` once.
- **`ER_ACCESS_DENIED_ERROR`:** wrong `DB_USER` or `DB_PASSWORD`.
- **Contact form says it cannot save the message:** the API is up but MySQL is not. Open `/api/health`.
- **Page refresh shows "Cannot GET /about" in development:** use the Vite address (5173), not the API port.
- **Map is blank:** the visitor's network blocks Google. The "Open in Google Maps" link below the map still works.
