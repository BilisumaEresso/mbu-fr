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
import { resources } from '../data/resources.js'
import ResourceCard from '../components/common/ResourceCard.jsx'
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
  { value: '135', label: 'Primary Co-ops' },
  { value: '8,089', label: 'Member Farmers' },
  { value: '50k+', label: 'Tonnes Sold/Yr' },
  { value: '5', label: 'Retail Outlets' },
]

// Cap stagger at 450ms (5 items × 90ms = 450ms max)
const stagger = (i) => Math.min(i * 90, 450)

function Home() {
  const [showStoryModal, setShowStoryModal] = useState(false)

  // Top 3 recent news articles
  const recentNews = news.slice(0, 3)

  // Partner logos for marquee directory
  const partnerLogos = partners.filter((p) => p.logo)
  const halfLogoCount = Math.ceil(partnerLogos.length / 2)
  const row1Logos = partnerLogos.slice(0, halfLogoCount)
  const row2Logos = partnerLogos.slice(halfLogoCount)

  return (
    <>
      <Helmet>
        <title>Meki Batu Union | Ethiopian Fruit &amp; Vegetable Cooperative</title>
        <meta
          name="description"
          content="Meki Batu Union empowers 135 primary cooperatives and 8,089 member farmers in the Ethiopian Rift Valley to deliver sustainable, export-quality produce worldwide."
        />
      </Helmet>

      {/* 1. Hero Section (enhanced — multi-photo crossfade, video-ready) */}
      <section id="hero" className="home-hero">
        <div className="container home-hero__grid">
          <Reveal className="home-hero__content">
            <h1 className="home-hero__title">
              Trusted Ethiopian fruit &amp; vegetable cooperative since 2002.
            </h1>
            <p className="home-hero__desc">
              Empowering 135 primary cooperatives and 8,089 member farmers across the Great Rift Valley to deliver sustainable, export-quality produce worldwide.
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

      {/* Hero Video Story Modal */}
      {showStoryModal && (
        <div className="hero-crossfade__modal-backdrop" onClick={() => setShowStoryModal(false)}>
          <div className="hero-crossfade__modal" onClick={(e) => e.stopPropagation()}>
            <div className="hero-crossfade__modal-header">
              <h3 className="hero-crossfade__modal-title">Our Story &bull; Meki Batu Union</h3>
              <button
                type="button"
                className="hero-crossfade__modal-close"
                onClick={() => setShowStoryModal(false)}
                aria-label="Close story video"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="hero-crossfade__video-wrap">
              <iframe
                src="https://www.youtube-nocookie.com/embed/6GAUQu7QsCc?autoplay=1&rel=0"
                title="Meki Batu Union Story Video"
                className="hero-crossfade__video-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Section Divider */}
      <SectionDivider />

      {/* 2. Stats bar */}
      <section id="stats" className="home-stats section">
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

      {/* 3. Where We Operate */}
      <div id="where-we-operate">
        <WhereWeOperate />
      </div>

      {/* 4. Featured products */}
      <section id="products" className="home-bento section">
        <div className="container">
          <div className="home-bento__header">
            <div>
              <h2 className="home-bento__title">Export Quality Produce</h2>
              <p className="home-bento__desc">
                Fresh produce sourced directly from our member cooperatives, ensuring quality and fair trade.
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
      <section id="process" className="home-process section" aria-label="Quality and Logistics Pipeline">
        <div className="container">
          <Reveal>
            <div className="home-process__header">
              <div>
                <span className="label-caps label-caps--secondary mb-2 block">Quality &amp; Logistics Pipeline</span>
                <h2 className="home-process__title">From Farm to Export</h2>
                <p className="home-process__desc">
                  Integrated sorting, cleaning, cold-chain stabilization, and certified air freight connecting 135 member cooperatives to global export markets.
                </p>
              </div>
              <Link to="/buyers" className="home-process__link">
                Explore specifications <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </Reveal>

          <div className="home-process__grid">
            {[
              {
                num: '01',
                icon: 'verified',
                title: 'Grading & Intake',
                tag: 'Field Intake',
                desc: 'Rigorous physical intake inspection, moisture checks, and grade calibration at primary member cooperatives.',
              },
              {
                num: '02',
                icon: 'ac_unit',
                title: 'Cold Stabilization',
                tag: 'Pack House',
                desc: 'Rapid field heat removal, hydro-cooling, and temperature-controlled batch staging at our central union hub.',
              },
              {
                num: '03',
                icon: 'sanitizer',
                title: 'Sanitary Cleaning',
                tag: 'GlobalG.A.P',
                desc: 'Food-safe sanitizing wash lines, organic residue filtration, and GlobalG.A.P compliant sorting protocols.',
              },
              {
                num: '04',
                icon: 'local_shipping',
                title: 'Export Packing',
                tag: 'Global Freight',
                desc: 'Ventilated export cartons and refrigerated reefer dispatch to Ethiopian Airlines air cargo & regional markets.',
              },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 70} className="home-process__card-wrap">
                <article className="home-process__card">
                  <div className="home-process__card-top">
                    <div className="home-process__icon-box">
                      <span className="material-symbols-outlined">{step.icon}</span>
                    </div>
                    <span className="home-process__step-num">{step.num}</span>
                  </div>
                  <div className="home-process__card-body">
                    <span className="home-process__tag">{step.tag}</span>
                    <h3 className="home-process__card-title">{step.title}</h3>
                    <p className="home-process__card-desc">{step.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Link to="/buyers" className="home-process__link mobile-only mt-6">
            Explore specifications <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* 7. Facilities & Infrastructure */}
      <section id="facilities" className="home-resources-infra section" aria-label="Facilities and Infrastructure">
        <div className="container">
          <Reveal>
            <div className="home-resources-infra__header">
              <div>
                <span className="label-caps label-caps--secondary mb-2 block">Operational Backbone</span>
                <h2 className="home-resources-infra__title">Facilities &amp; Fleet</h2>
                <p className="home-resources-infra__desc">
                  Cold storage hubs, refrigerated transport, certified pack houses, and lake irrigation schemes.
                </p>
              </div>
              <Link to="/about#infrastructure" className="btn btn--outline btn--sm home-resources-infra__cta">
                View on About <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </Reveal>

          <div className="home-resources-infra__grid">
            {resources.map((res, i) => (
              <Reveal key={res.id} delay={i * 90}>
                <ResourceCard resource={res} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Two-audience split */}
      <section id="audience" className="home-audience section">
        <div className="container">
          <div className="home-audience__grid">
            <Reveal className="home-audience__card" delay={0}>
              <span className="material-symbols-outlined home-audience__icon">group</span>
              <h2 className="home-audience__card-title">For member cooperatives</h2>
              <p className="home-audience__card-desc">
                Access certified inputs, technical training, and direct market access for 8,089 farmers across 135 cooperatives.
              </p>
              <Link to="/farmers" className="home-audience__link">
                Join the union <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </Reveal>

            <Reveal className="home-audience__card" delay={90}>
              <span className="material-symbols-outlined home-audience__icon">local_shipping</span>
              <h2 className="home-audience__card-title">For buyers &amp; exporters</h2>
              <p className="home-audience__card-desc">
                Source reliable, GlobalG.A.P certified, fully traceable produce directly from Ethiopia's Great Rift Valley.
              </p>
              <Link to="/buyers" className="home-audience__link">
                Partner with us <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 8. Certifications showcase */}
      <section id="certifications" className="home-cert-band section section--alt" aria-label="Certifications and Accreditations">
        <div className="container">
          <Reveal className="home-cert-band__header text-center">
            <span className="label-caps label-caps--secondary mb-2 block">Verified Excellence</span>
            <h2 className="home-cert-band__title">Certified Standards &amp; Traceability</h2>
            <p className="home-cert-band__desc">
              Independent accreditations guaranteeing food safety, sustainable practices, and authorized seed production.
            </p>
          </Reveal>
          <Reveal delay={90}>
            <Certifications />
          </Reveal>
        </div>
      </section>

      {/* 10. Partners & Collaborations */}
      <section id="partners" className="home-partners" aria-label="Complete Partner Directory">
        <div className="container">
          <Reveal className="home-partners__header text-center">
            <span className="label-caps home-partners__eyebrow">
              <span className="material-symbols-outlined text-sm">handshake</span> Strategic Ecosystem &bull; 17+ Organizations
            </span>
            <h2 className="home-partners__title">Complete Partner Directory</h2>
            <p className="home-partners__desc">
              Key institutional and commercial partners supporting our research, cold chain, and export development.
            </p>
          </Reveal>
        </div>

        {/* Full-width edge-to-edge logo marquee (screen-to-screen frame) */}
        <div className="home-partners__marquee-wrapper" aria-label="Partner organizations logo marquee">
          {/* Row 1: Leftward Smooth Scroll */}
          <div className="home-partners__marquee-row home-partners__marquee-row--left">
            <div className="home-partners__marquee-track">
              {[...row1Logos, ...row1Logos].map((partner, idx) => (
                <div
                  key={`r1-${partner.id}-${idx}`}
                  className="home-partners__marquee-item"
                  title={`${partner.name} (${partner.category})`}
                >
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="home-partners__marquee-logo"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Rightward Smooth Scroll */}
          <div className="home-partners__marquee-row home-partners__marquee-row--right">
            <div className="home-partners__marquee-track">
              {[...row2Logos, ...row2Logos].map((partner, idx) => (
                <div
                  key={`r2-${partner.id}-${idx}`}
                  className="home-partners__marquee-item"
                  title={`${partner.name} (${partner.category})`}
                >
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="home-partners__marquee-logo"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container text-center home-partners__footer-action">
          <Reveal delay={150}>
            <Link to="/about#partners" className="btn btn--outline home-partners__full-cta">
              Explore All Partners on About Page <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 11. Testimonials */}
      <div id="testimonials">
        <Testimonials items={TESTIMONIALS} />
      </div>

      {/* 12. Resources quick-links */}
      <section id="resources" className="home-resources">
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
                <p className="home-resources__card-desc">History, cooperative governance, and operational capacity overview.</p>
                <span className="home-resources__action">
                  Download PDF <span className="material-symbols-outlined text-sm">download</span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={90}>
              <Link to="/impact#reports" className="home-resources__card">
                <span className="material-symbols-outlined home-resources__icon">verified</span>
                <h3 className="home-resources__card-title">Certifications &amp; Compliance</h3>
                <p className="home-resources__card-desc">GlobalG.A.P certification and official seed producer documentation.</p>
                <span className="home-resources__action">
                  View Reports <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </Link>
            </Reveal>

            <Reveal delay={180}>
              <Link to="/products" className="home-resources__card">
                <span className="material-symbols-outlined home-resources__icon">grid_view</span>
                <h3 className="home-resources__card-title">Product Catalog</h3>
                <p className="home-resources__card-desc">Full specifications for fresh produce and certified vegetable seeds.</p>
                <span className="home-resources__action">
                  Browse Products <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 13. Latest news */}
      <section id="news" className="home-news">
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
