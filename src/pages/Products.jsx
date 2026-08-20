import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import ourProductHeroImg from '../assets/images/heroes/ourProductHero.webp'
import { products, categories, harvestCalendar } from '../data/products.js'
import './InnerPage.css'
import './Products.css'

// Cap stagger at 450ms for the initial product grid render
const stagger = (i) => Math.min(i * 90, 450)

function Products() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Lock body scroll and handle Escape key for modal
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setSelectedProduct(null)
      }
    }
    if (selectedProduct) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedProduct])

  // Track whether we've already rendered the initial grid. After the first
  // render, filtering must NOT re-trigger reveal animations — cards simply
  // show/hide instantly. We detect "has been filtered before" via a ref.
  const hasFilteredRef = useRef(false)

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory)

  // Dynamic counts for category tabs
  const categoryCounts = {
    All: products.length,
    Vegetables: products.filter((p) => p.category === 'Vegetables').length,
    Fruits: products.filter((p) => p.category === 'Fruits').length,
    Seeds: products.filter((p) => p.category === 'Seeds').length,
  }

  function handleCategoryChange(cat) {
    if (cat !== activeCategory) {
      hasFilteredRef.current = true
      setActiveCategory(cat)
    }
  }

  return (
    <>
      <Helmet>
        <title>Our Products | Meki Batu Union</title>
        <meta
          name="description"
          content="Explore our export-grade Ethiopian produce catalog including Rift Valley tomatoes, red onions, green peppers, highland potatoes, fresh papaya, and certified hybrid seeds."
        />
      </Helmet>
      {/* ---- Hero Section ---- */}
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Our Products' }]}
        title="Cultivated with precision. Exported globally."
        description="Discover our range of premium, certified organic crops and seeds. Grown in the nutrient-rich soils of the Great Rift Valley by our network of cooperative farmers."
        actions={
          <>
            <a href="#catalog" className="btn btn--primary">
              View Catalog <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
            <Link to="/buyers" className="btn btn--outline">
              Request a Quote <span className="material-symbols-outlined text-sm">description</span>
            </Link>
          </>
        }
        image={ourProductHeroImg}
        imageAlt="Fresh harvest of red tomatoes in wooden crate on dark Ethiopian soil"
        badge="GlobalG.A.P Certified"
      />

      <SectionDivider />

      {/* ---- Product Catalog Section ---- */}
      <section className="products-catalog section section--alt" id="catalog">
        <div className="container">
          {/* Section Header */}
          <div className="products-catalog__header">
            <div className="products-catalog__header-content">
              <span className="label-caps label-caps--secondary mb-2 block">Crop Directory</span>
              <h2 className="products-catalog__title">Export &amp; Domestic Produce</h2>
              <p className="products-catalog__desc">
                Cultivated by 8,410 member farmers across 153 primary cooperatives. Meets GlobalG.A.P international standards for full traceability, food safety, and premium export grading.
              </p>
            </div>
          </div>

          {/* Interactive Filter & Status Toolbar */}
          <div className="products-toolbar">
            <div className="products-toolbar__tabs" role="tablist" aria-label="Product Categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`products-toolbar__tab ${activeCategory === cat ? 'products-toolbar__tab--active' : ''}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  <span className="products-toolbar__tab-label">{cat}</span>
                  <span className="products-toolbar__tab-count">{categoryCounts[cat] || 0}</span>
                </button>
              ))}
            </div>

            <div className="products-toolbar__status">
              <span className="products-toolbar__status-dot" />
              <span>
                Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'commodity' : 'commodities'}
              </span>
            </div>
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {filtered.map((item, i) => {
              const cardContent = (
                <>
                  <div className="product-item-card__media">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="product-item-card__img"
                      loading="lazy"
                    />
                    <div className="product-item-card__media-overlay" />
                    <div className="product-item-card__badges">
                      <span className="product-item-card__badge-cat">{item.category}</span>
                      <span className="product-item-card__badge-tag">{item.tag}</span>
                    </div>
                  </div>

                  <div className="product-item-card__body">
                    <div className="product-item-card__main">
                      <h3 className="product-item-card__title">{item.name}</h3>
                      <p className="product-item-card__desc">{item.desc}</p>
                    </div>

                    <div className="product-item-card__meta">
                      <div className="product-item-card__meta-item">
                        <span className="material-symbols-outlined">location_on</span>
                        <span>{item.origin}</span>
                      </div>
                      <div className="product-item-card__meta-item">
                        <span className="material-symbols-outlined">calendar_today</span>
                        <span>{item.season}</span>
                      </div>
                    </div>

                    <div className="product-item-card__footer">
                      <span className="product-item-card__action-label">View Specifications</span>
                      <div className="product-item-card__arrow-wrap">
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </div>
                    </div>
                  </div>
                </>
              )

              // After initial render, skip Reveal wrapper to avoid animation flashes
              if (hasFilteredRef.current) {
                return (
                  <div
                    key={item.id}
                    className="product-item-card"
                    onClick={() => setSelectedProduct(item)}
                  >
                    {cardContent}
                  </div>
                )
              }

              // Initial load: Reveal with subtle stagger
              return (
                <Reveal
                  key={item.id}
                  delay={stagger(i)}
                  className="product-item-card"
                  onClick={() => setSelectedProduct(item)}
                  style={{ cursor: 'pointer' }}
                >
                  {cardContent}
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---- Enhanced Product Detail Modal ---- */}
      {selectedProduct && (
        <div
          className="product-modal-backdrop"
          onClick={() => setSelectedProduct(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedProduct.name}
        >
          <div className="product-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="product-modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product details"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="product-modal-grid">
              <div className="product-modal-media">
                <img
                  src={selectedProduct.img}
                  alt={selectedProduct.name}
                  className="product-modal-img"
                />
                <div className="product-modal-media-overlay" />
                <div className="product-modal-media-badge">
                  <span className="material-symbols-outlined text-xs">verified</span>
                  <span>GlobalG.A.P Certified</span>
                </div>
              </div>

              <div className="product-modal-content">
                <div className="product-modal-header">
                  <div className="product-modal-tags">
                    <span className="product-modal-category">{selectedProduct.category}</span>
                    <span className="product-modal-tag">{selectedProduct.tag}</span>
                  </div>
                  <h2 className="product-modal-title">{selectedProduct.name}</h2>
                  <p className="product-modal-desc">{selectedProduct.desc}</p>
                </div>

                <div className="product-specs-grid">
                  <div className="product-spec-card">
                    <div className="product-spec-card__icon">
                      <span className="material-symbols-outlined">location_on</span>
                    </div>
                    <div className="product-spec-card__details">
                      <span className="product-spec-card__label">Origin</span>
                      <span className="product-spec-card__value">{selectedProduct.origin}</span>
                    </div>
                  </div>

                  <div className="product-spec-card">
                    <div className="product-spec-card__icon">
                      <span className="material-symbols-outlined">calendar_today</span>
                    </div>
                    <div className="product-spec-card__details">
                      <span className="product-spec-card__label">Harvest Season</span>
                      <span className="product-spec-card__value">{selectedProduct.season}</span>
                    </div>
                  </div>

                  <div className="product-spec-card">
                    <div className="product-spec-card__icon">
                      <span className="material-symbols-outlined">inventory_2</span>
                    </div>
                    <div className="product-spec-card__details">
                      <span className="product-spec-card__label">Export Packaging</span>
                      <span className="product-spec-card__value">{selectedProduct.packaging}</span>
                    </div>
                  </div>

                  <div className="product-spec-card">
                    <div className="product-spec-card__icon">
                      <span className="material-symbols-outlined">timelapse</span>
                    </div>
                    <div className="product-spec-card__details">
                      <span className="product-spec-card__label">Shelf Life</span>
                      <span className="product-spec-card__value">{selectedProduct.shelfLife}</span>
                    </div>
                  </div>

                  <div className="product-spec-card product-spec-card--full">
                    <div className="product-spec-card__icon">
                      <span className="material-symbols-outlined">verified</span>
                    </div>
                    <div className="product-spec-card__details">
                      <span className="product-spec-card__label">Quality Standard &amp; Spec</span>
                      <span className="product-spec-card__value">{selectedProduct.brix}</span>
                    </div>
                  </div>
                </div>

                <div className="product-modal-perks">
                  <div className="product-modal-perk">
                    <span className="material-symbols-outlined text-xs">check_circle</span>
                    <span>100% Traceable to Member Co-ops</span>
                  </div>
                  <div className="product-modal-perk">
                    <span className="material-symbols-outlined text-xs">check_circle</span>
                    <span>Direct Cold-Chain Transit</span>
                  </div>
                </div>

                <div className="product-modal-actions">
                  <Link
                    to={`/buyers?product=${selectedProduct.id}`}
                    className="btn btn--primary product-modal-cta"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Request Export Quote
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                  <button
                    type="button"
                    className="btn btn--outline product-modal-dismiss"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---- Harvest Calendar Table Section ---- */}
      <section className="products-calendar section">
        <div className="container">
          <div className="products-calendar__header">
            <h2 className="products-calendar__title">Harvest Calendar</h2>
            <p className="products-calendar__desc">
              Strategic planting cycles allow us to maintain a consistent supply of core commodities throughout the year. Data below reflects primary harvest windows.
            </p>
          </div>

          <div className="table-responsive">
            <div className="table-mobile-hint">
              <span className="material-symbols-outlined text-sm">swipe_left</span>
              <span>Scroll horizontally to view full calendar</span>
            </div>
            <table className="products-table">
              <thead>
                <tr>
                  <th>Commodity</th>
                  <th>Category</th>
                  <th>Main Harvest Window</th>
                  <th>Export Availability</th>
                </tr>
              </thead>
              <tbody>
                {harvestCalendar.map((row) => (
                  <tr key={row.commodity}>
                    <td className="font-medium">{row.commodity}</td>
                    <td className="text-muted">{row.category}</td>
                    <td>{row.window}</td>
                    <td>
                      <span className="availability-dot" /> {row.availability}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---- Partner CTA Banner — one Reveal ---- */}
      <section className="products-cta section section--alt">
        <div className="container">
          <Reveal className="products-cta__card">
            <div className="products-cta__info">
              <h2 className="products-cta__title">Partner with Meki Batu</h2>
              <p className="products-cta__desc">
                We supply reliable, high-volume agricultural products to exporters, processing facilities, and regional markets. Contact our sales team for pricing and logistics.
              </p>
            </div>
            <Link to="/buyers" className="btn btn--primary">
              Inquire for Buying
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default Products
