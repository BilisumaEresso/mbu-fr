import { useState, useCallback } from 'react'

/**
 * Manages a single-toast-at-a-time notification slot.
 *
 * Usage:
 *   const { toast, showToast } = useToast()
 *   showToast("Message text", 'success' | 'error')
 *
 * Pass `toast` and `() => showToast(null)` (or setToast(null) via dismissToast)
 * to <Toast> as props.
 */
export function useToast() {
  const [toast, setToast] = useState(null) // { id, message, type } | null

  const showToast = useCallback((message, type = 'success') => {
    if (!message) {
      setToast(null)
      return
    }
    // Unique id ensures useEffect in Toast fires even for identical messages
    setToast({ id: Date.now(), message, type })
  }, [])

  const dismissToast = useCallback(() => setToast(null), [])

  return { toast, showToast, dismissToast }
}
