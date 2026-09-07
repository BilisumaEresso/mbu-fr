import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ZoomIn, Maximize2, ExternalLink, Eye, X } from 'lucide-react'
import globalgapLogo from '../../assets/certifications/globalgap_logo.webp'
import oromiaCert from '../../assets/certifications/oromia_seed_certificate.webp'
import './Certifications.css'

function Certifications() {
  const { t } = useTranslation('common')
  const [activeCert, setActiveCert] = useState(null)
  const closeBtnRef = useRef(null)
  const triggerRef = useRef(null)

  const certData = {
    globalgap: {
      id: 'globalgap',
      title: t('certifications.globalgapTitle'),
      src: globalgapLogo,
      alt: t('certifications.globalgapAlt', 'GlobalG.A.P Certification Logo and Badge'),
      caption: t('certifications.globalgapCaption'),
      url: 'https://globalgap.org/',
      urlLabel: t('certifications.globalgapLearn'),
    },
    oromia: {
      id: 'oromia',
      title: t('certifications.oromiaTitle'),
      src: oromiaCert,
      alt: t('certifications.oromiaAlt', 'Oromia Bureau of Agriculture Competence Assurance Certificate for Meki Batu Union, certified seed producer license'),
      caption: t('certifications.oromiaCaption'),
    },
  }

  const openLightbox = (certKey) => {
    triggerRef.current = document.activeElement
    setActiveCert(certData[certKey] || certData.oromia)
  }

  const closeLightbox = useCallback(() => {
    setActiveCert(null)
  }, [])

  /* Focus management, scroll lock, keyboard handling */
  useEffect(() => {
    if (!activeCert) {
      triggerRef.current?.focus()
      return
    }

    closeBtnRef.current?.focus()

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox()
        return
      }
      if (e.key === 'Tab') {
        e.preventDefault()
        closeBtnRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeCert, closeLightbox])

  return (
    <>
      <div className="certifications">
        <div className="certifications__grid">
          {/* Card 1 — GlobalG.A.P */}
          <div className="certifications__card">
            <div className="certifications__thumb-wrap">
              <button
                type="button"
                className="certifications__thumb-btn certifications__thumb-btn--logo"
                onClick={() => openLightbox('globalgap')}
                aria-label={t('certifications.globalgapAriaLabel', 'View GlobalG.A.P certificate logo at full size')}
              >
                <img
                  src={globalgapLogo}
                  alt={t('certifications.globalgapLogoAlt', 'GlobalG.A.P logo')}
                  className="certifications__thumb-img certifications__thumb-img--logo"
                />
                <span className="certifications__zoom">
                  <ZoomIn size={20} />
                  {t('certifications.expand')}
                </span>
              </button>
            </div>
            <h3 className="certifications__card-title">
              {t('certifications.globalgapTitle')}
            </h3>
            <p className="certifications__card-desc">
              {t('certifications.globalgapDesc')}
            </p>
            <div className="certifications__actions">
              <button
                type="button"
                className="certifications__view-btn"
                onClick={() => openLightbox('globalgap')}
              >
                <Maximize2 size={16} />
                {t('buttons.viewCredential')}
              </button>
              <a
                href="https://globalgap.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="certifications__ext-link"
              >
                <span>globalgap.org</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Card 2 — Oromia Seed Certificate */}
          <div className="certifications__card">
            <div className="certifications__thumb-wrap">
              <button
                type="button"
                className="certifications__thumb-btn"
                onClick={() => openLightbox('oromia')}
                aria-label={t('certifications.oromiaAriaLabel', 'View Oromia seed producer certificate document at full size')}
              >
                <img
                  src={oromiaCert}
                  alt={t('certifications.oromiaAlt', 'Oromia Bureau of Agriculture Competence Assurance Certificate for Meki Batu Union, certified seed producer license')}
                  className="certifications__thumb-img certifications__thumb-img--doc"
                />
                <span className="certifications__zoom">
                  <ZoomIn size={20} />
                  {t('certifications.expandDoc')}
                </span>
              </button>
            </div>
            <h3 className="certifications__card-title">
              {t('certifications.oromiaTitle')}
            </h3>
            <p className="certifications__card-desc">
              {t('certifications.oromiaDesc')}
            </p>
            <span className="label-caps certifications__meta">
              {t('certifications.oromiaMeta')}
            </span>
            <div className="certifications__actions">
              <button
                type="button"
                className="certifications__view-btn"
                onClick={() => openLightbox('oromia')}
              >
                <Eye size={16} />
                {t('buttons.viewCertificateDoc')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      {activeCert && (
        <div
          className="cert-lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={activeCert.title}
        >
          <div
            className="cert-lightbox__modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cert-lightbox__header">
              <div className="cert-lightbox__header-text">
                <span className="label-caps label-caps--secondary text-xs">
                  {t('certifications.officialCredential')}
                </span>
                <h4 className="cert-lightbox__title">{activeCert.title}</h4>
              </div>
              <button
                type="button"
                className="cert-lightbox__close"
                onClick={closeLightbox}
                ref={closeBtnRef}
                aria-label={t('certifications.closeViewer')}
              >
                <X size={20} />
              </button>
            </div>

            <div className="cert-lightbox__body">
              <img
                src={activeCert.src}
                alt={activeCert.alt}
                className="cert-lightbox__img"
              />
            </div>

            <div className="cert-lightbox__footer">
              <p className="cert-lightbox__caption">{activeCert.caption}</p>
              {activeCert.url && (
                <a
                  href={activeCert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-lightbox__ext-link"
                >
                  <span>
                    {t('certifications.visit')}{' '}
                    {activeCert.url.replace('https://', '').replace('/', '')}
                  </span>
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Certifications
