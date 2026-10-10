import { chromium } from '@playwright/test'
import { writeFile } from 'node:fs/promises'
const browser = await chromium.launch({
  headless: true,
  channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge',
})
const results = []
for (let run = 0; run < 3; run++) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
  const page = await context.newPage()
  await page.addInitScript(() => {
    window.__metrics = { lcp: 0, cls: 0 }
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      window.__metrics.lcp = entries.at(-1).startTime
    }).observe({ type: 'largest-contentful-paint', buffered: true })
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries())
        if (!entry.hadRecentInput) window.__metrics.cls += entry.value
    }).observe({ type: 'layout-shift', buffered: true })
  })
  await page.goto('http://127.0.0.1:4173/')
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => document.fonts.ready)
  // Include the complete hero entrance in the observation window.
  await page.waitForTimeout(1800)
  results.push(
    await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0]
      const resources = performance.getEntriesByType('resource')
      return {
        domContentLoadedMs: Math.round(nav.domContentLoadedEventEnd),
        loadMs: Math.round(nav.loadEventEnd),
        largestContentfulPaintMs: Math.round(window.__metrics.lcp),
        cumulativeLayoutShift: window.__metrics.cls,
        initialResourceCount: resources.length,
        transferredBytes: resources.reduce((total, r) => total + r.transferSize, 0),
        thirdPartyRequests: resources
          .filter((r) => new URL(r.name).origin !== location.origin)
          .map((r) => r.name),
      }
    }),
  )
  await context.close()
}
await writeFile(
  'docs/performance-results.json',
  JSON.stringify(
    {
      environment:
        'Local production preview in headless Edge, 1440×1000, fresh contexts, no network or CPU throttling. Lab observations, not field Core Web Vitals or Lighthouse scores.',
      runs: results,
    },
    null,
    2,
  ),
)
console.log(JSON.stringify(results, null, 2))
await browser.close()
