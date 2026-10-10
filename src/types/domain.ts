export interface Service {
  id: string
  name: string
  subtitle: string
  description: string
  category: 'Everyday care' | 'Specialist care' | 'Diagnostics'
  includes: string[]
}
export interface Doctor {
  id: string
  name: string
  serviceId: string
  role: string
  portrait: number
  introduction: string
  languages: string[]
  approach: string
}
export interface PatientDetails {
  name: string
  email: string
  phone: string
  consent: boolean
}
export interface AppointmentDraft {
  serviceId: string
  doctorId: string
  date: string
  time: string
  patient: PatientDetails
}
