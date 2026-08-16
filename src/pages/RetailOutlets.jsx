import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import retailHeroImg from '../assets/images/retailHero.webp'
import { outlets } from '../data/outlets.js'
import './InnerPage.css'
import './RetailOutlets.css'

const stagger = (i) => Math.min(i * 90, 450)

function RetailOutlets() {
  const [selectedOutletId, setSelectedOutletId] = useState(outlets[0].id)
  const [activeModalOutlet, setActiveModalOutlet] = useState(null)

  const activeOutlet = outlets.find((o) => o.id === selectedOutletId) || outlets[0]

  return (
    <>
      <Helmet>
        <title>Retail Outlets | Meki Batu Union</title>
        <meta
          name="description"
          content="Locate Meki Batu Union's five official retail storefronts across Addis Ababa supplying fresh, farm-direct produce to urban consumers."
        />
      </Helmet>
      {/* ---- Hero Section ---- */}
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Retail Outlets' }]}
        title="Direct from Our Farms to You."
        description="Meki Batu Union operates five dedicated retail outlets across Addis Ababa, ensuring urban consumers have direct access to the freshest, sustainably grown produce from our cooperative farmers."
        actions={
          <>
            <a href="#locations" className="btn btn--primary">
              View Locations <span className="material-symbols-outlined text-sm">arrow_downward</span>
            </a>
            <Link to="/contact" className="btn btn--outline">
              Contact Retail Sales <span className="material-symbols-outlined text-sm">mail</span>
            </Link>
          </>
        }
        image={retailHeroImg}
        imageAlt="Pristine fresh produce display in a modern retail setting"
        badge="5 Addis Ababa Locations"
      />

      <SectionDivider />

      {/* ---- Locations List & Map Section ---- */}
      <section className="outlets-locations section section--alt" id="locations">
        <div className="container">
          <div className="outlets-locations__header">
            <h2 className="outlets-locations__title">Find an Outlet</h2>
            <p className="outlets-locations__desc">
              Tap any location below to view branch details, manager contacts, and exact Google Maps navigation.
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
                      View Details &amp; Map <span className="material-symbols-outlined text-sm">arrow_forward</span>
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
                  title={`Map showing ${activeOutlet.name}`}
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
                    Open in Google Maps
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
              type="button"
              className="outlet-modal-close"
              onClick={() => setActiveModalOutlet(null)}
              aria-label="Close detail modal"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="outlet-modal-header">
              <div className="outlet-modal-tags">
                <span className="outlet-status-badge">
                  <span className="material-symbols-outlined text-xs">check_circle</span>
                  {activeModalOutlet.status}
                </span>
                <span className="label-caps label-caps--secondary text-xs">{activeModalOutlet.subcity}</span>
              </div>
              <h2 className="outlet-modal-title">{activeModalOutlet.name}</h2>
            </div>

            <div className="outlet-modal-grid">
              <div className="outlet-modal-info-list">
                <div className="outlet-modal-info-item">
                  <span className="material-symbols-outlined">location_on</span>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '2px' }}>Address</strong>
                    <span>{activeModalOutlet.address}</span>
                  </div>
                </div>

                <div className="outlet-modal-info-item">
                  <span className="material-symbols-outlined">schedule</span>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '2px' }}>Operating Hours</strong>
                    <span>{activeModalOutlet.hours}</span>
                  </div>
                </div>

                <div className="outlet-modal-info-item">
                  <span className="material-symbols-outlined">person</span>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '2px' }}>Branch Manager</strong>
                    <span>{activeModalOutlet.manager}</span>
                  </div>
                </div>

                <div className="outlet-modal-info-item">
                  <span className="material-symbols-outlined">call</span>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '2px' }}>Direct Line</strong>
                    <a href={`tel:${activeModalOutlet.phone}`} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                      {activeModalOutlet.phone}
                    </a>
                  </div>
                </div>

                <div style={{ marginTop: '8px' }}>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                    Primary Produce Specialties
                  </strong>
                  <div className="outlet-specialties-list">
                    {activeModalOutlet.specialties.map((spec) => (
                      <span key={spec} className="outlet-specialty-chip">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="outlet-modal-map-wrap">
                <iframe
                  title={`Location map for ${activeModalOutlet.name}`}
                  src={activeModalOutlet.embedUrl}
                  className="outlet-modal-map-iframe"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="outlet-modal-actions">
              <a
                href={activeModalOutlet.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gmaps-cool-btn"
              >
                <span className="material-symbols-outlined">near_me</span>
                Navigate on Google Maps
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>

              <a
                href={`tel:${activeModalOutlet.phone}`}
                className="btn btn--outline"
              >
                <span className="material-symbols-outlined text-sm">call</span>
                Call Manager
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RetailOutlets
