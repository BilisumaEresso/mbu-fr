import { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import logoImg from '../../assets/images/MBU_logo_new.webp'
import Toast from '../common/Toast.jsx'
import { useToast } from '../../hooks/useToast.js'
import './Header.css'

const NAV_GROUPS = [
  {
    key: 'about',
    label: 'About Us',
    items: [
      { to: '/about', label: 'About Us', desc: 'Our heritage, mission & leadership' },
      { to: '/impact', label: 'Impact & Reports', desc: 'Certifications & annual reviews' },
    ],
  },
  {
    key: 'products',
    label: 'Products',
    items: [
      { to: '/products', label: 'Our Products', desc: 'Fresh produce & seed catalog' },
      { to: '/retail-outlets', label: 'Retail Outlets', desc: '5 Addis Ababa storefronts' },
    ],
  },
  {
    key: 'farmers',
    to: '/farmers',
    label: 'For Farmers',
  },
  {
    key: 'buyers',
    to: '/buyers',
    label: 'For Buyers',
  },
  {
    key: 'news',
    to: '/news',
    label: 'News',
  },
  {
    key: 'contact',
    to: '/contact',
    label: 'Contact',
  },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const rafPending = useRef(false)
  const dropdownTimer = useRef(null)
  const { toast, showToast, dismissToast } = useToast()

  useEffect(() => {
    function onScroll() {
      if (rafPending.current) return
      rafPending.current = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24)
        rafPending.current = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleDropdownToggle(key) {
    setActiveDropdown((prev) => (prev === key ? null : key))
  }

  function closeAll() {
    setMenuOpen(false)
    setActiveDropdown(null)
  }

  function handleLoginClick() {
    closeAll()
    showToast(
      'Member Login is coming soon! Online portal access for member cooperatives is currently under development.',
      'info'
    )
  }

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__container">
        {/* Brand Logo & Title */}
        <NavLink to="/" className="header__brand" onClick={closeAll}>
          <img src={logoImg} alt="Meki Batu Union Logo" className="header__logo-img" />
          <span className="header__brand-text">Meki Batu Union</span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="header__nav">
          {NAV_GROUPS.map((group) => {
            if (group.to) {
              return (
                <NavLink
                  key={group.key}
                  to={group.to}
                  className={({ isActive }) =>
                    `header__link ${isActive ? 'header__link--active' : ''}`
                  }
                  onClick={closeAll}
                >
                  {group.label}
                </NavLink>
              )
            }

            const isGroupActive = group.items.some((item) => item.to === location.pathname)

            return (
              <div
                key={group.key}
                className="header__dropdown-wrap"
                onMouseEnter={() => {
                  clearTimeout(dropdownTimer.current)
                  setActiveDropdown(group.key)
                }}
                onMouseLeave={() => {
                  dropdownTimer.current = setTimeout(() => {
                    setActiveDropdown(null)
                  }, 300)
                }}
              >
                <button
                  type="button"
                  className={`header__dropdown-trigger ${
                    isGroupActive ? 'header__link--active' : ''
                  }`}
                  onClick={() => handleDropdownToggle(group.key)}
                >
                  {group.label}
                  <span className="material-symbols-outlined header__dropdown-icon">
                    expand_more
                  </span>
                </button>

                {activeDropdown === group.key && (
                  <div className="header__dropdown-menu">
                    {group.items.map((sub) => (
                      <NavLink
                        key={sub.to}
                        to={sub.to}
                        className={({ isActive }) =>
                          `header__dropdown-item ${
                            isActive ? 'header__dropdown-item--active' : ''
                          }`
                        }
                        onClick={closeAll}
                      >
                        <span className="header__dropdown-title">{sub.label}</span>
                        <span className="header__dropdown-desc">{sub.desc}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <div className="header__actions">
          <button className="header__login-btn" type="button" onClick={handleLoginClick}>
            Member Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="header__mobile-toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile Nav Accordion */}
      {menuOpen && (
        <nav className="header__mobile-nav">
          {NAV_GROUPS.map((group) => {
            if (group.to) {
              return (
                <NavLink
                  key={group.key}
                  to={group.to}
                  className={({ isActive }) =>
                    `header__mobile-link ${isActive ? 'header__mobile-link--active' : ''}`
                  }
                  onClick={closeAll}
                >
                  {group.label}
                </NavLink>
              )
            }

            return (
              <div key={group.key} className="header__mobile-group">
                <div className="header__mobile-group-title">{group.label}</div>
                <div className="header__mobile-sublinks">
                  {group.items.map((sub) => (
                    <NavLink
                      key={sub.to}
                      to={sub.to}
                      className={({ isActive }) =>
                        `header__mobile-sublink ${
                          isActive ? 'header__mobile-sublink--active' : ''
                        }`
                      }
                      onClick={closeAll}
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            )
          })}
          <button
            className="header__login-btn header__login-btn--mobile"
            type="button"
            onClick={handleLoginClick}
          >
            Member Login
          </button>
        </nav>
      )}

      {/* Toast Notification */}
      <Toast toast={toast} onDismiss={dismissToast} />
    </header>
  )
}

export default Header
