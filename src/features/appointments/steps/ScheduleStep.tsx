import { formatDate, formatTime, getSampleTimes } from '../../../lib/booking'
import type { Dispatch, SetStateAction } from 'react'
import type { AppointmentDraft } from '../../../types/domain'

export default function ScheduleStep({
  draft,
  setDraft,
  errors,
  dates,
}: {
  draft: AppointmentDraft
  setDraft: Dispatch<SetStateAction<AppointmentDraft>>
  errors: Record<string, string>
  dates: string[]
}) {
  return (
    <>
      <p className="text-muted mb-7">
        These are demonstration slots, not live clinical availability.
      </p>
      <fieldset
        aria-invalid={Boolean(errors.schedule)}
        aria-describedby={errors.schedule ? 'schedule-error' : undefined}
      >
        <legend className="field-label">Choose a sample date</legend>
        <div className="date-options">
          {dates.map((date) => (
            <label
              className={`date-option ${draft.date === date ? 'option-selected' : ''}`}
              key={date}
            >
              <input
                type="radio"
                name="date"
                checked={draft.date === date}
                onChange={() => setDraft((current) => ({ ...current, date, time: '' }))}
                aria-label={formatDate(date)}
                aria-invalid={Boolean(errors.schedule)}
              />
              <span>{formatDate(date, { weekday: 'short' })}</span>
              <strong>{formatDate(date, { day: 'numeric' })}</strong>
              <span>{formatDate(date, { month: 'short' })}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="mt-7">
        <legend className="field-label">Choose a sample time</legend>
        <div className="time-options">
          {getSampleTimes(draft.date).map((time) => (
            <label
              className={`time-option ${draft.time === time ? 'option-selected' : ''} ${!draft.date ? 'option-disabled' : ''}`}
              key={time}
            >
              <input
                type="radio"
                name="time"
                disabled={!draft.date}
                checked={draft.time === time}
                onChange={() => setDraft((current) => ({ ...current, time }))}
              />
              {formatTime(time)}
            </label>
          ))}
        </div>
        <p className="micro-copy mt-3">
          Sample center local time. Select a date to enable time slots.
        </p>
      </fieldset>
      {errors.schedule && (
        <p className="field-error" id="schedule-error" role="alert">
          {errors.schedule}
        </p>
      )}
    </>
  )
}
