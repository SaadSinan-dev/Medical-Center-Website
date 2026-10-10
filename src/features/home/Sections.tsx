import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { ActionLink, Eyebrow, Portrait, ServiceIcon, TextLink } from '../../components/ui'
import { Reveal } from '../../components/Reveal'
import { Accordion } from '../../components/Accordion'
import { services, doctors, faqs } from '../../data/content'

export function Specialties() {
  return (
    <section id="specialties" className="dm-specialties dm-section">
      <div className="container dm-specialties-grid">
        <Reveal className="dm-section-intro">
          <Eyebrow>01 / OUR SPECIALTIES</Eyebrow>
          <h2>
            Expertise for
            <br />
            every chapter
            <br />
            <em>of your health.</em>
          </h2>
          <p>Everyday care and specialist perspectives, brought together around you.</p>
          <TextLink to="/services">Explore all services</TextLink>
        </Reveal>
        <div className="dm-service-list">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={(index % 2) * 90}>
              <Link to={`/services/${service.id}`} className="dm-service">
                <div className="dm-service-top">
                  <ServiceIcon id={service.id} />
                  <span>0{index + 1}</span>
                </div>
                <h3>{service.name}</h3>
                <p>{service.subtitle}</p>
                <ArrowUpRight className="dm-service-arrow" size={20} aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CareApproach() {
  return (
    <section className="dm-approach dm-section">
      <div className="container">
        <Reveal className="dm-approach-heading">
          <Eyebrow>02 / THE DAMASCUS APPROACH</Eyebrow>
          <h2>
            Good care treats a condition.
            <br />
            <em>Thoughtful care sees a person.</em>
          </h2>
        </Reveal>
        <div className="dm-approach-grid">
          <Reveal className="dm-interior">
            <img
              src="/images/interior.webp"
              width="1200"
              height="800"
              loading="lazy"
              alt="Generated concept of a welcoming medical reception with natural light, sage seating and oak details"
            />
            <span>A calmer place to begin.</span>
          </Reveal>
          <Reveal className="dm-approach-copy" delay={120}>
            <p>
              Your questions deserve time. Your next steps deserve clarity. Our care philosophy
              starts with the person behind the appointment.
            </p>
            <ol>
              {[
                ['First, we listen.', 'Space to share your story and what matters to you.'],
                [
                  'Together, we understand.',
                  'Clear conversations that help you make informed choices.',
                ],
                ['Next, a path forward.', 'A considered plan, with each next step explained.'],
              ].map(([title, text], index) => (
                <li key={title}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <TextLink to="/about">Discover our approach</TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function CareTeam() {
  return (
    <section className="dm-team dm-section">
      <div className="container">
        <Reveal className="dm-team-heading">
          <div>
            <Eyebrow>03 / PEOPLE BEHIND YOUR CARE</Eyebrow>
            <h2>
              Expertise, with
              <br />
              <em>a human connection.</em>
            </h2>
          </div>
          <div>
            <p>
              A personal approach begins with people.
              <br />
              Get to know our sample care team.
            </p>
            <TextLink to="/doctors">Meet our doctors</TextLink>
          </div>
        </Reveal>
        <div className="doctor-grid">
          {doctors.map((doctor, index) => (
            <Reveal key={doctor.id} delay={index * 100}>
              <Link to={`/doctors/${doctor.id}`} className="doctor-card">
                <Portrait index={doctor.portrait} name={doctor.name} />
                <div className="doctor-card-info">
                  <div>
                    <p>{doctor.role}</p>
                    <h3>{doctor.name}</h3>
                  </div>
                  <span className="round-arrow">
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="dm-fiction-note">
          Illustrative care team. Names, profiles and generated portraits are fictional.
        </p>
      </div>
    </section>
  )
}

export function VisitQuestions() {
  return (
    <>
      <section className="dm-questions dm-section">
        <div className="container faq-grid">
          <Reveal>
            <Eyebrow>BEFORE YOUR FIRST STEP</Eyebrow>
            <h2>
              A little clarity.
              <br />
              <em>A little reassurance.</em>
            </h2>
            <TextLink to="/faq">All your questions, answered</TextLink>
          </Reveal>
          <Reveal delay={100}>
            {faqs.slice(0, 3).map((faq) => (
              <Accordion key={faq.question} {...faq} />
            ))}
          </Reveal>
        </div>
      </section>
      <section className="dm-appointment">
        <div className="container">
          <Reveal className="dm-appointment-inner">
            <div>
              <Eyebrow>CARE BEGINS WITH A CONVERSATION</Eyebrow>
              <h2>
                Let’s take the
                <br />
                <em>next step together.</em>
              </h2>
            </div>
            <div>
              <p>A clear, simple path to finding your care.</p>
              <ActionLink to="/appointments">Book an appointment</ActionLink>
              <small>
                Try our sample booking experience <ArrowRight size={13} aria-hidden="true" />
              </small>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
