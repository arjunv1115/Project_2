import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { contactSchema, toFieldErrors } from '../src/validators/contact.validator.js';

const valid = {
  name: 'Priya Nair',
  email: 'priya@example.com',
  phone: '+91 98765 43210',
  subject: 'New company website',
  message: 'We would like a quote for a five page company website.',
};

describe('contact validator', () => {
  it('accepts a complete, valid submission', () => {
    assert.equal(contactSchema.safeParse(valid).success, true);
  });

  it('accepts an empty phone number', () => {
    const result = contactSchema.safeParse({ ...valid, phone: '' });
    assert.equal(result.success, true);
  });

  it('trims whitespace around values', () => {
    const result = contactSchema.safeParse({ ...valid, name: '  Priya Nair  ' });
    assert.equal(result.data.name, 'Priya Nair');
  });

  it('rejects an invalid email and a short message with per-field errors', () => {
    const result = contactSchema.safeParse({ ...valid, email: 'not-an-email', message: 'Hi' });
    assert.equal(result.success, false);
    const errors = toFieldErrors(result.error);
    assert.ok(errors.email);
    assert.ok(errors.message);
    assert.equal(errors.name, undefined);
  });

  it('rejects digits in the name and letters in the phone number', () => {
    const result = contactSchema.safeParse({ ...valid, name: 'R2D2', phone: 'call me' });
    const errors = toFieldErrors(result.error);
    assert.ok(errors.name);
    assert.ok(errors.phone);
  });

  it('reports missing fields', () => {
    const result = contactSchema.safeParse({});
    const errors = toFieldErrors(result.error);
    assert.deepEqual(Object.keys(errors).sort(), ['email', 'message', 'name', 'subject']);
  });
});
