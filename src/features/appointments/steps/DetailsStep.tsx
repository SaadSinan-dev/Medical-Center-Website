import { Link } from 'react-router-dom'
import { Field, Consent } from '../../../components/forms'
import type { AppointmentDraft, PatientDetails } from '../../../types/domain'

export default function DetailsStep({
  draft,
  errors,
  setPatient,
}: {
  draft: AppointmentDraft
  errors: Record<string, string>
  setPatient: (field: keyof PatientDetails, value: string | boolean) => void
}) {
  return (
    <>
      <p className="text-muted mb-7">
        Use fictional details. Please don’t enter medical information.
      </p>
      <div className="space-y-5">
        <Field
          label="Full name"
          id="patient-name"
          name="name"
          autoComplete="name"
          value={draft.patient.name}
          error={errors.name}
          onChange={(e) => setPatient('name', e.target.value)}
          maxLength={80}
        />
        <Field
          label="Email address"
          id="patient-email"
          name="email"
          type="email"
          autoComplete="email"
          value={draft.patient.email}
          error={errors.email}
          onChange={(e) => setPatient('email', e.target.value)}
          maxLength={254}
        />
        <Field
          label="Phone number"
          id="patient-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={draft.patient.phone}
          error={errors.phone}
          onChange={(e) => setPatient('phone', e.target.value)}
          maxLength={25}
        />
      </div>
      <Consent
        checked={draft.patient.consent}
        onChange={(value) => setPatient('consent', value)}
        error={errors.consent}
      />
      <p className="micro-copy mt-4">
        Your details stay in this page’s memory.{' '}
        <Link
          to="/privacy"
          className="underline underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the demo privacy notice (opens a new tab).
        </Link>
      </p>
    </>
  )
}
