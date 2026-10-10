import { useState } from 'react'
import { Search, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageIntro, Portrait, EmptyState, DemoNotice } from '../components/ui'
import { doctors, services } from '../data/content'
import { usePageMeta } from '../hooks/usePageMeta'
export default function Doctors() {
  usePageMeta(
    'Meet our doctors',
    'Search fictional clinicians by name and specialty, explore their care approach and try booking with a selected doctor.',
  )
  const [query, setQuery] = useState('')
  const [specialty, setSpecialty] = useState('')
  const filtered = doctors.filter(
    (d) =>
      (!specialty || d.serviceId === specialty) &&
      d.name.toLowerCase().includes(query.trim().toLowerCase()),
  )
  return (
    <>
      <PageIntro
        eyebrow="PEOPLE BEHIND YOUR CARE"
        title={
          <>
            Find expertise.
            <br />
            <em>Feel understood.</em>
          </>
        }
        description="Good care is a partnership. Meet our sample clinicians, learn about their approach and find someone you feel comfortable talking to."
      />
      <section className="container directory-section">
        <div className="filter-toolbar">
          <div className="search-field">
            <Search size={18} aria-hidden="true" />
            <label className="sr-only" htmlFor="doctor-search">
              Search doctors by name
            </label>
            <input
              type="search"
              id="doctor-search"
              placeholder="Search a doctor by name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="specialty-select">
            <label htmlFor="specialty">Specialty</label>
            <select id="specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
              <option value="">All specialties</option>
              {services.map((s) => (
                <option value={s.id} key={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="result-count" role="status">
          {filtered.length} {filtered.length === 1 ? 'doctor' : 'doctors'} to get to know
        </p>
        <div className="doctor-grid">
          {filtered.map((d) => (
            <article className="doctor-card" key={d.id}>
              <Link to={`/doctors/${d.id}`} aria-label={`View ${d.name}'s profile`}>
                <Portrait index={d.portrait} name={d.name} />
              </Link>
              <div className="doctor-card-info">
                <div>
                  <p>{d.role}</p>
                  <h2>
                    <Link to={`/doctors/${d.id}`}>{d.name}</Link>
                  </h2>
                </div>
                <Link
                  to={`/doctors/${d.id}`}
                  className="round-arrow"
                  aria-label={`More about ${d.name}`}
                >
                  <ArrowUpRight size={20} aria-hidden="true" />
                </Link>
              </div>
              <p className="text-muted text-sm leading-relaxed mt-4">{d.introduction}</p>
              <Link className="text-link mt-5" to={`/appointments?doctor=${d.id}`}>
                Book with this doctor
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
        {!filtered.length && (
          <EmptyState
            title="No matching doctors"
            onReset={() => {
              setQuery('')
              setSpecialty('')
            }}
          />
        )}
        <DemoNotice>
          These profiles, language details and portraits are fictional sample content. No
          qualifications or clinical availability are verified.
        </DemoNotice>
      </section>
    </>
  )
}
