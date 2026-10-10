import { z } from 'zod'
import { doctors, services, sampleTimes } from '../data/content'
export function getInitialSelection(params: URLSearchParams) {
  const doctor = doctors.find((d) => d.id === params.get('doctor'))
  const service = services.find((s) => s.id === params.get('service'))
  return { serviceId: doctor?.serviceId ?? service?.id ?? '', doctorId: doctor?.id ?? '' }
}
export function getSampleDates(anchor = new Date()): string[] {
  const dates: string[] = []
  const day = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate(), 12)
  while (dates.length < 7) {
    day.setDate(day.getDate() + 1)
    if (day.getDay() !== 0)
      dates.push(
        `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`,
      )
  }
  return dates
}
export const formatDate = (
  date: string,
  options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' },
) => new Intl.DateTimeFormat('en-GB', options).format(new Date(`${date}T12:00:00`))
export const formatTime = (time: string) => {
  const [h, m] = time.split(':').map(Number)
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'pm' : 'am'}`
}
export function getSampleTimes(date: string): string[] {
  if (!date) return sampleTimes
  const weekday = new Date(`${date}T12:00:00`).getDay()
  if (weekday === 0) return []
  return weekday === 6 ? sampleTimes.filter((time) => time < '14:00') : sampleTimes
}
export function validateSchedule(date: string, time: string, availableDates: string[]) {
  return availableDates.includes(date) && getSampleTimes(date).includes(time)
}
const shared = {
  name: z
    .string()
    .trim()
    .min(2, 'Enter your full name (at least 2 characters).')
    .max(80, 'Use 80 characters or fewer.'),
  email: z.email('Enter a valid email address.').max(254, 'Email address is too long.'),
  consent: z
    .boolean()
    .refine((value) => value, 'Confirm that you understand this is a demonstration.'),
}
export const patientSchema = z.object({
  ...shared,
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s().-]{7,25}$/, 'Enter a valid phone number with 7–15 digits.')
    .refine((value) => {
      const count = value.replace(/\D/g, '').length
      return count >= 7 && count <= 15
    }, 'Enter a valid phone number with 7–15 digits.'),
})
export const contactSchema = z.object({
  ...shared,
  message: z
    .string()
    .trim()
    .min(10, 'Write a message of at least 10 characters.')
    .max(1000, 'Use 1,000 characters or fewer.'),
})
