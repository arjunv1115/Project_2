import { env } from '../config/env.js';

const DATABASE_UNAVAILABLE_CODES = new Set([
  'ECONNREFUSED',
  'ENOTFOUND',
  'ETIMEDOUT',
  'PROTOCOL_CONNECTION_LOST',
  'ER_ACCESS_DENIED_ERROR',
  'ER_BAD_DB_ERROR',
  'ER_NO_SUCH_TABLE',
]);

export function notFoundHandler(_req, res) {
  res.status(404).json({ success: false, message: 'That API route does not exist.' });
}

// Express recognises error handlers by their four arguments.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'The request body is not valid JSON.' });
  }

  if (err.type === 'entity.too.large') {
    return res.status(413).json({ success: false, message: 'The request body is too large.' });
  }

  if (DATABASE_UNAVAILABLE_CODES.has(err.code)) {
    console.error(`[db] ${err.code}: ${err.message}`);
    return res.status(503).json({
      success: false,
      message:
        'We could not save your message right now. Please try again shortly or email us directly.',
    });
  }

  console.error(err);
  return res.status(500).json({
    success: false,
    message: 'Something went wrong on our side. Please try again.',
    ...(env.isProd ? {} : { detail: err.message }),
  });
}
