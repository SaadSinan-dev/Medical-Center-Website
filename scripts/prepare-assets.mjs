import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
const [input, kind] = process.argv.slice(2)
if (!input || !['consultation', 'clinicians', 'interior'].includes(kind)) {
  console.error(
    'Usage: node scripts/prepare-assets.mjs <input-file> <consultation|clinicians|interior>',
  )
  process.exit(1)
}
const output = new URL('../public/images/', import.meta.url)
await mkdir(output, { recursive: true })
const width = kind === 'consultation' ? 1440 : kind === 'clinicians' ? 1536 : 1200
await sharp(input)
  .resize({ width })
  .webp({ quality: 85 })
  .toFile(fileURLToPath(new URL(kind + '.webp', output)))
if (kind === 'consultation')
  await sharp(input)
    .resize({ width: 640 })
    .webp({ quality: 82 })
    .toFile(fileURLToPath(new URL('consultation-small.webp', output)))
console.log('Optimized image files prepared.')
