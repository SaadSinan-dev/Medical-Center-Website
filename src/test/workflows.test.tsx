import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Services from '../pages/Services'
import Doctors from '../pages/Doctors'
import Contact from '../pages/Contact'
import Appointments from '../features/appointments/Appointments'
import { AppRoutes } from '../App'
import type { ReactElement } from 'react'
function mount(ui: ReactElement, path = '/') {
  return render(<MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>)
}
describe('patient-facing interactions', () => {
  it('renders navigation and resolves missing routes', async () => {
    mount(<AppRoutes />, '/no-such-page')
    expect(await screen.findByRole('heading', { name: /wrong turn/i })).toBeInTheDocument()
    expect(
      within(screen.getByRole('navigation', { name: 'Main navigation' })).getByRole('link', {
        name: 'Our services',
      }),
    ).toHaveAttribute('href', '/services')
  })
  it('filters services and recovers from an empty search', async () => {
    const user = userEvent.setup()
    mount(<Services />)
    await user.click(screen.getByRole('button', { name: 'Diagnostics' }))
    expect(screen.getAllByRole('article')).toHaveLength(1)
    await user.type(screen.getByLabelText('Search services'), 'doesnotexist')
    expect(screen.getByRole('heading', { name: 'No matching services' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Clear filters' }))
    expect(screen.getAllByRole('article')).toHaveLength(6)
  })
  it('combines doctor name and specialty filters', async () => {
    const user = userEvent.setup()
    mount(<Doctors />)
    await user.type(screen.getByLabelText('Search doctors by name'), 'ELENA')
    expect(screen.getAllByRole('article')).toHaveLength(1)
    await user.selectOptions(screen.getByLabelText('Specialty'), 'cardiology')
    expect(screen.getByRole('heading', { name: 'No matching doctors' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Clear filters' }))
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })
  it('preselects a doctor, guards transitions, keeps edits and completes honestly', async () => {
    const user = userEvent.setup()
    mount(<Appointments />, '/appointments?doctor=elena-morgan')
    expect(screen.getByLabelText(/Preferred doctor/)).toHaveValue('elena-morgan')
    await user.click(screen.getByRole('button', { name: 'Continue' }))
    await user.click(screen.getByRole('button', { name: 'Continue' }))
    expect(screen.getByText('Choose a sample date and time to continue.')).toBeInTheDocument()
    await user.click(screen.getAllByRole('radio')[0])
    await user.click(screen.getByRole('radio', { name: '9:00 am' }))
    await user.click(screen.getByRole('button', { name: 'Continue' }))
    await user.click(screen.getByRole('button', { name: 'Continue' }))
    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument()
    await user.type(screen.getByLabelText('Full name'), 'Alex Sample')
    await user.type(screen.getByLabelText('Email address'), 'alex@example.test')
    await user.type(screen.getByLabelText('Phone number'), '+1 202 555 0100')
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: 'Continue' }))
    await user.click(screen.getByRole('button', { name: 'Edit details' }))
    expect(screen.getByLabelText('Full name')).toHaveValue('Alex Sample')
    await user.click(screen.getByRole('button', { name: 'Continue' }))
    await user.click(screen.getByRole('button', { name: 'Complete demonstration' }))
    expect(screen.getByRole('heading', { name: /explored the journey/ })).toBeInTheDocument()
    expect(screen.getByText(/No appointment has been booked/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Start a new demonstration' }))
    expect(screen.getByLabelText(/Preferred doctor/)).toHaveValue('')
  })
  it('clears a selected doctor after changing specialty', async () => {
    const user = userEvent.setup()
    mount(<Appointments />, '/appointments?doctor=elena-morgan')
    await user.click(screen.getByRole('radio', { name: 'Cardiology' }))
    expect(screen.getByLabelText(/Preferred doctor/)).toHaveValue('')
    expect(screen.queryByRole('option', { name: 'Dr. Elena Morgan' })).not.toBeInTheDocument()
  })
  it('validates contact information and reports local-only success', async () => {
    const user = userEvent.setup()
    mount(<Contact />)
    await user.click(screen.getByRole('button', { name: 'Check demo message' }))
    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument()
    await user.type(screen.getByLabelText('Full name'), 'Alex Sample')
    await user.type(screen.getByLabelText('Email address'), 'alex@example.test')
    await user.type(
      screen.getByLabelText('Your message'),
      'Please explain the fictional visit process.',
    )
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: 'Check demo message' }))
    expect(screen.getByRole('heading', { name: 'Demo message checked.' })).toHaveFocus()
    expect(screen.getByText(/No message was sent or saved/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Try another message' }))
    expect(screen.getByLabelText('Full name')).toHaveValue('')
  })
})
