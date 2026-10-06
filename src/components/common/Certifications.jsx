import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  ExternalLink,
  Eye,
  X,
  Maximize2,
  Calendar,
  Building2,
  FileText,
  BadgeCheck,
  Sparkles,
  Lock,
  Search,
  Check,
  Copy
} from 'lucide-react'
import globalgapDoc from '../../assets/certifications/globalgap_certificate_doc.webp'
import globalgapLogo from '../../assets/certifications/globalgap_logo.webp'
import oromiaCert from '../../assets/certifications/oromia_seed_certificate.webp'
import './Certifications.css'

function Certifications({ layout = 'auto' }) {
  const { t } = useTranslation('common')
  const [activeCert, setActiveCert] = useState(null)
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'globalgap' | 'oromia'
  const [copiedGgn, setCopiedGgn] = useState(false)
  const closeBtnRef = useRef(null)
  const triggerRef = useRef(null)

  const certData = {
    globalgap: {
      id: 'globalgap',
      standard: 'GLOBALG.A.P. IFA v6.0 SMART',
      title: 'GLOBALG.A.P. Certified',
      subtitle: 'Integrated Farm Assurance (IFA) SMART Plants — Fruit & Vegetables',
      scopeCategory: 'International Export Standard',
      option: 'Option 2 (Producer Group)',
      status: 'Active & Validated',
      statusType: 'active',
      validityPeriod: '18.08.2026 – 17.08.2027',
      certificateNumber: '222081',
      ggn: '4056186928382',
      auditor: 'Control Union Certifications B.V. (Netherlands)',
      accreditationCode: 'RvA C 412',
      producerName: 'Meki Batu Fruits and Vegetables Producers Cooperatives Union (MBFVPCU)',
      src: globalgapDoc,
      logo: globalgapLogo,
      verifyUrl: 'https://www.globalgap.org/validate',
      desc: 'Accredited under GLOBALG.A.P. General Regulations v6.0 for world-class food safety, zero-tolerance chemical residue controls, and end-to-end supply chain traceability across our 153 member primary cooperatives.',
      highlights: [
        {
          icon: ShieldCheck,
          title: 'Food Safety & Hygiene',
          text: 'Rigorous microbiological & chemical residue testing meeting European supermarket standards.'
        },
        {
          icon: BadgeCheck,
          title: 'Batch Traceability',
          text: 'Farm-gate batch identification to final export flight across 50,000+ tonnes of annual harvest.'
        },
        {
          icon: Sparkles,
          title: 'Rift Valley Stewardship',
          text: 'Sustainable water, soil conservation, and biodiversity management in the Lake Ziway basin.'
        }
      ]
    },
    oromia: {
      id: 'oromia',
      standard: 'Seed Proclamation No. 782/2013',
      title: 'Certified Seed Producer License',
      subtitle: 'Competence Assurance Certificate — Oromia Bureau of Agriculture',
      scopeCategory: 'National Agricultural Mandate',
      option: 'License Reg. No. 72',
      status: 'State Licensed',
      statusType: 'licensed',
      validityPeriod: 'Issued 14/01/2019 (Official State License)',
      certificateNumber: 'Reg. No. 72',
      ggn: 'Reg. No. 72',
      auditor: 'Oromia Bureau of Agriculture & Natural Resource (OBANR)',
      accreditationCode: 'Gov. of Oromia',
      producerName: 'Meki Batu Fruit & Vegetable Growers Cooperative Union Ltd.',
      src: oromiaCert,
      verifyUrl: null,
      desc: 'Officially licensed under Ethiopia’s national Seed Proclamation No. 782/2013 to multiply, process, and distribute certified quality seeds of cereal, pulses, vegetables, and fruit crops to 8,410+ smallholder farmers.',
      highlights: [
        {
          icon: Award,
          title: 'Breeder Adaptation Trials',
          text: 'Direct research partnerships with Melkasa (EIAR) & Adami Tulu (OARI) agricultural research centers.'
        },
        {
          icon: CheckCircle2,
          title: '98%+ Physical Purity',
          text: 'Laboratory tested for high germination rates, disease resistance, and true-to-type genetics.'
        },
        {
          icon: Building2,
          title: 'Farmer Seed Sovereignty',
          text: 'Securing affordable, climate-resilient hybrid and open-pollinated seed supplies for rural communities.'
        }
      ]
    }
  }

  const handleCopyGgn = (e) => {
    e.stopPropagation()
    navigator.clipboard?.writeText('4056186928382')
    setCopiedGgn(true)
    setTimeout(() => setCopiedGgn(false), 2500)
  }

  const openLightbox = (certKey) => {
    triggerRef.current = document.activeElement
    setActiveCert(certData[certKey] || certData.globalgap)
  }

  const closeLightbox = useCallback(() => {
    setActiveCert(null)
  }, [])

  /* Lightbox accessibility: Esc key, Tab trap, body scroll lock */
  useEffect(() => {
    if (!activeCert) {
      triggerRef.current?.focus()
      return
    }

    closeBtnRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox()
      } else if (e.key === 'Tab') {
        e.preventDefault()
        closeBtnRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeCert, closeLightbox])

  return (
    <section className={`cert-pavilion cert-pavilion--layout-${layout}`} aria-label="Official Certifications and Compliance">
      {/* ── 1. Top Trust & Verification Command Bar ── */}
      <div className="cert-pavilion__deck">
        <div className="cert-pavilion__deck-left">
          <div className="cert-pavilion__shield-badge">
            <ShieldCheck size={20} className="cert-pavilion__shield-icon" />
            <span className="cert-pavilion__shield-text">Official Audited Accreditations</span>
          </div>
          <div className="cert-pavilion__deck-summary">
            <span className="cert-pavilion__ggn-pill" onClick={handleCopyGgn} title="Click to copy GGN">
              <span className="cert-pavilion__ggn-label">GLOBALG.A.P. GGN:</span>
              <strong className="cert-pavilion__ggn-code">4056186928382</strong>
              {copiedGgn ? (
                <span className="cert-pavilion__copy-state cert-pavilion__copy-state--done">
                  <Check size={12} /> Copied
                </span>
              ) : (
                <span className="cert-pavilion__copy-state">
                  <Copy size={12} />
                </span>
              )}
            </span>
            <span className="cert-pavilion__status-pulse">
              <span className="cert-pavilion__pulse-dot" />
              Active · Valid 2026–2027
            </span>
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="cert-pavilion__tabs" role="tablist" aria-label="Filter Certifications">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'all'}
            className={`cert-pavilion__tab-btn ${activeTab === 'all' ? 'cert-pavilion__tab-btn--active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Credentials (2)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'globalgap'}
            className={`cert-pavilion__tab-btn ${activeTab === 'globalgap' ? 'cert-pavilion__tab-btn--active' : ''}`}
            onClick={() => setActiveTab('globalgap')}
          >
            GLOBALG.A.P. (Export)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'oromia'}
            className={`cert-pavilion__tab-btn ${activeTab === 'oromia' ? 'cert-pavilion__tab-btn--active' : ''}`}
            onClick={() => setActiveTab('oromia')}
          >
            Seed Producer (State)
          </button>
        </div>
      </div>

      {/* ── 2. Primary Showcase Stage: Dual Credential Cards ── */}
      <div className="cert-pavilion__stage">
        {/* ─── CARD 1: GLOBALG.A.P. INTERNATIONAL PASSPORT ─── */}
        {(activeTab === 'all' || activeTab === 'globalgap') && (
          <article className="cert-card cert-card--globalgap" aria-labelledby="cert-card-title-globalgap">
            {/* Visual Document Showcase Box (Left/Top) */}
            <div className="cert-card__media-box">
              <button
                type="button"
                className="cert-card__doc-stage"
                onClick={() => openLightbox('globalgap')}
                aria-label="Inspect official GLOBALG.A.P. certificate in high resolution"
              >
                <div className="cert-card__doc-halo" />
                <img
                  src={globalgapDoc}
                  alt="Official GLOBALG.A.P. Certificate issued to Meki Batu Fruits and Vegetables Producers Cooperatives Union"
                  className="cert-card__doc-img"
                  loading="lazy"
                />
                
                {/* Floating Status Pill */}
                <div className="cert-card__badge-floating cert-card__badge-floating--active">
                  <span className="cert-card__live-indicator" />
                  <span>Valid &amp; Audited · 2026–2027</span>
                </div>

                {/* Inspect Overlay Trigger */}
                <div className="cert-card__inspect-glass">
                  <div className="cert-card__inspect-pill">
                    <Maximize2 size={16} />
                    <span>Click to Inspect High-Res</span>
                  </div>
                </div>
              </button>

              {/* Bottom Quick-Verify Strip */}
              <div className="cert-card__quick-bar">
                <a
                  href={certData.globalgap.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-card__verify-link"
                  title="Verify GGN 4056186928382 on the official GLOBALG.A.P. database"
                >
                  <Search size={14} />
                  <span>Verify on globalgap.org database</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Credential Content & Assurances (Right/Bottom) */}
            <div className="cert-card__content">
              <div className="cert-card__meta-header">
                <div className="cert-card__identity-row">
                  <span className="cert-card__tier-pill cert-card__tier-pill--emerald">
                    {certData.globalgap.scopeCategory}
                  </span>
                  <span className="cert-card__code-chip">
                    GGN: {certData.globalgap.ggn}
                  </span>
                </div>
                {certData.globalgap.logo && (
                  <img
                    src={certData.globalgap.logo}
                    alt="GLOBALG.A.P. Logo"
                    className="cert-card__brand-logo"
                  />
                )}
              </div>

              <h3 id="cert-card-title-globalgap" className="cert-card__title">
                {certData.globalgap.title}
              </h3>
              <p className="cert-card__standard-name">
                {certData.globalgap.subtitle}
              </p>
              <p className="cert-card__narrative">
                {certData.globalgap.desc}
              </p>

              {/* Audit Specs Grid */}
              <div className="cert-card__spec-matrix">
                <div className="cert-card__spec-cell">
                  <span className="cert-card__spec-label">
                    <Building2 size={13} />
                    <span>Audit Body</span>
                  </span>
                  <strong className="cert-card__spec-val">
                    Control Union (RvA C 412)
                  </strong>
                </div>
                <div className="cert-card__spec-cell">
                  <span className="cert-card__spec-label">
                    <FileText size={13} />
                    <span>Certificate No.</span>
                  </span>
                  <strong className="cert-card__spec-val">
                    {certData.globalgap.certificateNumber}
                  </strong>
                </div>
                <div className="cert-card__spec-cell">
                  <span className="cert-card__spec-label">
                    <Calendar size={13} />
                    <span>Validity Period</span>
                  </span>
                  <strong className="cert-card__spec-val cert-card__spec-val--highlight">
                    {certData.globalgap.validityPeriod}
                  </strong>
                </div>
              </div>

              {/* Assurances Matrix */}
              <div className="cert-card__assurances">
                <span className="cert-card__assurances-eyebrow">Export Buyer Guarantees:</span>
                <div className="cert-card__assurance-pills">
                  {certData.globalgap.highlights.map((item, idx) => {
                    const IconComp = item.icon
                    return (
                      <div key={idx} className="cert-card__assurance-item">
                        <div className="cert-card__assurance-icon">
                          <IconComp size={16} />
                        </div>
                        <div className="cert-card__assurance-text">
                          <strong>{item.title}</strong>
                          <p>{item.text}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="cert-card__actions">
                <button
                  type="button"
                  className="btn btn--primary btn--sm cert-card__action-btn"
                  onClick={() => openLightbox('globalgap')}
                >
                  <Eye size={16} />
                  <span>Inspect Full Document</span>
                </button>
                <a
                  href={certData.globalgap.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline btn--sm cert-card__action-btn"
                >
                  <span>Validate Online</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </article>
        )}

        {/* ─── CARD 2: OROMIA SEED PRODUCER MANDATE ─── */}
        {(activeTab === 'all' || activeTab === 'oromia') && (
          <article className="cert-card cert-card--oromia" aria-labelledby="cert-card-title-oromia">
            {/* Visual Document Showcase Box (Left/Top) */}
            <div className="cert-card__media-box">
              <button
                type="button"
                className="cert-card__doc-stage"
                onClick={() => openLightbox('oromia')}
                aria-label="Inspect official Oromia Bureau of Agriculture seed producer license in high resolution"
              >
                <div className="cert-card__doc-halo cert-card__doc-halo--gold" />
                <img
                  src={oromiaCert}
                  alt="Oromia Bureau of Agriculture Competence Assurance Certificate for Meki Batu Union, certified seed producer license"
                  className="cert-card__doc-img"
                  loading="lazy"
                />

                {/* Floating Status Pill */}
                <div className="cert-card__badge-floating cert-card__badge-floating--licensed">
                  <Award size={13} className="inline mr-1" />
                  <span>State Licensed Seed Producer</span>
                </div>

                {/* Inspect Overlay Trigger */}
                <div className="cert-card__inspect-glass">
                  <div className="cert-card__inspect-pill">
                    <Maximize2 size={16} />
                    <span>Click to Inspect High-Res</span>
                  </div>
                </div>
              </button>

              {/* Bottom Authority Seal Strip */}
              <div className="cert-card__quick-bar cert-card__quick-bar--state">
                <span className="cert-card__authority-stamp">
                  <Building2 size={14} />
                  <span>Oromia Bureau of Agriculture &amp; Natural Resource</span>
                </span>
              </div>
            </div>

            {/* Credential Content & Assurances (Right/Bottom) */}
            <div className="cert-card__content">
              <div className="cert-card__meta-header">
                <div className="cert-card__identity-row">
                  <span className="cert-card__tier-pill cert-card__tier-pill--gold">
                    {certData.oromia.scopeCategory}
                  </span>
                  <span className="cert-card__code-chip">
                    {certData.oromia.certificateNumber}
                  </span>
                </div>
                <div className="cert-card__gov-seal">
                  <Award size={20} className="text-amber-600" />
                  <span>State Certified</span>
                </div>
              </div>

              <h3 id="cert-card-title-oromia" className="cert-card__title">
                {certData.oromia.title}
              </h3>
              <p className="cert-card__standard-name">
                {certData.oromia.subtitle}
              </p>
              <p className="cert-card__narrative">
                {certData.oromia.desc}
              </p>

              {/* Audit Specs Grid */}
              <div className="cert-card__spec-matrix">
                <div className="cert-card__spec-cell">
                  <span className="cert-card__spec-label">
                    <Building2 size={13} />
                    <span>Issuing Authority</span>
                  </span>
                  <strong className="cert-card__spec-val">
                    OBANR (Regional State of Oromia)
                  </strong>
                </div>
                <div className="cert-card__spec-cell">
                  <span className="cert-card__spec-label">
                    <FileText size={13} />
                    <span>Legal Statute</span>
                  </span>
                  <strong className="cert-card__spec-val">
                    Seed Proclamation No. 782/2013
                  </strong>
                </div>
                <div className="cert-card__spec-cell">
                  <span className="cert-card__spec-label">
                    <Calendar size={13} />
                    <span>Issuance Date</span>
                  </span>
                  <strong className="cert-card__spec-val cert-card__spec-val--highlight">
                    14/01/2019 (Official Mandate)
                  </strong>
                </div>
              </div>

              {/* Assurances Matrix */}
              <div className="cert-card__assurances">
                <span className="cert-card__assurances-eyebrow">National Agronomic Capabilities:</span>
                <div className="cert-card__assurance-pills">
                  {certData.oromia.highlights.map((item, idx) => {
                    const IconComp = item.icon
                    return (
                      <div key={idx} className="cert-card__assurance-item cert-card__assurance-item--gold">
                        <div className="cert-card__assurance-icon">
                          <IconComp size={16} />
                        </div>
                        <div className="cert-card__assurance-text">
                          <strong>{item.title}</strong>
                          <p>{item.text}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="cert-card__actions">
                <button
                  type="button"
                  className="btn btn--primary btn--sm cert-card__action-btn"
                  onClick={() => openLightbox('oromia')}
                >
                  <Eye size={16} />
                  <span>Inspect Full Document</span>
                </button>
                <div className="cert-card__legal-footnote">
                  <Lock size={13} />
                  <span>Authorized under Seed Proclamation No. 782/2013</span>
                </div>
              </div>
            </div>
          </article>
        )}
      </div>

      {/* ── 3. High-Fidelity Lightbox Document Modal ── */}
      {activeCert && (
        <div
          className="cert-modal-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={activeCert.title}
        >
          <div
            className="cert-modal-window"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <header className="cert-modal-header">
              <div className="cert-modal-header__info">
                <div className="cert-modal-header__tag-row">
                  <span className="cert-modal-tag cert-modal-tag--emerald">
                    {activeCert.scopeCategory}
                  </span>
                  <span className="cert-modal-tag cert-modal-tag--code">
                    {activeCert.certificateNumber}
                  </span>
                </div>
                <h3 className="cert-modal-title">{activeCert.title}</h3>
                <p className="cert-modal-subtitle">
                  {activeCert.auditor} &bull; {activeCert.validityPeriod}
                </p>
              </div>

              <button
                type="button"
                className="cert-modal-close"
                onClick={closeLightbox}
                ref={closeBtnRef}
                aria-label="Close document inspector"
              >
                <X size={20} />
              </button>
            </header>

            {/* Modal Document Frame */}
            <div className="cert-modal-viewport">
              <div className="cert-modal-scroll">
                <img
                  src={activeCert.src}
                  alt={activeCert.title}
                  className="cert-modal-document"
                />
              </div>
            </div>

            {/* Modal Footer Controls */}
            <footer className="cert-modal-footer">
              <div className="cert-modal-footer__text">
                <span className="cert-modal-footer__issued">
                  <strong>Issued to:</strong> {activeCert.producerName}
                </span>
                <span className="cert-modal-footer__date">
                  <strong>Standard:</strong> {activeCert.standard}
                </span>
              </div>

              <div className="cert-modal-footer__buttons">
                {activeCert.verifyUrl && (
                  <a
                    href={activeCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary btn--sm cert-modal-btn"
                  >
                    <span>Verify Live on globalgap.org</span>
                    <ExternalLink size={14} />
                  </a>
                )}
                <button
                  type="button"
                  className="btn btn--outline btn--sm cert-modal-btn"
                  onClick={closeLightbox}
                >
                  Close Document
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </section>
  )
}

export default Certifications
