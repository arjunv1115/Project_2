import { checkConnection } from '../config/db.js';

export async function getHealth(_req, res) {
  let database = 'up';
  try {
    await checkConnection();
  } catch {
    database = 'down';
  }

  res.status(database === 'up' ? 200 : 503).json({
    status: database === 'up' ? 'ok' : 'degraded',
    database,
    uptimeSeconds: Math.round(process.uptime()),
  });
}
