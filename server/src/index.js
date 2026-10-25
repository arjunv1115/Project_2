import app from './app.js';
import { checkConnection, pool } from './config/db.js';
import { env } from './config/env.js';

const server = app.listen(env.port, async () => {
  console.log(`[server] Smart Ideal Technologies API on http://localhost:${env.port} (${env.nodeEnv})`);

  try {
    await checkConnection();
    console.log(`[db] Connected to MySQL database "${env.db.name}" on ${env.db.host}:${env.db.port}`);
  } catch (error) {
    // Keep the site online. The contact form answers 503 until MySQL is reachable.
    console.error(`[db] Cannot reach MySQL (${error.code || error.message}).`);
    console.error('[db] Check server/.env and run "npm run db:init" once.');
  }
});

async function shutdown(signal) {
  console.log(`\n[server] ${signal} received, shutting down...`);
  server.close(async () => {
    await pool.end().catch(() => {});
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
