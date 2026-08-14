import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import retailHeroImg from '../assets/images/retailHero.png'
import './InnerPage.css'

const OUTLETS_DATA = [
  {
    id: 'bole',
    name: 'Bole Branch',
    subcity: 'Bole Subcity',
    address: 'Around Edna Mall, next to Zefmesh Grand Mall, Addis Ababa',
    hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
    phone: '+251 11 661 2345',
    manager: 'Ato Tadesse Bekele',
    status: 'Open Now',
    specialties: ['Export Grade Tomatoes', 'Fresh Papaya', 'Green Peppers'],
    coords: { lat: 9.0012, lng: 38.7865 },
    googleMapsUrl: 'https://maps.app.goo.gl/E6j3C6A2hiBBfs5Z7',
    embedUrl: 'https://maps.google.com/maps?q=9.0012,38.7865&z=15&output=embed',
  },
  {
    id: 'piassa',
    name: 'Piassa Outlet',
    subcity: 'Arada Subcity',
    address: 'Mahmoud Music Shop building ground floor, Piassa, Addis Ababa',
    hours: 'Mon - Sat: 8:00 AM - 5:30 PM',
    phone: '+251 11 155 4321',
    manager: 'W/ro Aster Worku',
    status: 'Open Now',
    specialties: ['Red Onions', 'Highland Potatoes', 'Seasonal Fruits'],
    coords: { lat: 9.0345, lng: 38.7523 },
    googleMapsUrl: 'https://maps.app.goo.gl/6DRdH4qAT2KdVJNG6',
    embedUrl: 'https://maps.google.com/maps?q=9.0345,38.7523&z=15&output=embed',
  },
  {
    id: 'sarbet',
    name: 'Sarbet Market',
    subcity: 'Kirkos / Nifas Silk',
    address: 'Karls Square, near Oromia Offices, Sarbet, Addis Ababa',
    hours: 'Mon - Sun: 7:00 AM - 7:00 PM',
    phone: '+251 11 371 8901',
    manager: 'Ato Dawit Alemu',
    status: 'Open Now',
    specialties: ['Organic Vegetables', 'Certified Hybrid Seeds', 'Fresh Tomatoes'],
    coords: { lat: 9.0005, lng: 38.7341 },
    googleMapsUrl: 'https://maps.app.goo.gl/6PMh2XeM6qKUZNwf9',
    embedUrl: 'https://maps.google.com/maps?q=9.0005,38.7341&z=15&output=embed',
  },
  {
    id: 'kera',
    name: 'Kera Branch',
    subcity: 'Nifas Silk-Lafto',
    address: 'Near Kera Slaughterhouse main road, Addis Ababa',
    hours: 'Mon - Sat: 6:00 AM - 4:00 PM',
    phone: '+251 11 465 7890',
    manager: 'Ato Solomon Kebede',
    status: 'Open Now',
    specialties: ['Bulk Produce', 'Red Onions', 'Green Beans'],
    coords: { lat: 8.9856, lng: 38.7490 },
    googleMapsUrl: 'https://maps.app.goo.gl/CLCpLhDtwM5Ta4xE8',
    embedUrl: 'https://maps.google.com/maps?q=8.9856,38.7490&z=15&output=embed',
  },
  {
    id: 'megenagna',
    name: 'Megenagna Store',
    subcity: 'Yeka Subcity',
    address: 'Zequala Complex ground floor, Megenagna, Addis Ababa',
    hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
    phone: '+251 11 647 3456',
    manager: 'W/ro Tigist Hailu',
    status: 'Open Now',
    specialties: ['Fresh Papaya', 'Green Peppers', 'Seed Distribution'],
    coords: { lat: 9.0201, lng: 38.8021 },
    googleMapsUrl: 'https://maps.app.goo.gl/5eV5GyTxHdNVu9yo7',
    embedUrl: 'https://maps.google.com/maps?q=9.0201,38.8021&z=15&output=embed',
  },
]

function RetailOutlets() {
  const [selectedOutletId, setSelectedOutletId] = useState(OUTLETS_DATA[0].id)
  const [activeModalOutlet, setActiveModalOutlet] = useState(null)

  const activeOutlet = OUTLETS_DATA.find((o) => o.id === selectedOutletId) || OUTLETS_DATA[0]

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
      <section className="outlets-hero section">
        <div className="container outlets-hero__grid">
          <div className="outlets-hero__content">
            <h1 className="outlets-hero__title">Direct from Our Farms to You.</h1>
            <p className="outlets-hero__desc">
              Meki Batu Union operates five dedicated retail outlets across Addis Ababa, ensuring urban consumers have direct access to the freshest, sustainably grown produce from our cooperative farmers.
            </p>
            <div className="outlets-hero__actions">
              <a href="#locations" className="btn btn--primary">
                View Locations <span className="material-symbols-outlined text-sm">arrow_downward</span>
              </a>
              <Link to="/contact" className="btn btn--outline">
                Contact Retail Sales <span className="material-symbols-outlined text-sm">mail</span>
              </Link>
            </div>
          </div>
          <div className="outlets-hero__media">
            <img
              src={retailHeroImg}
              alt="Pristine fresh produce display in a modern retail setting"
              className="outlets-hero__img"
            />
            <div className="outlets-hero__badge desktop-only">
              <div className="outlets-hero__badge-num">5</div>
              <div className="outlets-hero__badge-label">Addis Ababa Locations</div>
            </div>
          </div>
        </div>
      </section>

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
            {/* Outlets List Column */}
            <div className="outlets-list-col">
              {OUTLETS_DATA.map((outlet) => (
                <div
                  key={outlet.id}
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
                </div>
              ))}
            </div>

            {/* Map Column */}
            <div className="outlets-map-col">
              <div className="outlets-map-container">
                <div className="outlets-map-pins-header">
                  {OUTLETS_DATA.map((outlet) => (
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
            </div>
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

