import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'
const browser = await chromium.launch({
  headless: true,
  channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge',
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await mkdir('docs/screenshots', { recursive: true })
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
page.on('response', (r) => {
  if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`)
})
const observations = []
async function loadImagesByScrolling() {
  for (const section of await page.locator('main section').all()) {
    await section.scrollIntoViewIfNeeded()
    await page.waitForTimeout(800)
  }
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded()
    await image.evaluate((element) => element.decode())
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(1500)
}
for (const [name, route] of [
  ['home', '/'],
  ['services', '/services'],
  ['doctors', '/doctors'],
  ['doctor-profile', '/doctors/elena-morgan'],
  ['appointment', '/appointments?doctor=elena-morgan'],
  ['contact', '/contact'],
  ['about', '/about'],
  ['faq', '/faq'],
  ['privacy', '/privacy'],
  ['not-found', '/missing-page'],
]) {
  await page.goto(`http://127.0.0.1:5173${route}`)
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => document.fonts.ready)
  await loadImagesByScrolling()
  await page.screenshot({ path: `docs/screenshots/${name}-desktop.png`, fullPage: true })
  if (name === 'home') await page.screenshot({ path: 'docs/screenshots/home-desktop-viewport.png' })
  observations.push({
    route,
    title: await page.title(),
    ...(await page.evaluate(() => ({
      viewport: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      imageCount: document.images.length,
      brokenImages: [...document.images]
        .filter((i) => !i.complete || i.naturalWidth === 0)
        .map((i) => i.src),
    }))),
  })
}
await page.setViewportSize({ width: 390, height: 844 })
await page.goto('http://127.0.0.1:5173/')
await page.waitForLoadState('networkidle')
await loadImagesByScrolling()
await page.screenshot({ path: 'docs/screenshots/home-mobile.png', fullPage: true })
await page.screenshot({ path: 'docs/screenshots/home-mobile-viewport.png' })
await page
  .locator('.doctor-grid')
  .screenshot({ path: 'docs/screenshots/clinicians-mobile-detail.png' })
for (const width of [320, 375, 430, 768, 1024, 1280, 1440, 1920]) {
  await page.setViewportSize({ width, height: width === 1920 ? 1080 : 900 })
  await page.goto('http://127.0.0.1:5173/')
  await page.waitForLoadState('networkidle')
  await loadImagesByScrolling()
  await page.screenshot({ path: `docs/screenshots/home-${width}-viewport.png` })
}
await page.setViewportSize({ width: 1440, height: 900 })
await page.goto('http://127.0.0.1:5173/')
await page.waitForTimeout(1500)
await page.evaluate(() => window.scrollTo(0, 600))
await page.waitForTimeout(1000)
await page.screenshot({ path: 'docs/screenshots/home-transition.png' })
await page.locator('.dm-questions summary').first().click()
await page.waitForTimeout(500)
await page.locator('.dm-questions').screenshot({ path: 'docs/screenshots/home-faq-open.png' })
await page.setViewportSize({ width: 390, height: 844 })
await page.goto('http://127.0.0.1:5173/')
await page.getByRole('button', { name: 'Open menu' }).click()
await page.waitForTimeout(700)
await page.screenshot({ path: 'docs/screenshots/mobile-navigation.png' })
await writeFile(
  'docs/screenshots/initial-observations.json',
  JSON.stringify({ observations, errors }, null, 2),
)
console.log(JSON.stringify({ observations, errors }, null, 2))
await browser.close()
