import { useState } from 'react'
import PageHero from '../components/common/PageHero.jsx'
import Button from '../components/common/Button.jsx'
import ProductCard from '../components/common/ProductCard.jsx'
import { products, categories } from '../data/products.js'
import './InnerPage.css'
import './Home.css' // reuses .product-grid

function Products() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <>
      <PageHero
        eyebrow="Our products"
        title="What our 140+ member cooperatives grow"
        description="Fruits, vegetables, and certified seeds, produced to GlobalG.A.P standards across Dugda woreda and Adami Tulu Jido Kombolcha."
      />

      <section className="section">
        <div className="container">
          <div className="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-tab ${activeCategory === cat ? 'category-tab--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                name={p.name}
                tag={p.tag}
                imageLabel={`REPLACE WITH REAL PHOTO — ${p.name}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Interested in sourcing from us?</h2>
          <p style={{ maxWidth: 480, margin: '0 auto var(--space-6)' }}>
            Get in touch with volumes, destination, and timelines and our team will follow up.
          </p>
          <Button to="/buyers" variant="primary">Request a quote</Button>
        </div>
      </section>
    </>
  )
}

export default Products
