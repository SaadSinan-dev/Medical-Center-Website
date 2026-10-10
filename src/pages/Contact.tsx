import { useEffect, useRef, useState } from 'react'
import { Mail, MapPin, Clock3, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageIntro, DemoNotice, Eyebrow } from '../components/ui'
import { Field, Consent } from '../components/forms'
import { openingHours } from '../data/content'
import { contactSchema } from '../lib/booking'
import { usePageMeta } from '../hooks/usePageMeta'
export default function Contact() {
  usePageMeta(
    'Contact & plan your visit',
    'Explore a sample visit to fictional Damascus Medical Center, demonstration opening hours, an illustrative location and a validated local contact form.',
  )
  const [values, setValues] = useState({ name: '', email: '', message: '', consent: false })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const successRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (submitted) successRef.current?.focus()
  }, [submitted])
  function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = contactSchema.safeParse(values)
    if (!result.success) {
      const next: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const key = String(issue.path[0])
        if (!next[key]) next[key] = issue.message
      })
      setErrors(next)
      window.setTimeout(
        () => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
        0,
      )
      return
    }
    setErrors({})
    setValues({ name: '', email: '', message: '', consent: false })
    setSubmitted(true)
  }
  return (
    <>
      <PageIntro
        eyebrow="A WELCOMING PLACE TO BEGIN"
        title={
          <>
            A thoughtful visit.
            <br />
            <em>From the very start.</em>
          </>
        }
        description="Find your way around the sample center, explore our opening hours or try the contact experience."
      />
      <section className="container contact-section">
        <DemoNotice>
          All contact information and the address below are fictional examples. Messages are
          validated locally and are never delivered.
        </DemoNotice>
        <div className="contact-grid">
          <div>
            <Eyebrow>PLAN YOUR VISIT</Eyebrow>
            <h2>
              A little clarity
              <br />
              <em>before you arrive.</em>
            </h2>
            <div className="contact-fact">
              <MapPin strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h3>The sample center</h3>
                <p>
                  18 Willow Lane, Garden District
                  <br />
                  Fictional location · No real premises
                </p>
              </div>
            </div>
            <div className="contact-fact">
              <Mail strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h3>Sample contact information</h3>
                <p>hello@damascus.example</p>
                <p className="micro-copy mt-1">
                  Reserved example domain · This address cannot receive mail.
                </p>
              </div>
            </div>
            <div className="contact-fact">
              <Clock3 strokeWidth={1.5} aria-hidden="true" />
              <div className="w-full">
                <h3>Sample opening hours</h3>
                {openingHours.map((row) => (
                  <div className="hours-row" key={row.days}>
                    <span>{row.days}</span>
                    <span>{row.hours}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="visit-plan">
              <h3>Arriving at the fictional center</h3>
              <p>
                The illustrated plan shows a proposed entrance, accessible drop-off and reception.
                It is a design concept, not a navigable real-world map.
              </p>
              <svg viewBox="0 0 440 210" role="img" aria-labelledby="map-title">
                <title id="map-title">
                  Illustrative fictional site plan showing Willow Lane, drop-off, entrance and
                  reception
                </title>
                <rect width="440" height="210" fill="#e9ede2" />
                <path d="M0 158H440M90 0V210" stroke="#fafbf7" strokeWidth="30" />
                <path d="M0 158H440" stroke="#c1cdb7" strokeWidth="1" strokeDasharray="6 6" />
                <rect
                  x="178"
                  y="28"
                  width="204"
                  height="96"
                  rx="3"
                  fill="#d4decb"
                  stroke="#819474"
                />
                <rect x="210" y="53" width="138" height="47" fill="#183f36" />
                <text x="279" y="80" fill="#fff" fontSize="9" textAnchor="middle">
                  DAMASCUS · RECEPTION
                </text>
                <path d="M279 101V156" stroke="#183f36" strokeWidth="2" strokeDasharray="4 3" />
                <circle cx="279" cy="130" r="7" fill="#183f36" />
                <text x="304" y="135" fill="#183f36" fontSize="11">
                  Entrance
                </text>
                <text x="15" y="197" fill="#50634e" fontSize="11">
                  WILLOW LANE · FICTIONAL PLAN
                </text>
                <text x="147" y="180" fill="#183f36" fontSize="11">
                  Accessible drop-off
                </text>
                <circle cx="400" cy="45" r="12" fill="#b4c3a7" />
                <circle cx="151" cy="70" r="16" fill="#b4c3a7" />
              </svg>
            </div>
          </div>
          <div className="contact-form-panel">
            {submitted ? (
              <div className="py-12">
                <CheckCircle2 size={42} strokeWidth={1.4} className="mb-6" aria-hidden="true" />
                <h2 tabIndex={-1} ref={successRef}>
                  Demo message checked.
                </h2>
                <p className="text-muted mt-5">
                  Your form passed validation. No message was sent or saved. The fictional details
                  have been cleared.
                </p>
                <button
                  type="button"
                  className="button button-primary mt-8"
                  onClick={() => setSubmitted(false)}
                >
                  Try another message
                  <ArrowUpRight size={18} aria-hidden="true" />
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={submit}>
                <Eyebrow>LET’S START A CONVERSATION</Eyebrow>
                <h2>
                  What’s on <em>your mind?</em>
                </h2>
                <p className="text-muted my-5">
                  Try our demo form with fictional details. Please don’t share health information.
                </p>
                <div className="space-y-5">
                  <Field
                    id="contact-name"
                    name="name"
                    label="Full name"
                    value={values.name}
                    autoComplete="name"
                    maxLength={80}
                    error={errors.name}
                    onChange={(e) => setValues({ ...values, name: e.target.value })}
                  />
                  <Field
                    id="contact-email"
                    name="email"
                    type="email"
                    label="Email address"
                    value={values.email}
                    autoComplete="email"
                    maxLength={254}
                    error={errors.email}
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                  />
                  <div className="form-field">
                    <label htmlFor="message">Your message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      maxLength={1000}
                      value={values.message}
                      onChange={(e) => setValues({ ...values, message: e.target.value })}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : 'message-help'}
                    />
                    <p id="message-help" className="micro-copy mt-2">
                      10–1,000 characters. No medical or sensitive information.
                    </p>
                    {errors.message && (
                      <p className="field-error" id="message-error">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>
                <Consent
                  checked={values.consent}
                  error={errors.consent}
                  onChange={(value) => setValues({ ...values, consent: value })}
                />
                <button className="button button-primary w-full mt-7" type="submit">
                  Check demo message
                  <ArrowUpRight size={18} aria-hidden="true" />
                </button>
                <p className="micro-copy mt-4">
                  Local validation only.{' '}
                  <Link
                    to="/privacy"
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy notice (new tab)
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
