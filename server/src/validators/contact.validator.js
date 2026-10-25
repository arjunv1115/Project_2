import { z } from 'zod';

const NAME_PATTERN = /^\p{L}[\p{L}\s.'-]*$/u;
const PHONE_PATTERN = /^\+?[\d\s()-]{7,20}$/;

export const contactSchema = z.object({
  name: z
    .string({ error: 'Enter your name.' })
    .trim()
    .min(2, 'Name must be at least 2 characters.')
    .max(100, 'Name must be 100 characters or fewer.')
    .regex(NAME_PATTERN, 'Name can only contain letters, spaces, apostrophes, dots and hyphens.'),

  email: z
    .string({ error: 'Enter your email address.' })
    .trim()
    .min(1, 'Enter your email address.')
    .max(150, 'Email must be 150 characters or fewer.')
    .email('Enter a valid email address, like name@company.com.'),

  phone: z
    .string()
    .trim()
    .max(20, 'Phone number must be 20 characters or fewer.')
    .refine((value) => value === '' || PHONE_PATTERN.test(value), {
      message: 'Enter a valid phone number, for example +91 98765 43210.',
    })
    .optional()
    .default(''),

  subject: z
    .string({ error: 'Enter a subject.' })
    .trim()
    .min(3, 'Subject must be at least 3 characters.')
    .max(150, 'Subject must be 150 characters or fewer.'),

  message: z
    .string({ error: 'Enter your message.' })
    .trim()
    .min(10, 'Message must be at least 10 characters.')
    .max(2000, 'Message must be 2000 characters or fewer.'),

  // Honeypot: hidden from people, filled in by simple bots.
  botcheck: z.string().max(200).optional().default(''),
});

/** Turns a zod error into `{ fieldName: 'First error message' }`. */
export function toFieldErrors(error) {
  const fieldErrors = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? 'form');
    if (!fieldErrors[field]) fieldErrors[field] = issue.message;
  }
  return fieldErrors;
}
