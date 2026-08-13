import { Link } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import './InnerPage.css'

const SERVICES = [
  {
    icon: 'agriculture',
    title: 'Input Supply',
    desc: 'Reliable access to high-quality seeds, fertilizers, and essential agricultural inputs at cooperative rates to maximize seasonal yields.',
  },
  {
    icon: 'account_balance',
    title: 'Credit Access',
    desc: 'Facilitated financing and micro-credit solutions designed specifically for agricultural cycles and cooperative expansion needs.',
  },
  {
    icon: 'trending_up',
    title: 'Market Information',
    desc: 'Real-time pricing data, market trend analysis, and direct linkages to domestic and international export markets.',
  },
  {
    icon: 'precision_manufacturing',
    title: 'Mechanization',
    desc: 'Access to shared modern farming equipment, maintenance support, and operational training to improve farming efficiency.',
  },
  {
    icon: 'school',
    title: 'Training & Capacity',
    desc: 'Continuous education on GlobalG.A.P standards, organic farming practices, and cooperative management principles.',
  },
]

const STEPS = [
  {
    num: 1,
    title: 'Form a Primary Cooperative',
    desc: 'Organize local farmers into a legally registered primary cooperative under local agricultural directives.',
  },
  {
    num: 2,
    title: 'Submit Application',
    desc: 'Provide the union with your registration documents, member roster, and formal request for union affiliation.',
  },
  {
    num: 3,
    title: 'Assessment & Onboarding',
    desc: 'Undergo our standard capacity assessment followed by initial training sessions to integrate into our supply chain.',
  },
]

function Farmers() {
  return (
    <>
      {/* ---- Hero Section ---- */}
      <section className="farmers-hero section">
        <div className="container farmers-hero__grid">
          <div className="farmers-hero__content">
            <h1 className="farmers-hero__title">Empowering Primary Cooperatives</h1>
            <p className="farmers-hero__desc">
              Meki Batu Union provides essential services, training, and market access to our network of primary cooperatives, ensuring sustainable growth and prosperity for Ethiopian farmers.
            </p>
            <div className="farmers-hero__actions">
              <a href="#services" className="btn btn--primary">
                Our Services
              </a>
              <a href="#membership" className="btn btn--outline">
                Learn More
              </a>
            </div>
          </div>
          <div className="farmers-hero__media">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuNDFZA-_K76aN8QAEZRdXVSymX50AqVpU0hH53C9qft4H1t7kxaSMhaYdRk5vgX3w18mraIdHNWKdnd3nVi2XLUG93qlSIE7M-2Pf-EmVZBQjFnulh0uahAyJQSz3NjoVtnck0JN3FhA7QqibciIIC55FsbRIiLMV0BESSjeq8V4KjBJvUrAmLVtu-SBwcuJZH15QVX9JVUfARufKTdLI1Hj3elpI3234eqFr1_aIcGxRxvHr54vf"
              alt="Ethiopian farmers in a professional agricultural packhouse"
              className="farmers-hero__img"
            />
          </div>
        </div>
      </section>

      {/* ---- Member Services Section ---- */}
      <section className="farmers-services section section--alt" id="services">
        <div className="container">
          <h2 className="farmers-services__heading">Member Services</h2>
          <div className="farmers-services__grid">
            {SERVICES.map((s) => (
              <div key={s.title} className="farmers-service-card">
                <span className="material-symbols-outlined farmers-service-card__icon">
                  {s.icon}
                </span>
                <h3 className="farmers-service-card__title">{s.title}</h3>
                <p className="farmers-service-card__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- How to Join Section ---- */}
      <section className="farmers-membership section" id="membership">
        <div className="container farmers-membership__grid">
          <div className="farmers-membership__content">
            <span className="label-caps label-caps--secondary mb-2">Membership</span>
            <h2 className="farmers-membership__title">How to Join Meki Batu Union</h2>
            <div className="farmers-membership__steps">
              {STEPS.map((step) => (
                <div key={step.num} className="farmers-step">
                  <div className="farmers-step__num">{step.num}</div>
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAi6J9q53heWgIYMaBheMC7J0O8XVQ8vm6RpwZuagDlhi9L8HEwgpnX8TdO-AluxdUCUvEohbxkx0oBkfRV_PI-D4fuonXHLyOtqkQlXJE6UG7HhsxjizKRlg0P3sQ9EsENMg73Hsr1n9xI_CEC6hAF3IKy0sWjkqZMFvmEhpIq-boakyfslyPJRVYLiBXuRRAV_H9dhrKhvCzLOJmRfQ2qdRRPpTTiaM0mpgb2l5EoFk1PhGi9VNix"
              alt="Cooperative training session outdoors in a field in Ethiopia"
              className="farmers-membership__img"
            />
          </div>
        </div>
      </section>

      {/* ---- Digital Member Portal Teaser ---- */}
      <section className="farmers-portal section section--alt">
        <div className="container">
          <div className="farmers-portal__card">
            <span className="material-symbols-outlined farmers-portal__icon">terminal</span>
            <h2 className="farmers-portal__title">Digital Member Portal</h2>
            <span className="label-caps label-caps--secondary mb-4 block">
              Phase 2 Development - Coming Soon
            </span>
            <p className="farmers-portal__desc">
              We are developing a secure, centralized digital portal for our primary cooperatives. Soon, members will be able to access market prices, request inputs, view transaction histories, and manage their union accounts directly online.
            </p>
            <div className="farmers-portal__disabled-btn">
              Portal Access Unavailable
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Farmers
