import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Button from '../components/common/Button.jsx'
import Reveal from '../components/common/Reveal.jsx'
import StatCard from '../components/common/StatCard.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import Testimonials from '../components/common/Testimonial.jsx'
import HeroCrossfade from '../components/common/HeroCrossfade.jsx'
import WhereWeOperate from '../components/common/WhereWeOperate.jsx'
import Certifications from '../components/common/Certifications.jsx'

/* ── hero assets ── */
import homeHeroImg from '../assets/images/heroes/homeHero.webp'
import aboutHeroImg from '../assets/images/heroes/aboutHero.webp'
import farmerHeroImg from '../assets/images/heroes/farmerHero.webp'
import womenFarmerImg from '../assets/images/community/womenFarmer.webp'
import buyerHeroImg from '../assets/images/heroes/buyerHero.webp'

/* ── bento assets ── */
import bentoTomatoImg from '../assets/images/products/bentoTomato.webp'
import bentoOnionImg from '../assets/images/products/bentoOnion.webp'
import bentoGreenPepperImg from '../assets/images/products/bentoGreenPepper.webp'
import bentoGreenBeansImg from '../assets/images/products/bentoGreenBeans.webp'
import bentoPapayaImg from '../assets/images/products/bentoPapaya.webp'

/* ── testimonial avatar assets ── */
import teamMember1 from '../assets/images/team/team_member_1.webp'
import teamMember2 from '../assets/images/team/team_member_2.webp'
import teamMember3 from '../assets/images/team/team_member_3.webp'
import teamMember4 from '../assets/images/team/team_member_4.webp'
import teamMember5 from '../assets/images/team/team_member_5.webp'

/* ── downloads & data ── */
import companyProfilePdf from '../assets/downloads/MekiBatuUnion_CompanyProfile.pdf'
import { news } from '../data/news.js'
import { partners } from '../data/partners.js'
import './Home.css'

const HERO_IMAGES = [
  { src: homeHeroImg, alt: 'Aerial view of irrigated farmland near Lake Ziway' },
  { src: aboutHeroImg, alt: 'Fertile Ethiopian agricultural land during golden hour' },
  { src: farmerHeroImg, alt: 'Cooperative farmer harvesting fresh produce' },
  { src: womenFarmerImg, alt: 'Women farmers working in cooperative fields' },
  { src: buyerHeroImg, alt: 'Export quality produce being sorted and packed' },
]

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
    avatar: womenFarmerImg,
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
  { value: '153', label: 'Primary Co-ops' },
  { value: '8,410', label: 'Member Farmers' },
  { value: '50k+', label: 'Tonnes Sold/Yr' },
  { value: '5', label: 'Retail Outlets' },
]

// Cap stagger at 450ms (5 items × 90ms = 450ms max)
const stagger = (i) => Math.min(i * 90, 450)

function Home() {
  const [showStoryModal, setShowStoryModal] = useState(false)

  // Top 3 recent news articles
  const recentNews = news.slice(0, 3)

  return (
    <>
      <Helmet>
        <title>Meki Batu Union | Ethiopian Fruit &amp; Vegetable Cooperative</title>
        <meta
          name="description"
          content="Meki Batu Union empowers 153 primary cooperatives and 8,410 member farmers in the Ethiopian Rift Valley to deliver sustainable, export-quality produce worldwide."
        />
      </Helmet>

      {/* 1. Hero Section (enhanced — multi-photo crossfade, video-ready) */}
      <section className="home-hero">
        <div className="container home-hero__grid">
          <Reveal className="home-hero__content">
            <h1 className="home-hero__title">
              Trusted Ethiopian fruit &amp; vegetable cooperative since 2002.
            </h1>
            <p className="home-hero__desc">
              Empowering 153 primary cooperatives and 8,410 member farmers across the Great Rift Valley. Delivering sustainable, export-quality produce to the world.
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
          <div className="home-hero__media">
            <HeroCrossfade
              images={HERO_IMAGES}
              onPlayClick={() => setShowStoryModal(true)}
            />
            <div className="home-hero__badge">
              <span className="label-caps">Meki, Oromia Region</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video-ready Modal */}
      {showStoryModal && (
        <div className="hero-crossfade__modal-backdrop" onClick={() => setShowStoryModal(false)}>
          <div className="hero-crossfade__modal" onClick={(e) => e.stopPropagation()}>
            <span className="material-symbols-outlined hero-crossfade__modal-icon">movie</span>
            <h3 className="hero-crossfade__modal-text">Our story video is coming soon</h3>
            <Button variant="primary" onClick={() => setShowStoryModal(false)}>
              Dismiss
            </Button>
          </div>
        </div>
      )}

      {/* Section Divider (kept sparingly per original design pattern) */}
      <SectionDivider />

      {/* 2. Stats bar (existing, unchanged) */}
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

      {/* 3. Where We Operate (new) */}
      <WhereWeOperate />

      {/* 4. Certifications & Compliance */}
      <section className="home-cert">
        <div className="container">
          <Reveal className="home-cert__band">
            <div className="home-cert__dots" aria-hidden="true" />
            <div className="home-cert__header">
              <span className="label-caps home-cert__eyebrow">Certifications &amp; Compliance</span>
              <h3 className="home-cert__title">Our Credentials</h3>
              <p className="home-cert__desc">
                Verified by international and national authorities for food safety, sustainable farming, and certified seed production.
              </p>
            </div>
            <Certifications />
          </Reveal>
        </div>
      </section>

      {/* 5. Featured products (existing, unchanged) */}
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
            <Reveal className="home-bento__item home-bento__item--large" delay={0}>
              <img src={bentoTomatoImg} alt="Rift Valley Tomatoes" className="home-bento__img" />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <span className="label-caps label-caps--white mb-2">Export Grade</span>
                <h3 className="home-bento__item-title text-xl">Rift Valley Tomatoes</h3>
              </div>
            </Reveal>

            <Reveal className="home-bento__item home-bento__item--small" delay={90}>
              <img src={bentoOnionImg} alt="Red Onions" className="home-bento__img" />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <h3 className="home-bento__item-title">Red Onions</h3>
              </div>
            </Reveal>

            <Reveal className="home-bento__item home-bento__item--small" delay={180}>
              <img src={bentoGreenPepperImg} alt="Green Peppers" className="home-bento__img" />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <h3 className="home-bento__item-title">Green Peppers</h3>
              </div>
            </Reveal>

            <Reveal className="home-bento__item home-bento__item--wide" delay={270}>
              <img src={bentoGreenBeansImg} alt="Green Beans" className="home-bento__img" />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <h3 className="home-bento__item-title">Green Beans</h3>
              </div>
            </Reveal>

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

      {/* 6. Our Process — From Farm to Export */}
      <section className="home-process">
        <div className="container">
          <Reveal>
            <div className="home-process__card">
              {/* Decorative dot grid overlay */}
              <div className="home-process__dots" aria-hidden="true" />

              <div className="home-process__header">
                <div>
                  <span className="label-caps home-process__eyebrow">Quality &amp; Logistics</span>
                  <h2 className="home-process__title">From Farm to Export</h2>
                  <p className="home-process__subtitle">
                    From 153 primary cooperatives through our pack house to domestic and export markets.
                  </p>
                </div>
                <Link to="/buyers" className="home-process__cta">
                  See full process <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>

              <div className="home-process__steps">
                <div className="home-process__seg home-process__seg--1" aria-hidden="true" />
                <div className="home-process__seg home-process__seg--2" aria-hidden="true" />
                <div className="home-process__seg home-process__seg--3" aria-hidden="true" />

                {[
                  { num: '01', icon: 'verified', title: 'Grading', desc: 'Intake inspection and multi-tier grade calibration from 153 primary cooperatives.' },
                  { num: '02', icon: 'inventory_2', title: 'Processing', desc: 'Field heat removal and post-harvest batch stabilization at the union pack house.' },
                  { num: '03', icon: 'sanitizer', title: 'Cleaning', desc: 'Sanitary washing and residue compliance strictly meeting GlobalG.A.P standards.' },
                  { num: '04', icon: 'local_shipping', title: 'Packing', desc: 'Packed into ventilated cartons and shipped to five Addis Ababa outlets or European export markets.' },
                ].map((step, i) => (
                  <Reveal key={step.num} delay={i * 120} className="home-process__step">
                    <div className="home-process__node">
                      <div className="home-process__circle">
                        <span className="material-symbols-outlined home-process__icon">{step.icon}</span>
                      </div>
                      <span className="home-process__num">Step {step.num}</span>
                    </div>
                    <h3 className="home-process__step-title">{step.title}</h3>
                    <p className="home-process__step-desc">{step.desc}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7. Two-audience split (existing, unchanged) */}
      <section className="home-audience section">
        <div className="container">
          <div className="home-audience__grid">
            <Reveal className="home-audience__card" delay={0}>
              <span className="material-symbols-outlined home-audience__icon">group</span>
              <h2 className="home-audience__card-title">For member cooperatives</h2>
              <p className="home-audience__card-desc">
                Access agricultural inputs, training, and direct market linkages. Supporting 8,410 member farmers across 153 primary cooperatives to improve yields and ensure sustainable livelihoods.
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

      {/* 8. Governance teaser (new, enhanced UI/UX) */}
      <section className="home-governance">
        <div className="container">
          <Reveal>
            <div className="home-governance__card">
              <div className="home-governance__header-row">
                <div className="home-governance__badges">
                  <span className="label-caps home-governance__eyebrow">Governance &amp; Leadership</span>
                  <span className="home-governance__badge">
                    <span className="material-symbols-outlined text-xs">groups</span> 500+ Staff &amp; Agronomists
                  </span>
                </div>
                <div className="home-governance__avatars" aria-label="Union Leadership &amp; Staff">
                  <img src={teamMember1} alt="General Manager" className="home-governance__avatar" />
                  <img src={teamMember2} alt="Head of Operations" className="home-governance__avatar" />
                  <img src={teamMember3} alt="Chief Agronomist" className="home-governance__avatar" />
                  <img src={teamMember4} alt="Finance &amp; Admin Director" className="home-governance__avatar" />
                  <img src={teamMember5} alt="Supply Chain Lead" className="home-governance__avatar" />
                </div>
              </div>

              <div className="home-governance__body">
                <h2 className="home-governance__title">Led by Experienced Leadership Across 5+ Departments</h2>
                <div className="home-governance__chips">
                  <span className="home-governance__chip">General Management</span>
                  <span className="home-governance__chip">Operations</span>
                  <span className="home-governance__chip">Agronomy</span>
                  <span className="home-governance__chip">Finance &amp; Admin</span>
                  <span className="home-governance__chip">Supply Chain &amp; Logistics</span>
                </div>
              </div>

              <div className="home-governance__footer">
                <Button to="/about#leadership" variant="outline" className="home-governance__link">
                  Meet our leadership <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. Partners & Collaborations (new) */}
      <section className="home-partners" aria-label="Partners and Collaborations">
        <div className="container">
          <Reveal>
            <div className="home-partners__header">
              <span className="label-caps home-partners__eyebrow">Our Partners</span>
              <h2 className="home-partners__title">Trusted Collaborations Driving Impact</h2>
              <p className="home-partners__desc">
                We work alongside leading development organisations, financial institutions, and investment programmes to strengthen our value chain and empower our member farmers.
              </p>
            </div>
          </Reveal>

          <div className="home-partners__grid">
            {partners.slice(0, 8).map((p, i) => (
              <Reveal key={p} delay={i * 60}>
                <div className="home-partners__card">
                  <span className="material-symbols-outlined home-partners__icon">handshake</span>
                  <h3 className="home-partners__name">{p}</h3>
                </div>
              </Reveal>
            ))}
            <Reveal delay={8 * 60}>
              <Link to="/about#partners" className="home-partners__card home-partners__card--more">
                <span className="material-symbols-outlined home-partners__icon">add_circle</span>
                <h3 className="home-partners__name">+ 9 More Partners</h3>
                <span className="home-partners__visit">
                  View full network <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 10. Testimonials (existing, unchanged) */}
      <Testimonials items={TESTIMONIALS} />

      {/* 11. Resources quick-links (new) */}
      <section className="home-resources">
        <div className="container">
          <Reveal className="home-resources__header">
            <span className="label-caps label-caps--secondary mb-2 block">Documentation</span>
            <h2 className="home-resources__title">Key Resources &amp; Downloads</h2>
          </Reveal>

          <div className="home-resources__grid">
            <Reveal delay={0}>
              <a
                href={companyProfilePdf}
                download="MekiBatuUnion_CompanyProfile.pdf"
                className="home-resources__card"
                title="Download Meki Batu Union Company Profile (PDF)"
              >
                <span className="material-symbols-outlined home-resources__icon">description</span>
                <h3 className="home-resources__card-title">Company Profile</h3>
                <p className="home-resources__card-desc">Comprehensive overview of our history, cooperative network, and operational capacity.</p>
                <span className="home-resources__action">
                  Download PDF <span className="material-symbols-outlined text-sm">download</span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={90}>
              <Link to="/impact#reports" className="home-resources__card">
                <span className="material-symbols-outlined home-resources__icon">verified</span>
                <h3 className="home-resources__card-title">Certifications &amp; Compliance</h3>
                <p className="home-resources__card-desc">Our GlobalG.A.P certification and Oromia seed producer license documentation.</p>
                <span className="home-resources__action">
                  View Reports <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </Link>
            </Reveal>

            <Reveal delay={180}>
              <Link to="/products" className="home-resources__card">
                <span className="material-symbols-outlined home-resources__icon">grid_view</span>
                <h3 className="home-resources__card-title">Product Catalog</h3>
                <p className="home-resources__card-desc">Full specifications for our fresh fruits, vegetables, and certified seeds.</p>
                <span className="home-resources__action">
                  Browse Products <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 12. Latest news (new) */}
      <section className="home-news">
        <div className="container">
          <Reveal className="home-news__header">
            <div>
              <span className="label-caps label-caps--secondary mb-2 block">Updates &amp; Insights</span>
              <h2 className="home-news__title">Latest News</h2>
            </div>
            <Link to="/news" className="home-bento__link">
              View all news <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </Reveal>

          <div className="home-news__grid">
            {recentNews.map((article, i) => (
              <Reveal key={article.id} delay={stagger(i)}>
                <Link to="/news" className="home-news__card">
                  <img src={article.img} alt={article.title} className="home-news__img" />
                  <div className="home-news__card-body">
                    <div className="home-news__meta">
                      <span>{article.category}</span>
                      <span>&bull;</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="home-news__card-title">{article.title}</h3>
                    <p className="home-news__excerpt">{article.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
