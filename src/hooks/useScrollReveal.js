import { useEffect, useRef, useState } from 'react'

/**
 * useScrollReveal — triggers once when an element enters the viewport.
 *
 * Respects prefers-reduced-motion: if the user has requested reduced motion,
 * isVisible is set to true immediately with no delay or animation.
 *
 * @param {object} [options]
 * @param {number} [options.threshold=0.15]  - IntersectionObserver threshold
 * @param {string} [options.rootMargin='-40px'] - rootMargin to fire slightly early
 * @returns {{ ref: React.RefObject, isVisible: boolean }}
 */
function useScrollReveal({ threshold = 0.15, rootMargin = '-40px' } = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Hard requirement: respect prefers-reduced-motion. Skip animation entirely.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setIsVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          // One-time reveal — stop observing after first trigger.
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)

    return () => {
      observer.unobserve(el)
    }
  }, [threshold, rootMargin])

  return { ref, isVisible }
}

export default useScrollReveal
