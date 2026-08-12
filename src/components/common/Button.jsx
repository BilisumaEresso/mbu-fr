import { Link } from 'react-router-dom'

/**
 * variant: 'primary' | 'outline'
 * If `to` is provided, renders as a Link; otherwise renders as a <button>.
 */
function Button({ to, variant = 'primary', children, type = 'button', className = '', ...rest }) {
  const base = 'inline-flex items-center justify-center font-body-md text-body-md rounded-lg transition-all duration-200 whitespace-nowrap'

  const variants = {
    primary: 'bg-[#C05D38] text-white px-8 py-3 hover:opacity-90',
    outline: 'border border-outline text-primary px-8 py-3 hover:bg-surface-container-low',
  }

  const classes = `${base} ${variants[variant] || variants.primary} ${className}`

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
