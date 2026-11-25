import { createFileRoute } from '@tanstack/react-router'
import { WorkshopCard } from '../components/WorkshopCard'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return <WorkshopCard />
}
