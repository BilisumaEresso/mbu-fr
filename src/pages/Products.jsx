import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ourProductHeroImg from '../assets/images/ourProductHero.png'
import tomatoImg from '../assets/images/tomato.jpg'
import bentoOnionImg from '../assets/images/bentoOnion.jpg'
import bentoGreenPepperImg from '../assets/images/bentoGreenPepper.jpg'
import bentoPotatoImg from '../assets/images/bentoPotato.jpg'
import bentoPapayaImg from '../assets/images/bentoPapaya.jpg'
import redBeanSeedsImg from '../assets/images/redBeanSeeds.jpg'
import './InnerPage.css'

const CATEGORIES = ['All', 'Vegetables', 'Fruits', 'Seeds']

const PRODUCTS_DATA = [
  {
    id: 'tomatoes',
    name: 'Rift Valley Tomatoes',
    category: 'Vegetables',
    desc: 'High-yield, disease-resistant varieties suited for both local consumption and export markets. Known for robust flavor and long shelf life.',
    season: 'All Year',
    featured: true,
    origin: 'Meki & Ziway Lowlands',
    shelfLife: '14-21 Days (Cold-chain 8-10°C)',
    packaging: '5kg / 10kg Corrugated Export Cartons',
    brix: '4.8° - 5.5° Brix',
    img: tomatoImg,
  },
  {
    id: 'onions',
    name: 'Red Onion',
    category: 'Vegetables',
    desc: 'Pungent, dense bulbs with excellent storage capacity, cultivated in ideal dry conditions.',
    season: 'Main: Sep - Dec',
    featured: false,
    origin: 'East Shewa Farms',
    shelfLife: '3-5 Months (Dry storage)',
    packaging: '25kg / 50kg Mesh Bags',
    brix: 'N/A (Pungency index high)',
    img: bentoOnionImg,
  },
  {
    id: 'peppers',
    name: 'Green Pepper',
    category: 'Vegetables',
    desc: 'Crisp, thick-walled bell peppers favored by domestic retailers and processing units.',
    season: 'All Year',
    featured: false,
    origin: 'Batu Irrigation Schemes',
    shelfLife: '12-16 Days (Cold-chain 7°C)',
    packaging: '6kg Plastic Crates / Export Boxes',
    brix: 'Crisp & Sweet Grade A',
    img: bentoGreenPepperImg,
  },
  {
    id: 'potato',
    name: 'Highland Potato',
    category: 'Vegetables',
    desc: 'Nutrient-dense varieties grown in higher altitudes, ensuring firm texture and versatility.',
    season: 'Jun - Sep',
    featured: false,
    origin: 'Highland Outgrower Zones',
    shelfLife: '2-4 Months (Cool dry environment)',
    packaging: '50kg Jute Sacks',
    brix: 'High dry matter content',
    img: bentoPotatoImg,
  },
  {
    id: 'papaya',
    name: 'Fresh Papaya',
    category: 'Fruits',
    desc: 'Sweet, export-grade solo papayas cultivated under strict GlobalG.A.P standards.',
    season: 'All Year',
    featured: false,
    origin: 'Rift Valley Orchards',
    shelfLife: '10-14 Days (12°C)',
    packaging: '4.5kg Single Layer Cartons',
    brix: '11° - 13° Brix',
    img: bentoPapayaImg,
  },
  {
    id: 'seeds',
    name: 'Certified Hybrid Seeds',
    category: 'Seeds',
    desc: 'High-germination hybrid and open-pollinated seed varieties processed for member distribution.',
    season: 'Jan - Mar',
    featured: false,
    origin: 'Meki Seed Processing Plant',
    shelfLife: '12-24 Months (Sealed Packets)',
    packaging: '100g / 500g Moisture-proof Foil Packs',
    brix: '98%+ Germination Rate',
    img: redBeanSeedsImg,
  },
]

const HARVEST_CALENDAR = [
  { commodity: 'Rift Valley Tomato', category: 'Vegetable', window: 'Year-round (Peak: Oct-Feb)', availability: 'High' },
  { commodity: 'Red Onion', category: 'Vegetable', window: 'September - December', availability: 'High' },
  { commodity: 'Fresh Papaya', category: 'Fruit', window: 'Year-round', availability: 'Medium' },
  { commodity: 'Certified Seed', category: 'Seed', window: 'January - March (Processing)', availability: 'Seasonal' },
]

function Products() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const filtered =
    activeCategory === 'All'
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.category === activeCategory)

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
      <section className="products-hero section">
        <div className="container products-hero__grid">
          <div className="products-hero__content">
            <h1 className="products-hero__title">
              Cultivated with precision. Exported globally.
            </h1>
            <p className="products-hero__desc">
              Discover our range of premium, certified organic crops and seeds. Grown in the nutrient-rich soils of the Great Rift Valley by our network of cooperative farmers.
            </p>
            <div className="products-hero__actions">
              <a href="#catalog" className="btn btn--primary">
                View Catalog <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
              <Link to="/buyers" className="btn btn--outline">
                Request a Quote <span className="material-symbols-outlined text-sm">description</span>
              </Link>
            </div>
          </div>
          <div className="products-hero__media">
            <img
              src={ourProductHeroImg}
              alt="Fresh harvest of red tomatoes in wooden crate on dark Ethiopian soil"
              className="products-hero__img"
            />
            <div className="products-hero__badge desktop-only">
              <span className="label-caps">GlobalG.A.P Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Product Catalog Section ---- */}
      <section className="products-catalog section section--alt" id="catalog">
        <div className="container">
          <div className="products-catalog__header">
            <h2 className="products-catalog__title">Product Catalog</h2>
            <div className="category-tabs" role="tablist" aria-label="Product categories">
              {CATEGORIES.map((cat) => (
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
                {HARVEST_CALENDAR.map((row) => (
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
