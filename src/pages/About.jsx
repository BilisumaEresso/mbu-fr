import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import Certifications from '../components/common/Certifications.jsx'
import { partners, PARTNER_CATEGORIES } from '../data/partners.js'
import { resources } from '../data/resources.js'
import ResourceCard from '../components/common/ResourceCard.jsx'
import aboutHeroImg from '../assets/images/heroes/aboutHero.webp'
import teamMember1 from '../assets/images/team/team_member_1.webp'
import teamMember2 from '../assets/images/team/team_member_2.webp'
import teamMember3 from '../assets/images/team/team_member_3.webp'
import teamMember4 from '../assets/images/team/team_member_4.webp'
import teamMember5 from '../assets/images/team/team_member_5.webp'
import teamStaff from '../assets/images/team/team_staff.webp'
import companyProfilePdf from '../assets/downloads/MekiBatuUnion_CompanyProfile.pdf'
import './About.css'

const OBJECTIVES = [
  'To empower member farmers through fair market access and equitable trade practices.',
  'To promote and implement sustainable, environmentally conscious agricultural methods.',
  'To provide continuous education and capacity building for rural farming communities.',
  'To maintain the highest standards of produce quality for international export.',
]

const TEAM = [
  { name: 'Ato Name Surname', title: 'General Manager', photo: teamMember1 },
  { name: 'W/ro Name Surname', title: 'Head of Operations', photo: teamMember2 },
  { name: 'Ato Name Surname', title: 'Chief Agronomist', photo: teamMember3 },
  { name: 'W/ro Name Surname', title: 'Finance & Admin Director', photo: teamMember4 },
  { name: 'Ato Name Surname', title: 'Supply Chain & Logistics Lead', photo: teamMember5 },
  {
    name: 'Union Staff & Extension Team',
    title: '500+ Dedicated Field Workers & Staff',
    photo: teamStaff,
    isStaffCard: true,
  },
]

// Cap stagger at 450ms for card grids
const stagger = (i) => Math.min(i * 90, 450)

function About() {
  const [selectedCategory, setSelectedCategory] = useState(PARTNER_CATEGORIES.ALL)
  const filteredPartners = selectedCategory === PARTNER_CATEGORIES.ALL
    ? partners
    : partners.filter((p) => p.category === selectedCategory)

  return (
    <>
      <Helmet>
        <title>About Us | Meki Batu Union</title>
        <meta
          name="description"
          content="Learn about Meki Batu Union's history since 2002, our 153 member cooperatives, 8,410 farmers, GlobalG.A.P certification, and leadership dedicated to sustainable Ethiopian agriculture."
        />
      </Helmet>
      {/* ---- Hero Section ---- */}
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
        eyebrow="Since 2002 • 20+ Years of Experience"
        title="Cultivating Progress Through Cooperative Strength"
        description="Meki Batu Union stands as a testament to the power of collective farming in Ethiopia. We unite 153 primary cooperatives and 8,410 member farmers to ensure fair trade, sustainable practices, and premium quality produce for domestic and global markets."
        image={aboutHeroImg}
        imageAlt="Fertile Ethiopian agricultural land during golden hour"
      />

      <SectionDivider />

      {/* ---- History Timeline (Our Foundation) ---- */}
      <section className="about-foundation section section--alt">
        <div className="container">
          <div className="about-foundation__header">
            <span className="material-symbols-outlined about-foundation__icon">history</span>
            <h2 className="about-foundation__title">Our Foundation</h2>
          </div>

          {/* Wrap the two content paragraphs together as one Reveal unit */}
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
                  Founded on May 11, 2002 in Meki town, Oromia, our union began with 12 primary cooperatives and 527 founding members, starting with an initial capital of 500,000 ETB.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="about-timeline__item about-timeline__item--reverse">
              <div className="about-timeline__node desktop-only about-timeline__node--tint" />
              <div className="about-timeline__left">
                <span className="label-caps label-caps--tint block mb-1">Growth Phase</span>
                <h3 className="about-timeline__heading">Expanding the Network</h3>
              </div>
              <div className="about-timeline__right">
                <p className="about-timeline__text">
                  Over the years, we expanded from our initial two districts (Dugda woreda and Adami Tulu Jido Kombolcha near Lake Dembal/Ziway) across six districts, adding Bora, Zuway Dugda, Adama, and Dodota Sire, while modernizing irrigation across 600 hectares of member land.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="about-timeline__item">
              <div className="about-timeline__node desktop-only about-timeline__node--primary" />
              <div className="about-timeline__left">
                <span className="label-caps label-caps--primary block mb-1">Present Day</span>
                <h3 className="about-timeline__heading">153 Cooperatives &amp; 8,410 Farmers Strong</h3>
              </div>
              <div className="about-timeline__right">
                <p className="about-timeline__text">
                  Today, we proudly represent 153 primary cooperatives and 8,410 member farmers, holding approximately 81.8 million ETB in own capital. Our network ensures quality, sustainability, and economic resilience for farming families across the Rift Valley.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Mission & Certification ---- */}
      <section className="about-mission-cert section">
        <div className="container">
          <div className="about-mission-cert__grid">
            {/* Left: Mission, Vision & Objectives */}
            <Reveal className="about-mission-card">
              <div className="about-vision-block mb-6">
                <span className="label-caps label-caps--secondary block mb-1">Our Vision</span>
                <h3 className="about-vision__heading text-xl font-display font-semibold mb-2">
                  Betterment &amp; Competitive Capacity
                </h3>
                <p className="about-mission__text italic">
                  &ldquo;To see betterment in members&rsquo; living condition and a union with a good competing capacity in the free market economy.&rdquo;
                </p>
              </div>

              <div className="about-mission-block mb-6">
                <span className="label-caps label-caps--secondary block mb-1">Our Mission</span>
                <h3 className="about-vision__heading text-xl font-display font-semibold mb-2">
                  Production &amp; Marketability
                </h3>
                <p className="about-mission__text italic">
                  &ldquo;To contribute to improvement in production, productivity and marketability of members&rsquo; products.&rdquo;
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
                  target="_blank"
                  rel="noopener noreferrer"
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

      {/* ---- Leadership & Staff ---- */}
      <section className="about-governance section section--alt" id="leadership">
        <div className="container">
          <div className="about-governance__header">
            <h2 className="about-governance__title">Leadership &amp; Staff</h2>
            <p className="about-governance__desc">
              Guided by experienced leadership and driven by our dedicated team across all operations.
            </p>
          </div>

          <div className="about-governance__grid">
            {TEAM.map((member, i) => (
              <Reveal
                key={member.title}
                delay={stagger(i)}
                className={`about-governance__card ${member.isStaffCard ? 'about-governance__card--staff' : ''}`}
              >
                <div className="about-governance__photo-wrap">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="about-governance__photo"
                  />
                  {member.isStaffCard && (
                    <span className="about-governance__staff-badge">
                      <span className="material-symbols-outlined text-xs">groups</span> Union Team
                    </span>
                  )}
                </div>
                <h3 className="about-governance__name">{member.name}</h3>
                <p className="label-caps label-caps--secondary text-xs mt-1">{member.title}</p>
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
              High-capacity cold storage, refrigerated transport, modern pack houses, and river-fed irrigation powering sustainable agriculture in the Great Rift Valley.
            </p>
          </div>

          {/* Resources Photo Cards Grid */}
          <div className="about-infrastructure__grid">
            {resources.map((res, i) => (
              <Reveal key={res.id} delay={Math.min(i * 80, 320)} className="about-infra-card-wrap">
                <ResourceCard resource={res} />
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
              Our impact is powered by trusted collaborations with 17 global development agencies, national research centers, financial institutions, and agricultural regulatory bodies.
            </p>
          </div>

          {/* 4-P Collaboration Model Cards */}
          <div className="about-model__grid mb-12">
            <Reveal delay={0} className="about-model__card">
              <div className="about-model__icon-wrap">
                <span className="material-symbols-outlined about-model__icon">science</span>
              </div>
              <h3 className="about-model__title">Research &amp; Seed Trials</h3>
              <p className="about-model__desc">
                Partnering with EIAR Melkasa and OARI Adami Tulu to breed, test, and multiply high-germination certified seed varieties.
              </p>
            </Reveal>

            <Reveal delay={100} className="about-model__card">
              <div className="about-model__icon-wrap">
                <span className="material-symbols-outlined about-model__icon">water_drop</span>
              </div>
              <h3 className="about-model__title">Landscape &amp; Sustainability</h3>
              <p className="about-model__desc">
                Collaborating with Wetlands International and IDH on Central Rift Valley lake conservation and sustainable drip irrigation.
              </p>
            </Reveal>

            <Reveal delay={200} className="about-model__card">
              <div className="about-model__icon-wrap">
                <span className="material-symbols-outlined about-model__icon">local_shipping</span>
              </div>
              <h3 className="about-model__title">Cold-Chain &amp; Logistics</h3>
              <p className="about-model__desc">
                Equipped with ATI refrigerated transport trucks and pack house precooling facilities to ensure zero post-harvest quality loss.
              </p>
            </Reveal>

            <Reveal delay={300} className="about-model__card">
              <div className="about-model__icon-wrap">
                <span className="material-symbols-outlined about-model__icon">flight_takeoff</span>
              </div>
              <h3 className="about-model__title">Market Access &amp; Off-Taking</h3>
              <p className="about-model__desc">
                Supplying Ethiopian Airlines Inflight Catering, European export buyers, and five dedicated retail stores in Addis Ababa.
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
                onClick={() => setSelectedCategory(category)}
              >
                {category}
                <span className="about-partners__tab-count">
                  {category === PARTNER_CATEGORIES.ALL
                    ? partners.length
                    : partners.filter((p) => p.category === category).length}
                </span>
              </button>
            ))}
          </div>

          {/* Filtered Partner Cards Grid */}
          <div className="about-partners__cards-grid">
            {filteredPartners.map((partner, index) => (
              <Reveal key={partner.id} delay={Math.min(index * 60, 360)} className="about-partner-card-wrapper">
                <div className="about-partner-card">
                  <div className="about-partner-card__header">
                    <div className="about-partner-card__icon-badge">
                      <span className="material-symbols-outlined">{partner.icon}</span>
                    </div>
                    <span className="about-partner-card__tag">{partner.tag}</span>
                  </div>

                  <div className="about-partner-card__body">
                    <div className="about-partner-card__meta">
                      <span className="about-partner-card__acronym">{partner.acronym}</span>
                      <span className="about-partner-card__category">{partner.category}</span>
                    </div>
                    <h3 className="about-partner-card__name">{partner.name}</h3>
                    <p className="about-partner-card__role">{partner.role}</p>
                  </div>

                  <div className="about-partner-card__footer">
                    <div className="about-partner-card__highlight">
                      <span className="material-symbols-outlined text-xs">verified</span>
                      <span>{partner.impactHighlight}</span>
                    </div>
                    {partner.url && (
                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="about-partner-card__link"
                        title={`Visit ${partner.name} website`}
                      >
                        <span>Visit</span>
                        <span className="material-symbols-outlined text-xs">open_in_new</span>
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default About
