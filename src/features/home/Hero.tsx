import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight, CalendarDays, Stethoscope, MapPin } from 'lucide-react'
import { ActionLink, TextLink } from '../../components/ui'

export function Hero() {
  return (
    <>
      <section className="dm-hero" aria-labelledby="hero-title">
        <div className="container dm-hero-grid">
          <div className="dm-hero-copy">
            <p className="dm-kicker hero-enter hero-enter-1">
              <span /> DAMASCUS MEDICAL CENTER
            </p>
            <h1 id="hero-title" className="hero-enter hero-enter-2">
              Your health.
              <br />
              <em>Our attention.</em>
            </h1>
            <p className="dm-hero-description hero-enter hero-enter-3">
              Care starts with a conversation. Find a team that listens, brings the right expertise
              together, and helps you take the next step with confidence.
            </p>
            <div className="hero-actions hero-enter hero-enter-4">
              <ActionLink to="/appointments">Book an appointment</ActionLink>
              <TextLink to="/doctors">Find your doctor</TextLink>
            </div>
            <div className="dm-hero-foot hero-enter hero-enter-5">
              <span>PERSONAL. CONNECTED. CONSIDERED.</span>
              <a href="#specialties" aria-label="Explore our specialties">
                <ArrowDown size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
          <figure className="dm-hero-visual">
            <div className="dm-image-mask">
              <img
                className="hero-image"
                src="/images/consultation.webp"
                srcSet="/images/consultation-small.webp 640w, /images/consultation.webp 1440w"
                sizes="(max-width: 767px) 100vw, (max-width: 1199px) 900px, 55vw"
                width="1440"
                height="960"
                alt="A fictional physician listening to a patient in a sunlit consultation room"
                fetchPriority="high"
              />
            </div>
            <figcaption className="dm-photo-caption hero-enter hero-enter-5">
              <span className="dm-caption-line" />
              <span>
                Space to be heard.<small>A thoughtful approach to every conversation.</small>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="dm-quicklinks" aria-label="Start your care journey">
        <div className="container">
          {[
            {
              icon: Stethoscope,
              title: 'Find the right care',
              detail: 'Explore our medical specialties',
              to: '/services',
            },
            {
              icon: CalendarDays,
              title: 'Make time for your health',
              detail: 'Try the sample booking journey',
              to: '/appointments',
            },
            {
              icon: MapPin,
              title: 'Feel at home, from arrival',
              detail: 'Get to know the center',
              to: '/contact',
            },
          ].map(({ icon: Icon, title, detail, to }) => (
            <Link to={to} key={to}>
              <Icon size={25} strokeWidth={1.4} aria-hidden="true" />
              <span>
                <strong>{title}</strong>
                <small>{detail}</small>
              </span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
