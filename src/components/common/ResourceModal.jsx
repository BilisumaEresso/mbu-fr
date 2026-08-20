import { useEffect, useRef } from 'react'
import './ResourceModal.css'

function ResourceModal({ resource, onClose }) {
  const closeBtnRef = useRef(null)

  useEffect(() => {
    if (!resource) return

    closeBtnRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [resource, onClose])

  if (!resource) return null

  return (
    <div className="resource-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={resource.name}>
      <div className="resource-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="resource-modal__header">
          <div className="resource-modal__header-left">
            <div className="resource-modal__icon-wrap">
              <span className="material-symbols-outlined">{resource.icon}</span>
            </div>
            <div>
              <span className="resource-modal__category">{resource.category}</span>
              <h2 className="resource-modal__title">{resource.name}</h2>
              <p className="resource-modal__type">{resource.type} &bull; <span className="resource-modal__status">{resource.status}</span></p>
            </div>
          </div>
          <button
            type="button"
            className="resource-modal__close-btn"
            onClick={onClose}
            ref={closeBtnRef}
            aria-label="Close specifications dialog"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="resource-modal__body">
          {/* Visual Banner Placeholder */}
          <div className={`resource-modal__banner resource-modal__banner--${resource.imageType || 'default'}`}>
            <div className="resource-modal__banner-overlay">
              <span className="material-symbols-outlined resource-modal__banner-icon">{resource.icon}</span>
              <div className="resource-modal__banner-meta">
                <span className="resource-modal__banner-cap">{resource.capacity}</span>
                <span className="resource-modal__banner-loc">
                  <span className="material-symbols-outlined text-xs">location_on</span>
                  {resource.location}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="resource-modal__desc-box">
            <h4 className="resource-modal__section-title">Operational Overview</h4>
            <p className="resource-modal__desc">{resource.description}</p>
          </div>

          {/* Technical Specifications Table */}
          {resource.specs && (
            <div className="resource-modal__specs-box">
              <h4 className="resource-modal__section-title">Technical Specifications</h4>
              <div className="resource-modal__specs-grid">
                {Object.entries(resource.specs).map(([key, val]) => (
                  <div key={key} className="resource-modal__spec-row">
                    <span className="resource-modal__spec-label">{key}</span>
                    <span className="resource-modal__spec-value">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Operational Highlights */}
          {Array.isArray(resource.highlights) && resource.highlights.length > 0 && (
            <div className="resource-modal__highlights-box">
              <h4 className="resource-modal__section-title">Operational Capabilities &amp; Impact</h4>
              <ul className="resource-modal__highlights-list">
                {resource.highlights.map((h, i) => (
                  <li key={i} className="resource-modal__highlight-item">
                    <span className="material-symbols-outlined resource-modal__check-icon">check_circle</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="resource-modal__footer">
          <span className="resource-modal__footer-text">Meki Batu Union &bull; Verified Operational Infrastructure</span>
          <button type="button" className="btn btn--primary btn--sm" onClick={onClose}>
            Close Specifications
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResourceModal
