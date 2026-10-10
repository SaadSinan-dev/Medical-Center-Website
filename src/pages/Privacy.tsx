import { PageIntro } from '../components/ui'
import { usePageMeta } from '../hooks/usePageMeta'
export default function Privacy() {
  usePageMeta(
    'Privacy & demonstration notice',
    'How this frontend demonstration handles form data, generated assets, fictional profiles and third-party requests.',
  )
  return (
    <>
      <PageIntro
        eyebrow="PRIVACY & DEMONSTRATION NOTICE"
        title={
          <>
            Clear by design.
            <br />
            <em>Honest by default.</em>
          </>
        }
        description="A straightforward explanation of this portfolio project and the information you enter."
      />
      <article className="container prose-page">
        <p className="micro-copy">Last updated: 9 October 2026</p>
        <h2>A fictional center</h2>
        <p>
          Damascus Medical Center is a portfolio demonstration. It is not a healthcare provider and
          does not offer medical advice, real appointments or emergency assistance. All names,
          profiles, availability, opening hours, contact details and the address are fictional
          examples. Images are generated and do not depict actual Damascus Medical Center staff or
          patients.
        </p>
        <h2>Your form details</h2>
        <p>
          Appointment and contact forms validate the information in your browser. No form
          information is sent to an API, email provider or clinic. Appointment details stay in React
          memory while you use the flow and are cleared when you refresh or leave the page. Contact
          details are cleared after local validation succeeds. Use fictional details only, and do
          not enter medical history or other sensitive information.
        </p>
        <h2>Storage and requests</h2>
        <p>
          This application does not save patient details in local storage, session storage or
          cookies. It does not add them to URLs or log them. It does not include analytics,
          advertising scripts, embedded maps or third-party font requests. Fonts and images are
          served locally with the application.
        </p>
        <p>
          Your browser requests normal application files from the server hosting this demonstration.
          A host may record ordinary access information such as an IP address and requested path
          according to its own policies. Hosting behavior is outside the frontend application’s
          control.
        </p>
        <h2>Links and new tabs</h2>
        <p>
          Some privacy links open this notice in a new tab so you can keep your draft appointment.
          Links that leave this site, when present in project documentation, are governed by their
          destination’s policies.
        </p>
        <h2>Accessible design</h2>
        <p>
          The interface includes labeled forms, visible keyboard focus, semantic page structure,
          reduced-motion styles and responsive layouts. Automated checks are part of development;
          they do not replace a full accessibility assessment with assistive technology users.
        </p>
        <h2>Before a real-world launch</h2>
        <p>
          A real care service would need verified clinical content, contact information, a secure
          booking and messaging service, documented data retention, a privacy review and
          accessibility assessment. This demonstration makes no legal compliance or certification
          claims.
        </p>
      </article>
    </>
  )
}
