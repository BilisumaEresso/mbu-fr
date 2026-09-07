import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle, AlertCircle, Info } from 'lucide-react'
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
  const { t } = useTranslation('common')
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

  const IconComp = isError ? AlertCircle : isInfo ? Info : CheckCircle
  const ariaRole = isError ? 'alert' : 'status'

  return (
    <div
      className={`toast toast--${toast.type}`}
      role={ariaRole}
      aria-live={isSuccess ? 'polite' : 'assertive'}
      aria-atomic="true"
    >
      <IconComp size={20} className="toast__icon" aria-hidden="true" />

      <div className="toast__body">
        <p className="toast__message">{toast.message}</p>
      </div>

      <button
        type="button"
        className="toast__close"
        onClick={onDismiss}
        aria-label={t('toast.dismiss', 'Dismiss notification')}
      >
        ×
      </button>
    </div>
  )
}

export default Toast
