/**
 * Labelled input or textarea with an error message wired up for screen readers
 * (aria-invalid + aria-describedby).
 */
export default function Field({
  as = 'input',
  id,
  name,
  label,
  value,
  error,
  optional = false,
  hint,
  maxLength,
  showCount = false,
  className = '',
  ...rest
}) {
  const Control = as;
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-[0.95rem] font-semibold text-navy-900">
        <span>{label}</span>
        {optional && <span className="text-sm font-normal text-muted">Optional</span>}
      </label>

      <Control
        id={id}
        name={name}
        value={value}
        maxLength={maxLength}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={describedBy}
        aria-required={!optional}
        className={`block w-full rounded-xl border-2 bg-white px-4 py-3 text-base text-navy-900 transition-colors placeholder:text-navy-300 focus:outline-none focus:ring-4 ${
          error
            ? 'border-red-500 focus:border-red-600 focus:ring-red-100'
            : 'border-line hover:border-navy-200 focus:border-teal-500 focus:ring-teal-100'
        }`}
        {...rest}
      />

      <div className="mt-1.5 flex justify-between gap-4 text-sm">
        <div>
          {error ? (
            <p id={`${id}-error`} className="font-medium text-red-700">
              {error}
            </p>
          ) : (
            hint && (
              <p id={`${id}-hint`} className="text-muted">
                {hint}
              </p>
            )
          )}
        </div>
        {showCount && maxLength && (
          <p className="shrink-0 text-muted" aria-hidden="true">
            {String(value).length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
