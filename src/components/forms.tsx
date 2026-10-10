import type { InputHTMLAttributes } from 'react'
export function Field({
  label,
  error,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; id: string }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}
export function Consent({
  checked,
  onChange,
  error,
}: {
  checked: boolean
  onChange: (value: boolean) => void
  error?: string
}) {
  return (
    <div className="mt-6">
      <label className="consent-label">
        <input
          type="checkbox"
          name="consent"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'consent-error' : undefined}
        />
        <span>
          I understand this is a demonstration and will use fictional details. No request will be
          sent.
        </span>
      </label>
      {error && (
        <p id="consent-error" className="field-error">
          {error}
        </p>
      )}
    </div>
  )
}
