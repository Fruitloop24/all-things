import { Link } from 'react-router-dom'
import { CONFIG } from '../config'

export default function Footer() {
  return (
    <footer className="hidden md:block bg-warm-900 text-warm-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={CONFIG.images.logoTransparent} alt={CONFIG.appName} className="h-12 w-auto object-contain" />
              <div className="font-heading text-lg font-semibold text-white leading-tight">
                All Things<br />
                <span className="text-warm-400 text-sm font-medium">Flooring & Tile</span>
              </div>
            </div>
            <p className="text-warm-300 text-sm leading-relaxed">
              {CONFIG.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {CONFIG.footer.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-warm-300 hover:text-white transition-colors no-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-warm-300">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-warm-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <a href={CONFIG.phone.href} className="hover:text-white transition-colors no-underline text-warm-300">
                  {CONFIG.phone.display}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-warm-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <div>
                  <div>{CONFIG.address.street}</div>
                  <div>{CONFIG.address.city}, {CONFIG.address.state} {CONFIG.address.zip}</div>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-warm-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div>{CONFIG.hours.weekday}</div>
                  <div className="text-warm-400">{CONFIG.hours.weekend}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-warm-800 mt-12 pt-8 text-center">
          <p className="text-xs text-warm-500">
            &copy; {new Date().getFullYear()} {CONFIG.appName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
