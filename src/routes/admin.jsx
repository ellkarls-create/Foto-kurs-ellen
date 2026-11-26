import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import './admin.css'

export const Route = createFileRoute('/admin')({
  component: Admin,
  head: () => ({ meta: [{ title: 'Bokningar · Fotoworkshopen' }] }),
})

const participants = [
  {
    date: '2026-11-14',
    dateLabel: '14 november',
    detailDate: '14e november',
    booking: 'L101',
    name: 'Alma Lind',
    email: 'alma.lind@example.com',
    phone: '+46 12 321 32 21',
  },
  {
    date: '2026-11-14',
    dateLabel: '14 november',
    detailDate: '14e november',
    booking: 'L102',
    name: 'Robin Berg',
    email: 'robin.berg@example.com',
    phone: '+46 70 123 45 67',
  },
  {
    date: '2026-11-14',
    dateLabel: '14 november',
    detailDate: '14e november',
    booking: 'L103',
    name: 'Sam Ek',
    email: 'sam.ek@example.com',
    phone: '+46 70 234 56 78',
  },
  {
    date: '2026-11-21',
    dateLabel: '21 november',
    detailDate: '21e november',
    booking: 'L104',
    name: 'Kim Dahl',
    email: 'kim.dahl@example.com',
    phone: '+46 70 345 67 89',
  },
  {
    date: '2026-11-21',
    dateLabel: '21 november',
    detailDate: '21e november',
    booking: 'L105',
    name: 'Alex Holm',
    email: 'alex.holm@example.com',
    phone: '+46 70 456 78 90',
  },
  {
    date: '2026-11-28',
    dateLabel: '28 november',
    detailDate: '28e november',
    booking: 'L106',
    name: 'Noor Lund',
    email: 'noor.lund@example.com',
    phone: '+46 70 567 89 01',
  },
]

const dates = [
  { value: '2026-11-14', label: '14 november' },
  { value: '2026-11-21', label: '21 november' },
  { value: '2026-11-28', label: '28 november' },
]

function PageBackLink({ children, onClick }) {
  if (onClick) {
    return (
      <button className="admin-back-link" type="button" onClick={onClick}>
        <span aria-hidden="true">←</span> {children}
      </button>
    )
  }

  return (
    <Link className="admin-back-link" to="/">
      <span aria-hidden="true">←</span> {children}
    </Link>
  )
}

function BookingOverview({ selectedDate, onSelectDate, onOpenParticipant }) {
  const visibleParticipants = participants.filter((participant) => (
    !selectedDate || participant.date === selectedDate
  ))

  return (
    <>
      <PageBackLink>Tillbaka till startsidan</PageBackLink>

      <section className="admin-content" aria-labelledby="admin-title">
        <header className="admin-hero">
          <h1 id="admin-title">Alla bokningar</h1>
          <p>Här finns det möjlighet för dig som arrangör att få en överblick över alla deltagarna på kursen</p>
        </header>

        <section className="admin-bookings" aria-label="Bokningar">
          <div className="admin-filters">
            <fieldset>
              <legend>Filtrera dag:</legend>
              <div className="admin-date-options">
                {dates.map((date) => (
                  <label className="admin-date-option" key={date.value}>
                    <span>{date.label}</span>
                    <input
                      type="radio"
                      name="booking-date"
                      value={date.value}
                      checked={selectedDate === date.value}
                      onClick={() => {
                        if (selectedDate === date.value) onSelectDate('')
                      }}
                      onChange={() => onSelectDate(date.value)}
                    />
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="admin-booking-count" aria-live="polite">
              <h2>Antal bokningar:</h2>
              <p>{visibleParticipants.length} {visibleParticipants.length === 1 ? 'bokning' : 'bokningar'}</p>
            </div>
          </div>

          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th scope="col" className="admin-table__desktop-only">Datum</th>
                  <th scope="col" className="admin-table__mobile-only">Namn</th>
                  <th scope="col" className="admin-table__desktop-only">Bokning</th>
                  <th scope="col" className="admin-table__desktop-only">Namn</th>
                  <th scope="col" className="admin-table__desktop-only">E-post</th>
                  <th scope="col" className="admin-table__detail-heading">Detaljvy</th>
                </tr>
              </thead>
              <tbody>
                {visibleParticipants.map((participant) => (
                  <tr key={participant.booking}>
                    <td className="admin-table__desktop-only">{participant.dateLabel}</td>
                    <td className="admin-table__mobile-only">{participant.name}</td>
                    <td className="admin-table__desktop-only">{participant.booking}</td>
                    <td className="admin-table__desktop-only">{participant.name}</td>
                    <td className="admin-table__desktop-only">
                      <a href={`mailto:${participant.email}`}>{participant.email}</a>
                    </td>
                    <td className="admin-table__detail-cell">
                      <button type="button" onClick={() => onOpenParticipant(participant.booking)}>
                        Visa bokning <span aria-hidden="true">→</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {visibleParticipants.length === 0 && (
                  <tr>
                    <td className="admin-table__empty" colSpan="6">Inga bokningar för det valda datumet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </>
  )
}

function ParticipantDetail({ participant, onBack, onSelectParticipant }) {
  const navigationParticipants = participants
  const participantIndex = navigationParticipants.findIndex((item) => item.booking === participant.booking)
  const previousParticipant = navigationParticipants[participantIndex - 1]
  const nextParticipant = navigationParticipants[participantIndex + 1]

  const details = [
    ['Namn:', participant.name],
    ['E-post:', <a href={`mailto:${participant.email}`} key="email">{participant.email}</a>],
    ['Nummer:', <a href={`tel:${participant.phone.replaceAll(' ', '')}`} key="phone">{participant.phone}</a>],
    ['Boknings-nummer:', participant.booking],
    ['Dag:', participant.detailDate],
    ['Tid:', '10.00-15.00'],
    ['Kurs:', 'Ta kontroll över din kamera'],
    ['Kursledare:', 'Ebba Grön'],
  ]

  return (
    <>
      <PageBackLink onClick={onBack}>Tillbaka till översikt</PageBackLink>

      <section className="admin-content admin-content--detail" aria-labelledby="admin-title">
        <header className="admin-hero">
          <h1 id="admin-title">Detaljvy på bokningar</h1>
          <p>Här finns det möjlighet för dig som arrangör att få en mer detaljerad vy över deltagarna på kursen</p>
        </header>

        <section className="admin-detail" aria-labelledby="booking-title">
          <h2 id="booking-title">Bokning: {participant.booking}</h2>
          <dl>
            {details.map(([label, value]) => (
              <div className="admin-detail__item" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <nav className="admin-detail__navigation" aria-label="Byt deltagare">
            <button
              type="button"
              onClick={() => onSelectParticipant(previousParticipant.booking)}
              disabled={!previousParticipant}
            >
              <span aria-hidden="true">←</span> Föregående bokning
            </button>
            <button
              type="button"
              onClick={() => onSelectParticipant(nextParticipant.booking)}
              disabled={!nextParticipant}
            >
              Till nästa bokning <span aria-hidden="true">→</span>
            </button>
          </nav>
        </section>
      </section>
    </>
  )
}

function Admin() {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedBooking, setSelectedBooking] = useState('')
  const participant = participants.find((item) => item.booking === selectedBooking)

  function selectParticipant(booking) {
    const nextParticipant = participants.find((item) => item.booking === booking)
    if (!nextParticipant) return

    setSelectedBooking(booking)
    setSelectedDate(nextParticipant.date)
  }

  return (
    <div className="admin-page">
      {participant ? (
        <ParticipantDetail
          participant={participant}
          onBack={() => setSelectedBooking('')}
          onSelectParticipant={selectParticipant}
        />
      ) : (
        <BookingOverview
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          onOpenParticipant={selectParticipant}
        />
      )}
    </div>
  )
}
