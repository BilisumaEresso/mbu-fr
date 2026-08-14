import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageHero from '../components/common/PageHero.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import ourProductHeroImg from '../assets/images/ourProductHero.webp'
import { products, categories, harvestCalendar } from '../data/products.js'
import './InnerPage.css'
import './Products.css'

function Products() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory)

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
          <div className="products-catalog__header">
            <h2 className="products-catalog__title">Product Catalog</h2>
            <div className="category-tabs" role="tablist" aria-label="Product categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`category-tab ${activeCategory === cat ? 'category-tab--active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="products-grid">
            {filtered.map((item) => (
              <div
                key={item.id}
                className={`product-item-card ${item.featured && activeCategory === 'All' ? 'product-item-card--featured' : ''}`}
                onClick={() => setSelectedProduct(item)}
              >
                <div className="product-item-card__media">
                  <img src={item.img} alt={item.name} className="product-item-card__img" />
                </div>
                <div className="product-item-card__body">
                  <div className="product-item-card__header">
                    <h3 className="product-item-card__title">{item.name}</h3>
                    <span className="product-item-card__badge">{item.category}</span>
                  </div>
                  <p className="product-item-card__desc">{item.desc}</p>
                  <div className="product-item-card__footer">
                    <span className="label-caps label-caps--muted text-xs">Season: {item.season}</span>
                    <Link
                      to={`/buyers?product=${item.id}`}
                      className="product-quote-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Request Quote <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Product Detail Modal ---- */}
      {selectedProduct && (
        <div className="product-modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="product-modal-close" onClick={() => setSelectedProduct(null)}>
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="product-modal-grid">
              <div className="product-modal-media">
                <img src={selectedProduct.img} alt={selectedProduct.name} className="product-modal-img" />
              </div>
              <div className="product-modal-content">
                <span className="product-modal-badge">{selectedProduct.category}</span>
                <h2 className="product-modal-title">{selectedProduct.name}</h2>
                <p className="product-modal-desc">{selectedProduct.desc}</p>

                <div className="product-specs-list">
                  <div className="product-spec-item">
                    <span className="product-spec-label">Origin</span>
                    <span className="product-spec-value">{selectedProduct.origin}</span>
                  </div>
                  <div className="product-spec-item">
                    <span className="product-spec-label">Harvest Season</span>
                    <span className="product-spec-value">{selectedProduct.season}</span>
                  </div>
                  <div className="product-spec-item">
                    <span className="product-spec-label">Packaging</span>
                    <span className="product-spec-value">{selectedProduct.packaging}</span>
                  </div>
                  <div className="product-spec-item">
                    <span className="product-spec-label">Shelf Life</span>
                    <span className="product-spec-value">{selectedProduct.shelfLife}</span>
                  </div>
                  <div className="product-spec-item">
                    <span className="product-spec-label">Quality Metric</span>
                    <span className="product-spec-value">{selectedProduct.brix}</span>
                  </div>
                </div>

                <div className="product-modal-actions">
                  <Link
                    to={`/buyers?product=${selectedProduct.id}`}
                    className="btn btn--primary"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Request Export Quote for {selectedProduct.name}
                  </Link>
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

      {/* ---- Partner CTA Banner ---- */}
      <section className="products-cta section section--alt">
        <div className="container">
          <div className="products-cta__card">
            <div className="products-cta__info">
              <h2 className="products-cta__title">Partner with Meki Batu</h2>
              <p className="products-cta__desc">
                We supply reliable, high-volume agricultural products to exporters, processing facilities, and regional markets. Contact our sales team for pricing and logistics.
              </p>
            </div>
            <Link to="/buyers" className="btn btn--primary">
              Inquire for Buying
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Products
