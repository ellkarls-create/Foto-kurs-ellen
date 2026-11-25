import { createFileRoute } from '@tanstack/react-router'
import { BookingPage } from '../components/BookingPage'

export const Route = createFileRoute('/booking')({
  component: Booking,
  head: () => ({ meta: [{ title: 'Boka workshop · Fotoworkshopen' }] }),
})

function Booking() {
  return <BookingPage />
}
