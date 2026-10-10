import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Languages, CalendarDays, HeartHandshake } from 'lucide-react'
import { Portrait, Eyebrow, ActionLink, DemoNotice, TextLink } from '../components/ui'
import { doctors, services } from '../data/content'
import { usePageMeta } from '../hooks/usePageMeta'
import NotFound from './NotFound'
export default function DoctorDetail() {
  const { id } = useParams()
  const doctor = doctors.find((d) => d.id === id)
  usePageMeta(
    doctor?.name ?? 'Doctor not found',
    doctor?.introduction ?? 'The requested doctor profile was not found.',
  )
  if (!doctor) return <NotFound />
  const service = services.find((s) => s.id === doctor.serviceId)
  return (
    <section className="container detail-section">
      <Link to="/doctors" className="back-link">
        <ArrowLeft size={16} aria-hidden="true" />
        Meet our doctors
      </Link>
      <div className="profile-grid">
        <Portrait index={doctor.portrait} name={doctor.name} className="profile-portrait" />
        <div className="profile-copy">
          <Eyebrow>{doctor.role}</Eyebrow>
          <h1>{doctor.name}</h1>
          <p className="text-muted mt-5 leading-relaxed">{doctor.introduction}</p>
          <div className="profile-facts">
            <div>
              <HeartHandshake size={22} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h2>Approach to care</h2>
                <p>{doctor.approach}</p>
              </div>
            </div>
            <div>
              <Languages size={22} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h2>Sample consultation languages</h2>
                <p>{doctor.languages.join(' · ')}</p>
              </div>
            </div>
            <div>
              <CalendarDays size={22} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h2>Plan a conversation</h2>
                <p>
                  In-person sample consultations. Explore available demonstration slots in the
                  booking flow.
                </p>
              </div>
            </div>
          </div>
          <ActionLink to={`/appointments?doctor=${doctor.id}`}>Book with this doctor</ActionLink>
          {service && (
            <div className="mt-6">
              <TextLink to={`/services/${service.id}`}>
                Explore {service.name.toLowerCase()}
              </TextLink>
            </div>
          )}
        </div>
      </div>
      <DemoNotice>
        This clinician, biography, language information and generated portrait are fictional.
        Selecting a sample slot does not reserve a real appointment.
      </DemoNotice>
    </section>
  )
}
