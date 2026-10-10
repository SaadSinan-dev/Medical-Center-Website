import type { Doctor, Service } from '../types/domain'
export const services: Service[] = [
  {
    id: 'general-medicine',
    name: 'General medicine',
    subtitle: 'Your first step to feeling better.',
    category: 'Everyday care',
    description:
      'A place to start for everyday health questions, preventive visits and ongoing care. We make room for the whole conversation.',
    includes: ['General consultations', 'Preventive health discussions', 'Ongoing care planning'],
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    subtitle: 'Thoughtful care for your heart.',
    category: 'Specialist care',
    description:
      'Discuss heart health with a clinician who takes time to explain your options and helps you understand the next steps.',
    includes: [
      'Heart health consultations',
      'Cardiovascular care planning',
      'Diagnostic referrals',
    ],
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    subtitle: 'Care that goes beneath the surface.',
    category: 'Specialist care',
    description:
      'Personal consultations for skin, hair and nail concerns, with clear explanations and an approach tailored to you.',
    includes: ['Skin consultations', 'Hair and nail concerns', 'Skin care planning'],
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    subtitle: 'A little reassurance. A lot of care.',
    category: 'Everyday care',
    description:
      'A welcoming space for children and the people who care for them. Ask questions, talk through concerns and plan the next stage together.',
    includes: [
      'Child health consultations',
      'Growth and development discussions',
      'Family care planning',
    ],
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    subtitle: 'Helping you move through life.',
    category: 'Specialist care',
    description:
      'Consultations for bone, joint and movement concerns, centered on understanding your daily life and your personal goals.',
    includes: [
      'Joint and mobility consultations',
      'Musculoskeletal assessment',
      'Care and referral planning',
    ],
  },
  {
    id: 'diagnostics',
    name: 'Diagnostic services',
    subtitle: 'Clarity for the next step.',
    category: 'Diagnostics',
    description:
      'A clear introduction to diagnostic appointments, what to expect and how results can inform a conversation with your clinician.',
    includes: ['Diagnostic consultations', 'Preparation guidance', 'Results discussions'],
  },
]
export const doctors: Doctor[] = [
  {
    id: 'elena-morgan',
    name: 'Dr. Elena Morgan',
    serviceId: 'general-medicine',
    role: 'General medicine',
    portrait: 0,
    introduction:
      'Elena believes good care begins with a good conversation. Her consultations focus on understanding your concerns and making your next steps feel clear.',
    languages: ['English', 'Spanish'],
    approach:
      'A calm, collaborative conversation about everyday health, prevention and continuity of care.',
  },
  {
    id: 'adam-hassan',
    name: 'Dr. Adam Hassan',
    serviceId: 'cardiology',
    role: 'Cardiology',
    portrait: 1,
    introduction:
      'Adam brings a thoughtful, practical approach to heart health conversations. He helps patients understand the purpose of each next step in their care.',
    languages: ['English', 'Arabic'],
    approach: 'Clear explanations, time for questions and an individual plan for follow-up.',
  },
  {
    id: 'sophie-bennett',
    name: 'Dr. Sophie Bennett',
    serviceId: 'pediatrics',
    role: 'Pediatrics',
    portrait: 2,
    introduction:
      'Sophie creates a reassuring environment for children and families. She makes space for the small questions as well as the bigger concerns.',
    languages: ['English', 'French'],
    approach:
      'Family-centered conversations with an emphasis on helping children feel comfortable.',
  },
]
export const faqs = [
  {
    question: 'How do I book an appointment?',
    answer:
      'Choose a specialty, optionally select a clinician, and explore the sample dates and times. After entering fictional contact details, you can review and complete the demonstration. No appointment is sent to a real medical center.',
  },
  {
    question: 'Can I choose a specific doctor?',
    answer:
      'Yes. Use “Book with this doctor” on a profile to carry the clinician and specialty into the appointment flow. You can also choose “No preference” to explore the sample journey.',
  },
  {
    question: 'What should I bring to a first visit?',
    answer:
      'In a real care setting, the clinic would explain what to bring when confirming your visit. This portfolio demonstration does not issue clinical instructions or confirm visits.',
  },
  {
    question: 'Are the availability and contact details real?',
    answer:
      'No. Damascus Medical Center is a fictional portfolio project. Clinicians, opening hours, location and time slots are sample content. Portraits are generated illustrations of fictional people.',
  },
  {
    question: 'What happens to the information I enter?',
    answer:
      'Form details stay in the current page’s memory. They are not sent to a service, saved in local storage or placed in the URL. Refreshing or leaving the appointment page clears its details. Please use fictional data.',
  },
  {
    question: 'Can I use this website for medical advice?',
    answer:
      'This site demonstrates a healthcare website experience and does not provide medical advice or emergency assistance. Seek care from an appropriate real healthcare provider for medical needs.',
  },
]
export const sampleTimes = ['09:00', '09:30', '10:30', '11:00', '14:00', '14:30', '15:30', '16:00']
export const openingHours = [
  { days: 'Monday – Friday', hours: '8:00 am – 7:00 pm' },
  { days: 'Saturday', hours: '9:00 am – 2:00 pm' },
  { days: 'Sunday', hours: 'Closed' },
]
