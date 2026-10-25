import fs from 'node:fs';
import path from 'node:path';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import apiRoutes from './routes/index.js';

const app = express();

app.disable('x-powered-by');
if (env.isProd) app.set('trust proxy', 1); // correct client IPs behind Nginx / a load balancer

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'default-src': ["'self'"],
        'script-src': ["'self'"],
        'style-src': ["'self'", "'unsafe-inline'"],
        'font-src': ["'self'", 'data:'],
        'img-src': ["'self'", 'data:'],
        'frame-src': ['https://www.google.com', 'https://maps.google.com'],
        'connect-src': ["'self'"],
        'upgrade-insecure-requests': null,
      },
    },
  }),
);
app.use(cors({ origin: env.clientOrigins, methods: ['GET', 'POST'] }));
app.use(morgan(env.isProd ? 'combined' : 'dev'));
app.use(express.json({ limit: '20kb' }));

// ---- API -----------------------------------------------------------------
app.use('/api', apiRoutes);
app.use('/api', notFoundHandler);

// ---- React app (production) ---------------------------------------------
const indexHtml = path.join(env.clientDist, 'index.html');

if (fs.existsSync(indexHtml)) {
  const assetsSegment = `${path.sep}assets${path.sep}`;

  app.use(
    express.static(env.clientDist, {
      index: false,
      setHeaders(res, filePath) {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache');
        } else if (filePath.includes(assetsSegment)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else {
          res.setHeader('Cache-Control', 'public, max-age=86400');
        }
      },
    }),
  );

  // Client-side routes return index.html. Unknown paths get the same page
  // with a real 404 status so search engines do not index them.
  const knownRoutes = new Set(['/', '/about', '/services', '/contact']);

  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    if (path.extname(req.path)) return next(); // missing file such as /logo.png

    const normalised = req.path.length > 1 ? req.path.replace(/\/+$/, '') : req.path;
    res.status(knownRoutes.has(normalised) ? 200 : 404);
    res.setHeader('Cache-Control', 'no-cache');
    return res.sendFile(indexHtml);
  });
}

app.use(errorHandler);

export default app;
