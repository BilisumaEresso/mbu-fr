import aboutHeroImg from '../assets/images/about_hero_farm.png'
import teamMember1 from '../assets/images/team_member_1.png'
import teamMember2 from '../assets/images/team_member_2.png'
import teamMember3 from '../assets/images/team_member_3.png'
import './About.css'

const TIMELINE = [
  {
    left: { date: 'May 11, 2002', heading: 'Inception in Meki' },
    right: { text: 'Established in Meki town, our union began with a small group of visionary farmers dedicated to improving their livelihoods through shared resources and collective bargaining power.' },
    dotColor: 'accent',
  },
  {
    left: { text: 'Over the years, we expanded our reach, bringing more cooperatives under our umbrella, providing essential training, and modernizing agricultural techniques.' },
    right: { date: 'Growth Phase', heading: 'Expanding the Network' },
    dotColor: 'dark',
  },
  {
    left: { date: 'Present Day', heading: '140+ Cooperatives Strong' },
    right: { text: 'Today, we proudly represent over 140 cooperatives, forming a robust network that ensures quality, sustainability, and economic stability for thousands of farming families.' },
    dotColor: 'dark',
  },
]

const OBJECTIVES = [
  'To empower member farmers through fair market access and equitable trade practices.',
  'To provide and strengthen our value chain, creating lasting economic stability through agricultural best practices.',
  'To provide continuous education and support to build the next generation of farmers.',
  'To market farm products nationally and internationally through established export links.',
]

const CERT_DETAILS = [
  'Traceability & food safety',
  'IPM (Integrated Pest Management)',
  'Environmental Protection',
  'Worker Health, Safety & Welfare',
]

const TEAM = [
  { name: 'Ato Name Surname', title: 'General Manager', photo: teamMember1 },
  { name: 'Who Name Surname', title: 'Head of Operations', photo: teamMember2 },
  { name: 'Ato Name Surname', title: 'Agricultural Lead', photo: teamMember3 },
]

const PARTNERS = ['Self Help Africa', 'Oromia Coop Bank', 'Agri-Invest']

function About() {
  return (
    <>
      {/* ---- Hero ---- */}
      <section className="about-hero">
        <div className="container">
          <span className="about-hero__eyebrow">Since 2002</span>
          <h1 className="about-hero__title">
            Cultivating Progress Through Cooperative Strength
          </h1>
          <p className="about-hero__desc">
            Meki Batu Union was founded as a testament to the power of collective farming — bridging a few
            communities to ensure fair trade, sustainable produce, and premium-quality products for
            the global market.
          </p>
        </div>
        <div className="about-hero__image-wrap">
          <img
            src={aboutHeroImg}
            alt="Panoramic view of Meki Batu farmlands"
            className="about-hero__image"
          />
        </div>
      </section>

      {/* ---- Our Foundation ---- */}
      <section className="about-foundation">
        <div className="container">
          <div className="about-foundation__header">
            <div className="about-foundation__icon">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /></svg>
            </div>
            <h2 className="about-foundation__title">Our Foundation</h2>
          </div>

          <div className="about-timeline">
            {TIMELINE.map((row, i) => (
              <div key={i} className="about-timeline__row">
                <div className="about-timeline__left">
                  {row.left.date && <p className="about-timeline__date">{row.left.date}</p>}
                  {row.left.heading && <h3 className="about-timeline__heading">{row.left.heading}</h3>}
                  {row.left.text && <p className="about-timeline__text">{row.left.text}</p>}
                </div>
                <div className="about-timeline__center">
                  <span className={`about-timeline__dot about-timeline__dot--${row.dotColor}`} />
                </div>
                <div className="about-timeline__right">
                  {row.right.date && <p className="about-timeline__date">{row.right.date}</p>}
                  {row.right.heading && <h3 className="about-timeline__heading">{row.right.heading}</h3>}
                  {row.right.text && <p className="about-timeline__text">{row.right.text}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Mission & Certification ---- */}
      <section className="about-mission-cert">
        <div className="container">
          <div className="about-mission-cert__grid">
            {/* Left — Mission */}
            <div>
              <h2 className="about-mission__title">Mission &amp; Objectives</h2>
              <ul className="about-mission__list">
                {OBJECTIVES.map((o, i) => (
                  <li key={i}>
                    <span className="mission-icon">
                      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — GlobalG.A.P */}
            <div className="about-cert-card">
              <div className="about-cert-card__header">
                <div className="about-cert-card__badge">
                  <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                </div>
                <h3 className="about-cert-card__title">GlobalG.A.P Certified</h3>
              </div>
              <p className="about-cert-card__text">
                Our certification validates our dedication to globally recognized
                standards of food safety. This covers all areas of our operations to
                ensure that our agricultural products are safe, sustainable, and ethical.
              </p>
              <ul className="about-cert-card__details">
                {CERT_DETAILS.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
              <div className="about-cert-card__footer">
                <span className="about-cert-card__footer-badge" />
                <p className="about-cert-card__footer-text">Active certification</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Governance ---- */}
      <section className="about-governance">
        <div className="container">
          <h2 className="about-governance__title">Governance</h2>
          <p className="about-governance__desc">
            Led by an experienced and dedicated team,
            committed to cooperative principles.
          </p>

          <div className="about-governance__grid">
            {TEAM.map((member) => (
              <div key={member.title} className="about-governance__card">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="about-governance__photo"
                />
                <div className="about-governance__info">
                  <p className="about-governance__name">{member.name}</p>
                  <p className="about-governance__role">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Partners strip ---- */}
      <section className="about-partners">
        <div className="container">
          <p className="about-partners__label">In collaboration with</p>
          <div className="about-partners__logos">
            {PARTNERS.map((p) => (
              <span key={p} className="about-partners__logo">{p}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default About
