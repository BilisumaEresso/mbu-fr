import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { X, MapPin, CheckCircle } from 'lucide-react'
import './ResourceModal.css'

const KEY_MAP = {
  'central-cold-hub': 'centralColdHub',
  'refrigerated-fleet': 'refrigeratedFleet',
  'central-packhouse': 'centralPackhouse',
  'irrigation-schemes': 'irrigationSchemes',
}

function ResourceModal({ resource, onClose }) {
  const { t } = useTranslation(['about', 'common'])
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

  const key = KEY_MAP[resource.id]
  const name = key ? t(`common:facilities.${key}.name`, resource.name) : resource.name
  const desc = key ? t(`common:facilities.${key}.desc`, resource.desc || resource.description) : (resource.desc || resource.description)
  const location = key ? t(`common:facilities.${key}.location`, resource.location) : resource.location
  const tag = key ? t(`common:facilities.${key}.tag`, resource.tag || resource.category) : (resource.tag || resource.category)

  const ResourceIcon = resource.icon

  return (
    <div className="resource-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={name}>
      <div className="resource-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="resource-modal__header">
          <div className="resource-modal__header-left">
            {ResourceIcon && (
              <div className="resource-modal__icon-wrap">
                <ResourceIcon size={24} />
              </div>
            )}
            <div>
              <span className="resource-modal__category">{tag}</span>
              <h2 className="resource-modal__title">{name}</h2>
              <p className="resource-modal__type">{resource.type || tag} &bull; <span className="resource-modal__status">{resource.status || t('about:facilities.tag', 'Verified Asset')}</span></p>
            </div>
          </div>
          <button
            type="button"
            className="resource-modal__close-btn"
            onClick={onClose}
            ref={closeBtnRef}
            aria-label={t('about:resourceModal.closeAriaLabel', 'Close specifications dialog')}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="resource-modal__body">
          {/* Visual Banner Placeholder */}
          <div className={`resource-modal__banner resource-modal__banner--${resource.imageType || 'default'}`}>
            <div className="resource-modal__banner-overlay">
              {ResourceIcon && <ResourceIcon size={48} className="resource-modal__banner-icon" />}
              <div className="resource-modal__banner-meta">
                <span className="resource-modal__banner-cap">{resource.capacity || resource.stat}</span>
                <span className="resource-modal__banner-loc">
                  <MapPin size={14} />
                  {location}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="resource-modal__desc-box">
            <h4 className="resource-modal__section-title">{t('about:resourceModal.overview', 'Operational Overview')}</h4>
            <p className="resource-modal__desc">{desc}</p>
          </div>

          {/* Technical Specifications Table */}
          {resource.specs && (
            <div className="resource-modal__specs-box">
              <h4 className="resource-modal__section-title">{t('about:resourceModal.specs', 'Technical Specifications')}</h4>
              <div className="resource-modal__specs-grid">
                {Object.entries(resource.specs).map(([specKey, val]) => (
                  <div key={specKey} className="resource-modal__spec-row">
                    <span className="resource-modal__spec-label">{specKey}</span>
                    <span className="resource-modal__spec-value">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Operational Highlights */}
          {Array.isArray(resource.highlights) && resource.highlights.length > 0 && (
            <div className="resource-modal__highlights-box">
              <h4 className="resource-modal__section-title">{t('about:resourceModal.capabilities', 'Operational Capabilities & Impact')}</h4>
              <ul className="resource-modal__highlights-list">
                {resource.highlights.map((h, i) => (
                  <li key={i} className="resource-modal__highlight-item">
                    <CheckCircle size={16} className="resource-modal__check-icon" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="resource-modal__footer">
          <span className="resource-modal__footer-text">{t('about:resourceModal.footerText', 'Meki Batu Union • Verified Operational Infrastructure')}</span>
          <button type="button" className="btn btn--primary btn--sm" onClick={onClose}>
            {t('about:resourceModal.closeBtn', 'Close Specifications')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResourceModal
