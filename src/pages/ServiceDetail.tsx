import { Link, useParams } from 'react-router-dom'
import { Check, ArrowLeft } from 'lucide-react'
import { ActionLink, DemoNotice, Eyebrow, ServiceIcon, TextLink } from '../components/ui'
import { services, doctors } from '../data/content'
import { usePageMeta } from '../hooks/usePageMeta'
import NotFound from './NotFound'
export default function ServiceDetail() {
  const { id } = useParams()
  const service = services.find((s) => s.id === id)
  usePageMeta(
    service?.name ?? 'Service not found',
    service?.description ?? 'The requested service was not found.',
  )
  if (!service) return <NotFound />
  const related = doctors.filter((d) => d.serviceId === service.id)
  return (
    <section className="container detail-section">
      <Link to="/services" className="back-link">
        <ArrowLeft size={16} aria-hidden="true" />
        All medical services
      </Link>
      <div className="detail-grid">
        <div>
          <Eyebrow>{service.category}</Eyebrow>
          <h1>{service.name}</h1>
          <p className="detail-subtitle">{service.subtitle}</p>
          <p className="mt-6 max-w-xl text-muted leading-relaxed">{service.description}</p>
          <h2 className="mt-12 text-3xl">A conversation about your care</h2>
          <ul className="care-list">
            {service.includes.map((item) => (
              <li key={item}>
                <Check size={18} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <h2 className="mt-10 text-3xl">What to expect</h2>
          <p className="mt-4 text-muted leading-relaxed max-w-xl">
            Your sample journey begins with a consultation selection. Explore the time slots, review
            your preferences and see how a thoughtfully designed appointment process can feel.
          </p>
          {related.length > 0 && (
            <div className="mt-10">
              <h2 className="text-3xl mb-4">Meet your sample care team</h2>
              {related.map((d) => (
                <TextLink to={`/doctors/${d.id}`} key={d.id}>
                  {d.name}
                </TextLink>
              ))}
            </div>
          )}
        </div>
        <aside className="service-aside">
          <ServiceIcon id={service.id} className="h-14 w-14 mb-8" />
          <h2>
            Your next step,
            <br />
            <em>made simple.</em>
          </h2>
          <p className="my-6 text-muted">
            Explore a consultation for {service.name.toLowerCase()}. Select a sample time that works
            for you.
          </p>
          <ActionLink to={`/appointments?service=${service.id}`}>Book an appointment</ActionLink>
          <p className="micro-copy mt-5">Sample consultation · No real booking</p>
          <div className="mt-10 border-t border-line pt-6">
            <TextLink to="/contact">Questions about a visit?</TextLink>
          </div>
        </aside>
      </div>
      <DemoNotice />
    </section>
  )
}
