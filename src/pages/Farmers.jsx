import { Helmet } from 'react-helmet-async'
import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import Toast from '../components/common/Toast.jsx'
import FAQ from '../components/common/FAQ.jsx'
import { useToast } from '../hooks/useToast.js'
import farmerHeroImg from '../assets/images/farmerHero.webp'
import newsHeroImg from '../assets/images/newsHero.webp'
import './InnerPage.css'
import './Farmers.css'

const FARMERS_FAQ = [
  {
    question: 'How do I join Meki Batu Union as a primary cooperative?',
    answer:
      'Primary cooperatives in our operating districts — Dugda woreda and Adami Tulu Jido Kombolcha — can apply to join. Contact our membership office using the details on our Contact page to learn about eligibility and the application process.',
  },
  {
    question: 'What support does the union provide to member cooperatives?',
    answer:
      'We supply farm inputs at fair prices, help facilitate access to credit, share market information, provide mechanization and maintenance services, and offer training and technical advisory support.',
  },
  {
    question: 'How many cooperatives are currently part of the union?',
    answer:
      'Meki Batu Union currently includes more than 140 primary cooperatives.',
  },
  {
    question: 'Is there a cost to join?',
    answer:
      'Membership terms are discussed directly with applicants during the joining process — contact us for current details.',
  },
]

const SERVICES = [
  {
    icon: 'local_shipping',
    title: 'Input Supply Distribution',
    desc: 'Reliable access to high-quality seeds, fertilizers, and essential agricultural inputs at cooperative rates.',
  },
  {
    icon: 'account_balance',
    title: 'Financial Services Support',
    desc: 'Facilitated financing and micro-credit solutions designed specifically for agricultural cycle needs.',
  },
  {
    icon: 'storefront',
    title: 'Market Linkage & Aggregation',
    desc: 'Direct access to national wholesale markets, retail outlets, and international export contracts.',
  },
  {
    icon: 'precision_manufacturing',
    title: 'Mechanization Support',
    desc: 'Shared access to modern farming machinery, irrigation technology, and equipment maintenance.',
  },
  {
    icon: 'warehouse',
    title: 'Storage & Cold Chain',
    desc: 'Post-harvest handling facilities, warehouse management, and temperature-controlled storage.',
  },
  {
    icon: 'school',
    title: 'Technical Training',
    desc: 'Continuous education on GlobalG.A.P standards, organic farming practices, and cooperative management.',
  },
]

const STEPS = [
  {
    number: '01',
    title: 'Form a Primary Cooperative',
    desc: 'Organize local farmers into a legally registered primary cooperative under local agricultural regulations.',
  },
  {
    number: '02',
    title: 'Submit Application',
    desc: 'Provide the union with your registration documents, member roster, and formal request for union affiliation.',
  },
  {
    number: '03',
    title: 'Union Board Review',
    desc: 'The Meki Batu Union board reviews the application and conducts a site assessment visit.',
  },
  {
    number: '04',
    title: 'Full Affiliation',
    desc: 'Upon approval, your primary co-op gains full access to all union services, inputs, and export market linkages.',
  },
]

// Cap stagger at 450ms
const stagger = (i) => Math.min(i * 90, 450)

function Farmers() {
  const { toast, showToast, dismissToast } = useToast()

  function handleLoginClick() {
    showToast(
      'Member Login is coming soon! Online portal access for member cooperatives is currently under development.',
      'info'
    )
  }

  return (
    <>
      <Helmet>
        <title>Farmer Co-ops &amp; Membership | Meki Batu Union</title>
        <meta
          name="description"
          content="Empowering 140+ primary agricultural cooperatives in Ethiopia through seed distribution, agronomy training, cold-chain storage, and direct export linkages."
        />
      </Helmet>
      {/* ---- Hero Section ---- */}
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'For Farmers' }]}
        title="Empowering Primary Cooperatives"
        description="Meki Batu Union provides essential services, training, and market access to our network of primary cooperatives, ensuring sustainable growth and prosperity for Ethiopian farmers."
        actions={
          <>
            <a href="#services" className="btn btn--primary">
              Our Services <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
            <a href="#membership" className="btn btn--outline">
              Learn More <span className="material-symbols-outlined text-sm">info</span>
            </a>
          </>
        }
        image={farmerHeroImg}
        imageAlt="Ethiopian farmers in a professional agricultural packhouse"
        badge="140+ Primary Co-ops"
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
      <section className="farmers-portal section section--alt">
        <div className="container">
          <Reveal className="farmers-portal__card">
            <span className="material-symbols-outlined farmers-portal__icon">terminal</span>
            <h2 className="farmers-portal__title">Digital Member Portal</h2>
            <span className="label-caps label-caps--secondary mb-4 block">
              Phase 2 Development - Coming Soon
            </span>
            <p className="farmers-portal__desc">
              We are developing a secure, centralized digital portal for our primary cooperatives. Soon, members will be able to access market prices, request inputs, view transaction histories, and manage their union accounts directly online.
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
