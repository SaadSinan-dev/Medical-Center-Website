import { useState } from 'react'
import { Search, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageIntro, ServiceIcon, EmptyState, DemoNotice } from '../components/ui'
import { services } from '../data/content'
import { usePageMeta } from '../hooks/usePageMeta'
export default function Services() {
  usePageMeta(
    'Our medical services',
    'Explore six sample specialties, from general medicine to diagnostic services, at fictional Damascus Medical Center.',
  )
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All services')
  const filtered = services.filter(
    (service) =>
      (category === 'All services' || service.category === category) &&
      `${service.name} ${service.description}`.toLowerCase().includes(query.trim().toLowerCase()),
  )
  return (
    <>
      <PageIntro
        eyebrow="OUR MEDICAL SERVICES"
        title={
          <>
            The right care.
            <br />
            <em>A clear way forward.</em>
          </>
        }
        description="Everyday questions or specialist support. Find a service that meets you where you are, and explore your next step."
      />
      <section className="container directory-section">
        <div className="filter-toolbar">
          <div className="search-field">
            <Search size={18} aria-hidden="true" />
            <label className="sr-only" htmlFor="service-search">
              Search services
            </label>
            <input
              id="service-search"
              type="search"
              placeholder="Search a service or specialty"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="filter-pills" aria-label="Service categories">
            {['All services', 'Everyday care', 'Specialist care', 'Diagnostics'].map((value) => (
              <button
                type="button"
                key={value}
                aria-pressed={value === category}
                onClick={() => setCategory(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <p className="result-count" role="status">
          {filtered.length} {filtered.length === 1 ? 'service' : 'services'} to explore
        </p>
        <div className="service-directory">
          {filtered.map((service, index) => (
            <article className="service-row" key={service.id}>
              <div className="service-row-icon">
                <ServiceIcon id={service.id} />
                <span>0{index + 1}</span>
              </div>
              <div>
                <span className="micro-copy uppercase tracking-wider">{service.category}</span>
                <h2>
                  <Link to={`/services/${service.id}`}>{service.name}</Link>
                </h2>
                <p>{service.description}</p>
              </div>
              <div className="service-row-actions">
                <Link className="text-link" to={`/services/${service.id}`}>
                  Explore service
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
                <Link className="subtle-link" to={`/appointments?service=${service.id}`}>
                  Book a sample appointment
                </Link>
              </div>
            </article>
          ))}
        </div>
        {!filtered.length && (
          <EmptyState
            title="No matching services"
            onReset={() => {
              setQuery('')
              setCategory('All services')
            }}
          />
        )}
        <DemoNotice />
      </section>
    </>
  )
}
