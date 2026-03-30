import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CONFIG } from '../config'

const navItems = CONFIG.nav

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-warm-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline">
            <img
              src={CONFIG.images.logoTransparent}
              alt={CONFIG.appName}
              className="h-12 w-auto object-contain"
            />
            <div className="hidden sm:block font-heading text-lg font-semibold text-warm-800 leading-tight">
              All Things<br />
              <span className="text-warm-500 text-sm font-medium">Flooring & Tile</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors no-underline ${
                    isActive
                      ? 'text-warm-700 border-b-2 border-warm-500 pb-1'
                      : 'text-stone-600 hover:text-warm-700'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Phone + Booking */}
          <div className="flex items-center gap-3">
            <a
              href={CONFIG.phone.href}
              className="hidden lg:flex items-center gap-2 text-stone-600 hover:text-warm-700 text-sm font-medium transition-colors no-underline"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              {CONFIG.phone.display}
            </a>
            <a
              href={CONFIG.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-warm-700 hover:bg-warm-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors no-underline"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              Book Estimate
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-warm-700"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-warm-200 py-4 space-y-2">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg text-sm font-medium no-underline ${
                    isActive
                      ? 'bg-warm-100 text-warm-800'
                      : 'text-stone-600 hover:bg-warm-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <a
              href={CONFIG.phone.href}
              className="block px-4 py-2 text-sm font-medium text-warm-700 no-underline"
            >
              Call: {CONFIG.phone.display}
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
