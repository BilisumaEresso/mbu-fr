import { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logoImg from '../../assets/images/brand/MBU_logo_new.webp'
import Toast from '../common/Toast.jsx'
import { useToast } from '../../hooks/useToast.js'
import { getLocalePath } from '../../utils/locale.js'
import './Header.css'

function FlagUK({ className = '', width = 18, height = 12 }) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 640 480"
      style={{ borderRadius: '2px', flexShrink: 0, display: 'inline-block', verticalAlign: 'middle', boxShadow: '0 0 1px rgba(0,0,0,0.5)' }}
      aria-hidden="true"
    >
      <path fill="#012169" d="M0 0h640v480H0z"/>
      <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
      <path fill="#C8102E" d="m424 288 216 159v33h-44L366 316l58-28zM640 0v10L454 150l34 32L640 33V0zm-247 90L137 282l-34-26L359 64l34 26zM0 470l183-137-33-31L0 437v33z"/>
      <path fill="#FFF" d="M240 0h160v480H240zM0 160h640v160H0z"/>
      <path fill="#C8102E" d="M267 0h106v480H267zM0 187h640v106H0z"/>
    </svg>
  )
}

function FlagET({ className = '', width = 18, height = 12 }) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 640 480"
      style={{ borderRadius: '2px', flexShrink: 0, display: 'inline-block', verticalAlign: 'middle', boxShadow: '0 0 1px rgba(0,0,0,0.5)' }}
      aria-hidden="true"
    >
      <path fill="#078930" d="M0 0h640v160H0z"/>
      <path fill="#FCDD09" d="M0 160h640v160H0z"/>
      <path fill="#DA121A" d="M0 320h640v160H0z"/>
      <circle cx="320" cy="240" r="62" fill="#0F47AF"/>
      <path fill="#FCDD09" d="m320 188 15 45h48l-39 28 15 45-39-28-39 28 15-45-39-28h48z"/>
      <path stroke="#0F47AF" strokeWidth="4.5" d="M320 202v76M282 240h76M293 213l54 54M347 213l-54 54"/>
    </svg>
  )
}

const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English', nativeName: 'English', Flag: FlagUK },
  { code: 'om', label: 'OM', name: 'Oromo', nativeName: 'Afaan Oromoo', Flag: FlagET },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const rafPending = useRef(false)
  const dropdownTimer = useRef(null)
  const { toast, showToast, dismissToast } = useToast()
  const { t, i18n } = useTranslation('common')
  const currentLang = i18n.language || 'en'

  const navGroups = [
    {
      key: 'about',
      label: t('header.nav.about'),
      items: [
        { to: '/about', label: t('header.nav.about'), desc: t('header.nav.aboutDesc') },
        { to: '/impact', label: t('header.nav.impact'), desc: t('header.nav.impactDesc') },
      ],
    },
    {
      key: 'products',
      label: t('header.nav.products'),
      items: [
        { to: '/products', label: t('header.nav.ourProducts'), desc: t('header.nav.ourProductsDesc') },
        { to: '/retail-outlets', label: t('header.nav.retailOutlets'), desc: t('header.nav.retailOutletsDesc') },
      ],
    },
    {
      key: 'farmers',
      to: '/farmers',
      label: t('header.nav.farmers'),
    },
    {
      key: 'buyers',
      to: '/buyers',
      label: t('header.nav.buyers'),
    },
    {
      key: 'news',
      to: '/news',
      label: t('header.nav.news'),
    },
    {
      key: 'contact',
      to: '/contact',
      label: t('header.nav.contact'),
    },
  ]

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
      t('header.memberLoginToast'),
      'info'
    )
  }

  function handleLanguageSwitch(targetLang) {
    if (targetLang === currentLang) return
    closeAll()
    const targetPath = getLocalePath(
      location.pathname + location.search + location.hash,
      targetLang
    )
    navigate(targetPath)
  }

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__container">
        {/* Brand Logo & Title */}
        <NavLink to={getLocalePath('/', currentLang)} className="header__brand" onClick={closeAll}>
          <img src={logoImg} alt={t('header.brandLogoAlt')} className="header__logo-img" />
          <span className="header__brand-text">
            <span className="header__brand-line1">{t('header.brandLine1')}</span>
            <span className="header__brand-line2">{t('header.brandLine2')}</span>
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="header__nav">
          {navGroups.map((group) => {
            if (group.to) {
              const localeTo = getLocalePath(group.to, currentLang)
              return (
                <NavLink
                  key={group.key}
                  to={localeTo}
                  className={({ isActive }) =>
                    `header__link ${isActive ? 'header__link--active' : ''}`
                  }
                  onClick={closeAll}
                >
                  {group.label}
                </NavLink>
              )
            }

            const isGroupActive = group.items.some(
              (item) => getLocalePath(item.to, currentLang) === location.pathname
            )

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
                        to={getLocalePath(sub.to, currentLang)}
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

        <div className="header__right">
          {/* Compact Dropdown Language Switcher — visible on all screens */}
          <div
            className="header__lang-dropdown-wrap"
            onMouseEnter={() => {
              clearTimeout(dropdownTimer.current)
              setActiveDropdown('lang')
            }}
            onMouseLeave={() => {
              dropdownTimer.current = setTimeout(() => {
                setActiveDropdown(null)
              }, 250)
            }}
          >
            <button
              type="button"
              className={`header__lang-trigger ${activeDropdown === 'lang' ? 'header__lang-trigger--active' : ''}`}
              onClick={() => handleDropdownToggle('lang')}
              aria-label={t('langSwitcher.label', 'Switch language')}
              aria-expanded={activeDropdown === 'lang'}
            >
              {currentLang === 'om' ? <FlagET width={16} height={11} /> : <FlagUK width={16} height={11} />}
              <span className="header__lang-code-current">{currentLang.toUpperCase()}</span>
              <span className="material-symbols-outlined header__lang-chevron">
                expand_more
              </span>
            </button>

            {activeDropdown === 'lang' && (
              <div className="header__lang-menu" role="menu">
                {LANGUAGES.map((lang) => {
                  const isActive = currentLang === lang.code
                  const FlagComp = lang.Flag
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      className={`header__lang-menu-item ${isActive ? 'header__lang-menu-item--active' : ''}`}
                      onClick={() => handleLanguageSwitch(lang.code)}
                      role="menuitem"
                    >
                      <FlagComp width={18} height={12} />
                      <div className="header__lang-menu-info">
                        <span className="header__lang-menu-name">{lang.nativeName}</span>
                        <span className="header__lang-menu-sub">{lang.name} ({lang.label})</span>
                      </div>
                      {isActive && (
                        <span className="material-symbols-outlined header__lang-menu-check">
                          check
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <button className="header__login-btn desktop-only" type="button" onClick={handleLoginClick}>
            <span className="material-symbols-outlined header__login-icon">lock</span>
            <span>{t('header.memberLogin')}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="header__mobile-toggle"
            type="button"
            aria-label={t('header.toggleNav')}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {menuOpen && (
        <nav className="header__mobile-nav">

          {navGroups.map((group) => {
            if (group.to) {
              return (
                <NavLink
                  key={group.key}
                  to={getLocalePath(group.to, currentLang)}
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
                      to={getLocalePath(sub.to, currentLang)}
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
            {t('header.memberLogin')}
          </button>
        </nav>
      )}

      {/* Toast Notification */}
      <Toast toast={toast} onDismiss={dismissToast} />
    </header>
  )
}

export default Header
