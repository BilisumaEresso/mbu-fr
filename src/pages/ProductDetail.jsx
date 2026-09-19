import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEO from '../components/common/SEO.jsx'
import Reveal from '../components/common/Reveal.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import { products } from '../data/products.js'
import { getLocalePath, isSupportedLocale, DEFAULT_LOCALE } from '../utils/locale.js'
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Package,
  Clock,
  Leaf,
  BadgeCheck,
  CheckCircle,
  ArrowRight,
  Share2,
  Check,
  Sparkles,
  ShoppingBag,
  ShieldCheck
} from 'lucide-react'
import './InnerPage.css'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id, lang } = useParams()
  const { t } = useTranslation(['products', 'common'])
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  const currentLang = isSupportedLocale(lang) ? lang : DEFAULT_LOCALE

  const product = products.find((p) => p.id === id)

  // Helper function for translations matching Products.jsx
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

  if (!product) {
    return (
      <div className="product-detail-page section">
        <SEO title="Product Not Found - Meki Batu Union" description="The requested product could not be found." />
        <div className="container text-center py-12">
          <h1 className="text-2xl font-bold mb-4">{t('products:notFound.title', 'Product Not Found')}</h1>
          <p className="mb-6 text-muted">{t('products:notFound.desc', 'The product you are looking for does not exist or has been removed.')}</p>
          <Link to={getLocalePath('/products', currentLang)} className="btn btn--primary inline-flex items-center gap-2">
            <ArrowLeft size={18} />
            {t('products:catalog.backToProducts', 'Back to Products')}
          </Link>
        </div>
      </div>
    )
  }

  const trans = getProductTrans(product)
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3)

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div className="product-detail-page">
      <SEO
        title={`${trans.name} | Meki Batu Farmers Cooperative Union`}
        description={trans.desc}
        image={product.img}
        path={`/products/${product.id}`}
      />

      {/* Top Header / Breadcrumb Navigation */}
      <section className="product-detail-hero">
        <div className="container">
          <div className="product-detail-nav">
            <button
              onClick={() => navigate(getLocalePath('/products', currentLang))}
              className="product-back-btn"
              aria-label={t('products:catalog.backToProducts', 'Back to Products')}
            >
              <ArrowLeft size={18} />
              <span>{t('products:catalog.backToProducts', 'Back to Products')}</span>
            </button>
            <nav className="product-breadcrumbs" aria-label="Breadcrumb">
              <Link to={getLocalePath('/', currentLang)}>{t('common:nav.home', 'Home')}</Link>
              <span className="separator">/</span>
              <Link to={getLocalePath('/products', currentLang)}>{t('common:nav.products', 'Products')}</Link>
              <span className="separator">/</span>
              <span className="current">{trans.name}</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Product Showcase Section */}
      <section className="section py-8">
        <div className="container">
          <div className="product-detail-grid">
            {/* Left Image Column */}
            <Reveal className="product-detail-media-wrapper">
              <div className="product-detail-media">
                {product.img ? (
                  <img src={product.img} alt={trans.name} className="product-detail-img" />
                ) : (
                  <div className="product-detail-img-placeholder">
                    <span>{trans.name}</span>
                  </div>
                )}
                <div className="product-detail-media-overlay" />
                <div className="product-detail-media-badge">
                  <BadgeCheck size={18} />
                  <span>{t('products:catalog.labels.globalGap', 'GlobalG.A.P Certified')}</span>
                </div>
              </div>

              {/* Quality Perks Badges */}
              <div className="product-detail-perks-box">
                <div className="product-detail-perk">
                  <CheckCircle size={18} className="text-success" />
                  <div>
                    <strong>{t('products:catalog.perks.traceableTitle', 'Full Traceability')}</strong>
                    <p>{t('products:catalog.perks.traceable', '100% traceable to smallholder primary co-ops')}</p>
                  </div>
                </div>
                <div className="product-detail-perk">
                  <ShieldCheck size={18} className="text-success" />
                  <div>
                    <strong>{t('products:catalog.perks.coldChainTitle', 'Cold-Chain Guaranteed')}</strong>
                    <p>{t('products:catalog.perks.coldChain', 'Pre-cooled & transported under refrigerated logistics')}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Info Column */}
            <Reveal delay={100} className="product-detail-info">
              <div className="product-detail-header">
                <div className="product-detail-tags">
                  <span className="product-badge-pill">{trans.category}</span>
                  <span className="product-badge-pill product-badge-pill--outline">{trans.tag}</span>
                </div>
                <h1 className="product-detail-title">{trans.name}</h1>
                <p className="product-detail-desc">{trans.desc}</p>
              </div>

              {/* Specifications Grid */}
              <div className="product-specs-section">
                <h3 className="product-specs-heading">
                  <Sparkles size={18} />
                  {t('products:catalog.labels.specifications', 'Technical Specifications & Quality Grade')}
                </h3>
                <div className="product-specs-grid">
                  <div className="product-spec-card">
                    <div className="product-spec-card__icon">
                      <MapPin size={20} />
                    </div>
                    <div className="product-spec-card__details">
                      <span className="product-spec-card__label">{t('products:catalog.labels.origin', 'Origin')}</span>
                      <span className="product-spec-card__value">{trans.origin}</span>
                    </div>
                  </div>

                  <div className="product-spec-card">
                    <div className="product-spec-card__icon">
                      <Calendar size={20} />
                    </div>
                    <div className="product-spec-card__details">
                      <span className="product-spec-card__label">{t('products:catalog.labels.season', 'Harvest Season')}</span>
                      <span className="product-spec-card__value">{trans.season}</span>
                    </div>
                  </div>

                  <div className="product-spec-card">
                    <div className="product-spec-card__icon">
                      <Package size={20} />
                    </div>
                    <div className="product-spec-card__details">
                      <span className="product-spec-card__label">{t('products:catalog.labels.packaging', 'Export Packaging')}</span>
                      <span className="product-spec-card__value">{trans.packaging}</span>
                    </div>
                  </div>

                  <div className="product-spec-card">
                    <div className="product-spec-card__icon">
                      <Clock size={20} />
                    </div>
                    <div className="product-spec-card__details">
                      <span className="product-spec-card__label">{t('products:catalog.labels.shelfLife', 'Shelf Life')}</span>
                      <span className="product-spec-card__value">{trans.shelfLife}</span>
                    </div>
                  </div>

                  {Array.isArray(trans.varieties) && trans.varieties.length > 0 && (
                    <div className="product-spec-card product-spec-card--full">
                      <div className="product-spec-card__icon">
                        <Leaf size={20} />
                      </div>
                      <div className="product-spec-card__details">
                        <span className="product-spec-card__label">{t('products:catalog.labels.producedVarieties', 'Cultivated Varieties')}</span>
                        <span className="product-spec-card__value">{trans.varieties.join(', ')}</span>
                      </div>
                    </div>
                  )}

                  <div className="product-spec-card product-spec-card--full">
                    <div className="product-spec-card__icon">
                      <BadgeCheck size={20} />
                    </div>
                    <div className="product-spec-card__details">
                      <span className="product-spec-card__label">{t('products:catalog.labels.brix', 'Quality Standard / Spec')}</span>
                      <span className="product-spec-card__value">{trans.brix}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action Box */}
              <div className="product-detail-actions">
                <Link
                  to={getLocalePath(`/buyers?product=${product.id}`, currentLang)}
                  className="btn btn--primary btn--lg product-cta-btn"
                >
                  <ShoppingBag size={20} />
                  <span>{t('products:catalog.labels.requestQuote', 'Request Commercial Quote')}</span>
                  <ArrowRight size={18} />
                </Link>

                <button
                  type="button"
                  className="btn btn--outline btn--lg product-share-btn"
                  onClick={handleShare}
                >
                  {copied ? <Check size={18} className="text-success" /> : <Share2 size={18} />}
                  <span>{copied ? t('news:labels.copied', 'Copied Link!') : t('news:labels.share', 'Share Product')}</span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Related Products Discovery Section */}
      {relatedProducts.length > 0 && (
        <section className="section related-products-section">
          <div className="container">
            <div className="section-header text-center mb-8">
              <h2 className="section-title">{t('products:catalog.relatedTitle', 'Explore Other Produce & Crops')}</h2>
              <p className="section-desc">{t('products:catalog.relatedDesc', 'Discover more fresh horticultural produce and certified seeds from Meki Batu Union.')}</p>
            </div>

            <div className="products-grid">
              {relatedProducts.map((relProduct, i) => {
                const relTrans = getProductTrans(relProduct)
                return (
                  <Reveal key={relProduct.id} delay={i * 100}>
                    <Link
                      to={getLocalePath(`/products/${relProduct.id}`, currentLang)}
                      className="product-item-card text-decoration-none"
                    >
                      <div className="product-item-card__media">
                        {relProduct.img && (
                          <img src={relProduct.img} alt={relTrans.name} className="product-item-card__img" />
                        )}
                        <div className="product-item-card__badge">{relTrans.category}</div>
                      </div>
                      <div className="product-item-card__body">
                        <span className="product-item-card__tag">{relTrans.tag}</span>
                        <h3 className="product-item-card__title">{relTrans.name}</h3>
                        <p className="product-item-card__desc">{relTrans.desc}</p>
                        <div className="product-item-card__link">
                          <span>{t('products:catalog.viewDetails', 'View Specifications')}</span>
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
