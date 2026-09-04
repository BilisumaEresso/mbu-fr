import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/common/SEO.jsx'
import { useTranslation } from 'react-i18next'
import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import retailHeroImg from '../assets/images/heroes/retailHero.webp'
import retailHero480 from '../assets/images/heroes/RetailHero-480w.webp'
import retailHero800 from '../assets/images/heroes/RetailHero-800w.webp'
import { outlets } from '../data/outlets.js'
import { getLocalePath } from '../utils/locale.js'
import './InnerPage.css'
import './RetailOutlets.css'

// Cap stagger at 450ms for outlet list items
const stagger = (i) => Math.min(i * 90, 450)

function RetailOutlets() {
  const { t, i18n } = useTranslation(['retailOutlets', 'meta', 'common'])
  const currentLang = i18n.language || 'en'
  const [selectedOutletId, setSelectedOutletId] = useState(outlets[0]?.id || 1)
  const [activeModalOutlet, setActiveModalOutlet] = useState(null)

  const activeOutlet = outlets.find((o) => o.id === selectedOutletId) || outlets[0]

  return (
    <>
      <SEO
        title={t('meta:retailOutlets.title')}
        description={t('meta:retailOutlets.description')}
      />

      {/* ---- Hero Section ---- */}
      <PageHero
        breadcrumbs={[{ label: t('common:breadcrumbs.home'), to: '/' }, { label: t('common:breadcrumbs.retailOutlets') }]}
        title={t('retailOutlets:hero.title')}
        description={t('retailOutlets:hero.desc')}
        actions={
          <>
            <a href="#locations" className="btn btn--primary">
              {t('retailOutlets:hero.viewLocations')} <span className="material-symbols-outlined text-sm">arrow_downward</span>
            </a>
            <Link to={getLocalePath('/contact', currentLang)} className="btn btn--outline">
              {t('retailOutlets:hero.contactSales')} <span className="material-symbols-outlined text-sm">mail</span>
            </Link>
          </>
        }
        image={retailHeroImg}
        imageSrcSet={`${retailHero480} 480w, ${retailHero800} 800w, ${retailHeroImg} 1537w`}
        imageAlt={t('retailOutlets:hero.imageAlt')}
        badge={t('retailOutlets:hero.badge')}
      />

      <SectionDivider />

      {/* ---- Locations List & Map Section ---- */}
      <section className="outlets-locations section section--alt" id="locations">
        <div className="container">
          <div className="outlets-locations__header">
            <h2 className="outlets-locations__title">{t('retailOutlets:locations.title')}</h2>
            <p className="outlets-locations__desc">
              {t('retailOutlets:locations.desc')}
            </p>
          </div>

          <div className="outlets-locations__grid">
            {/* Outlets List Column: wrap each card in Reveal, staggered */}
            <div className="outlets-list-col">
              {outlets.map((outlet, i) => (
                <Reveal
                  key={outlet.id}
                  delay={stagger(i)}
                  className={`outlet-item-card ${selectedOutletId === outlet.id ? 'outlet-item-card--active' : ''}`}
                  onClick={() => {
                    setSelectedOutletId(outlet.id)
                    setActiveModalOutlet(outlet)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelectedOutletId(outlet.id)
                      setActiveModalOutlet(outlet)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={t('retailOutlets:locations.ariaViewDetails', { name: outlet.name })}
                >
                  <div className="outlet-item-card__header">
                    <h3 className="outlet-item-card__title">{outlet.name}</h3>
                    <span className="material-symbols-outlined outlet-item-card__icon">storefront</span>
                  </div>
                  <div className="outlet-item-card__info">
                    <p className="outlet-item-card__address">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {outlet.address}
                    </p>
                    <p className="outlet-item-card__hours">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {outlet.hours}
                    </p>
                  </div>
                  <div className="outlet-item-card__actions">
                    <span className="outlet-action-btn">
                      {t('retailOutlets:locations.viewDetailsMap')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Map Column: wrapped in one Reveal */}
            <Reveal className="outlets-map-col">
              <div className="outlets-map-container">
                <div className="outlets-map-pins-header">
                  {outlets.map((outlet) => (
                    <button
                      key={outlet.id}
                      type="button"
                      className={`outlet-pin-btn ${selectedOutletId === outlet.id ? 'outlet-pin-btn--active' : ''}`}
                      onClick={() => {
                        setSelectedOutletId(outlet.id)
                        setActiveModalOutlet(outlet)
                      }}
                    >
                      <span className="material-symbols-outlined text-sm">pin_drop</span>
                      {outlet.name.replace(' Outlet', '').replace(' Branch', '').replace(' Store', '').replace(' Market', '')}
                    </button>
                  ))}
                </div>
                <iframe
                  title={t('retailOutlets:locations.mapTitle', { name: activeOutlet.name })}
                  src={activeOutlet.embedUrl}
                  className="outlets-map-iframe"
                  loading="lazy"
                  allowFullScreen
                />
                <div className="outlets-map-footer-bar">
                  <div>
                    <strong style={{ display: 'block', fontSize: '14px', color: 'var(--color-primary)' }}>
                      {activeOutlet.name}
                    </strong>
                    <span className="text-xs text-muted">{activeOutlet.subcity}</span>
                  </div>
                  <a
                    href={activeOutlet.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gmaps-cool-btn"
                  >
                    <span className="material-symbols-outlined text-sm">map</span>
                    {t('retailOutlets:locations.openGoogleMaps')}
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Branch Detail Modal ---- */}
      {activeModalOutlet && (
        <div className="outlet-modal-backdrop" onClick={() => setActiveModalOutlet(null)}>
          <div className="outlet-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="outlet-modal-close"
              onClick={() => setActiveModalOutlet(null)}
              aria-label={t('common:buttons.close')}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="outlet-modal-header">
              <span className="outlet-modal-subcity">{activeModalOutlet.subcity}</span>
              <h2 className="outlet-modal-title">{activeModalOutlet.name}</h2>
              <p className="outlet-modal-address">{activeModalOutlet.address}</p>
            </div>
            <div className="outlet-modal-body">
              <div className="outlet-modal-info-row">
                <div className="outlet-modal-info-item">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <div>
                    <strong>{t('retailOutlets:locations.operatingHours')}</strong>
                    <p>{activeModalOutlet.hours}</p>
                  </div>
                </div>
                <div className="outlet-modal-info-item">
                  <span className="material-symbols-outlined text-sm">phone</span>
                  <div>
                    <strong>{t('retailOutlets:locations.directPhone')}</strong>
                    <p>{activeModalOutlet.phone}</p>
                  </div>
                </div>
              </div>

              <div className="outlet-modal-specialties">
                <strong>{t('retailOutlets:locations.produceArrivals')}</strong>
                <div className="outlet-modal-tags">
                  {activeModalOutlet.specialties?.map((spec) => (
                    <span key={spec} className="outlet-modal-tag">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="outlet-modal-map-wrap">
                <iframe
                  title={t('retailOutlets:locations.mapTitle', { name: activeModalOutlet.name })}
                  src={activeModalOutlet.embedUrl}
                  className="outlet-modal-iframe"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              <div className="outlet-modal-actions">
                <a
                  href={activeModalOutlet.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  <span className="material-symbols-outlined text-sm">directions</span>
                  {t('retailOutlets:locations.getDirections')}
                </a>
                <a
                  href={`tel:${activeModalOutlet.phone.replace(/[^0-9+]/g, '')}`}
                  className="btn btn--outline"
                >
                  <span className="material-symbols-outlined text-sm">call</span>
                  {t('retailOutlets:locations.callBranch')}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---- Guaranteed Fresh Produce Section ---- */}
      <section className="outlets-experience section">
        <div className="container">
          <div className="outlets-experience__grid">
            <Reveal className="outlets-experience__content">
              <span className="label-caps label-caps--secondary mb-2 block">{t('retailOutlets:freshProduce.tag')}</span>
              <h2 className="outlets-experience__title">{t('retailOutlets:freshProduce.title')}</h2>
              <p className="outlets-experience__desc">
                {t('retailOutlets:freshProduce.desc')}
              </p>
              <ul className="outlets-perks-list">
                <li className="outlets-perk-item">
                  <span className="material-symbols-outlined outlets-perk-icon">check_circle</span>
                  <div>
                    <strong>{t('retailOutlets:freshProduce.perk1Title')}</strong>
                    <p>{t('retailOutlets:freshProduce.perk1Desc')}</p>
                  </div>
                </li>
                <li className="outlets-perk-item">
                  <span className="material-symbols-outlined outlets-perk-icon">check_circle</span>
                  <div>
                    <strong>{t('retailOutlets:freshProduce.perk2Title')}</strong>
                    <p>{t('retailOutlets:freshProduce.perk2Desc')}</p>
                  </div>
                </li>
                <li className="outlets-perk-item">
                  <span className="material-symbols-outlined outlets-perk-icon">check_circle</span>
                  <div>
                    <strong>{t('retailOutlets:freshProduce.perk3Title')}</strong>
                    <p>{t('retailOutlets:freshProduce.perk3Desc')}</p>
                  </div>
                </li>
              </ul>
            </Reveal>

            <Reveal className="outlets-experience__media" delay={90}>
              <img
                src={retailHeroImg}
                srcSet={`${retailHero480} 480w, ${retailHero800} 800w, ${retailHeroImg} 1537w`}
                sizes="(max-width: 768px) 100vw, 500px"
                alt={t('retailOutlets:freshProduce.imageAlt')}
                className="outlets-experience__img"
                loading="lazy"
                decoding="async"
              />
              <div className="outlets-experience__badge">
                <span className="material-symbols-outlined">local_shipping</span>
                <span>{t('retailOutlets:freshProduce.dailyDispatchBadge')}</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- CTA Banner ---- */}
      <section className="outlets-cta section section--alt">
        <div className="container">
          <Reveal className="outlets-cta__card">
            <div className="outlets-cta__info">
              <h2 className="outlets-cta__title">{t('retailOutlets:cta.title')}</h2>
              <p className="outlets-cta__desc">
                {t('retailOutlets:cta.desc')}
              </p>
            </div>
            <Link to={getLocalePath('/contact', currentLang)} className="btn btn--primary">
              {t('retailOutlets:cta.button')}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default RetailOutlets
