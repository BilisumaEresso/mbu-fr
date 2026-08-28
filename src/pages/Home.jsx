import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import Button from '../components/common/Button.jsx'
import Reveal from '../components/common/Reveal.jsx'
import StatCard from '../components/common/StatCard.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import Testimonials from '../components/common/Testimonial.jsx'
import HeroCrossfade from '../components/common/HeroCrossfade.jsx'
import WhereWeOperate from '../components/common/WhereWeOperate.jsx'
import Certifications from '../components/common/Certifications.jsx'
import { getLocalePath } from '../utils/locale.js'

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

const getHeroImages = (t) => [
  { src: homeHeroImg, alt: t('home:hero.images.aerial', 'Aerial view of irrigated farmland near Lake Ziway') },
  { src: aboutHeroImg, alt: t('home:hero.images.fertile', 'Fertile Ethiopian agricultural land during golden hour') },
  { src: farmerHeroImg, alt: t('home:hero.images.farmer', 'Cooperative farmer harvesting fresh produce') },
  { src: womenFarmerImg, alt: t('home:hero.images.women', 'Women farmers working in cooperative fields') },
  { src: buyerHeroImg, alt: t('home:hero.images.buyer', 'Export quality produce being sorted and packed') },
]

// PLACEHOLDER CONTENT — replace with real buyer/member testimonials and remove the "Example" badge before launch.
const getTestimonials = (t) => [
  {
    id: 1,
    name: 'Henrik Vestergaard',
    role: t('home:testimonials.items.t1.role', 'Senior Procurement Lead'),
    org: t('home:testimonials.items.t1.org', 'Nordic Fresh Imports'),
    location: t('home:testimonials.items.t1.location', 'Copenhagen, Denmark'),
    category: t('home:testimonials.items.t1.category', 'Export Buyer'),
    avatar: teamMember1,
    rating: 5,
    quote: t('home:testimonials.items.t1.quote', 'Working with Meki Batu Union has meant consistent quality and reliable export volumes season after season. Their GlobalG.A.P compliance gives our retail buyers total confidence.'),
  },
  {
    id: 2,
    name: 'Ato Abebe Tadesse',
    role: t('home:testimonials.items.t2.role', 'Primary Co-op Chairman'),
    org: t('home:testimonials.items.t2.org', 'Batu Farmers Co-op'),
    location: t('home:testimonials.items.t2.location', 'Dugda Woreda, Oromia'),
    category: t('home:testimonials.items.t2.category', 'Co-op Member'),
    avatar: teamMember3,
    rating: 5,
    quote: t('home:testimonials.items.t2.quote', 'The union has helped our 350+ cooperative members access fair minimum pricing, agronomy workshops, and direct cold-chain transport that protects our harvests.'),
  },
  {
    id: 3,
    name: 'Sophie Laurent',
    role: t('home:testimonials.items.t3.role', 'Sourcing Director'),
    org: t('home:testimonials.items.t3.org', 'EuroAgri Trade Group'),
    location: t('home:testimonials.items.t3.location', 'Marseille, France'),
    category: t('home:testimonials.items.t3.category', 'Export Buyer'),
    avatar: teamMember2,
    rating: 5,
    quote: t('home:testimonials.items.t3.quote', 'Their Rift Valley tomatoes and green beans set the benchmark for Ethiopian produce exports. Full batch traceability from field to air-freight packing.'),
  },
  {
    id: 4,
    name: 'W/ro Chaltu Gemeda',
    role: t('home:testimonials.items.t4.role', 'Women Agronomists Lead'),
    org: t('home:testimonials.items.t4.org', 'Meki Valley Produce Group'),
    location: t('home:testimonials.items.t4.location', 'East Shewa Zone'),
    category: t('home:testimonials.items.t4.category', 'Co-op Member'),
    avatar: womenFarmerImg,
    rating: 5,
    quote: t('home:testimonials.items.t4.quote', 'Through Meki Batu Union’s capacity building and seed programs, female farmers in our district have doubled their yield and established independent farm revenues.'),
  },
  {
    id: 5,
    name: 'Markus Lindner',
    role: t('home:testimonials.items.t5.role', 'Category Director'),
    org: t('home:testimonials.items.t5.org', 'Global Harvest Logistics'),
    location: t('home:testimonials.items.t5.location', 'Rotterdam, Netherlands'),
    category: t('home:testimonials.items.t5.category', 'Export Buyer'),
    avatar: teamMember5,
    rating: 5,
    quote: t('home:testimonials.items.t5.quote', 'Their GlobalG.A.P certification gave us total confidence to build a long-term sourcing relationship. Reliable logistics and prompt export documentation.'),
  },
  {
    id: 6,
    name: 'Ato Worku Bekele',
    role: t('home:testimonials.items.t6.role', 'Vegetable Seed Producer'),
    org: t('home:testimonials.items.t6.org', 'Adami Tulu Co-op Network'),
    location: t('home:testimonials.items.t6.location', 'Ziway / Adami Tulu'),
    category: t('home:testimonials.items.t6.category', 'Co-op Member'),
    avatar: teamMember4,
    rating: 5,
    quote: t('home:testimonials.items.t6.quote', 'Access to high-germination hybrid seeds and union mechanization equipment transformed our harvest efficiency. We now export grade-A onions consistently.'),
  },
]

// Cap stagger at 450ms (5 items × 90ms = 450ms max)
const stagger = (i) => Math.min(i * 90, 450)

function Home() {
  const { t, i18n } = useTranslation(['home', 'meta', 'common'])
  const currentLang = i18n.language || 'en'
  const [showStoryModal, setShowStoryModal] = useState(false)

  const stats = [
    { value: '135', label: t('home:hero.stats.coops', 'Primary Co-ops') },
    { value: '8,089', label: t('home:hero.stats.farmers', 'Member Farmers') },
    { value: '50k+', label: t('impact:metrics.stats.volume', 'Annual Produce Volume') },
    { value: '5', label: t('common:header.nav.retailOutlets', 'Retail Outlets') },
  ]

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
        <title>{t('meta:home.title')}</title>
        <meta
          name="description"
          content={t('meta:home.description')}
        />
      </Helmet>

      {/* 1. Hero Section (enhanced — multi-photo crossfade, video-ready) */}
      <section id="hero" className="home-hero">
        <div className="container home-hero__grid">
          <Reveal className="home-hero__content">
            <h1 className="home-hero__title">
              {t('home:hero.title')}
            </h1>
            <p className="home-hero__desc">
              {t('home:hero.desc')}
            </p>
            <div className="home-hero__actions">
              <Button to="/products" variant="primary">
                {t('home:hero.ctaProducts')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Button>
              <Button to="/buyers" variant="outline">
                {t('common:buttons.requestQuote')} <span className="material-symbols-outlined text-sm">description</span>
              </Button>
            </div>
          </Reveal>
          <div className="home-hero__media">
            <HeroCrossfade
              images={getHeroImages(t)}
              onPlayClick={() => setShowStoryModal(true)}
            />
            <div className="home-hero__badge">
              <span className="label-caps">{t('home:hero.locationBadge')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Video Story Modal */}
      {showStoryModal && (
        <div className="hero-crossfade__modal-backdrop" onClick={() => setShowStoryModal(false)}>
          <div className="hero-crossfade__modal" onClick={(e) => e.stopPropagation()}>
            <div className="hero-crossfade__modal-header">
              <h3 className="hero-crossfade__modal-title">{t('home:hero.storyBadge')}</h3>
              <button
                type="button"
                className="hero-crossfade__modal-close"
                onClick={() => setShowStoryModal(false)}
                aria-label={t('common:buttons.close')}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="hero-crossfade__video-wrap">
              <iframe
                src="https://www.youtube-nocookie.com/embed/6GAUQu7QsCc?autoplay=1&rel=0"
                title={t('home:hero.videoTitle')}
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
            {stats.map((s, i) => (
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
              <h2 className="home-bento__title">{t('home:bento.title')}</h2>
              <p className="home-bento__desc">
                {t('home:bento.desc')}
              </p>
            </div>
            <Link to={getLocalePath('/products', currentLang)} className="home-bento__link desktop-only">
              {t('home:bento.viewCatalog')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="home-bento__grid">
            <Reveal className="home-bento__item home-bento__item--large" delay={0}>
              <img src={bentoTomatoImg} alt={t('home:bento.items.tomatoes.name')} className="home-bento__img" />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <span className="label-caps label-caps--white mb-2">{t('home:bento.items.tomatoes.tag')}</span>
                <h3 className="home-bento__item-title text-xl">{t('home:bento.items.tomatoes.name')}</h3>
              </div>
            </Reveal>

            <Reveal className="home-bento__item home-bento__item--small" delay={90}>
              <img src={bentoOnionImg} alt={t('home:bento.items.onions.name')} className="home-bento__img" />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <h3 className="home-bento__item-title">{t('home:bento.items.onions.name')}</h3>
              </div>
            </Reveal>

            <Reveal className="home-bento__item home-bento__item--small" delay={180}>
              <img src={bentoGreenPepperImg} alt={t('home:bento.items.peppers.name')} className="home-bento__img" />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <h3 className="home-bento__item-title">{t('home:bento.items.peppers.name')}</h3>
              </div>
            </Reveal>

            <Reveal className="home-bento__item home-bento__item--wide" delay={270}>
              <img src={bentoGreenBeansImg} alt={t('buyers:form.fields.products.greenBeans', 'Green Beans')} className="home-bento__img" />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <h3 className="home-bento__item-title">{t('buyers:form.fields.products.greenBeans', 'Green Beans')}</h3>
              </div>
            </Reveal>

            <Reveal className="home-bento__item home-bento__item--wide" delay={360}>
              <img src={bentoPapayaImg} alt={t('home:bento.items.papaya.name')} className="home-bento__img" />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <h3 className="home-bento__item-title">{t('home:bento.items.papaya.name')}</h3>
              </div>
            </Reveal>
          </div>

          <Link to={getLocalePath('/products', currentLang)} className="home-bento__link mobile-only mt-6">
            {t('home:bento.viewCatalog')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* 6. Our Process — From Farm to Fork */}
      <section id="process" className="home-process section" aria-label={t('home:process.ariaLabel', 'Quality and Logistics Pipeline')}>
        <div className="container">
          <Reveal>
            <div className="home-process__header">
              <div>
                <span className="label-caps label-caps--secondary mb-2 block">{t('home:process.badgeFlow')}</span>
                <h2 className="home-process__title">{t('home:process.title')}</h2>
                <p className="home-process__desc">
                  {t('home:process.desc')}
                </p>
              </div>
              <Link to={getLocalePath('/buyers', currentLang)} className="home-process__link">
                {t('home:process.buyersLink')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </Reveal>

          <div className="home-process__grid">
            {(Array.isArray(t('home:process.steps', { returnObjects: true }))
              ? t('home:process.steps', { returnObjects: true })
              : []
            ).map((step, i) => (
              <Reveal key={step.number || i} delay={i * 70} className="home-process__card-wrap">
                <article className="home-process__card">
                  <div className="home-process__card-top">
                    <div className="home-process__icon-box">
                      <span className="material-symbols-outlined">{step.icon || 'verified'}</span>
                    </div>
                    <span className="home-process__step-num">{step.number || `0${i + 1}`}</span>
                  </div>
                  <div className="home-process__card-body">
                    <span className="home-process__tag">{step.tag || step.phase}</span>
                    <h3 className="home-process__card-title">{step.title}</h3>
                    <p className="home-process__card-desc">{step.description || step.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Facilities & Infrastructure */}
      <section id="facilities" className="home-resources-infra section" aria-label={t('about:infrastructure.ariaLabel', 'Facilities and Infrastructure')}>
        <div className="container">
          <Reveal>
            <div className="home-resources-infra__header">
              <div>
                <span className="label-caps label-caps--secondary mb-2 block">{t('home:resources.tag')}</span>
                <h2 className="home-resources-infra__title">{t('home:resources.title')}</h2>
                <p className="home-resources-infra__desc">
                  {t('home:resources.desc')}
                </p>
              </div>
              <Link to={getLocalePath('/about#infrastructure', currentLang)} className="btn btn--outline btn--sm home-resources-infra__cta">
                {t('home:resources.exploreAll')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
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
              <h2 className="home-audience__card-title">{t('home:audience.farmers.title')}</h2>
              <p className="home-audience__card-desc">
                {t('home:audience.farmers.desc')}
              </p>
              <Link to={getLocalePath('/farmers', currentLang)} className="home-audience__link">
                {t('home:audience.farmers.link')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </Reveal>

            <Reveal className="home-audience__card" delay={90}>
              <span className="material-symbols-outlined home-audience__icon">local_shipping</span>
              <h2 className="home-audience__card-title">{t('home:audience.buyers.title')}</h2>
              <p className="home-audience__card-desc">
                {t('home:audience.buyers.desc')}
              </p>
              <Link to={getLocalePath('/buyers', currentLang)} className="home-audience__link">
                {t('home:audience.buyers.link')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 9. Certifications showcase */}
      <section id="certifications" className="home-cert-band section section--alt" aria-label={t('common:certifications.globalgapTitle', 'Certifications and Accreditations')}>
        <div className="container">
          <Reveal className="home-cert-band__header text-center">
            <span className="label-caps label-caps--secondary mb-2 block">{t('home:partners.certTag')}</span>
            <h2 className="home-cert-band__title">{t('home:partners.certTitle')}</h2>
            <p className="home-cert-band__desc">
              {t('home:partners.certDesc')}
            </p>
          </Reveal>
          <Reveal delay={90}>
            <Certifications />
          </Reveal>
        </div>
      </section>

      {/* 10. Partners & Collaborations */}
      <section id="partners" className="home-partners" aria-label={t('home:partners.partnersTitle', 'Our Strategic & Development Partners')}>
        <div className="container">
          <Reveal className="home-partners__header text-center">
            <span className="home-partners__eyebrow">
              <span className="material-symbols-outlined home-partners__eyebrow-icon">handshake</span>
              <span className="home-partners__eyebrow-text">{t('home:partners.partnersTitle')}</span>
            </span>
            <h2 className="home-partners__title">{t('home:partners.partnersTitle')}</h2>
            <p className="home-partners__desc">
              {t('home:partners.partnersDesc')}
            </p>
          </Reveal>
        </div>

        {/* Full-width edge-to-edge logo marquee (screen-to-screen frame) */}
        <div className="home-partners__marquee-wrapper" aria-label={t('home:partners.partnersTag', 'Partner Network')}>
          {/* Row 1: Leftward Smooth Scroll */}
          <div className="home-partners__marquee-row home-partners__marquee-row--left">
            <div className="home-partners__marquee-track">
              {[...row1Logos, ...row1Logos].map((partner, idx) => (
                <div
                  key={`r1-${partner.id}-${idx}`}
                  className="home-partners__marquee-item"
                  title={t('home:partners.logoTitle', { name: partner.name, category: partner.category })}
                >
                  <img
                    src={partner.logo}
                    alt={t('home:partners.logoAlt', { name: partner.name })}
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
                  title={t('home:partners.logoTitle', { name: partner.name, category: partner.category })}
                >
                  <img
                    src={partner.logo}
                    alt={t('home:partners.logoAlt', { name: partner.name })}
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
            <Link to={getLocalePath('/about#partners', currentLang)} className="btn btn--outline home-partners__full-cta">
              {t('home:partners.viewAll')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 11. Testimonials */}
      <div id="testimonials">
        <Testimonials items={getTestimonials(t)} />
      </div>

      {/* 12. Resources quick-links */}
      <section id="resources" className="home-resources">
        <div className="container">
          <Reveal className="home-resources__header">
            <span className="label-caps label-caps--secondary mb-2 block">{t('home:documentation.tag')}</span>
            <h2 className="home-resources__title">{t('home:documentation.title')}</h2>
          </Reveal>

          <div className="home-resources__grid">
            <Reveal delay={0}>
              <a
                href={companyProfilePdf}
                download="MekiBatuUnion_CompanyProfile.pdf"
                className="home-resources__card"
                title={t('home:documentation.companyProfile.download')}
              >
                <span className="material-symbols-outlined home-resources__icon">description</span>
                <h3 className="home-resources__card-title">{t('home:documentation.companyProfile.title')}</h3>
                <p className="home-resources__card-desc">{t('home:documentation.companyProfile.desc')}</p>
                <span className="home-resources__action">
                  {t('common:buttons.downloadPdf')} <span className="material-symbols-outlined text-sm">download</span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={90}>
              <Link to={getLocalePath('/impact#reports', currentLang)} className="home-resources__card">
                <span className="material-symbols-outlined home-resources__icon">verified</span>
                <h3 className="home-resources__card-title">{t('common:breadcrumbs.impact')}</h3>
                <p className="home-resources__card-desc">{t('home:documentation.impactReports.desc')}</p>
                <span className="home-resources__action">
                  {t('common:buttons.impactReports')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </Link>
            </Reveal>

            <Reveal delay={180}>
              <Link to={getLocalePath('/products', currentLang)} className="home-resources__card">
                <span className="material-symbols-outlined home-resources__icon">grid_view</span>
                <h3 className="home-resources__card-title">{t('common:breadcrumbs.products')}</h3>
                <p className="home-resources__card-desc">{t('home:documentation.products.desc')}</p>
                <span className="home-resources__action">
                  {t('common:buttons.viewCatalog')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
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
              <span className="label-caps label-caps--secondary mb-2 block">{t('news:hero.eyebrow')}</span>
              <h2 className="home-news__title">{t('news:hero.title')}</h2>
            </div>
            <Link to={getLocalePath('/news', currentLang)} className="home-bento__link">
              {t('news:labels.backToAll')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </Reveal>

          <div className="home-news__grid">
            {recentNews.map((article, i) => (
              <Reveal key={article.id} delay={stagger(i)}>
                <Link to={getLocalePath('/news', currentLang)} className="home-news__card">
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
