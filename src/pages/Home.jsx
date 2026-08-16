import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Button from '../components/common/Button.jsx'
import Reveal from '../components/common/Reveal.jsx'
import StatCard from '../components/common/StatCard.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import homeHeroImg from '../assets/images/homeHero.webp'
import bentoTomatoImg from '../assets/images/bentoTomato.webp'
import bentoOnionImg from '../assets/images/bentoOnion.webp'
import bentoGreenPepperImg from '../assets/images/bentoGreenPepper.webp'
import bentoGreenBeansImg from '../assets/images/bentoGreenBeans.webp'
import bentoPapayaImg from '../assets/images/bentoPapaya.webp'
import './Home.css'

const STATS = [
  { value: '140+', label: 'Primary Co-ops' },
  { value: '50k+', label: 'Tonnes Sold/Yr' },
  { value: '5', label: 'Retail Outlets' },
  { value: 'EU', label: 'Export Markets' },
]

// Cap stagger at 450ms (5 items × 90ms = 450ms max)
const stagger = (i) => Math.min(i * 90, 450)

function Home() {
  return (
    <>
      <Helmet>
        <title>Meki Batu Union | Ethiopian Fruit &amp; Vegetable Cooperative</title>
        <meta
          name="description"
          content="Meki Batu Union empowers over 140 primary cooperatives and 50,000 farmers in the Ethiopian Rift Valley to deliver sustainable, export-quality produce worldwide."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="home-hero">
        <div className="container home-hero__grid">
          {/* Hero text block as a single Reveal unit */}
          <Reveal className="home-hero__content">
            <h1 className="home-hero__title">
              Trusted Ethiopian fruit &amp; vegetable cooperative since 2002.
            </h1>
            <p className="home-hero__desc">
              Empowering 140+ primary cooperatives and over 50,000 farmers in the Great Rift Valley. Delivering sustainable, export-quality produce to the world.
            </p>
            <div className="home-hero__actions">
              <Button to="/products" variant="primary">
                View our products <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Button>
              <Button to="/buyers" variant="outline">
                Request a quote <span className="material-symbols-outlined text-sm">description</span>
              </Button>
            </div>
          </Reveal>
          {/* Hero image — not animated separately */}
          <div className="home-hero__media">
            <img
              className="home-hero__img"
              src={homeHeroImg}
              alt="Lush vegetable farm in the Ethiopian Rift Valley Meki region"
            />
            <div className="home-hero__badge">
              <span className="label-caps">Meki, Oromia Region</span>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Stats Section — stagger each StatCard via Reveal */}
      <section className="home-stats section">
        <div className="container">
          <div className="home-stats__grid">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={stagger(i)}>
                <StatCard value={s.value} label={s.label} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Strip — one Reveal, whole unit */}
      <Reveal as="section" className="home-cert">
        <div className="container home-cert__inner">
          <div className="home-cert__info">
            <span className="material-symbols-outlined home-cert__icon">verified</span>
            <div>
              <h3 className="home-cert__title">GlobalG.A.P Certified</h3>
              <p className="home-cert__desc">
                Meeting international standards for safe and sustainable agriculture.
              </p>
            </div>
          </div>
          <Link to="/about" className="btn btn--outline home-cert__btn">
            View Certificate
          </Link>
        </div>
      </Reveal>

      {/* Featured Products Bento Grid — stagger each tile */}
      <section className="home-bento section">
        <div className="container">
          <div className="home-bento__header">
            <div>
              <h2 className="home-bento__title">Export Quality Produce</h2>
              <p className="home-bento__desc">
                Sourced directly from our member cooperatives, ensuring freshness, quality, and fair trade.
              </p>
            </div>
            <Link to="/products" className="home-bento__link desktop-only">
              View full catalog <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="home-bento__grid">
            {/* Large Item */}
            <Reveal className="home-bento__item home-bento__item--large" delay={0}>
              <img src={bentoTomatoImg} alt="Rift Valley Tomatoes" className="home-bento__img" />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <span className="label-caps label-caps--white mb-2">Export Grade</span>
                <h3 className="home-bento__item-title text-xl">Rift Valley Tomatoes</h3>
              </div>
            </Reveal>

            {/* Small Item 1 */}
            <Reveal className="home-bento__item home-bento__item--small" delay={90}>
              <img src={bentoOnionImg} alt="Red Onions" className="home-bento__img" />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <h3 className="home-bento__item-title">Red Onions</h3>
              </div>
            </Reveal>

            {/* Small Item 2 */}
            <Reveal className="home-bento__item home-bento__item--small" delay={180}>
              <img src={bentoGreenPepperImg} alt="Green Peppers" className="home-bento__img" />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <h3 className="home-bento__item-title">Green Peppers</h3>
              </div>
            </Reveal>

            {/* Wide Item 1 */}
            <Reveal className="home-bento__item home-bento__item--wide" delay={270}>
              <img src={bentoGreenBeansImg} alt="Green Beans" className="home-bento__img" />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <h3 className="home-bento__item-title">Green Beans</h3>
              </div>
            </Reveal>

            {/* Wide Item 2 */}
            <Reveal className="home-bento__item home-bento__item--wide" delay={360}>
              <img src={bentoPapayaImg} alt="Papaya" className="home-bento__img" />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <h3 className="home-bento__item-title">Papaya</h3>
              </div>
            </Reveal>
          </div>

          <Link to="/products" className="home-bento__link mobile-only mt-6">
            View full catalog <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* Audience Split — two cards with small stagger */}
      <section className="home-audience section">
        <div className="container">
          <div className="home-audience__grid">
            <Reveal className="home-audience__card" delay={0}>
              <span className="material-symbols-outlined home-audience__icon">group</span>
              <h2 className="home-audience__card-title">For member cooperatives</h2>
              <p className="home-audience__card-desc">
                Access agricultural inputs, training, and direct market linkages. We support our members in improving yields and ensuring sustainable livelihoods.
              </p>
              <Link to="/farmers" className="home-audience__link">
                Join the union <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </Reveal>

            <Reveal className="home-audience__card" delay={90}>
              <span className="material-symbols-outlined home-audience__icon">local_shipping</span>
              <h2 className="home-audience__card-title">For buyers &amp; exporters</h2>
              <p className="home-audience__card-desc">
                Source reliable, certified, and traceable produce directly from the heart of Ethiopia's agricultural hub. Consistent quality and volume guaranteed.
              </p>
              <Link to="/buyers" className="home-audience__link">
                Partner with us <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
