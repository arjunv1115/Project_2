import { createContactMessage } from '../models/contactMessage.model.js';
import { contactSchema, toFieldErrors } from '../validators/contact.validator.js';

const SUCCESS_MESSAGE =
  'Thanks for reaching out. We have received your message and will reply within one business day.';

export async function submitContact(req, res, next) {
  try {
    const parsed = contactSchema.safeParse(req.body ?? {});

    if (!parsed.success) {
      return res.status(422).json({
        success: false,
        message: 'Please fix the highlighted fields and send again.',
        errors: toFieldErrors(parsed.error),
      });
    }

    const { botcheck, ...data } = parsed.data;

    // A filled honeypot means a bot. Answer as if it worked, store nothing.
    if (botcheck) {
      return res.status(201).json({ success: true, message: SUCCESS_MESSAGE });
    }

    await createContactMessage({
      ...data,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    });

    return res.status(201).json({ success: true, message: SUCCESS_MESSAGE });
  } catch (error) {
    return next(error);
  }
}
