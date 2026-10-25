import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return value !== undefined && value !== '' && Number.isFinite(parsed) ? parsed : fallback;
};

const nodeEnv = process.env.NODE_ENV || 'development';

export const env = Object.freeze({
  nodeEnv,
  isProd: nodeEnv === 'production',
  port: toNumber(process.env.PORT, 5000),

  // Comma separated list of origins allowed to call the API from a browser.
  clientOrigins: (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),

  // Built React app (served by Express in production).
  clientDist: path.resolve(__dirname, '../../../client/dist'),

  db: Object.freeze({
    host: process.env.DB_HOST || 'localhost',
    port: toNumber(process.env.DB_PORT, 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'smart_ideal_db',
    connectionLimit: toNumber(process.env.DB_CONNECTION_LIMIT, 10),
  }),

  contactRateLimit: Object.freeze({
    windowMinutes: toNumber(process.env.CONTACT_RATE_WINDOW_MIN, 15),
    maxRequests: toNumber(process.env.CONTACT_RATE_MAX, 5),
  }),
});
