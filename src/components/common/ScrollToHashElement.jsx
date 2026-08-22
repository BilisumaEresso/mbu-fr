import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToHashElement
 * Handles smooth scrolling to #hash anchors across route changes
 * and in-page anchor clicks in React Router.
 */
export default function ScrollToHashElement() {
  const location = useLocation()
  const lastHash = useRef('')

  useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash.slice(1)
    }

    if (lastHash.current) {
      const targetId = lastHash.current
      // Allow DOM to settle, especially on route transitions
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        lastHash.current = ''
      }, 80)

      return () => clearTimeout(timer)
    } else if (!location.hash) {
      // Scroll to top on standard route changes without a hash
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [location])

  return null
}
