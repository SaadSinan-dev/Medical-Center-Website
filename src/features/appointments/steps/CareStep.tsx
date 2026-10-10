import { doctors, services } from '../../../data/content'
import { Check } from 'lucide-react'
import { ServiceIcon } from '../../../components/ui'
import type { Dispatch, SetStateAction } from 'react'
import type { AppointmentDraft } from '../../../types/domain'

export default function CareStep({
  draft,
  setDraft,
  errors,
}: {
  draft: AppointmentDraft
  setDraft: Dispatch<SetStateAction<AppointmentDraft>>
  errors: Record<string, string>
}) {
  const service = services.find((s) => s.id === draft.serviceId)
  return (
    <>
      <p className="text-muted mb-7">
        Choose a specialty to explore. You can select a doctor next.
      </p>
      <fieldset
        aria-describedby={errors.service ? 'service-error' : undefined}
        aria-invalid={Boolean(errors.service)}
      >
        <legend className="field-label">Your specialty</legend>
        <div className="specialty-options">
          {services.map((s) => (
            <label
              key={s.id}
              className={`specialty-option ${draft.serviceId === s.id ? 'option-selected' : ''}`}
            >
              <input
                type="radio"
                name="service"
                value={s.id}
                checked={draft.serviceId === s.id}
                onChange={() =>
                  setDraft((current) => ({
                    ...current,
                    serviceId: s.id,
                    doctorId: '',
                    date: '',
                    time: '',
                  }))
                }
                aria-invalid={Boolean(errors.service)}
              />
              <ServiceIcon id={s.id} />
              <span>{s.name}</span>
              {draft.serviceId === s.id && (
                <Check size={16} className="ml-auto" aria-hidden="true" />
              )}
            </label>
          ))}
        </div>
      </fieldset>
      {errors.service && (
        <p className="field-error" id="service-error" role="alert">
          {errors.service}
        </p>
      )}
      <div className="form-field mt-7">
        <label htmlFor="booking-doctor">
          Preferred doctor <span className="font-normal text-muted">(optional)</span>
        </label>
        <select
          id="booking-doctor"
          value={draft.doctorId}
          disabled={!service}
          onChange={(e) =>
            setDraft((current) => ({ ...current, doctorId: e.target.value, date: '', time: '' }))
          }
        >
          <option value="">No preference</option>
          {doctors
            .filter((d) => d.serviceId === draft.serviceId)
            .map((d) => (
              <option value={d.id} key={d.id}>
                {d.name}
              </option>
            ))}
        </select>
        <p className="micro-copy mt-2">
          Choose a specialty first. Some specialties have no individual sample profile.
        </p>
      </div>
    </>
  )
}
