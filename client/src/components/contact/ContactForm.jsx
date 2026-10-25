import { CircleAlert, CircleCheck, LoaderCircle, Send } from 'lucide-react';
import Button from '@/components/ui/Button';
import Field from '@/components/ui/Field';
import { useContactForm } from '@/hooks/useContactForm';
import { LIMITS } from '@/utils/validators';

export default function ContactForm({ initialValues }) {
  const { values, errors, status, feedback, formRef, handleChange, handleBlur, handleSubmit, reset } =
    useContactForm(initialValues);

  const submitting = status === 'submitting';

  if (status === 'success') {
    return (
      <div className="py-6 text-center sm:py-10" role="status">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-700">
          <CircleCheck className="h-9 w-9" aria-hidden="true" />
        </span>
        <h2 className="mt-6 text-2xl font-bold">Message sent</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-body">{feedback}</p>
        <Button variant="secondary" className="mt-8" onClick={reset}>
          Send another message
        </Button>
      </div>
    );
  }

  const shared = { onChange: handleChange, onBlur: handleBlur };

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Contact form" className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          name="name"
          label="Full name"
          autoComplete="name"
          placeholder="Priya Nair"
          maxLength={LIMITS.name.max}
          value={values.name}
          error={errors.name}
          {...shared}
        />
        <Field
          id="email"
          name="email"
          type="email"
          inputMode="email"
          label="Email address"
          autoComplete="email"
          placeholder="priya@company.com"
          maxLength={LIMITS.email.max}
          value={values.email}
          error={errors.email}
          {...shared}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          label="Phone number"
          optional
          autoComplete="tel"
          placeholder="+91 98765 43210"
          maxLength={LIMITS.phone.max}
          value={values.phone}
          error={errors.phone}
          {...shared}
        />
        <Field
          id="subject"
          name="subject"
          label="Subject"
          placeholder="New company website"
          maxLength={LIMITS.subject.max}
          value={values.subject}
          error={errors.subject}
          {...shared}
        />
      </div>

      <Field
        as="textarea"
        id="message"
        name="message"
        label="How can we help?"
        rows={6}
        placeholder="Tell us what you want to build, who it is for and when you would like to launch."
        maxLength={LIMITS.message.max}
        showCount
        value={values.message}
        error={errors.message}
        {...shared}
      />

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="botcheck">Leave this field empty</label>
        <input
          id="botcheck"
          name="botcheck"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.botcheck}
          onChange={handleChange}
        />
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800"
        >
          <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p className="font-medium">{feedback}</p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          icon={submitting ? undefined : Send}
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? (
            <>
              <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            'Send message'
          )}
        </Button>
        <p className="text-sm text-muted">We only use your details to reply to this message.</p>
      </div>
    </form>
  );
}
