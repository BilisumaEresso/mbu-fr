import useScrollReveal from '../../hooks/useScrollReveal'
import './Reveal.css'

/**
 * Reveal — scroll-triggered fade-up wrapper (infrastructure only).
 *
 * Uses useScrollReveal internally. Applies a CSS class toggle between
 * hidden (opacity: 0; translateY(16px)) and visible (opacity: 1; translateY(0)).
 * Supports staggered siblings via the `delay` prop.
 *
 * @param {React.ReactNode} children
 * @param {string|React.ElementType} [as='div'] - Element type to render
 * @param {number} [delay=0] - Transition delay in ms, for sibling staggering
 * @param {string} [className=''] - Additional class names to merge in
 */
function Reveal({ children, as: Tag = 'div', delay = 0, className = '', ...rest }) {
  const { ref, isVisible } = useScrollReveal()

  const classes = [
    'reveal',
    isVisible ? 'reveal--visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const style = delay > 0 ? { transitionDelay: `${delay}ms` } : undefined

  return (
    <Tag ref={ref} className={classes} style={style} {...rest}>
      {children}
    </Tag>
  )
}

export default Reveal
