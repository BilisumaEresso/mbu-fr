import { useEffect } from 'react'
import './Toast.css'

const AUTO_DISMISS_MS = 5000

/**
 * Accessible toast notification.
 *
 * Props:
 *   toast      { id, message, type: 'success' | 'error' } | null
 *   onDismiss  () => void
 */
function Toast({ toast, onDismiss }) {
  // Auto-dismiss after 5 s; restart when toast.id changes (new toast)
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(onDismiss, AUTO_DISMISS_MS)
    return () => clearTimeout(timer)
  }, [toast?.id, onDismiss]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!toast) return null

  const isSuccess = toast.type === 'success'
  const isError = toast.type === 'error'
  const isInfo = toast.type === 'info'

  let icon = 'check_circle'
  if (isError) icon = 'error'
  if (isInfo) icon = 'info'

  const ariaRole = isError ? 'alert' : 'status'

  return (
    <div
      className={`toast toast--${toast.type}`}
      role={ariaRole}
      aria-live={isSuccess ? 'polite' : 'assertive'}
      aria-atomic="true"
    >
      <span className="material-symbols-outlined toast__icon" aria-hidden="true">
        {icon}
      </span>

      <div className="toast__body">
        <p className="toast__message">{toast.message}</p>
      </div>

      <button
        type="button"
        className="toast__close"
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  )
}

export default Toast
