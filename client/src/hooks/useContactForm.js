import { useRef, useState } from 'react';
import { sendContactMessage } from '@/services/api';
import { FIELD_ORDER, validateField, validateForm } from '@/utils/validators';

const EMPTY_VALUES = { name: '', email: '', phone: '', subject: '', message: '', botcheck: '' };

/**
 * State and behaviour for the contact form:
 * validation on blur and submit, server error mapping, and send status.
 * status: 'idle' | 'submitting' | 'success' | 'error'
 */
export function useContactForm(initialValues = {}) {
  const initial = { ...EMPTY_VALUES, ...initialValues };

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');
  const formRef = useRef(null);

  const focusField = (name) => formRef.current?.elements?.[name]?.focus();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    // Once a field has been visited, re-check it while the person types.
    if (touched[name]) {
      setErrors((current) => ({ ...current, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors((current) => ({ ...current, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const found = validateForm(values);
    setErrors(found);
    setTouched(Object.fromEntries(FIELD_ORDER.map((name) => [name, true])));

    const firstInvalid = FIELD_ORDER.find((name) => found[name]);
    if (firstInvalid) {
      setStatus('idle');
      setFeedback('');
      focusField(firstInvalid);
      return;
    }

    setStatus('submitting');
    setFeedback('');

    try {
      const response = await sendContactMessage(values);
      setStatus('success');
      setFeedback(response.message);
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
        const firstServerError = FIELD_ORDER.find((name) => error.errors[name]);
        if (firstServerError) focusField(firstServerError);
      }
      setStatus('error');
      setFeedback(error.message);
    }
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
    setTouched({});
    setStatus('idle');
    setFeedback('');
  };

  return { values, errors, status, feedback, formRef, handleChange, handleBlur, handleSubmit, reset };
}
