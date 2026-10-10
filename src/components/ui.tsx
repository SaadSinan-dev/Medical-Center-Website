import {
  ArrowUpRight,
  Heart,
  Stethoscope,
  Activity,
  Baby,
  Bone,
  ScanLine,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { brand } from '../data/brand'
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand ${light ? 'text-ivory' : 'text-forest'}`}>
      <svg className="brand-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path
          d="M18 3h12v15h15v12H30v15H18V30H3V18h15V3Z"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path d="M18 18h12v12H18z" fill="currentColor" />
      </svg>
      <span className="brand-word">
        <span className="brand-name">{brand.shortName}</span>
        <span className="brand-tag">MEDICAL CENTER</span>
        <span className="brand-arabic" lang="ar" dir="rtl">
          {brand.arabicName}
        </span>
      </span>
    </span>
  )
}
const serviceIcons = {
  'general-medicine': Stethoscope,
  cardiology: Heart,
  dermatology: Sparkles,
  pediatrics: Baby,
  orthopedics: Bone,
  diagnostics: ScanLine,
}
export function ServiceIcon({ id, className = '' }: { id: string; className?: string }) {
  const Icon = serviceIcons[id as keyof typeof serviceIcons] ?? Activity
  return <Icon className={className} strokeWidth={1.5} aria-hidden="true" />
}
export function ActionLink({
  to,
  children,
  secondary = false,
  className = '',
  onClick,
}: {
  to: string
  children: ReactNode
  secondary?: boolean
  className?: string
  onClick?: () => void
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`button ${secondary ? 'button-secondary' : 'button-primary'} ${className}`}
    >
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  )
}
export function TextLink({
  to,
  children,
  className = '',
}: {
  to: string
  children: ReactNode
  className?: string
}) {
  return (
    <Link to={to} className={`text-link ${className}`}>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  )
}
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`eyebrow ${light ? 'text-sage-light' : ''}`}>
      <span className="eyebrow-dot" />
      {children}
    </p>
  )
}
export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: ReactNode
  description: string
}) {
  return (
    <div className="page-intro">
      <div className="container">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p className="max-w-2xl text-muted">{description}</p>
      </div>
    </div>
  )
}
export function DemoNotice({ children }: { children?: ReactNode }) {
  return (
    <div className="demo-notice">
      <span className="demo-label">DEMONSTRATION</span>
      <p>
        {children ??
          'Damascus Medical Center is a fictional medical center. All clinicians, availability and details are sample content.'}
      </p>
    </div>
  )
}
export function EmptyState({ title, onReset }: { title: string; onReset: () => void }) {
  return (
    <div className="empty-state">
      <Stethoscope size={32} strokeWidth={1.3} aria-hidden="true" />
      <h2>{title}</h2>
      <p>Try another search or clear your filters.</p>
      <button type="button" className="button button-secondary" onClick={onReset}>
        Clear filters
      </button>
    </div>
  )
}
export function Portrait({
  index,
  name,
  className = '',
}: {
  index: number
  name: string
  className?: string
}) {
  return (
    <div className={`portrait ${className}`}>
      <img
        src="/images/clinicians.webp"
        width="1536"
        height="1024"
        alt={`Generated portrait representing fictional clinician ${name}`}
        loading="lazy"
        style={{ left: `${-100 * index}%` }}
      />
    </div>
  )
}
