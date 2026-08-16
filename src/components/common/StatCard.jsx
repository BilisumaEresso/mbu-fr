import useScrollReveal from '../../hooks/useScrollReveal.js'
import useCountUp from '../../hooks/useCountUp.js'
import './StatCard.css'

/**
 * StatCard — displays a key statistic with an automatic count-up animation.
 * Internally wires useScrollReveal (to detect viewport entry) and
 * useCountUp (triggered by that visibility) so every usage site gets
 * the animation without any per-page wiring.
 *
 * Keep Reveal fade/rise wrapping at the grid level in the parent —
 * do NOT wrap StatCard in Reveal inside this component.
 */
function StatCard({ value, label }) {
  const { ref, isVisible } = useScrollReveal()
  const displayValue = useCountUp(value, isVisible)

  return (
    <div ref={ref} className="stat-card">
      <div className="stat-card__value">{displayValue}</div>
      <div className="stat-card__label">{label}</div>
    </div>
  )
}

export default StatCard
