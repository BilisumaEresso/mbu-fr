import { Helmet } from 'react-helmet-async'
import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import StatCard from '../components/common/StatCard.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import impactHeroImg from '../assets/images/impactHero.webp'
import womenFarmerImg from '../assets/images/womenFarmer.webp'
import './InnerPage.css'
import './Impact.css'

const STATS = [
  { value: '50,000+', label: 'Farmers Supported' },
  { value: '140+',    label: 'Member Cooperatives' },
  { value: '12',      label: 'Districts Served' },
  { value: '35%',     label: 'Women in Leadership' },
]

const REPORTS = [
  {
    id: 1,
    title: 'Annual Impact Report 2023',
    desc: 'Comprehensive overview of operational output and community initiatives.',
    link: '#',
  },
  {
    id: 2,
    title: 'GlobalG.A.P Certification Document',
    desc: 'Official validation of safe and sustainable agricultural practices.',
    link: '#',
  },
  {
    id: 3,
    title: 'Financial Transparency Review Q4',
    desc: 'Detailed financial breakdown and cooperative dividend distribution.',
    link: '#',
  },
]

const stagger = (i) => Math.min(i * 90, 450)

function Impact() {
  return (
    <>
      <Helmet>
        <title>Our Impact | Meki Batu Union</title>
        <meta
          name="description"
          content="See how Meki Batu Union fosters sustainable farming, economic resilience, and women's empowerment across 140+ member cooperatives in Ethiopia."
        />
      </Helmet>
      {/* ---- Hero Section ---- */}
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Impact' }]}
        title="Cultivating Growth, Sustaining Communities"
        description="Our impact extends beyond agricultural output. We are dedicated to empowering farmers, fostering sustainable practices, and driving economic resilience across the Great Rift Valley."
        actions={
          <>
            <a href="#metrics" className="btn btn--primary">
              View Impact Metrics <span className="material-symbols-outlined text-sm">trending_up</span>
            </a>
            <a href="#reports" className="btn btn--outline">
              Impact Reports <span className="material-symbols-outlined text-sm">download</span>
            </a>
          </>
        }
        image={impactHeroImg}
        imageAlt="Vibrant thriving agricultural field in Ethiopia during golden hour"
        badge="Empowering 50k+ Farmers"
      />

      <SectionDivider />

      {/* ---- Measurable Impact Stats — brand-moment dark green band ---- */}
      <section className="impact-metrics section" id="metrics">
        <div className="container">
          <Reveal className="impact-metrics__header">
            <h2 className="impact-metrics__title">Measurable Impact</h2>
            <p className="impact-metrics__desc">
              Key performance indicators reflecting our commitment to the cooperative network.
            </p>
          </Reveal>

          <div className="impact-metrics__grid">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={stagger(i)}>
                <StatCard value={s.value} label={s.label} />
              </Reveal>
            ))}
          </div>

          {/* Farmer photo — sits below the stat row on mobile, beside on desktop */}
          <Reveal className="impact-metrics__photo" delay={stagger(STATS.length)}>
            <img
              src={womenFarmerImg}
              alt="Women farmers in cooperative fields in Ethiopia"
              className="impact-metrics__photo-img"
            />
          </Reveal>
        </div>
      </section>

      {/* ---- Reports & Documentation Section ---- */}
      <section className="impact-reports section" id="reports">
        <div className="container impact-reports__grid">
          <div className="impact-reports__sidebar">
            <h2 className="impact-reports__title">Reports &amp; Documentation</h2>
            <p className="impact-reports__desc">
              Access our annual performance reviews, sustainability reports, and official certifications validating our global export standards.
            </p>
          </div>

          {/* Wrap whole list as one Reveal, no per-item stagger */}
          <Reveal className="impact-reports__list">
            {REPORTS.map((r) => (
              <div key={r.id} className="impact-report-item">
                <div>
                  <h4 className="impact-report-item__title">{r.title}</h4>
                  <p className="impact-report-item__desc">{r.desc}</p>
                </div>
                <a href={r.link} className="impact-report-item__download">
                  <span className="label-caps label-caps--secondary">Download PDF</span>
                  <span className="material-symbols-outlined text-sm">download</span>
                </a>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default Impact
