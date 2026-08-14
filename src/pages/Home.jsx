import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Button from '../components/common/Button.jsx'
import homeHeroImg from '../assets/images/homeHero.jpg'
import bentoTomatoImg from '../assets/images/bentoTomato.jpg'
import bentoOnionImg from '../assets/images/bentoOnion.jpg'
import bentoGreenPepperImg from '../assets/images/bentoGreenPepper.jpg'
import bentoGreenBeansImg from '../assets/images/bentoGreenBeans.jpg'
import bentoPapayaImg from '../assets/images/bentoPapaya.jpg'
import './Home.css'

const STATS = [
  { value: '140+', label: 'Primary Co-ops' },
  { value: '50k+', label: 'Tonnes Sold/Yr' },
  { value: '5', label: 'Retail Outlets' },
  { value: 'EU', label: 'Export Markets' },
]

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
          <div className="home-hero__content">
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
          </div>
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

      {/* Stats Section */}
      <section className="home-stats section">
        <div className="container">
          <div className="home-stats__grid">
            {STATS.map((s) => (
              <div key={s.label} className="home-stats__card">
                <div className="home-stats__value">{s.value}</div>
                <div className="home-stats__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Strip */}
      <section className="home-cert">
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
      </section>

      {/* Featured Products Bento Grid */}
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
            <div className="home-bento__item home-bento__item--large">
              <img
                src={bentoTomatoImg}
                alt="Rift Valley Tomatoes"
                className="home-bento__img"
              />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <span className="label-caps label-caps--white mb-2">Export Grade</span>
                <h3 className="home-bento__item-title text-xl">Rift Valley Tomatoes</h3>
              </div>
            </div>

            {/* Small Item 1 */}
            <div className="home-bento__item home-bento__item--small">
              <img
                src={bentoOnionImg}
                alt="Red Onions"
                className="home-bento__img"
              />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <h3 className="home-bento__item-title">Red Onions</h3>
              </div>
            </div>

            {/* Small Item 2 */}
            <div className="home-bento__item home-bento__item--small">
              <img
                src={bentoGreenPepperImg}
                alt="Green Peppers"
                className="home-bento__img"
              />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <h3 className="home-bento__item-title">Green Peppers</h3>
              </div>
            </div>

            {/* Wide Item 1 */}
            <div className="home-bento__item home-bento__item--wide">
              <img
                src={bentoGreenBeansImg}
                alt="Green Beans"
                className="home-bento__img"
              />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <h3 className="home-bento__item-title">Green Beans</h3>
              </div>
            </div>

            {/* Wide Item 2 */}
            <div className="home-bento__item home-bento__item--wide">
              <img
                src={bentoPapayaImg}
                alt="Papaya"
                className="home-bento__img"
              />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <h3 className="home-bento__item-title">Papaya</h3>
              </div>
            </div>
          </div>

          <Link to="/products" className="home-bento__link mobile-only mt-6">
            View full catalog <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* Audience Split */}
      <section className="home-audience section">
        <div className="container">
          <div className="home-audience__grid">
            <div className="home-audience__card">
              <span className="material-symbols-outlined home-audience__icon">group</span>
              <h2 className="home-audience__card-title">For member cooperatives</h2>
              <p className="home-audience__card-desc">
                Access agricultural inputs, training, and direct market linkages. We support our members in improving yields and ensuring sustainable livelihoods.
              </p>
              <Link to="/farmers" className="home-audience__link">
                Join the union <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            <div className="home-audience__card">
              <span className="material-symbols-outlined home-audience__icon">local_shipping</span>
              <h2 className="home-audience__card-title">For buyers &amp; exporters</h2>
              <p className="home-audience__card-desc">
                Source reliable, certified, and traceable produce directly from the heart of Ethiopia's agricultural hub. Consistent quality and volume guaranteed.
              </p>
              <Link to="/buyers" className="home-audience__link">
                Partner with us <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
