import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Button from '../components/common/Button.jsx'
import Reveal from '../components/common/Reveal.jsx'
import StatCard from '../components/common/StatCard.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import Testimonials from '../components/common/Testimonial.jsx'
import homeHeroImg from '../assets/images/homeHero.webp'
import bentoTomatoImg from '../assets/images/bentoTomato.webp'
import bentoOnionImg from '../assets/images/bentoOnion.webp'
import bentoGreenPepperImg from '../assets/images/bentoGreenPepper.webp'
import bentoGreenBeansImg from '../assets/images/bentoGreenBeans.webp'
import bentoPapayaImg from '../assets/images/bentoPapaya.webp'
import teamMember1 from '../assets/images/team_member_1.webp'
import teamMember2 from '../assets/images/team_member_2.webp'
import teamMember3 from '../assets/images/team_member_3.webp'
import teamMember4 from '../assets/images/team_member_4.webp'
import teamMember5 from '../assets/images/team_member_5.webp'
import womenFarmer from '../assets/images/womenFarmer.webp'
import './Home.css'

// PLACEHOLDER CONTENT — replace with real buyer/member testimonials and remove the "Example" badge before launch.
const TESTIMONIALS = [
  {
    id: 1,
    name: 'Henrik Vestergaard',
    role: 'Senior Procurement Lead',
    org: 'Nordic Fresh Imports',
    location: 'Copenhagen, Denmark',
    category: 'Export Buyer',
    avatar: teamMember1,
    rating: 5,
    quote:
      'Working with Meki Batu Union has meant consistent quality and reliable export volumes season after season. Their GlobalG.A.P compliance gives our retail buyers total confidence.',
  },
  {
    id: 2,
    name: 'Ato Abebe Tadesse',
    role: 'Primary Co-op Chairman',
    org: 'Batu Farmers Co-op',
    location: 'Dugda Woreda, Oromia',
    category: 'Co-op Member',
    avatar: teamMember3,
    rating: 5,
    quote:
      'The union has helped our 350+ cooperative members access fair minimum pricing, agronomy workshops, and direct cold-chain transport that protects our harvests.',
  },
  {
    id: 3,
    name: 'Sophie Laurent',
    role: 'Sourcing Director',
    org: 'EuroAgri Trade Group',
    location: 'Marseille, France',
    category: 'Export Buyer',
    avatar: teamMember2,
    rating: 5,
    quote:
      'Their Rift Valley tomatoes and green beans set the benchmark for Ethiopian produce exports. Full batch traceability from field to air-freight packing.',
  },
  {
    id: 4,
    name: 'W/ro Chaltu Gemeda',
    role: 'Women Agronomists Lead',
    org: 'Meki Valley Produce Group',
    location: 'East Shewa Zone',
    category: 'Co-op Member',
    avatar: womenFarmer,
    rating: 5,
    quote:
      'Through Meki Batu Union’s capacity building and seed programs, female farmers in our district have doubled their yield and established independent farm revenues.',
  },
  {
    id: 5,
    name: 'Markus Lindner',
    role: 'Category Director',
    org: 'Global Harvest Logistics',
    location: 'Rotterdam, Netherlands',
    category: 'Export Buyer',
    avatar: teamMember5,
    rating: 5,
    quote:
      'Their GlobalG.A.P certification gave us total confidence to build a long-term sourcing relationship. Reliable logistics and prompt export documentation.',
  },
  {
    id: 6,
    name: 'Ato Worku Bekele',
    role: 'Vegetable Seed Producer',
    org: 'Adami Tulu Co-op Network',
    location: 'Ziway / Adami Tulu',
    category: 'Co-op Member',
    avatar: teamMember4,
    rating: 5,
    quote:
      'Access to high-germination hybrid seeds and union mechanization equipment transformed our harvest efficiency. We now export grade-A onions consistently.',
  },
]

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

      {/* GlobalG.A.P Certification Section */}
      <section className="home-cert">
        <div className="container">
          <Reveal className="home-cert__card">
            {/* Badge & heading */}
            <div className="home-cert__header">
              <div className="home-cert__header-text">
                <span className="label-caps home-cert__eyebrow">International Certification</span>
                <h3 className="home-cert__title">
                  GlobalG.A.P Certified
                  <span className="material-symbols-outlined home-cert__verified">verified</span>
                </h3>
                <p className="home-cert__desc">
                  Meeting international standards for safe, sustainable, and traceable agriculture — ensuring every product from our cooperatives is world-market ready.
                </p>
              </div>
            </div>

            {/* Feature highlights */}
            <div className="home-cert__features">
              <div className="home-cert__feature">
                <span className="material-symbols-outlined home-cert__feature-icon">track_changes</span>
                <div>
                  <h4 className="home-cert__feature-title">Full Traceability</h4>
                  <p className="home-cert__feature-desc">Field-to-export batch tracking on every shipment.</p>
                </div>
              </div>
              <div className="home-cert__feature">
                <span className="material-symbols-outlined home-cert__feature-icon">health_and_safety</span>
                <div>
                  <h4 className="home-cert__feature-title">Food Safety</h4>
                  <p className="home-cert__feature-desc">Rigorous hygiene, handling, and residue testing protocols.</p>
                </div>
              </div>
              <div className="home-cert__feature">
                <span className="material-symbols-outlined home-cert__feature-icon">eco</span>
                <div>
                  <h4 className="home-cert__feature-title">Sustainability</h4>
                  <p className="home-cert__feature-desc">Responsible water, soil, and biodiversity stewardship.</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="home-cert__actions">
              <Link to="/impact" className="btn btn--primary home-cert__btn">
                View our certifications <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <a
                href="https://globalgap.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="home-cert__ext-link"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                Learn about GlobalG.A.P
              </a>
            </div>
          </Reveal>
        </div>
      </section>

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

      {/* Testimonials Section */}
      <Testimonials items={TESTIMONIALS} />
    </>
  )
}

export default Home
