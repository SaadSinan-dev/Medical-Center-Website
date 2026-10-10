import { useEffect } from 'react'
import { brand } from '../data/brand'
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} | ${brand.name}`
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
  }, [title, description])
}
