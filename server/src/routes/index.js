import { Router } from 'express';
import { submitContact } from '../controllers/contact.controller.js';
import { getHealth } from '../controllers/health.controller.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.get('/health', getHealth);
router.post('/contact', contactRateLimiter, submitContact);

export default router;
