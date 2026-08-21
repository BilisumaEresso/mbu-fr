import { useState, useEffect, useRef, useCallback } from 'react'
import globalgapLogo from '../../assets/certifications/globalgap_logo.webp'
import oromiaCert from '../../assets/certifications/oromia_seed_certificate.webp'
import './Certifications.css'

const CERT_DATA = {
  globalgap: {
    id: 'globalgap',
    title: 'GlobalG.A.P Certified',
    src: globalgapLogo,
    alt: 'GlobalG.A.P Certification Logo and Badge',
    caption: "Official GlobalG.A.P Certification for safe, traceable, and sustainable farming practice — with more than 400 member households certified under the union's certification scheme.",
    url: 'https://globalgap.org/',
    urlLabel: 'Learn about GlobalG.A.P',
  },
  oromia: {
    id: 'oromia',
    title: 'Oromia Bureau of Agriculture & Natural Resource — Competence Assurance Certificate',
    src: oromiaCert,
    alt: 'Oromia Bureau of Agriculture Competence Assurance Certificate for Meki Batu Union, certified seed producer license',
    caption: "Certified Seed Producer License Reg. No. 72 under Ethiopia's Seed Proclamation No. 782/2013.",
  },
}

function Certifications() {
  const [activeCert, setActiveCert] = useState(null)
  const closeBtnRef = useRef(null)
  const triggerRef = useRef(null)

  const openLightbox = (certKey) => {
    triggerRef.current = document.activeElement
    setActiveCert(CERT_DATA[certKey] || CERT_DATA.oromia)
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
                aria-label="View GlobalG.A.P certificate logo at full size"
              >
                <img
                  src={globalgapLogo}
                  alt="GlobalG.A.P logo"
                  className="certifications__thumb-img certifications__thumb-img--logo"
                />
                <span className="certifications__zoom">
                  <span className="material-symbols-outlined">zoom_in</span>
                  Expand
                </span>
              </button>
            </div>
            <h3 className="certifications__card-title">GlobalG.A.P Certified</h3>
            <p className="certifications__card-desc">
              Meeting international standards for food safety, traceability, and
              responsible farming practice. More than 400 member households are GlobalG.A.P certified under the union&rsquo;s certification scheme.
            </p>
            <div className="certifications__actions">
              <button
                type="button"
                className="certifications__view-btn"
                onClick={() => openLightbox('globalgap')}
              >
                <span className="material-symbols-outlined text-sm">fullscreen</span>
                View credential
              </button>
              <a
                href="https://globalgap.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="certifications__ext-link"
              >
                <span>globalgap.org</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
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
                aria-label="View Oromia seed producer certificate document at full size"
              >
                <img
                  src={oromiaCert}
                  alt="Oromia Bureau of Agriculture Competence Assurance Certificate for Meki Batu Union, certified seed producer license"
                  className="certifications__thumb-img certifications__thumb-img--doc"
                />
                <span className="certifications__zoom">
                  <span className="material-symbols-outlined">zoom_in</span>
                  Expand Document
                </span>
              </button>
            </div>
            <h3 className="certifications__card-title">
              Certified Seed Producer — Oromia Bureau of Agriculture &amp;
              Natural Resource
            </h3>
            <p className="certifications__card-desc">
              Authorized under Ethiopia&rsquo;s Seed Proclamation No. 782/2013
              to produce certified seeds of cereal, pulses, vegetables, and
              fruit crops. License Reg. No. 72, issued to Meki Batu Fruit &amp;
              Vegetable Growers Cooperative Union.
            </p>
            <span className="label-caps certifications__meta">
              Issued 14/01/2019 &middot; Oromia Bureau of Agriculture &amp;
              Natural Resource
            </span>
            <div className="certifications__actions">
              <button
                type="button"
                className="certifications__view-btn"
                onClick={() => openLightbox('oromia')}
              >
                <span className="material-symbols-outlined text-sm">visibility</span>
                View certificate document
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
                <span className="label-caps label-caps--secondary text-xs">Official Credential</span>
                <h4 className="cert-lightbox__title">{activeCert.title}</h4>
              </div>
              <button
                type="button"
                className="cert-lightbox__close"
                onClick={closeLightbox}
                ref={closeBtnRef}
                aria-label="Close certificate viewer"
              >
                <span className="material-symbols-outlined">close</span>
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
                  <span>Visit {activeCert.url.replace('https://', '').replace('/', '')}</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
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
