import { Helmet } from 'react-helmet-async'
import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import aboutHeroImg from '../assets/images/aboutHero.webp'
import teamMember1 from '../assets/images/team_member_1.webp'
import teamMember2 from '../assets/images/team_member_2.webp'
import teamMember3 from '../assets/images/team_member_3.webp'
import teamMember4 from '../assets/images/team_member_4.webp'
import teamMember5 from '../assets/images/team_member_5.webp'
import teamStaff from '../assets/images/team_staff.webp'
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

const PARTNERS = ['Self Help Africa', 'Oromia Coop Bank', 'Agri-Invest']

// Cap stagger at 450ms for card grids
const stagger = (i) => Math.min(i * 90, 450)

function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Meki Batu Union</title>
        <meta
          name="description"
          content="Learn about Meki Batu Union's history since 2002, our cooperative foundation, GlobalG.A.P certification, and leadership dedicated to sustainable Ethiopian agriculture."
        />
      </Helmet>
      {/* ---- Hero Section ---- */}
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
        eyebrow="Since 2002"
        title="Cultivating Progress Through Cooperative Strength"
        description="Meki Batu Union stands as a testament to the power of collective farming in Ethiopia. We unite farmers to ensure fair trade, sustainable practices, and premium quality produce for the global market."
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
                  Founded on May 11, 2002 in Meki town, Oromia, our union began with 12 primary cooperatives and 527 founding members dedicated to improving their livelihoods through shared resources and collective bargaining power.
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
                  Over the years, we expanded our reach, bringing more cooperatives under our umbrella, providing essential training, and modernizing agricultural techniques.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="about-timeline__item">
              <div className="about-timeline__node desktop-only about-timeline__node--primary" />
              <div className="about-timeline__left">
                <span className="label-caps label-caps--primary block mb-1">Present Day</span>
                <h3 className="about-timeline__heading">140+ Cooperatives Strong</h3>
              </div>
              <div className="about-timeline__right">
                <p className="about-timeline__text">
                  Today, we proudly represent over 140 cooperatives, forming a robust network that ensures quality, sustainability, and economic stability for thousands of farming families.
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
            {/* Left: Mission — whole list as one Reveal */}
            <Reveal className="about-mission-card">
              <h2 className="about-mission__title">Mission &amp; Objectives</h2>
              <ul className="about-mission__list">
                {OBJECTIVES.map((obj, i) => (
                  <li key={i} className="about-mission__item">
                    <span className="material-symbols-outlined about-mission__check">check_circle</span>
                    <span className="about-mission__text">{obj}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Right: Certification — one Reveal */}
            <Reveal className="about-cert-card" delay={90}>
              <div>
                <div className="about-cert-card__header">
                  <span className="material-symbols-outlined about-cert-card__icon">verified</span>
                  <h2 className="about-cert-card__title">GlobalG.A.P Certified</h2>
                </div>
                <p className="about-cert-card__desc">
                  Our commitment to excellence is validated by our strict adherence to GlobalG.A.P standards. This internationally recognized certification ensures that our agricultural practices are safe, sustainable, and responsible.
                </p>
                <ul className="about-cert-card__highlights">
                  <li>Traceability &amp; Food Safety</li>
                  <li>Environmental Conservation</li>
                  <li>Worker Health &amp; Welfare</li>
                </ul>
              </div>
              <div className="about-cert-card__footer">
                <span className="label-caps label-caps--muted text-xs opacity-70 mb-3 block">Export Quality Assured</span>
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

      {/* ---- Collaboration Partners — one Reveal, no stagger ---- */}
      <section className="about-partners section">
        <div className="container">
          <div className="text-center mb-8">
            <span className="label-caps label-caps--muted">In Collaboration With</span>
          </div>
          <Reveal className="about-partners__logos">
            {PARTNERS.map((p) => (
              <div key={p} className="about-partners__name">
                {p}
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default About
