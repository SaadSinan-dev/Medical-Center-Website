import { ShieldCheck } from 'lucide-react'
import { doctors, services } from '../../../data/content'
import { formatDate, formatTime } from '../../../lib/booking'
import type { AppointmentDraft } from '../../../types/domain'

export default function ReviewStep({
  draft,
  changeStep,
}: {
  draft: AppointmentDraft
  changeStep: (step: number) => void
}) {
  const service = services.find((s) => s.id === draft.serviceId)
  const doctor = doctors.find((d) => d.id === draft.doctorId)
  return (
    <>
      <p className="text-muted mb-7">
        Check your sample appointment before completing the demonstration.
      </p>
      <div className="review-block">
        <div className="flex items-center justify-between gap-4">
          <h3>Your care</h3>
          <button type="button" onClick={() => changeStep(0)} className="edit-button">
            Edit care
          </button>
        </div>
        <p>{service?.name}</p>
        <p className="text-muted">{doctor?.name ?? 'No clinician preference'}</p>
      </div>
      <div className="review-block">
        <div className="flex items-center justify-between gap-4">
          <h3>Date & time</h3>
          <button type="button" onClick={() => changeStep(1)} className="edit-button">
            Edit schedule
          </button>
        </div>
        <p>{formatDate(draft.date)}</p>
        <p className="text-muted">{formatTime(draft.time)} · Sample center local time</p>
      </div>
      <div className="review-block">
        <div className="flex items-center justify-between gap-4">
          <h3>Your contact details</h3>
          <button type="button" onClick={() => changeStep(2)} className="edit-button">
            Edit details
          </button>
        </div>
        <p>{draft.patient.name}</p>
        <p className="text-muted break-all">{draft.patient.email}</p>
        <p className="text-muted">{draft.patient.phone}</p>
      </div>
      <div className="review-note">
        <ShieldCheck size={22} aria-hidden="true" />
        <p>Completing this demo does not send a request or reserve an appointment.</p>
      </div>
    </>
  )
}
