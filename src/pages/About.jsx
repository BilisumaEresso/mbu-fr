import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import Certifications from '../components/common/Certifications.jsx'
import OrgChart from '../components/common/OrgChart.jsx'
import { partners, PARTNER_CATEGORIES } from '../data/partners.js'
import { resources } from '../data/resources.js'
import FacilityCard from '../components/common/FacilityCard.jsx'
import aboutHeroImg from '../assets/images/heroes/aboutHero.webp'
import { teamMembers } from '../data/team.js'
import { COMPANY_PROFILE_BASE64 as companyProfilePdf } from '../data/companyProfilePdfBase64.js'
import './About.css'

const OBJECTIVES = [
  'To empower member farmers through fair market access and equitable trade practices.',
  'To promote and implement sustainable, environmentally conscious agricultural methods.',
  'To provide continuous education and capacity building for rural farming communities.',
  'To maintain the highest standards of produce quality for international export.',
]

// Cap stagger at 450ms for card grids
const stagger = (i) => Math.min(i * 70, 450)

function About() {
  const [selectedCategory, setSelectedCategory] = useState(PARTNER_CATEGORIES.ALL)
  const [showAllPartners, setShowAllPartners] = useState(false)

  const filteredPartners = selectedCategory === PARTNER_CATEGORIES.ALL
    ? partners
    : partners.filter((p) => p.category === selectedCategory)

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setShowAllPartners(false)
  }

  return (
    <>
      <Helmet>
        <title>About Us | Meki Batu Union</title>
        <meta
          name="description"
          content="Learn about Meki Batu Union's history since 2002, our 135 member cooperatives, 8,089 farmers, GlobalG.A.P certification, and leadership dedicated to sustainable Ethiopian agriculture."
        />
      </Helmet>
      {/* ---- Hero Section ---- */}
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
        eyebrow="Since 2002 • 20+ Years of Experience"
        title="Cultivating Progress Through Cooperative Strength"
        description="Meki Batu Union stands as a testament to the power of collective farming in Ethiopia. We unite 135 primary cooperatives and 8,089 member farmers to ensure fair trade, sustainable practices, and premium quality produce for domestic and global markets."
        image={aboutHeroImg}
        imageAlt="Fertile Ethiopian agricultural land during golden hour"
      />

      <SectionDivider />

      {/* ---- History Timeline (Our Foundation) ---- */}
      <section id="foundation" className="about-foundation section section--alt">
        <div className="container">
          <div className="about-foundation__header">
            <span className="material-symbols-outlined about-foundation__icon">history</span>
            <h2 className="about-foundation__title">Our Foundation</h2>
          </div>

          {/* Wrap the content paragraphs together as one Reveal unit */}
          <Reveal className="about-timeline">
            <div className="about-timeline__line desktop-only" />

            {/* Timeline Item 1 */}
            <div className="about-timeline__item">
              <div className="about-timeline__node desktop-only about-timeline__node--secondary" />
              <div className="about-timeline__left">
                <span className="label-caps label-caps--secondary block mb-1">May 11, 2002</span>
                <h3 className="about-timeline__heading">Inception in Meki</h3>
              </div>
              <div className="about-timeline__right">
                <p className="about-timeline__text">
                  Established in Meki town with 12 primary cooperatives and 527 founding members, pooling 500,000 ETB in initial capital to build a shared agricultural union.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="about-timeline__item about-timeline__item--reverse">
              <div className="about-timeline__node desktop-only about-timeline__node--tint" />
              <div className="about-timeline__left">
                <span className="label-caps label-caps--tint block mb-1">Growth Phase</span>
                <h3 className="about-timeline__heading">Regional Expansion</h3>
              </div>
              <div className="about-timeline__right">
                <p className="about-timeline__text">
                  Expanded across six Rift Valley districts in East Shewa and Arsi zones, scaling modern irrigation infrastructure across 5,910 hectares of fertile farmland.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="about-timeline__item">
              <div className="about-timeline__node desktop-only about-timeline__node--primary" />
              <div className="about-timeline__left">
                <span className="label-caps label-caps--primary block mb-1">Present Day</span>
                <h3 className="about-timeline__heading">135 Co-ops &amp; 8,089 Farmers</h3>
              </div>
              <div className="about-timeline__right">
                <p className="about-timeline__text">
                  Today uniting 135 cooperatives and 8,089 farmers with 94.5 million ETB in union capital, delivering reliable, certified produce across domestic and global markets.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Mission & Certification ---- */}
      <section id="mission-vision" className="about-mission-cert section">
        <div className="container">
          <div className="about-mission-cert__grid">
            {/* Left: Mission, Vision & Objectives */}
            <Reveal className="about-mission-card">
              <div className="about-vision-block mb-6">
                <span className="label-caps label-caps--secondary block mb-1">Our Vision</span>
                <h3 className="about-vision__heading text-xl font-display font-semibold mb-2">
                  Prosperity &amp; Competitive Excellence
                </h3>
                <p className="about-mission__text italic">
                  &ldquo;To ensure members&rsquo; economic prosperity and build a highly competitive agricultural enterprise in the global marketplace.&rdquo;
                </p>
              </div>

              <div className="about-mission-block mb-6">
                <span className="label-caps label-caps--secondary block mb-1">Our Mission</span>
                <h3 className="about-vision__heading text-xl font-display font-semibold mb-2">
                  Productivity &amp; Market Integration
                </h3>
                <p className="about-mission__text italic">
                  &ldquo;To enhance sustainable production, farm productivity, and direct market access for all member cooperative produce.&rdquo;
                </p>
              </div>

              <div className="about-objectives-block">
                <span className="label-caps label-caps--secondary block mb-3">Core Objectives</span>
                <ul className="about-mission__list">
                  {OBJECTIVES.map((obj, i) => (
                    <li key={i} className="about-mission__item">
                      <span className="material-symbols-outlined about-mission__check">check_circle</span>
                      <span className="about-mission__text">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Right: Certifications & Compliance */}
            <Reveal className="about-cert-wrap" delay={90}>
              <Certifications />
              <div className="about-cert-wrap__footer">
                <a
                  href={companyProfilePdf}
                  download="MekiBatuUnion_CompanyProfile.pdf"
                  className="btn btn--outline btn--sm"
                  title="Download Meki Batu Union Company Profile (PDF)"
                >
                  Download company profile (PDF) <span className="material-symbols-outlined text-sm">download</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Leadership & Governance Structure ---- */}
      <section className="about-governance section section--alt" id="leadership">
        <div className="container">
          <div className="about-governance__header text-center">
            <span className="label-caps label-caps--secondary mb-2 block">Governance &amp; Hierarchy</span>
            <h2 className="about-governance__title">Organizational Structure</h2>
            <p className="about-governance__desc">
              Three-tier governance structure connecting general assembly oversight, executive management, and specialized operational departments.
            </p>
          </div>

          {/* 3-Tier Organizational Hierarchy Chart */}
          <Reveal>
            <OrgChart />
          </Reveal>

          {/* Leadership & Staff Grid */}
          <div className="about-governance__subheader mt-12 mb-6">
            <h3 className="text-xl font-display font-semibold text-primary">Executive Leadership</h3>
            <p className="text-sm text-muted mt-1">Union directors and department heads driving cooperative operations.</p>
          </div>

          <div className="about-governance__grid">
            {teamMembers.map((member, i) => (
              <Reveal
                key={member.id}
                delay={stagger(i)}
                className="about-governance__card-wrapper"
              >
                <div className="about-governance__card">
                  <div className="about-governance__photo-wrap">
                    <img
                      src={member.photo}
                      alt={`${member.name} - ${member.title}`}
                      className="about-governance__photo"
                      loading="lazy"
                    />
                    <span className="about-governance__role-badge">
                      {member.department}
                    </span>
                  </div>
                  <div className="about-governance__card-body">
                    <h3 className="about-governance__name">{member.name}</h3>
                    <p className="label-caps label-caps--secondary text-xs mt-1">{member.title}</p>

                    {member.email && (
                      <div className="about-governance__contacts">
                        <a
                          href={`mailto:${member.email}`}
                          className="about-governance__contact-link"
                          title={`Email ${member.name}: ${member.email}`}
                          aria-label={`Email ${member.name} at ${member.email}`}
                        >
                          <span className="material-symbols-outlined about-governance__contact-icon">mail</span>
                          <span className="about-governance__contact-text">{member.email}</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Operations & Physical Infrastructure ---- */}
      <section className="about-infrastructure section" id="infrastructure">
        <div className="container">
          <div className="about-infrastructure__header text-center">
            <span className="label-caps label-caps--secondary mb-2 block">Physical Backbone</span>
            <h2 className="about-infrastructure__title">Operational Facilities &amp; Fleet</h2>
            <p className="about-infrastructure__subtitle">
              Cold storage hubs, refrigerated transport, certified pack houses, and river irrigation schemes across the Great Rift Valley.
            </p>
          </div>

          {/* Facilities 2x2 Showcase Grid */}
          <div className="about-infrastructure__grid">
            {resources.map((res, i) => (
              <Reveal key={res.id} delay={Math.min(i * 100, 300)} className="about-infra-card-wrap">
                <FacilityCard resource={res} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Multi-Stakeholder Collaboration Ecosystem ---- */}
      <section className="about-partners section section--alt" id="partners">
        <div className="container">
          <div className="about-partners__header text-center">
            <span className="label-caps label-caps--secondary mb-2 block">Strategic Ecosystem</span>
            <h2 className="about-partners__title">Partners &amp; Collaborations</h2>
            <p className="about-partners__subtitle">
              Strategic partnerships with development agencies, research institutions, and regulatory bodies.
            </p>
          </div>

          {/* 4-P Collaboration Model Cards */}
          <div className="about-model__grid mb-12">
            <Reveal delay={0} className="about-model__card">
              <div className="about-model__card-top">
                <div className="about-model__icon-wrap">
                  <span className="material-symbols-outlined about-model__icon">science</span>
                </div>
                <span className="about-model__step">Pillar 01</span>
              </div>
              <h3 className="about-model__title">Research &amp; Seed Trials</h3>
              <p className="about-model__desc">
                Partnering with EIAR and OARI to test and multiply high-germination certified seed varieties.
              </p>
            </Reveal>

            <Reveal delay={100} className="about-model__card">
              <div className="about-model__card-top">
                <div className="about-model__icon-wrap">
                  <span className="material-symbols-outlined about-model__icon">water_drop</span>
                </div>
                <span className="about-model__step">Pillar 02</span>
              </div>
              <h3 className="about-model__title">Landscape &amp; Sustainability</h3>
              <p className="about-model__desc">
                Collaborating with Wetlands International and IDH on Rift Valley conservation and drip irrigation.
              </p>
            </Reveal>

            <Reveal delay={200} className="about-model__card">
              <div className="about-model__card-top">
                <div className="about-model__icon-wrap">
                  <span className="material-symbols-outlined about-model__icon">local_shipping</span>
                </div>
                <span className="about-model__step">Pillar 03</span>
              </div>
              <h3 className="about-model__title">Cold-Chain &amp; Logistics</h3>
              <p className="about-model__desc">
                Equipped with ATI refrigerated fleet and pack house precooling to minimize post-harvest loss.
              </p>
            </Reveal>

            <Reveal delay={300} className="about-model__card">
              <div className="about-model__card-top">
                <div className="about-model__icon-wrap">
                  <span className="material-symbols-outlined about-model__icon">flight_takeoff</span>
                </div>
                <span className="about-model__step">Pillar 04</span>
              </div>
              <h3 className="about-model__title">Market Access &amp; Off-Taking</h3>
              <p className="about-model__desc">
                Supplying Ethiopian Airlines Inflight Catering, European exporters, and Addis Ababa retail outlets.
              </p>
            </Reveal>
          </div>

          {/* Category Filter Tabs */}
          <div className="about-partners__filter-bar" role="tablist" aria-label="Filter partners by category">
            {Object.values(PARTNER_CATEGORIES).map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selectedCategory === category}
                className={`about-partners__tab-btn ${selectedCategory === category ? 'about-partners__tab-btn--active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                <span>{category}</span>
                <span className="about-partners__tab-count">
                  {category === PARTNER_CATEGORIES.ALL
                    ? partners.length
                    : partners.filter((p) => p.category === category).length}
                </span>
              </button>
            ))}
          </div>

          {/* Filtered Partner Cards Grid (Two-Tone Logo Stage Cards) */}
          <div className="about-partners__cards-grid">
            {filteredPartners.map((partner, index) => (
              <Reveal
                key={partner.id}
                delay={Math.min(index * 50, 300)}
                className={`about-partner-card-wrapper ${index >= 6 && !showAllPartners ? 'about-partner-card-wrapper--hidden' : ''}`}
              >
                <div className="about-partner-card">
                  {/* Two-Tone Top Logo Stage */}
                  <div className="about-partner-card__stage">
                    <div className="about-partner-card__logo-wrap">
                      {partner.logo ? (
                        <img
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          className="about-partner-card__logo"
                          loading="lazy"
                        />
                      ) : (
                        <div className="about-partner-card__fallback-icon">
                          <span className="material-symbols-outlined">{partner.icon}</span>
                        </div>
                      )}
                    </div>
                    <span className="about-partner-card__tag">{partner.tag}</span>
                  </div>

                  {/* Card Content Body */}
                  <div className="about-partner-card__body">
                    <div className="about-partner-card__meta">
                      <span className="about-partner-card__acronym">{partner.acronym}</span>
                      <span className="about-partner-card__category">{partner.category}</span>
                    </div>
                    <h3 className="about-partner-card__name">{partner.name}</h3>
                    <p className="about-partner-card__role">{partner.role}</p>
                  </div>

                  {/* Card Footer */}
                  <div className="about-partner-card__footer">
                    {partner.impactHighlight && (
                      <div className="about-partner-card__highlight">
                        <span className="material-symbols-outlined text-xs">verified</span>
                        <span>{partner.impactHighlight}</span>
                      </div>
                    )}
                    {partner.url && (
                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="about-partner-card__link"
                        title={`Visit ${partner.name} website`}
                      >
                        <span>Official Website</span>
                        <span className="material-symbols-outlined text-xs">open_in_new</span>
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Show All / Show Less Toggle Button (Desktop + Mobile) */}
          {filteredPartners.length > 6 && (
            <div className="about-partners__toggle">
              <button
                type="button"
                className="about-partners__toggle-btn"
                onClick={() => setShowAllPartners(!showAllPartners)}
                aria-expanded={showAllPartners}
              >
                {showAllPartners ? (
                  <>
                    <span>Show fewer partners</span>
                    <span className="material-symbols-outlined text-sm">expand_less</span>
                  </>
                ) : (
                  <>
                    <span>Show all {filteredPartners.length} partners</span>
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default About
