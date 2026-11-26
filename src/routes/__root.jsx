import { useState } from 'react'
import { createRootRoute, HeadContent, Link, Outlet, useRouterState } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: Layout,
  head: () => ({ meta: [{ title: 'Fotoworkshopen' }] }),
  notFoundComponent: () => <h1>Sidan finns inte</h1>,
})

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const isBookingPage = useRouterState({
    select: (state) => state.location.pathname.startsWith('/booking'),
  })

  return (
    <div className={isBookingPage ? 'site site--booking' : 'site'}>
      <HeadContent />
      <header className="site-header">
        <Link className="site-logo" to="/" aria-label="Ljusrummet – startsida">
          <span>LJUS</span>
          <span>RUMMET</span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Stäng menyn' : 'Öppna menyn'}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className="site-menu" id="site-menu" aria-label="Huvudmeny" hidden={!menuOpen}>
          <Link to="/booking" onClick={() => setMenuOpen(false)}>Boka kurs</Link>
          <Link to="/" onClick={() => setMenuOpen(false)}>Till startsidan</Link>
        </nav>
      </header>
      <main className="site-main"><Outlet /></main>
      <footer className="site-footer">
        <p>
          <Link className="site-footer__organizer-link" to="/admin">Logga in som arrangör</Link>
          <span>Vid frågor kontakta:</span>
          <a href="tel:+460121231212">+46(0) 12 123 12 12</a>
        </p>
      </footer>
    </div>
  )
}
