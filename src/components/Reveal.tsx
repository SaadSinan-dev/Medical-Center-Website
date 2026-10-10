import { useEffect, useRef, type ReactNode } from 'react'

/** Progressive enhancement: content is visible even without observer/animation support. */
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = ref.current
    if (!element || !window.matchMedia || !('IntersectionObserver' in window) || !element.animate)
      return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (preference.matches) return
    let animation: Animation | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        animation = element.animate(
          [
            { opacity: 0, transform: 'translateY(22px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 650, delay, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards' },
        )
        observer.disconnect()
      },
      { threshold: 0.12 },
    )
    const stop = () => {
      if (preference.matches) {
        animation?.cancel()
        observer.disconnect()
      }
    }
    preference.addEventListener('change', stop)
    observer.observe(element)
    return () => {
      observer.disconnect()
      animation?.cancel()
      preference.removeEventListener('change', stop)
    }
  }, [delay])
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
