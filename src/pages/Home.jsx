import { Link } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import StatCard from '../components/common/StatCard.jsx'
import ProductCard from '../components/common/ProductCard.jsx'
import { products } from '../data/products.js'
import { news } from '../data/news.js'
import './Home.css'

const STATS = [
  { value: '140+', label: 'Primary member cooperatives' },
  { value: '50,000t', label: 'Sold per year' },
  { value: '5', label: 'Addis Ababa retail outlets' },
  { value: 'EU', label: 'Export markets' },
]

function Home() {
  const featured = products.slice(0, 6)

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <span className="eyebrow">Est. 2002 · Oromia, Ethiopia</span>
          <h1>Fresh produce, grown by 140+ cooperatives, trusted across Ethiopia and Europe</h1>
          <p className="hero__desc">
            GlobalG.A.P certified fruits, vegetables, and seeds from Meki Batu Union's member farmers.
          </p>
          <div className="hero__actions">
            <Button to="/products" variant="primary">View our products</Button>
            <Button to="/buyers" variant="outline">Request a quote</Button>
          </div>
        </div>
        <div className="img-placeholder hero__image">
          REPLACE WITH REAL PHOTO — Meki Batu farmland / harvest
        </div>
      </section>

      <section className="section">
        <div className="container stats-grid">
          {STATS.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Featured products</span>
            <h2>What our members grow</h2>
          </div>
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} name={p.name} tag={p.tag} imageLabel={`REPLACE WITH REAL PHOTO — ${p.name}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container audience-grid">
          <Link to="/farmers" className="audience-card">
            <p className="audience-card__title">For member cooperatives</p>
            <p>Inputs, credit access, training, and mechanization support for our 140+ member cooperatives.</p>
            <span className="audience-card__link">Learn more →</span>
          </Link>
          <Link to="/buyers" className="audience-card">
            <p className="audience-card__title">For buyers &amp; exporters</p>
            <p>Certified volumes, reliable logistics, and direct sourcing from Ethiopia's fruit and vegetable belt.</p>
            <span className="audience-card__link">Learn more →</span>
          </Link>
        </div>
      </section>

      <section className="section section--alt cert-strip">
        <div className="container cert-strip__inner">
          <div className="img-placeholder cert-strip__badge">GlobalG.A.P logo</div>
          <p>
            Meki Batu Union is <strong>GlobalG.A.P certified</strong>, meeting international standards
            for food safety, traceability, and responsible farming practice.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Latest news</span>
            <h2>What's happening at the union</h2>
          </div>
          <div className="news-grid">
            {news.slice(0, 3).map((n) => (
              <article key={n.id} className="news-card">
                <div className="img-placeholder news-card__image">REPLACE WITH REAL PHOTO</div>
                <p className="news-card__date">{new Date(n.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                <p className="news-card__title">{n.title}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
