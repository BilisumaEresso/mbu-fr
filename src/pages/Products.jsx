import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SEO from '../components/common/SEO.jsx'
import { useTranslation } from 'react-i18next'
import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import ourProductHeroImg from '../assets/images/heroes/ourProductHero.webp'
import ourProductHero480 from '../assets/images/heroes/ourProductHero-480w.webp'
import ourProductHero800 from '../assets/images/heroes/ourProductHero-800w.webp'
import { products, categories, harvestCalendar } from '../data/products.js'
import { getLocalePath } from '../utils/locale.js'
import { ArrowRight, FileText, MapPin, Calendar, ArrowLeftCircle } from 'lucide-react'
import './InnerPage.css'
import './Products.css'

// Cap stagger at 450ms for the initial product grid render
const stagger = (i) => Math.min(i * 90, 450)

function Products() {
  const { t, i18n } = useTranslation(['products', 'meta', 'common'])
  const currentLang = i18n.language || 'en'
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')

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

  const getProductTrans = (item) => {
    if (!item) return {}
    const defaultCatKey = item.category ? item.category.toLowerCase() : ''
    const fallbackCategory = t(`products:catalog.filters.${defaultCatKey}`, item.category)
    const varietiesObj = t(`products:items.${item.id}.varieties`, { returnObjects: true })

    return {
      name: t(`products:items.${item.id}.name`, item.name),
      category: t(`products:items.${item.id}.category`, fallbackCategory),
      tag: t(`products:items.${item.id}.tag`, item.tag),
      desc: t(`products:items.${item.id}.desc`, item.desc),
      season: t(`products:items.${item.id}.season`, item.season),
      origin: t(`products:items.${item.id}.origin`, item.origin),
      shelfLife: t(`products:items.${item.id}.shelfLife`, item.shelfLife),
      packaging: t(`products:items.${item.id}.packaging`, item.packaging),
      brix: t(`products:items.${item.id}.brix`, item.brix),
      varieties: Array.isArray(varietiesObj) ? varietiesObj : item.varieties,
    }
  }

  return (
    <>
      <SEO
        title={t('meta:products.title')}
        description={t('meta:products.description')}
      />
      {/* ---- Hero Section ---- */}
      <PageHero
        breadcrumbs={[{ label: t('common:breadcrumbs.home'), to: '/' }, { label: t('common:breadcrumbs.products') }]}
        title={t('products:hero.title')}
        description={t('products:hero.desc')}
        actions={
          <>
            <a href="#catalog" className="btn btn--primary">
              {t('products:hero.viewCatalog')} <ArrowRight size={16} className="text-sm" />
            </a>
            <Link to={getLocalePath('/buyers', currentLang)} className="btn btn--outline">
              {t('products:hero.requestQuote')} <FileText size={16} className="text-sm" />
            </Link>
          </>
        }
        image={ourProductHeroImg}
        imageSrcSet={`${ourProductHero480} 480w, ${ourProductHero800} 800w, ${ourProductHeroImg} 1537w`}
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
              const trans = getProductTrans(item)
              const cardContent = (
                <>
                  <div className="product-item-card__media">
                    {item.img ? (
                      <img
                        src={item.img}
                        alt={trans.name}
                        className="product-item-card__img"
                        loading="lazy"
                      />
                    ) : (
                      <div className="product-item-card__img img-placeholder" aria-label={`Photo pending: ${trans.name}`}>
                        {t('products:catalog.placeholderText', 'REPLACE WITH REAL PHOTO')}<br />{trans.name}
                      </div>
                    )}
                    <div className="product-item-card__media-overlay" />
                    <div className="product-item-card__badges">
                      <span className="product-item-card__badge-cat">{trans.category}</span>
                      <span className="product-item-card__badge-tag">{trans.tag}</span>
                    </div>
                  </div>

                  <div className="product-item-card__body">
                    <div className="product-item-card__main">
                      <h3 className="product-item-card__title">{trans.name}</h3>
                      <p className="product-item-card__desc">{trans.desc}</p>
                    </div>

                    {Array.isArray(trans.varieties) && trans.varieties.length > 0 && (
                      <div className="product-item-card__varieties">
                        <span className="product-item-card__varieties-label">{t('products:catalog.labels.varieties')}</span>
                        <span className="product-item-card__varieties-list">{trans.varieties.join(', ')}</span>
                      </div>
                    )}

                    <div className="product-item-card__meta">
                      <div className="product-item-card__meta-item">
                        <MapPin size={16} />
                        <span>{trans.origin}</span>
                      </div>
                      <div className="product-item-card__meta-item">
                        <Calendar size={16} />
                        <span>{trans.season}</span>
                      </div>
                    </div>

                    <div className="product-item-card__footer">
                      <span className="product-item-card__action-label">{t('products:catalog.labels.viewDetails')}</span>
                      <div className="product-item-card__arrow-wrap">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </>
              )

              const handleCardClick = () => {
                navigate(getLocalePath(`/products/${item.id}`, currentLang))
              }

              const handleCardKeyDown = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleCardClick()
                }
              }

              // After initial render, skip Reveal wrapper to avoid animation flashes
              if (hasFilteredRef.current) {
                return (
                  <div
                    key={item.id}
                    className="product-item-card"
                    onClick={handleCardClick}
                    onKeyDown={handleCardKeyDown}
                    tabIndex={0}
                    role="button"
                    aria-label={t('products:catalog.ariaViewDetails', { name: trans.name })}
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
                  onClick={handleCardClick}
                  onKeyDown={handleCardKeyDown}
                  tabIndex={0}
                  role="button"
                  aria-label={t('products:catalog.ariaViewDetails', { name: trans.name })}
                  style={{ cursor: 'pointer' }}
                >
                  {cardContent}
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

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
              <ArrowLeftCircle size={16} className="text-sm" />
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
                {harvestCalendar.map((row) => {
                  const rowKey = row.id || (
                    row.commodity.includes('Tomato') ? 'tomato' :
                    row.commodity.includes('Onion') ? 'onion' :
                    row.commodity.includes('Papaya') ? 'papaya' :
                    row.commodity.includes('Seed') ? 'seeds' :
                    row.commodity.toLowerCase().replace(/[^a-z]/g, '')
                  )
                  const commodity = t(`products:calendar.rows.${rowKey}.commodity`, row.commodity)
                  const category = t(`products:calendar.rows.${rowKey}.category`, row.category)
                  const window = t(`products:calendar.rows.${rowKey}.window`, row.window)
                  const availability = t(`products:calendar.rows.${rowKey}.availability`, row.availability)

                  return (
                    <tr key={row.commodity}>
                      <td className="font-medium">{commodity}</td>
                      <td className="text-muted">{category}</td>
                      <td>{window}</td>
                      <td>
                        <span className="availability-dot" /> {availability}
                      </td>
                    </tr>
                  )
                })}
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
