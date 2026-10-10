import { chromium } from '@playwright/test'
import { writeFile } from 'node:fs/promises'
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge' })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://127.0.0.1:5173/')
await page.evaluate(() => document.fonts.ready)
await page.evaluate(() => {
  // Pause actual application animations for deterministic visual review of the choreography.
  document.getAnimations().forEach((animation) => {
    animation.pause()
    animation.currentTime = 0
  })
})
const frames = []
for (const time of [200, 550, 1300]) {
  const animations = await page.evaluate((time) => {
    document.getAnimations().forEach((animation) => {
      animation.currentTime = time
    })
    return document.getAnimations().map((animation) => ({
      name: animation.animationName ?? 'scroll reveal',
      currentTime: animation.currentTime,
      duration: animation.effect.getTiming().duration,
    }))
  }, time)
  await page.screenshot({ path: `docs/screenshots/motion-hero-${time}.png` })
  frames.push({ time, animations })
}
await page.evaluate(() => document.getAnimations().forEach((animation) => animation.finish()))
await page.locator('.dm-service').first().hover()
await page.waitForTimeout(400)
await page.locator('.dm-specialties').screenshot({ path: 'docs/screenshots/service-hover.png' })
await page.emulateMedia({ reducedMotion: 'reduce' })
await page.goto('http://127.0.0.1:5173/')
const reducedMotionAnimations = await page.evaluate(() => document.getAnimations().length)
await writeFile(
  'docs/motion-results.json',
  JSON.stringify({ frames, reducedMotionAnimations }, null, 2),
)
await browser.close()
