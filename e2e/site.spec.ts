import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { writeFile } from 'node:fs/promises'

test('all navigation routes, service links, missing profiles and keyboard FAQ work', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto('/')
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Our services' })
    .click()
  await expect(page).toHaveURL(/\/services$/)
  await page.getByRole('heading', { name: 'Cardiology', exact: true }).getByRole('link').click()
  await expect(
    page.getByRole('heading', { name: 'Cardiology', exact: true, level: 1 }),
  ).toBeVisible()
  await page.getByRole('link', { name: 'Book an appointment', exact: true }).last().click()
  await expect(page.getByRole('radio', { name: 'Cardiology', exact: true })).toBeChecked()
  for (const route of ['/about', '/doctors', '/contact', '/privacy', '/faq']) {
    await page.goto(route)
    await expect(page.locator('main h1')).toBeVisible()
  }
  await page.goto('/faq')
  const question = page.locator('summary').first()
  await question.focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('details').first()).toHaveAttribute('open', '')
  for (const route of ['/no-such-page', '/doctors/unknown', '/services/unknown']) {
    await page.goto(route)
    await expect(page.getByRole('heading', { name: /wrong turn/ })).toBeVisible()
  }
  expect(errors).toEqual([])
})

test('service filters and doctor search recover from empty results', async ({ page }) => {
  await page.goto('/services')
  await page.getByRole('button', { name: 'Diagnostics', exact: true }).click()
  await expect(page.locator('article')).toHaveCount(1)
  await page.getByLabel('Search services').fill('not-a-service')
  await expect(page.getByRole('heading', { name: 'No matching services' })).toBeVisible()
  await page.getByRole('button', { name: 'Clear filters' }).click()
  await expect(page.locator('article')).toHaveCount(6)
  await page.goto('/doctors')
  await page.getByLabel('Search doctors by name').fill('elena')
  await expect(page.locator('article')).toHaveCount(1)
  await page.getByLabel('Specialty', { exact: true }).selectOption('cardiology')
  await expect(page.getByRole('heading', { name: 'No matching doctors' })).toBeVisible()
  await page.getByRole('button', { name: 'Clear filters' }).click()
  await expect(page.locator('article')).toHaveCount(3)
})

test('mobile navigation closes on route selection and Escape returns focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open menu' }).click()
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused()
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Our doctors' })
    .click()
  await expect(page).toHaveURL(/\/doctors$/)
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
    'aria-expanded',
    'false',
  )
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Book an appointment' })
    .click()
  await expect(page).toHaveURL(/\/appointments$/)
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
    'aria-expanded',
    'false',
  )
})

test('booking validates, preserves details on edit, confirms honestly, stores no patient data', async ({
  page,
}) => {
  await page.goto('/doctors/elena-morgan')
  await page.getByRole('link', { name: 'Book with this doctor' }).click()
  await expect(page.getByLabel(/Preferred doctor/)).toHaveValue('elena-morgan')
  await page.getByRole('button', { name: 'Continue', exact: true }).click()
  await page.getByRole('button', { name: 'Continue', exact: true }).click()
  await expect(page.getByText('Choose a sample date and time to continue.')).toBeVisible()
  await page.locator('input[name="date"]').first().check()
  await page.getByRole('radio', { name: '9:00 am', exact: true }).check()
  await page.getByRole('button', { name: 'Continue', exact: true }).click()
  await page.getByRole('button', { name: 'Continue', exact: true }).click()
  await expect(page.getByLabel('Full name', { exact: true })).toBeFocused()
  await expect(page.getByText('Enter a valid email address.')).toBeVisible()
  await page.getByLabel('Full name', { exact: true }).fill('Alex Sample')
  await page.getByLabel('Email address', { exact: true }).fill('alex@example.test')
  await page.getByLabel('Phone number', { exact: true }).fill('+1 202 555 0100')
  await page.getByRole('checkbox').check()
  await page.getByLabel('Phone number', { exact: true }).press('Enter')
  await expect(
    page.getByRole('heading', { name: 'Everything, thoughtfully checked.' }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Edit details' }).click()
  await expect(page.getByLabel('Full name', { exact: true })).toHaveValue('Alex Sample')
  await page.getByRole('button', { name: 'Continue', exact: true }).click()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.screenshot({ path: 'docs/screenshots/appointment-review-desktop.png', fullPage: true })
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze()
  expect(results.violations).toEqual([])
  await page.getByRole('button', { name: 'Complete demonstration' }).click()
  await expect(page.getByRole('heading', { name: /explored the journey/ })).toBeFocused()
  await expect(page.getByText(/No appointment has been booked/)).toBeVisible()
  await page.screenshot({
    path: 'docs/screenshots/appointment-confirmation-desktop.png',
    fullPage: true,
  })
  expect(page.url()).not.toContain('Alex')
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([])
  expect(await page.evaluate(() => Object.keys(sessionStorage))).toEqual([])
  await page.reload()
  await expect(
    page.getByRole('heading', { name: 'What brings you to Damascus Medical Center?' }),
  ).toBeVisible()
})

test('unknown and mismatched booking links resolve safely; service changes reset doctor', async ({
  page,
}) => {
  await page.goto('/appointments?doctor=unknown&service=unknown')
  await page.getByRole('button', { name: 'Continue', exact: true }).click()
  await expect(page.getByText('Choose a specialty to continue.')).toBeVisible()
  await page.goto('/appointments?doctor=elena-morgan&service=cardiology')
  await expect(page.getByRole('radio', { name: 'General medicine', exact: true })).toBeChecked()
  await page.getByRole('radio', { name: 'Cardiology', exact: true }).check()
  await expect(page.getByLabel(/Preferred doctor/)).toHaveValue('')
  await expect(page.getByRole('option', { name: 'Dr. Elena Morgan' })).toHaveCount(0)
})

test('contact form reports local validation and clears submitted details', async ({ page }) => {
  await page.goto('/contact')
  await page.getByRole('button', { name: 'Check demo message' }).click()
  await expect(page.getByText('Enter a valid email address.')).toBeVisible()
  await page.getByLabel('Full name', { exact: true }).fill('Alex Sample')
  await page.getByLabel('Email address', { exact: true }).fill('alex@example.test')
  await page.getByLabel('Your message').fill('Please explain the fictional center design.')
  await page.getByRole('checkbox').check()
  await page.getByRole('button', { name: 'Check demo message' }).click()
  await expect(page.getByRole('heading', { name: 'Demo message checked.' })).toBeFocused()
  await expect(page.getByText(/No message was sent or saved/)).toBeVisible()
  await page.getByRole('button', { name: 'Try another message' }).click()
  await expect(page.getByLabel('Full name', { exact: true })).toHaveValue('')
})

for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
  test(`all principal layouts fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    for (const route of [
      '/',
      '/services',
      '/doctors',
      '/doctors/elena-morgan',
      '/appointments',
      '/contact',
      '/about',
      '/faq',
      '/privacy',
      '/missing',
    ]) {
      await page.goto(route)
      await expect(page.locator('main h1')).toBeVisible()
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        `Horizontal overflow at ${route} / ${width}px`,
      ).toBe(true)
    }
    if (width === 320) {
      await page.goto('/appointments')
      await page.getByRole('radio', { name: 'General medicine', exact: true }).check()
      await page.getByRole('button', { name: 'Continue', exact: true }).click()
      await page.screenshot({ path: 'docs/screenshots/appointment-mobile.png', fullPage: true })
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true)
    }
  })
}

test('automated accessibility checks cover all pages and validation states', async ({ page }) => {
  // Contrast must be evaluated in a settled state, not at an arbitrary opacity during entry.
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const report = []
  for (const route of [
    '/',
    '/services',
    '/services/cardiology',
    '/doctors',
    '/doctors/elena-morgan',
    '/appointments',
    '/contact',
    '/about',
    '/faq',
    '/privacy',
    '/missing',
  ]) {
    await page.goto(route)
    await page.locator('main h1').waitFor()
    if (route === '/contact') await page.getByRole('button', { name: 'Check demo message' }).click()
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze()
    report.push({
      route,
      violations: result.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
      })),
    })
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open menu' }).click()
  const mobile = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze()
  report.push({
    route: '/ mobile menu',
    violations: mobile.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
    })),
  })
  await writeFile('docs/accessibility-results.json', JSON.stringify(report, null, 2))
  expect(report.flatMap((r) => r.violations)).toEqual([])
})

test('homepage images, above-fold action, keyboard skip and reduced motion are available', async ({
  page,
}) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  const heroButton = page
    .locator('.hero-actions')
    .getByRole('link', { name: 'Book an appointment' })
  const box = await heroButton.boundingBox()
  expect(box && box.y + box.height <= 1000).toBe(true)
  await page.evaluate(() => document.fonts.ready)
  await expect(page.locator('.hero-image')).toBeVisible()
  expect(
    await page.locator('.hero-image').evaluate((image: HTMLImageElement) => image.naturalWidth > 0),
  ).toBe(true)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  expect(await heroButton.evaluate((el) => getComputedStyle(el).transitionDuration)).toBe('1e-05s')
  await page.addStyleTag({ content: 'body { font-size: 200% !important; }' })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  )
})

test('motion respects reduced preference and content survives unavailable observer enhancement', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Your health. Our attention.' })).toBeVisible()
  await page.locator('.dm-team').scrollIntoViewIfNeeded()
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0)
  await expect(page.locator('.dm-team .doctor-card')).toHaveCount(3)
  await page.addInitScript(() => {
    Reflect.deleteProperty(window, 'IntersectionObserver')
  })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.reload()
  await page.locator('.dm-service').last().scrollIntoViewIfNeeded()
  await expect(page.locator('.dm-service').last()).toBeVisible()
  await page.locator('.dm-service').last().click()
  await expect(page.locator('main h1')).toBeVisible()
})
