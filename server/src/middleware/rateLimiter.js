import { rateLimit } from 'express-rate-limit';
import { env } from '../config/env.js';

/** Limits how often one IP address can submit the contact form. */
export const contactRateLimiter = rateLimit({
  windowMs: env.contactRateLimit.windowMinutes * 60 * 1000,
  limit: env.contactRateLimit.maxRequests,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many messages from this connection. Please try again in a few minutes.',
    });
  },
});
