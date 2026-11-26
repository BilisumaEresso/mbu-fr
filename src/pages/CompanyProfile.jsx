import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Download, FileText, ExternalLink, Maximize2, X } from 'lucide-react'
import SEO from '../components/common/SEO.jsx'
import Reveal from '../components/common/Reveal.jsx'
import './CompanyProfile.css'

export default function CompanyProfile() {
  const { t } = useTranslation(['companyProfile', 'common'])
  const { lang } = useParams()
  const isOm = lang === 'om'

  const pdfSrc = isOm
    ? '/downloads/MekiBatuUnion_CompanyProfile_OM.pdf'
    : '/downloads/MekiBatuUnion_CompanyProfile.pdf'
  const downloadName = isOm
    ? 'MekiBatuUnion_CompanyProfile_OM.pdf'
    : 'MekiBatuUnion_CompanyProfile.pdf'

  const [fullscreen, setFullscreen] = useState(false)
  const iframeRef = useRef(null)

  // Escape key exits fullscreen
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setFullscreen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Lock scroll when fullscreen
  useEffect(() => {
    document.body.style.overflow = fullscreen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [fullscreen])

  return (
    <>
      <SEO
        title={t('companyProfile:meta.title')}
        description={t('companyProfile:meta.desc')}
      />

      {/* ── Page Hero ── */}
      <section className="cp-hero section section--alt">
        <div className="container">
          <Reveal>
            <div className="cp-hero__inner">
              <div className="cp-hero__icon">
                <FileText size={32} />
              </div>
              <div className="cp-hero__text">
                <span className="label-caps label-caps--secondary mb-2 block">
                  {t('companyProfile:eyebrow')}
                </span>
                <h1 className="cp-hero__title">{t('companyProfile:title')}</h1>
                <p className="cp-hero__desc">{t('companyProfile:desc')}</p>
              </div>
              <div className="cp-hero__actions">
                <a
                  href={pdfSrc}
                  download={downloadName}
                  className="btn btn--primary"
                  aria-label={t('companyProfile:downloadAria')}
                >
                  <Download size={16} />
                  {t('common:buttons.downloadPdf')}
                </a>
                <a
                  href={pdfSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline"
                >
                  <ExternalLink size={16} />
                  {t('companyProfile:openTab')}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PDF Viewer ── */}
      <section className="cp-viewer section">
        <div className="container">
          <Reveal>
            <div className="cp-viewer__toolbar">
              <span className="cp-viewer__label">
                <FileText size={14} />
                {isOm ? t('companyProfile:viewingOm') : t('companyProfile:viewingEn')}
              </span>
              <div className="cp-viewer__controls">
                <a
                  href={pdfSrc}
                  download={downloadName}
                  className="cp-viewer__btn"
                  title={t('common:buttons.downloadPdf')}
                >
                  <Download size={16} />
                </a>
                <a
                  href={pdfSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cp-viewer__btn"
                  title={t('companyProfile:openTab')}
                >
                  <ExternalLink size={16} />
                </a>
                <button
                  className="cp-viewer__btn"
                  title={fullscreen ? t('companyProfile:exitFullscreen') : t('companyProfile:fullscreen')}
                  onClick={() => setFullscreen(!fullscreen)}
                  aria-pressed={fullscreen}
                >
                  {fullscreen ? <X size={16} /> : <Maximize2 size={16} />}
                </button>
              </div>
            </div>

            <div className={`cp-viewer__frame-wrap${fullscreen ? ' cp-viewer__frame-wrap--fullscreen' : ''}`}>
              {fullscreen && (
                <button
                  className="cp-viewer__close-fs"
                  onClick={() => setFullscreen(false)}
                  aria-label={t('companyProfile:exitFullscreen')}
                >
                  <X size={20} />
                </button>
              )}
              <iframe
                ref={iframeRef}
                src={`${pdfSrc}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
                title={t('companyProfile:iframeTitle')}
                className="cp-viewer__iframe"
                aria-label={t('companyProfile:iframeTitle')}
              />
            </div>

            {/* Fallback for browsers that don't render PDFs in iframe */}
            <p className="cp-viewer__fallback">
              {t('companyProfile:fallback')}{' '}
              <a href={pdfSrc} download={downloadName} className="link">
                {t('common:buttons.downloadPdf')}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
