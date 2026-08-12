import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/farmers', label: 'Farmers' },
  { to: '/buyers', label: 'Buyers' },
  { to: '/news', label: 'News' },
  { to: '/contact', label: 'Contact' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-background dark:bg-surface-container-low w-full top-0 sticky border-b border-outline-variant dark:border-outline z-50">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        {/* Image logo available at src/assets/images/MBU_logo_new.png — swap in when brand guidelines are finalized */}
        <NavLink
          to="/"
          className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim"
          onClick={() => setMenuOpen(false)}
        >
          Meki Batu Union
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-gutter">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-body-md text-body-md py-2 transition-colors duration-200 ${
                  isActive
                    ? 'text-primary'
                    : 'text-on-surface-variant dark:text-on-surface hover:text-primary'
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <button className="bg-primary text-on-primary font-body-md text-body-md px-6 py-2 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors duration-200">
            Member Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-primary p-2"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <nav className="md:hidden bg-background border-t border-outline-variant px-margin-mobile py-4 space-y-2">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block font-body-md text-body-md py-2 transition-colors duration-200 ${
                  isActive
                    ? 'text-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <button className="bg-primary text-on-primary font-body-md text-body-md px-6 py-2 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors duration-200 mt-2 w-full">
            Member Login
          </button>
        </nav>
      )}
    </header>
  )
}

export default Header
