import { ActionLink, Eyebrow } from '../components/ui'
import { usePageMeta } from '../hooks/usePageMeta'
export default function NotFound() {
  usePageMeta(
    'Page not found',
    'This page could not be found. Return to Damascus Medical Center’s homepage or explore the sample medical services.',
  )
  return (
    <section className="container not-found">
      <Eyebrow>404 · A DIFFERENT WAY FORWARD</Eyebrow>
      <h1>
        This page took
        <br />
        <em>a wrong turn.</em>
      </h1>
      <p className="text-muted mt-5 mb-8 max-w-md">
        The page you’re looking for isn’t here. Let’s help you find a familiar place to start.
      </p>
      <div className="flex flex-wrap gap-4">
        <ActionLink to="/">Back to home</ActionLink>
        <ActionLink secondary to="/services">
          Explore services
        </ActionLink>
      </div>
    </section>
  )
}
