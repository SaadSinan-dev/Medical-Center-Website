import { describe, expect, it } from 'vitest'
import {
  getSampleDates,
  getInitialSelection,
  patientSchema,
  contactSchema,
  validateSchedule,
} from './booking'

describe('booking integrity', () => {
  it('preserves a valid doctor and derives the matching specialty', () => {
    expect(getInitialSelection(new URLSearchParams('doctor=elena-morgan'))).toEqual({
      serviceId: 'general-medicine',
      doctorId: 'elena-morgan',
    })
  })
  it('ignores unknown doctors and specialties', () => {
    expect(getInitialSelection(new URLSearchParams('doctor=missing&service=missing'))).toEqual({
      serviceId: '',
      doctorId: '',
    })
  })
  it('resolves an inconsistent link using the doctor specialty', () => {
    expect(
      getInitialSelection(new URLSearchParams('doctor=elena-morgan&service=cardiology')).serviceId,
    ).toBe('general-medicine')
  })
  it('offers deterministic dates after the anchor and excludes Sunday', () => {
    const dates = getSampleDates(new Date(2026, 9, 9))
    expect(dates).toHaveLength(7)
    expect(dates[0]).toBe('2026-10-10')
    expect(dates).not.toContain('2026-10-11')
    expect(dates).toEqual(getSampleDates(new Date(2026, 9, 9)))
  })
  it('rejects unavailable dates and times', () => {
    expect(validateSchedule('2026-10-11', '09:00', ['2026-10-10'])).toBe(false)
    expect(validateSchedule('2026-10-10', '02:00', ['2026-10-10'])).toBe(false)
    expect(validateSchedule('2026-10-10', '09:00', ['2026-10-10'])).toBe(true)
  })
  it('does not offer afternoon appointments after Saturday closing time', () => {
    expect(validateSchedule('2026-10-10', '14:30', ['2026-10-10'])).toBe(false)
    expect(validateSchedule('2026-10-12', '14:30', ['2026-10-12'])).toBe(true)
  })
  it('rejects missing and malformed contact details and unaccepted consent', () => {
    expect(
      patientSchema.safeParse({ name: '', email: 'wrong', phone: '1', consent: false }).success,
    ).toBe(false)
  })
  it('accepts international names and a valid contact record', () => {
    const result = patientSchema.safeParse({
      name: '  سارة أحمد  ',
      email: 'sara@example.test',
      phone: '+966 50 123 4567',
      consent: true,
    })
    expect(result.success).toBe(true)
    if (result.success) expect(result.data.name).toBe('سارة أحمد')
  })
  it('validates contact messages without collecting medical history', () => {
    expect(
      contactSchema.safeParse({
        name: 'Alex Sample',
        email: 'alex@example.test',
        message: 'Please explain the sample visit process.',
        consent: true,
      }).success,
    ).toBe(true)
    expect(
      contactSchema.safeParse({ name: 'Alex', email: 'bad', message: '', consent: false }).success,
    ).toBe(false)
  })
})
