import { Plus } from 'lucide-react'

export function Accordion({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="faq-item">
      <summary>
        {question}
        <Plus size={20} aria-hidden="true" />
      </summary>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </details>
  )
}
