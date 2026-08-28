import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getLocalePath } from '../../utils/locale.js'
import './Button.css'

/**
 * variant: 'primary' | 'outline'
 * If `to` is provided, renders as a Link; otherwise renders as a <button>.
 */
function Button({ to, variant = 'primary', children, type = 'button', className = '', ...rest }) {
  const { i18n } = useTranslation()
  const currentLang = i18n.language || 'en'
  const classes = `btn btn--${variant} ${className}`.trim()

  if (to) {
    const localeTo = typeof to === 'string' ? getLocalePath(to, currentLang) : to
    return (
      <Link to={localeTo} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}

export default Button
