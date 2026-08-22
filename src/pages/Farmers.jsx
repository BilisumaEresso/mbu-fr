import { Helmet } from 'react-helmet-async'
import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import Toast from '../components/common/Toast.jsx'
import FAQ from '../components/common/FAQ.jsx'
import { useToast } from '../hooks/useToast.js'
import farmerHeroImg from '../assets/images/heroes/farmerHero.webp'
import newsHeroImg from '../assets/images/heroes/newsHero.webp'
import './InnerPage.css'
import './Farmers.css'

const FARMERS_FAQ = [
  {
    question: 'How do primary cooperatives join Meki Batu Union?',
    answer:
      'Primary cooperatives in East Shewa and Arsi zones (Dugda, Adami Tulu, Bora, Zuway Dugda, Adama, and Dodota Sire) can apply by submitting registration documents and member rosters to our union secretariat.',
  },
  {
    question: 'What core support does the union provide members?',
    answer:
      'We provide certified seed and fertilizer distribution, facilitated agricultural credit, tractor mechanization, cold-chain aggregation, and GlobalG.A.P agronomy training.',
  },
  {
    question: 'How many cooperatives and farmers are in the union?',
    answer:
      'Meki Batu Union unites 135 primary cooperatives representing 8,089 member farming households across 5,910 hectares.',
  },
  {
    question: 'What are the membership affiliation terms?',
    answer:
      'Membership criteria and capital share requirements are reviewed during the formal board assessment. Contact our office for current guidelines.',
  },
]

const SERVICES = [
  {
    icon: 'local_shipping',
    title: 'Input Distribution',
    desc: 'High-germination certified seeds, fertilizers, and crop protection supplied at subsidized cooperative rates.',
  },
  {
    icon: 'account_balance',
    title: 'Financial Credit Support',
    desc: 'Facilitated micro-financing and seasonal credit lines tailored to member cropping cycles.',
  },
  {
    icon: 'storefront',
    title: 'Market Aggregation',
    desc: 'Direct off-take agreements connecting member harvests with national retailers and international export buyers.',
  },
  {
    icon: 'precision_manufacturing',
    title: 'Farm Mechanization',
    desc: 'Shared tractor services, river pump maintenance, and modern drip irrigation installation support.',
  },
  {
    icon: 'warehouse',
    title: 'Cold Storage & Logistics',
    desc: 'Post-harvest packhouse sorting, precooling, and temperature-controlled transport to eliminate spoilage.',
  },
  {
    icon: 'school',
    title: 'Agronomy Training',
    desc: 'Continuous extension services covering GlobalG.A.P compliance, soil health, and organic practices.',
  },
]

const STEPS = [
  {
    number: '01',
    title: 'Register Primary Cooperative',
    desc: 'Organize local farmers into a legally recognized primary cooperative under regional agricultural guidelines.',
  },
  {
    number: '02',
    title: 'Submit Documentation',
    desc: 'Provide registration certificates, active member roster, and a formal letter requesting union affiliation.',
  },
  {
    number: '03',
    title: 'Board Assessment',
    desc: 'Union leadership conducts a field assessment of cooperative farm acreage, water access, and member alignment.',
  },
  {
    number: '04',
    title: 'Full Affiliation',
    desc: 'Gain immediate access to union inputs, machinery fleet, cold-chain packhouses, and direct export markets.',
  },
]

// Cap stagger at 450ms
const stagger = (i) => Math.min(i * 90, 450)

function Farmers() {
  const { toast, showToast, dismissToast } = useToast()

  function handleLoginClick() {
    showToast(
      'Member Login is under active development. Online portal features will launch in Phase 2.',
      'info'
    )
  }

  return (
    <>
      <Helmet>
        <title>Farmer Co-ops &amp; Membership | Meki Batu Union</title>
        <meta
          name="description"
          content="Empowering 135 primary agricultural cooperatives and 8,089 member farmers in Ethiopia through seed distribution, agronomy training, cold-chain storage, and direct export linkages."
        />
      </Helmet>
      {/* ---- Hero Section ---- */}
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'For Farmers' }]}
        title="Empowering Primary Cooperatives"
        description="Meki Batu Union provides input supply, agronomy training, mechanization, and direct export linkages to 135 primary cooperatives and 8,089 farming families across the Great Rift Valley."
        actions={
          <>
            <a href="#services" className="btn btn--primary">
              Our Services <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
            <a href="#membership" className="btn btn--outline">
              How to Join <span className="material-symbols-outlined text-sm">info</span>
            </a>
          </>
        }
        image={farmerHeroImg}
        imageAlt="Ethiopian farmers in a professional agricultural packhouse"
        badge="135 Primary Co-ops"
      />

      <SectionDivider />

      {/* ---- Member Services Section — stagger each service card ---- */}
      <section className="farmers-services section section--alt" id="services">
        <div className="container">
          <h2 className="farmers-services__heading">Member Services</h2>
          <div className="farmers-services__grid">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={stagger(i)} className="farmers-service-card">
                <span className="material-symbols-outlined farmers-service-card__icon">
                  {s.icon}
                </span>
                <h3 className="farmers-service-card__title">{s.title}</h3>
                <p className="farmers-service-card__desc">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- How to Join + Member Portal — one Reveal for the whole two-column block ---- */}
      <Reveal as="section" className="farmers-membership section" id="membership">
        <div className="container farmers-membership__grid">
          <div className="farmers-membership__content">
            <span className="label-caps label-caps--secondary mb-2">Membership</span>
            <h2 className="farmers-membership__title">How to Join Meki Batu Union</h2>
            <div className="farmers-membership__steps">
              {STEPS.map((step) => (
                <div key={step.number} className="farmers-step">
                  <div className="farmers-step__num">{step.number}</div>
                  <div>
                    <h4 className="farmers-step__title">{step.title}</h4>
                    <p className="farmers-step__desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="farmers-membership__media">
            <img
              src={newsHeroImg}
              alt="Cooperative training session outdoors in a field in Ethiopia"
              className="farmers-membership__img"
            />
          </div>
        </div>
      </Reveal>

      {/* ---- Digital Member Portal Teaser — one Reveal ---- */}
      <section className="farmers-portal section section--alt" id="portal">
        <div className="container">
          <Reveal className="farmers-portal__card">
            <span className="material-symbols-outlined farmers-portal__icon">terminal</span>
            <h2 className="farmers-portal__title">Digital Member Portal</h2>
            <span className="label-caps label-caps--secondary mb-4 block">
              Phase 2 Development - Coming Soon
            </span>
            <p className="farmers-portal__desc">
              A secure digital platform under active development for member cooperatives to track crop deliveries, access market prices, request inputs, and manage union accounts online.
            </p>
            <button
              type="button"
              className="farmers-portal__btn"
              onClick={handleLoginClick}
            >
              Access Member Portal
              <span className="material-symbols-outlined text-sm">lock</span>
            </button>
          </Reveal>
        </div>
      </section>

      {/* ---- FAQ Section ---- */}
      <FAQ items={FARMERS_FAQ} />

      {/* Toast Notification */}
      <Toast toast={toast} onDismiss={dismissToast} />
    </>
  )
}

export default Farmers
