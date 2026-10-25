/**
 * Contact form rules. They mirror server/src/validators/contact.validator.js,
 * so people get instant feedback and the server still has the final say.
 */

export const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 150 },
  phone: { max: 20 },
  subject: { min: 3, max: 150 },
  message: { min: 10, max: 2000 },
};

export const FIELD_ORDER = ['name', 'email', 'phone', 'subject', 'message'];

const NAME_PATTERN = /^\p{L}[\p{L}\s.'-]*$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s()-]{7,20}$/;

/** Returns an error message for one field, or an empty string when it is valid. */
export function validateField(name, rawValue) {
  const value = String(rawValue ?? '').trim();

  switch (name) {
    case 'name':
      if (!value) return 'Enter your name.';
      if (value.length < LIMITS.name.min) return `Name must be at least ${LIMITS.name.min} characters.`;
      if (value.length > LIMITS.name.max) return `Name must be ${LIMITS.name.max} characters or fewer.`;
      if (!NAME_PATTERN.test(value)) return 'Name can only contain letters, spaces, apostrophes, dots and hyphens.';
      return '';

    case 'email':
      if (!value) return 'Enter your email address.';
      if (value.length > LIMITS.email.max) return `Email must be ${LIMITS.email.max} characters or fewer.`;
      if (!EMAIL_PATTERN.test(value)) return 'Enter a valid email address, like name@company.com.';
      return '';

    case 'phone':
      if (!value) return ''; // optional
      if (!PHONE_PATTERN.test(value)) return 'Enter a valid phone number, for example +91 98765 43210.';
      return '';

    case 'subject':
      if (!value) return 'Enter a subject.';
      if (value.length < LIMITS.subject.min) return `Subject must be at least ${LIMITS.subject.min} characters.`;
      if (value.length > LIMITS.subject.max) return `Subject must be ${LIMITS.subject.max} characters or fewer.`;
      return '';

    case 'message':
      if (!value) return 'Enter your message.';
      if (value.length < LIMITS.message.min) return `Message must be at least ${LIMITS.message.min} characters.`;
      if (value.length > LIMITS.message.max) return `Message must be ${LIMITS.message.max} characters or fewer.`;
      return '';

    default:
      return '';
  }
}

/** Validates every field. Returns an object that only contains fields with errors. */
export function validateForm(values) {
  const errors = {};
  FIELD_ORDER.forEach((name) => {
    const message = validateField(name, values[name]);
    if (message) errors[name] = message;
  });
  return errors;
}
