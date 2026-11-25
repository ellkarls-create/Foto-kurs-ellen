import filmStrip from '../assets/workshop-film-strip.jpg'
import divider from '../assets/workshop-divider.svg'
import durationIcon from '../assets/workshop-duration.svg'
import chevron from '../assets/workshop-chevron.svg'
import './WorkshopCard.css'

const workshopInformation = [
  {
    title: 'Workshopens innehåll',
    description:
      'Vi går igenom grunderna i fotografering och övar på att ta kontroll över kameran, både inne och ute.',
  },
  {
    title: 'Kamera krav',
    description:
      'Ta med kameran du vill lära dig att använda. Vi arbetar med kamerans grundinställningar under workshopen.',
  },
  {
    title: 'Förkunskapskrav',
    description:
      'Vi går igenom fotograferingens grunder tillsammans i en liten grupp.',
  },
  {
    title: 'Mer information',
    description:
      'Workshopen är fem timmar lång och kostar 1 200 kr.',
  },
]

export function WorkshopCard({
  title = 'Ta kontroll över din kamera!',
  description =
    'Under 5 timmar lär du dig att ta kontroll över din kamera! Arbetet sker i en liten grupp, vi använder oss av smarta metoder och går genom grunderna i fotografering. Under workshopen är vi både inne och ute och arbetar mot att du kan ta kontroll över din kamera. Workshopen är 5 timmar lång och kostar 1200 kr.',
  duration = '5 h',
  price = '1200:-',
}) {
  return (
    <article className="workshop-card">
      <div className="workshop-visual" aria-hidden="true">
        <img className="workshop-visual__image" src={filmStrip} alt="" />
        <img className="workshop-visual__divider" src={divider} alt="" />
      </div>

      <div className="workshop-main">
        <div className="workshop-inner">
          <section className="workshop-intro" aria-labelledby="workshop-title">
            <div className="workshop-title">
              <p className="workshop-kicker">LJUSRUMS FOTOWORKSHOP</p>
              <h1 id="workshop-title">{title}</h1>
            </div>
            <p className="workshop-description">{description}</p>
          </section>

          <section className="booking-section" id="bokning" aria-labelledby="booking-title">
            <div className="booking-copy">
              <h2 id="booking-title">Boka kurs</h2>
              <p>Intresserad av att boka ett tillfälle?</p>
              <a href="/booking">Visa lediga tider →</a>
            </div>
            <div className="booking-facts" aria-label={`${duration}, ${price} kronor`}>
              <img src={durationIcon} alt="" aria-hidden="true" />
              <p>
                <span>{duration}</span>
                <span>{price}</span>
              </p>
            </div>
          </section>

          <section className="workshop-information" id="information" aria-labelledby="information-title">
            <h2 id="information-title">Mer information:</h2>
            <div className="workshop-accordions">
              {workshopInformation.map(({ title: itemTitle, description: itemDescription }) => (
                <details className="workshop-accordion" key={itemTitle}>
                  <summary>
                    <span>{itemTitle}</span>
                    <img src={chevron} alt="" aria-hidden="true" />
                  </summary>
                  <p>{itemDescription}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}
