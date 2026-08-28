import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import ourProductHeroImg from '../assets/images/heroes/ourProductHero.webp'
import { products, categories, harvestCalendar } from '../data/products.js'
import { getLocalePath } from '../utils/locale.js'
import './InnerPage.css'
import './Products.css'

// Cap stagger at 450ms for the initial product grid render
const stagger = (i) => Math.min(i * 90, 450)

function Products() {
  const { t, i18n } = useTranslation(['products', 'meta', 'common'])
  const currentLang = i18n.language || 'en'
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

  const categoryLabels = {
    All: t('products:catalog.filters.all', 'All Products'),
    Vegetables: t('products:catalog.filters.vegetables', 'Vegetables'),
    Fruits: t('products:catalog.filters.fruits', 'Fruits'),
    Seeds: t('products:catalog.filters.seeds', 'Certified Seeds'),
  }

  return (
    <>
      <Helmet>
        <title>{t('meta:products.title')}</title>
        <meta
          name="description"
          content={t('meta:products.description')}
        />
      </Helmet>
      {/* ---- Hero Section ---- */}
      <PageHero
        breadcrumbs={[{ label: t('common:breadcrumbs.home'), to: '/' }, { label: t('common:breadcrumbs.products') }]}
        title={t('products:hero.title')}
        description={t('products:hero.desc')}
        actions={
          <>
            <a href="#catalog" className="btn btn--primary">
              {t('products:hero.viewCatalog')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
            <Link to={getLocalePath('/buyers', currentLang)} className="btn btn--outline">
              {t('products:hero.requestQuote')} <span className="material-symbols-outlined text-sm">description</span>
            </Link>
          </>
        }
        image={ourProductHeroImg}
        imageAlt={t('products:hero.imageAlt')}
        badge={t('products:hero.badge')}
      />

      <SectionDivider />

      {/* ---- Product Catalog Section ---- */}
      <section className="products-catalog section section--alt" id="catalog">
        <div className="container">
          {/* Section Header */}
          <div className="products-catalog__header">
            <div className="products-catalog__header-content">
              <span className="label-caps label-caps--secondary mb-2 block">{t('products:catalog.directory')}</span>
              <h2 className="products-catalog__title">{t('products:catalog.title')}</h2>
              <p className="products-catalog__desc">
                {t('products:catalog.desc')}
              </p>
            </div>
          </div>

          {/* Interactive Filter & Status Toolbar */}
          <div className="products-toolbar">
            <div className="products-toolbar__tabs" role="tablist" aria-label={t('products:catalog.directory', 'Product Categories')}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`products-toolbar__tab ${activeCategory === cat ? 'products-toolbar__tab--active' : ''}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  <span className="products-toolbar__tab-label">{categoryLabels[cat] || cat}</span>
                  <span className="products-toolbar__tab-count">{categoryCounts[cat] || 0}</span>
                </button>
              ))}
            </div>

            <div className="products-toolbar__status">
              <span className="products-toolbar__status-dot" />
              <span>
                {t('products:catalog.showingPrefix')} <strong>{filtered.length}</strong> {filtered.length === 1 ? t('products:catalog.commodity') : t('products:catalog.commodities')}
              </span>
            </div>
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {filtered.map((item, i) => {
              const cardContent = (
                <>
                  <div className="product-item-card__media">
                    {item.img ? (
                      <img
                        src={item.img}
                        alt={item.name}
                        className="product-item-card__img"
                        loading="lazy"
                      />
                    ) : (
                      <div className="product-item-card__img img-placeholder" aria-label={`Photo pending — ${item.name}`}>
                        REPLACE WITH REAL PHOTO<br />{item.name}
                      </div>
                    )}
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

                    {Array.isArray(item.varieties) && item.varieties.length > 0 && (
                      <div className="product-item-card__varieties">
                        <span className="product-item-card__varieties-label">{t('products:catalog.labels.varieties')}</span>
                        <span className="product-item-card__varieties-list">{item.varieties.join(', ')}</span>
                      </div>
                    )}

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
                      <span className="product-item-card__action-label">{t('products:catalog.labels.viewDetails')}</span>
                      <div className="product-item-card__arrow-wrap">
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </div>
                    </div>
                  </div>
                </>
              )

              const handleCardKeyDown = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setSelectedProduct(item)
                }
              }

              // After initial render, skip Reveal wrapper to avoid animation flashes
              if (hasFilteredRef.current) {
                return (
                  <div
                    key={item.id}
                    className="product-item-card"
                    onClick={() => setSelectedProduct(item)}
                    onKeyDown={handleCardKeyDown}
                    tabIndex={0}
                    role="button"
                    aria-label={t('products:catalog.ariaViewDetails', { name: item.name })}
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
                  onKeyDown={handleCardKeyDown}
                  tabIndex={0}
                  role="button"
                  aria-label={t('products:catalog.ariaViewDetails', { name: item.name })}
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
              aria-label={t('common:buttons.close')}
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="product-modal-grid">
              <div className="product-modal-media">
                {selectedProduct.img ? (
                  <img
                    src={selectedProduct.img}
                    alt={selectedProduct.name}
                    className="product-modal-img"
                  />
                ) : (
                  <div className="product-modal-img img-placeholder" aria-label={`Photo pending — ${selectedProduct.name}`}>
                    REPLACE WITH REAL PHOTO<br />{selectedProduct.name}
                  </div>
                )}
                <div className="product-modal-media-overlay" />
                <div className="product-modal-media-badge">
                  <span className="material-symbols-outlined text-xs">verified</span>
                  <span>{t('products:catalog.labels.globalGap')}</span>
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
                      <span className="product-spec-card__label">{t('products:catalog.labels.origin')}</span>
                      <span className="product-spec-card__value">{selectedProduct.origin}</span>
                    </div>
                  </div>

                  <div className="product-spec-card">
                    <div className="product-spec-card__icon">
                      <span className="material-symbols-outlined">calendar_today</span>
                    </div>
                    <div className="product-spec-card__details">
                      <span className="product-spec-card__label">{t('products:catalog.labels.season')}</span>
                      <span className="product-spec-card__value">{selectedProduct.season}</span>
                    </div>
                  </div>

                  <div className="product-spec-card">
                    <div className="product-spec-card__icon">
                      <span className="material-symbols-outlined">inventory_2</span>
                    </div>
                    <div className="product-spec-card__details">
                      <span className="product-spec-card__label">{t('products:catalog.labels.packaging')}</span>
                      <span className="product-spec-card__value">{selectedProduct.packaging}</span>
                    </div>
                  </div>

                  <div className="product-spec-card">
                    <div className="product-spec-card__icon">
                      <span className="material-symbols-outlined">timelapse</span>
                    </div>
                    <div className="product-spec-card__details">
                      <span className="product-spec-card__label">{t('products:catalog.labels.shelfLife')}</span>
                      <span className="product-spec-card__value">{selectedProduct.shelfLife}</span>
                    </div>
                  </div>

                  {Array.isArray(selectedProduct.varieties) && selectedProduct.varieties.length > 0 && (
                    <div className="product-spec-card product-spec-card--full">
                      <div className="product-spec-card__icon">
                        <span className="material-symbols-outlined">spa</span>
                      </div>
                      <div className="product-spec-card__details">
                        <span className="product-spec-card__label">{t('products:catalog.labels.producedVarieties')}</span>
                        <span className="product-spec-card__value">{selectedProduct.varieties.join(', ')}</span>
                      </div>
                    </div>
                  )}

                  <div className="product-spec-card product-spec-card--full">
                    <div className="product-spec-card__icon">
                      <span className="material-symbols-outlined">verified</span>
                    </div>
                    <div className="product-spec-card__details">
                      <span className="product-spec-card__label">{t('products:catalog.labels.brix')}</span>
                      <span className="product-spec-card__value">{selectedProduct.brix}</span>
                    </div>
                  </div>
                </div>

                <div className="product-modal-perks">
                  <div className="product-modal-perk">
                    <span className="material-symbols-outlined text-xs">check_circle</span>
                    <span>{t('products:catalog.perks.traceable')}</span>
                  </div>
                  <div className="product-modal-perk">
                    <span className="material-symbols-outlined text-xs">check_circle</span>
                    <span>{t('products:catalog.perks.coldChain')}</span>
                  </div>
                </div>

                <div className="product-modal-actions">
                  <Link
                    to={getLocalePath(`/buyers?product=${selectedProduct.id}`, currentLang)}
                    className="btn btn--primary product-modal-cta"
                    onClick={() => setSelectedProduct(null)}
                  >
                    {t('products:catalog.labels.requestQuote')}
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                  <button
                    type="button"
                    className="btn btn--outline product-modal-dismiss"
                    onClick={() => setSelectedProduct(null)}
                  >
                    {t('common:buttons.close')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---- Harvest Calendar Table Section ---- */}
      <section className="products-calendar section" id="calendar">
        <div className="container">
          <div className="products-calendar__header">
            <h2 className="products-calendar__title">{t('products:calendar.title')}</h2>
            <p className="products-calendar__desc">
              {t('products:calendar.desc')}
            </p>
          </div>

          <div className="table-responsive">
            <div className="table-mobile-hint">
              <span className="material-symbols-outlined text-sm">swipe_left</span>
              <span>{t('products:calendar.mobileHint')}</span>
            </div>
            <table className="products-table">
              <thead>
                <tr>
                  <th>{t('products:calendar.table.commodity')}</th>
                  <th>{t('products:calendar.table.category')}</th>
                  <th>{t('products:calendar.table.harvestWindow')}</th>
                  <th>{t('products:calendar.table.exportAvailability')}</th>
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
      <section className="products-cta section section--alt" id="inquire">
        <div className="container">
          <Reveal className="products-cta__card">
            <div className="products-cta__info">
              <h2 className="products-cta__title">{t('products:cta.title')}</h2>
              <p className="products-cta__desc">
                {t('products:cta.desc')}
              </p>
            </div>
            <Link to={getLocalePath('/buyers', currentLang)} className="btn btn--primary">
              {t('products:cta.button')}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default Products
