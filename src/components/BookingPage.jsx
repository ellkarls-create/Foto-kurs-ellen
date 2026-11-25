import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import filmStrip from '../assets/workshop-film-strip.jpg'
import './BookingPage.css'

const availableDates = [
  { value: '2026-11-14', label: '14 november', fullDate: 'Lördag 14 november 2026' },
  { value: '2026-11-21', label: '21 november', fullDate: 'Lördag 21 november 2026' },
  { value: '2026-11-28', label: '28 november', fullDate: 'Lördag 28 november 2026' },
]

function createCalendarHref(date) {
  const compactDate = date.value.replaceAll('-', '')
  const calendarEvent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ljusrummet//Fotoworkshop//SV',
    'BEGIN:VEVENT',
    `UID:${date.value}@ljusrummet`,
    `DTSTAMP:${new Date().toISOString().replaceAll(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
    `DTSTART:${compactDate}T090000Z`,
    `DTEND:${compactDate}T140000Z`,
    'SUMMARY:Ljusrums fotoworkshop – Ta kontroll över din kamera',
    'LOCATION:Ljusrum fotostudio på Södermalm, Stockholm',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(calendarEvent)}`
}

function CourseInformation() {
  return (
    <section className="booking-course-info" aria-labelledby="course-info-title">
      <h2 id="course-info-title">Information kring kursen</h2>
      <div className="booking-course-info__sections">
        <div className="booking-course-info__section">
          <h3>Tid och pris</h3>
          <ul>
            <li>5 Timmars workshop mellan 10-15.</li>
            <li>1 200 kr inklusive moms.</li>
          </ul>
        </div>
        <div className="booking-course-info__section">
          <h3>Det här ingår</h3>
          <p>Handledning, övningsmaterial och fika. Lunch ingår inte.</p>
        </div>
        <div className="booking-course-info__section">
          <h3>Förkunskaper</h3>
          <p>Kursen är på nybörjarnivå. Inga tidigare fotokunskaper behövs.</p>
        </div>
        <div className="booking-course-info__section">
          <h3>Ta med</h3>
          <ul>
            <li>Egen kamera med inställningar för bländare, slutartid och ISO</li>
          </ul>
          <div className="booking-equipment-note">
            <p><strong>Mobilkamera räcker inte.</strong></p>
            <p>Extra objektiv och stativ behövs inte.</p>
          </div>
          <ul>
            <li>Laddat batteri och minneskort</li>
            <li>Kläder efter väder</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function BookingReview({ date, name, email, onCancel, onEdit, onConfirm }) {
  return (
    <section className="booking-review" aria-labelledby="booking-review-title">
      <header className="booking-review__intro">
        <p className="booking-kicker">LJUSRUMS FOTOWORKSHOP</p>
        <h1 id="booking-review-title">Granska din bokning</h1>
        <p>Kontrollera att uppgifterna stämmer innan du bokar.</p>
      </header>

      <section className="booking-review__date" aria-label="Valt kurstillfälle">
        <p className="booking-review__eyebrow">VALT KURSTILLFÄLLE</p>
        <div>
          <h2>{date.label}</h2>
          <p>10.00–15.00 · 1 plats</p>
        </div>
      </section>

      <section className="booking-review__details" aria-labelledby="booking-review-details-title">
        <h2 id="booking-review-details-title">Dina uppgifter</h2>
        <div>
          <h3>Namn</h3>
          <p>{name}</p>
        </div>
        <div>
          <h3>E-post</h3>
          <p>{email}</p>
        </div>
        <button className="booking-review__edit-link" type="button" onClick={onEdit}>
          Ändra uppgifter
        </button>
      </section>

      <section className="booking-review__price" aria-label="Pris och betalning">
        <p className="booking-review__eyebrow">TOTALT</p>
        <p className="booking-review__amount">1 200 kr</p>
        <p>Fakturering hanteras inte i förhandsvisningen.</p>
      </section>

      <div className="booking-review__actions">
        <button type="button" onClick={onCancel}>Avbryt bokning</button>
        <button type="button" onClick={onConfirm}>Boka</button>
      </div>
    </section>
  )
}

function BookingConfirmation({ date, email }) {
  return (
    <div className="booking-confirmation">
      <section className="booking-confirmation__intro" aria-labelledby="confirmation-title">
        <p className="booking-kicker">LJUSRUMS FOTOWORKSHOP</p>
        <h1 id="confirmation-title">Tack för din bokning!</h1>
        <p>Bekräftelsen gäller för {email}.</p>
      </section>

      <div className="booking-confirmation__visual" aria-hidden="true">
        <img src={filmStrip} alt="" />
      </div>

      <section className="booking-confirmation__card" aria-labelledby="confirmation-card-title">
        <p className="booking-kicker">DIN BOKNING</p>
        <h2 id="confirmation-card-title">Ta kontroll över din kamera</h2>
        <div>
          <h3>Datum och tid</h3>
          <p>{date.fullDate}<br />10.00–15.00 · 1 plats</p>
        </div>
        <div>
          <h3>Plats</h3>
          <p>Ljusrum fotostudio på Södermalm i Stockholm och utomhus i närheten.</p>
        </div>
        <hr />
        <div>
          <p className="booking-confirmation__price">1 200 kr</p>
          <div className="booking-confirmation__email-details">
            <div>
              <h3>Information och bokningsbekräftelse</h3>
              <p>Skickas till mejladressen du angav.</p>
            </div>
            <div>
              <h3>Fakturering</h3>
              <p>Sker via mejladressen du angav vid bokningen.</p>
            </div>
          </div>
        </div>
      </section>

      <a className="booking-calendar-link" href={createCalendarHref(date)} download="ljusrums-fotoworkshop.ics">
        Lägg till i kalender
      </a>
      <section className="booking-cancel-information" aria-labelledby="cancellation-title">
        <h2 id="cancellation-title">Avbokning</h2>
        <p className="booking-cancel-instructions">
          Avbokning sker via mejl eller telefon till Ljusrummet.
        </p>
      </section>

      <section className="booking-preparation" aria-labelledby="preparation-title">
        <h2 id="preparation-title">Inför kursen</h2>
        <div className="booking-preparation__sections">
          <div className="booking-preparation__section">
            <h3>Ta med</h3>
            <ul>
              <li>Egen kamera med inställningar för bländare, slutartid och ISO</li>
              <li>Laddat batteri och minneskort</li>
              <li>Kläder efter väder</li>
            </ul>
          </div>
          <div className="booking-equipment-note booking-equipment-note--outlined">
            <p><strong>Mobilkamera räcker inte.</strong></p>
            <p>Extra objektiv och stativ behövs inte.</p>
          </div>
          <div className="booking-preparation__section">
            <h3>Det här ingår</h3>
            <p>Handledning, övningsmaterial och fika. Lunch ingår inte.</p>
          </div>
          <div className="booking-preparation__section">
            <h3>Förkunskaper</h3>
            <p>Kursen är på nybörjarnivå. Inga tidigare fotokunskaper behövs.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export function BookingPage() {
  const [step, setStep] = useState('dates')
  const [selectedDate, setSelectedDate] = useState('')
  const [dateError, setDateError] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const date = availableDates.find((availableDate) => availableDate.value === selectedDate)

  function continueToDetails() {
    if (!date) {
      setDateError(true)
      return
    }

    setDateError(false)
    setStep('details')
  }

  function submitDetails(event) {
    event.preventDefault()
    setStep('review')
  }

  return (
    <div className={`booking-page booking-page--${step}`}>
      <div className="booking-page__top">
        <Link className="booking-back-link" to="/">← Tillbaka till startsidan</Link>
      </div>

      {step === 'dates' && (
        <div className="booking-page__content">
          <section className="booking-hero" aria-labelledby="booking-page-title">
            <div className="booking-hero__title">
              <p className="booking-kicker">LJUSRUMS FOTOWORKSHOP</p>
              <h1 id="booking-page-title">Ta kontroll över din kamera!</h1>
            </div>
            <p>Här kan du boka ljusrummets workshop! Läs genom informationen och välj ett tillfälle som passar dig!</p>
          </section>

          <section className="booking-availability" aria-label="Bokningsbara datum">
            <fieldset className="booking-date-picker" aria-describedby={dateError ? 'booking-date-error' : undefined}>
              <legend>Tillgängliga datum – 2026</legend>
              <div className="booking-date-options">
                {availableDates.map((availableDate) => (
                  <div className="booking-date-option" key={availableDate.value}>
                    <label className={`booking-date-option__choice${selectedDate === availableDate.value ? ' booking-date-option__choice--selected' : ''}`}>
                      <input
                        type="radio"
                        name="workshop-date"
                        value={availableDate.value}
                        checked={selectedDate === availableDate.value}
                        onClick={() => {
                          if (selectedDate === availableDate.value) {
                            setSelectedDate('')
                            setDateError(false)
                          }
                        }}
                        onChange={(event) => {
                          setSelectedDate(event.target.value)
                          setDateError(false)
                        }}
                      />
                      <span>{availableDate.label}</span>
                    </label>
                    <p>10.00-15.00</p>
                  </div>
                ))}
              </div>
            </fieldset>

            <div className="booking-action">
              <p>1 Plats · 1200 kr</p>
              <button type="button" onClick={continueToDetails}>Vidare till bokning</button>
              {dateError && <p className="booking-form-error" id="booking-date-error" role="alert">Välj ett datum för att gå vidare.</p>}
            </div>
          </section>

          <CourseInformation />
        </div>
      )}

      {step === 'details' && (
        <div className="booking-page__content booking-page__content--details">
          <section className="booking-hero booking-hero--details" aria-labelledby="booking-details-title">
            <div className="booking-hero__title">
              <p className="booking-kicker">LJUSRUMS FOTOWORKSHOP</p>
              <h1 id="booking-details-title">Bokning</h1>
              <p className="booking-hero__subtitle">Dina uppgifter</p>
            </div>
          </section>

          <form className="booking-details-form" onSubmit={submitDetails}>
            <div className="booking-details-form__intro">
              <h2>Fyll i din information nedan:</h2>
              <p>Dina uppgifter</p>
            </div>
            <div className="booking-details-form__fields">
              <label>
                <span>Namn:</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>
              <label>
                <span>E-post:</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
            </div>
            <div className="booking-details-form__actions">
              <button className="booking-details-form__back" type="button" onClick={() => setStep('dates')}>Backa</button>
              <button className="booking-details-form__next" type="submit">Vidare till bokning</button>
            </div>
          </form>
        </div>
      )}

      {step === 'review' && date && (
        <div className="booking-page__content booking-page__content--review">
          <BookingReview
            date={date}
            name={name}
            email={email}
            onCancel={() => setStep('dates')}
            onEdit={() => setStep('details')}
            onConfirm={() => setStep('confirmation')}
          />
        </div>
      )}

      {step === 'confirmation' && date && (
        <div className="booking-page__content booking-page__content--confirmation">
          <BookingConfirmation date={date} email={email} />
        </div>
      )}
    </div>
  )
}
