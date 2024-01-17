import { Metadata } from 'next';

import Container from '@/components/layout/container'
import About from '@/components/about/about';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `About InFold`,
    description: `News is broken and driven by different agendas. We're here to help you get context, delve deeper, and learn more.`
  }
}

export default async function Rising() {
  return (
    <Container header={true}>
      <About />
    </Container>
  )
}