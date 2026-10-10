import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X, MapPin, Clock } from 'lucide-react'
import { Brand, ActionLink } from './ui'
import { openingHours } from '../data/content'
const copyrightYear = new Date().getFullYear()
const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About us' },
  { to: '/services', label: 'Our services' },
  { to: '/doctors', label: 'Our doctors' },
  { to: '/contact', label: 'Contact & visit' },
]
export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const previousPath = useRef(location.pathname)
  useEffect(() => {
    window.scrollTo(0, 0)
    if (previousPath.current !== location.pathname)
      document.getElementById('main-content')?.focus({ preventScroll: true })
    previousPath.current = location.pathname
  }, [location.pathname])
  useEffect(() => {
    if (!menuOpen) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="topline">
        <div className="container flex items-center justify-between gap-4">
          <span>PERSONAL CARE. A CLEARER PATH TO WELLBEING.</span>
          <Link to="/privacy" className="topline-demo">
            Portfolio demonstration <ArrowUpRight size={12} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" aria-label="Damascus Medical Center home" onClick={() => setMenuOpen(false)}>
            <Brand />
          </Link>
          <nav aria-label="Main navigation" className="desktop-nav">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ActionLink
              to="/appointments"
              onClick={() => setMenuOpen(false)}
              className="header-book"
            >
              Book an appointment
            </ActionLink>
            <button
              ref={toggleRef}
              type="button"
              className="menu-toggle"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
                <ArrowUpRight size={18} aria-hidden="true" />
              </NavLink>
            ))}
            <ActionLink to="/appointments" onClick={() => setMenuOpen(false)}>
              Book an appointment
            </ActionLink>
          </nav>
        )}
      </header>
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div>
              <Link to="/" aria-label="Damascus Medical Center home">
                <Brand light />
              </Link>
              <p className="mt-6 max-w-xs text-sage-light leading-relaxed">
                A little more time. A little more understanding. Care built around you.
              </p>
              <span className="footer-demo">Fictional medical center · Portfolio project</span>
            </div>
            <div>
              <h2>Discover the center</h2>
              <Link to="/about">Our approach</Link>
              <Link to="/services">Medical services</Link>
              <Link to="/doctors">Meet our doctors</Link>
              <Link to="/faq">Your questions, answered</Link>
            </div>
            <div>
              <h2>Plan your visit</h2>
              <Link to="/appointments">Book a sample appointment</Link>
              <Link to="/contact" className="inline-flex items-start gap-2">
                <MapPin size={16} aria-hidden="true" />
                <span>
                  18 Willow Lane, Garden District
                  <br />
                  Sample address · Fictional location
                </span>
              </Link>
              <Link to="/contact">Contact the demo center</Link>
            </div>
            <div>
              <h2 className="flex items-center gap-2">
                <Clock size={16} aria-hidden="true" />
                Sample opening hours
              </h2>
              {openingHours.map((row) => (
                <div className="footer-hours" key={row.days}>
                  <span>{row.days}</span>
                  <span>{row.hours}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {copyrightYear} Damascus Medical Center. A portfolio demonstration.</span>
            <div className="flex flex-wrap gap-6">
              <Link to="/privacy">Privacy & demo notice</Link>
              <Link to="/contact">Accessibility feedback</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
