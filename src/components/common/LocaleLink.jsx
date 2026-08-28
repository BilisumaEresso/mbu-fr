import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getLocalePath } from '../../utils/locale.js'

export function LocaleLink({ to, children, ...props }) {
  const { i18n } = useTranslation()
  const lang = i18n.language || 'en'
  const localeTo = typeof to === 'string' ? getLocalePath(to, lang) : to

  return (
    <Link to={localeTo} {...props}>
      {children}
    </Link>
  )
}

export function LocaleNavLink({ to, children, className, ...props }) {
  const { i18n } = useTranslation()
  const location = useLocation()
  const lang = i18n.language || 'en'
  const localeTo = typeof to === 'string' ? getLocalePath(to, lang) : to

  return (
    <NavLink
      to={localeTo}
      className={typeof className === 'function' ? className : className}
      {...props}
    >
      {children}
    </NavLink>
  )
}

export default LocaleLink
