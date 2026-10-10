import { Hero } from '../features/home/Hero'
import { Specialties, CareApproach, CareTeam, VisitQuestions } from '../features/home/Sections'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Home() {
  usePageMeta(
    'Care begins with you',
    'Discover Damascus Medical Center: a fictional healthcare concept with connected specialties, a personal approach and a sample appointment journey.',
  )
  return (
    <>
      <Hero />
      <Specialties />
      <CareApproach />
      <CareTeam />
      <VisitQuestions />
    </>
  )
}
