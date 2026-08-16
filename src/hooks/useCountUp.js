import { useEffect, useRef, useState } from 'react'

/**
 * useCountUp — animates a numeric value from 0 to a target.
 *
 * Handles non-numeric formatting:
 *   "140+"  → animates 0→140, reassembles "140+"
 *   "50,000t" → animates 0→50000, reassembles "50,000t"
 *   "5"     → animates 0→5
 *   "EU"    → no numeric part, returned as-is immediately
 *
 * Respects prefers-reduced-motion: if reduced motion is preferred,
 * returns the final formatted value immediately with no animation.
 *
 * @param {string|number} rawValue - The target value (may contain prefix/suffix/formatting)
 * @param {boolean} trigger - When true, starts the count-up animation
 * @param {number} [duration=1500] - Animation duration in ms (1.4–1.6s recommended)
 * @returns {string} - Current display value formatted like the original
 */
function useCountUp(rawValue, trigger, duration = 1500) {
  const [display, setDisplay] = useState('')
  const rafRef = useRef(null)

  useEffect(() => {
    const str = String(rawValue)

    // Parse: extract leading numeric portion (digits + optional commas + optional dot)
    const match = str.match(/^(\d[\d,.]*)(.*)$/)

    if (!match) {
      // No numeric part at all (e.g. "EU") — return as-is immediately
      setDisplay(str)
      return
    }

    const numericRaw = match[1]   // e.g. "50,000" or "140" or "5"
    const suffix = match[2] ?? '' // e.g. "+", "t", ""

    // Strip formatting commas to get the real target number
    const hasCommas = numericRaw.includes(',')
    const target = parseFloat(numericRaw.replace(/,/g, ''))

    if (isNaN(target)) {
      setDisplay(str)
      return
    }

    /** Reformat a numeric progress value to match the original string's style */
    function format(n) {
      const floored = Math.floor(n)
      if (hasCommas) {
        // Restore comma-thousands formatting
        return floored.toLocaleString('en-US') + suffix
      }
      return String(floored) + suffix
    }

    // Initialise display to "0" (with suffix) before trigger fires
    if (!trigger) {
      setDisplay(format(0))
      return
    }

    // Respect prefers-reduced-motion — skip animation entirely
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplay(format(target))
      return
    }

    // Ease-out curve: decelerates toward the end (quadratic ease-out)
    function easeOut(t) {
      return 1 - (1 - t) * (1 - t)
    }

    const startTime = performance.now()

    function step(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOut(progress)
      const current = eased * target

      setDisplay(format(current))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        // Ensure final value is exact
        setDisplay(format(target))
      }
    }

    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, rawValue, duration])

  return display
}

export default useCountUp
