import { HeartHandshake, MessageCircle, Compass } from 'lucide-react'
import { PageIntro, Eyebrow, ActionLink, DemoNotice } from '../components/ui'
import { usePageMeta } from '../hooks/usePageMeta'
export default function About() {
  usePageMeta(
    'The Damascus Medical Center approach',
    'A fictional medical center built around listening, clarity and continuity. Explore the thinking behind our patient-centered experience.',
  )
  const values = [
    {
      Icon: HeartHandshake,
      title: 'People before processes',
      text: 'Every conversation starts with you: your questions, your preferences and the way care fits into your life.',
    },
    {
      Icon: MessageCircle,
      title: 'Clarity at every step',
      text: 'From choosing a specialty to understanding what follows a visit, our experience is designed to make the next step clear.',
    },
    {
      Icon: Compass,
      title: 'Care that stays connected',
      text: 'A considered approach to different specialties, with a shared focus on understanding the person behind the appointment.',
    },
  ]
  return (
    <>
      <PageIntro
        eyebrow="THE DAMASCUS APPROACH"
        title={
          <>
            Built around people.
            <br />
            <em>Centered on you.</em>
          </>
        }
        description="Damascus Medical Center imagines what a medical center can feel like when the experience is given as much thought as the care."
      />
      <section className="container about-section">
        <div className="about-story">
          <div>
            <Eyebrow>A MORE HUMAN EXPERIENCE</Eyebrow>
            <h2>
              A good place
              <br />
              <em>to feel heard.</em>
            </h2>
            <p>
              Healthcare can come with a lot of questions. Our fictional center is designed around a
              simple idea: a calm, clear experience helps make space for better conversations.
            </p>
            <p>
              That means a welcoming environment, a straightforward path to appointments and
              clinicians presented as people you can talk to. It means giving practical details the
              attention they deserve.
            </p>
            <ActionLink secondary to="/doctors">
              Meet the sample care team
            </ActionLink>
          </div>
          <img
            src="/images/interior.webp"
            width="1440"
            height="960"
            alt="Generated concept of Damascus Medical Center’s welcoming, daylight-filled reception area"
            loading="lazy"
          />
        </div>
        <div className="values-grid">
          {values.map(({ Icon, title, text }) => (
            <article key={title}>
              <Icon size={32} strokeWidth={1.3} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="about-facilities">
          <h2>
            Thoughtful spaces. <em>Practical details.</em>
          </h2>
          <div className="grid gap-8 md:grid-cols-3 mt-8">
            <div>
              <h3 className="font-semibold mb-3">A calm welcome</h3>
              <p className="text-muted">
                The fictional facilities concept uses natural light, understated materials and clear
                wayfinding to make arrival feel less complicated.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">A clear visit plan</h3>
              <p className="text-muted">
                An accessible entrance and drop-off are represented in the illustrative plan. These
                are design intentions, not verified physical facilities.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Room for questions</h3>
              <p className="text-muted">
                Plain-language explanations and easy-to-find visit information keep the experience
                focused on the patient.
              </p>
            </div>
          </div>
        </div>
        <DemoNotice>
          Damascus Medical Center is an original portfolio concept, not an operating institution.
          The philosophy and facilities described here are fictional design intentions.
        </DemoNotice>
      </section>
    </>
  )
}
