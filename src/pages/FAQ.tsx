import { Accordion } from '../components/Accordion'
import { PageIntro, ActionLink } from '../components/ui'
import { faqs } from '../data/content'
import { usePageMeta } from '../hooks/usePageMeta'
export default function FAQ() {
  usePageMeta(
    'Your questions, answered',
    'Answers about sample booking, fictional clinicians, demo data handling and visiting the fictional Damascus Medical Center.',
  )
  return (
    <>
      <PageIntro
        eyebrow="A LITTLE CLARITY"
        title={
          <>
            Your questions.
            <br />
            <em>Thoughtful answers.</em>
          </>
        }
        description="A clear introduction to the demonstration, from choosing a doctor to understanding how your details are handled."
      />
      <section className="container faq-page">
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq) => (
            <Accordion key={faq.question} {...faq} />
          ))}
          <div className="mt-12">
            <h2 className="text-3xl mb-4">Still exploring?</h2>
            <ActionLink secondary to="/contact">
              Try the contact experience
            </ActionLink>
          </div>
        </div>
      </section>
    </>
  )
}
