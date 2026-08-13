import { Link } from 'react-router-dom'
import './Button.css'

/**
 * variant: 'primary' | 'outline'
 * If `to` is provided, renders as a Link; otherwise renders as a <button>.
 */
function Button({ to, variant = 'primary', children, type = 'button', className = '', ...rest }) {
  const classes = `btn btn--${variant} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
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
