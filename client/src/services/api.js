const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
const TIMEOUT_MS = 15000;

export class ApiError extends Error {
  constructor(message, { status, errors } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors; // field errors from the server, e.g. { email: '...' }
  }
}

async function request(path, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      signal: controller.signal,
      ...options,
    });
  } catch (error) {
    throw new ApiError(
      error.name === 'AbortError'
        ? 'The server took too long to answer. Please try again.'
        : 'We could not reach the server. Check your connection and try again.',
    );
  } finally {
    clearTimeout(timer);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(data.message || 'Something went wrong. Please try again.', {
      status: response.status,
      errors: data.errors,
    });
  }

  return data;
}

export const sendContactMessage = (payload) =>
  request('/contact', { method: 'POST', body: JSON.stringify(payload) });
