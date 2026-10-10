import CareStep from './steps/CareStep'
import ScheduleStep from './steps/ScheduleStep'
import DetailsStep from './steps/DetailsStep'
import ReviewStep from './steps/ReviewStep'
import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, CalendarDays, CheckCircle2 } from 'lucide-react'
import { ActionLink, DemoNotice, Eyebrow } from '../../components/ui'
import { doctors, services } from '../../data/content'
import {
  formatDate,
  formatTime,
  getInitialSelection,
  getSampleDates,
  patientSchema,
  validateSchedule,
} from '../../lib/booking'
import { usePageMeta } from '../../hooks/usePageMeta'
import type { AppointmentDraft } from '../../types/domain'

const steps = ['Your care', 'Date & time', 'Your details', 'Review']
const emptyPatient = { name: '', email: '', phone: '', consent: false }
export default function Appointments() {
  usePageMeta(
    'Book a sample appointment',
    'Try an honest demonstration of specialty selection, sample scheduling, validated contact details and appointment review. No real booking is made.',
  )
  const [params] = useSearchParams()
  const [draft, setDraft] = useState<AppointmentDraft>(() => ({
    ...getInitialSelection(params),
    date: '',
    time: '',
    patient: { ...emptyPatient },
  }))
  const [dates] = useState(() => getSampleDates())
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [complete, setComplete] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const service = services.find((s) => s.id === draft.serviceId)
  const doctor = doctors.find((d) => d.id === draft.doctorId)
  const selectionKey = `${params.get('service') ?? ''}:${params.get('doctor') ?? ''}`
  const previousKey = useRef(selectionKey)
  useEffect(() => {
    if (previousKey.current === selectionKey) return
    previousKey.current = selectionKey
    setDraft({
      ...getInitialSelection(new URLSearchParams(window.location.search)),
      date: '',
      time: '',
      patient: { ...emptyPatient },
    })
    setStep(0)
    setComplete(false)
    setErrors({})
  }, [selectionKey])
  useEffect(() => {
    headingRef.current?.focus()
  }, [step, complete])
  const setPatient = (field: keyof typeof emptyPatient, value: string | boolean) =>
    setDraft((current) => ({ ...current, patient: { ...current.patient, [field]: value } }))
  function changeStep(next: number) {
    setErrors({})
    setStep(next)
  }
  function focusErrors() {
    window.setTimeout(
      () =>
        document
          .querySelector<HTMLElement>(
            'input[aria-invalid="true"], select[aria-invalid="true"], textarea[aria-invalid="true"]',
          )
          ?.focus(),
      0,
    )
  }
  function next() {
    if (step === 0 && !service) {
      setErrors({ service: 'Choose a specialty to continue.' })
      focusErrors()
      return
    }
    if (step === 1 && !validateSchedule(draft.date, draft.time, dates)) {
      setErrors({ schedule: 'Choose a sample date and time to continue.' })
      focusErrors()
      return
    }
    if (step === 2) {
      const result = patientSchema.safeParse(draft.patient)
      if (!result.success) {
        const nextErrors: Record<string, string> = {}
        result.error.issues.forEach((issue) => {
          const field = String(issue.path[0])
          if (!nextErrors[field]) nextErrors[field] = issue.message
        })
        setErrors(nextErrors)
        focusErrors()
        return
      }
      setDraft((current) => ({ ...current, patient: result.data }))
    }
    changeStep(step + 1)
  }
  function confirm() {
    if (!service || (doctor && doctor.serviceId !== service.id)) {
      changeStep(0)
      return
    }
    if (!validateSchedule(draft.date, draft.time, dates)) {
      changeStep(1)
      return
    }
    if (!patientSchema.safeParse(draft.patient).success) {
      changeStep(2)
      return
    }
    setComplete(true)
  }
  function restart() {
    setDraft({ serviceId: '', doctorId: '', date: '', time: '', patient: { ...emptyPatient } })
    setComplete(false)
    changeStep(0)
  }
  return (
    <section className="container booking-section">
      <div className="booking-title">
        <Eyebrow>LET’S MAKE ROOM FOR YOU</Eyebrow>
        <h1>
          Your care starts <em>here.</em>
        </h1>
        <p className="text-muted mt-4">
          A few simple steps toward a more thoughtful care experience.
        </p>
      </div>
      <DemoNotice>
        Explore the booking experience using fictional contact details. Dates and times are sample
        availability. No real appointment is booked.
      </DemoNotice>
      {complete ? (
        <div className="confirmation">
          <CheckCircle2
            className="text-forest mx-auto mb-7"
            size={54}
            strokeWidth={1.2}
            aria-hidden="true"
          />
          <Eyebrow>DEMONSTRATION COMPLETE</Eyebrow>
          <h2 ref={headingRef} tabIndex={-1}>
            You’ve explored the journey.
          </h2>
          <p className="text-muted max-w-xl mx-auto mt-4">
            No appointment has been booked, and your details have not been sent anywhere. In a
            connected service, this is where a clinic would confirm your request.
          </p>
          <div className="confirmation-summary">
            <h3>Sample appointment summary</h3>
            <p>
              {service?.name} · {doctor?.name ?? 'No clinician preference'}
            </p>
            <p>
              {formatDate(draft.date)} at {formatTime(draft.time)}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button type="button" className="button button-primary" onClick={restart}>
              Start a new demonstration
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <ActionLink secondary to="/">
              Back to home
            </ActionLink>
          </div>
          <p className="micro-copy mt-6">
            Refreshing this page clears the information you entered.
          </p>
        </div>
      ) : (
        <div className="booking-grid">
          <div className="booking-panel">
            <ol className="booking-steps" aria-label="Booking progress">
              {steps.map((label, index) => (
                <li key={label} aria-current={step === index ? 'step' : undefined}>
                  <span className={`step-number ${index <= step ? 'step-active' : ''}`}>
                    {index < step ? <Check size={15} aria-hidden="true" /> : index + 1}
                  </span>
                  <span>{label}</span>
                </li>
              ))}
            </ol>
            <form
              key={step}
              className="booking-panel-content"
              noValidate
              onSubmit={(event) => {
                event.preventDefault()
                if (step === 3) confirm()
                else next()
              }}
            >
              <p className="micro-copy uppercase tracking-wider">STEP {step + 1} OF 4</p>
              <h2 ref={headingRef} tabIndex={-1} className="booking-stage-heading">
                {
                  [
                    'What brings you to Damascus Medical Center?',
                    'Make time for your care.',
                    'A way to keep in touch.',
                    'Everything, thoughtfully checked.',
                  ][step]
                }
              </h2>
              {step === 0 && <CareStep draft={draft} setDraft={setDraft} errors={errors} />}
              {step === 1 && (
                <ScheduleStep draft={draft} setDraft={setDraft} errors={errors} dates={dates} />
              )}
              {step === 2 && <DetailsStep draft={draft} errors={errors} setPatient={setPatient} />}
              {step === 3 && <ReviewStep draft={draft} changeStep={changeStep} />}
              <div className="booking-controls">
                {step > 0 ? (
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => changeStep(step - 1)}
                  >
                    <ArrowLeft size={16} aria-hidden="true" />
                    Back
                  </button>
                ) : (
                  <Link to="/services" className="text-link">
                    Explore services
                  </Link>
                )}
                <button type="submit" className="button button-primary">
                  {step === 3 ? 'Complete demonstration' : 'Continue'}
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
          <aside className="booking-aside">
            <CalendarDays size={32} strokeWidth={1.4} aria-hidden="true" />
            <h2>
              A little less admin.
              <br />
              <em>A little more care.</em>
            </h2>
            <p className="mt-5 text-muted leading-relaxed">
              A clear path from your first question to your next conversation.
            </p>
            <div className="booking-aside-summary">
              <h3>Your sample selection</h3>
              <p>{service?.name ?? 'Choose your specialty'}</p>
              <p>{doctor?.name ?? 'No clinician preference'}</p>
              {draft.date && (
                <p>
                  {formatDate(draft.date, { month: 'short', day: 'numeric', weekday: 'short' })}
                  {draft.time && ` · ${formatTime(draft.time)}`}
                </p>
              )}
            </div>
            <div className="mt-8 pt-6 border-t border-line">
              <p className="text-sm text-muted">Questions about the process?</p>
              <Link to="/faq" className="text-link mt-2">
                Find a thoughtful answer
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      )}
    </section>
  )
}
