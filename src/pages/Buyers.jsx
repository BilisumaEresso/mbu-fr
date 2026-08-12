import { useState } from 'react'
import PageHero from '../components/common/PageHero.jsx'
import './InnerPage.css'

const REASONS = [
  { title: 'GlobalG.A.P certified', desc: 'Every shipment is backed by internationally recognized food safety standards.' },
  { title: '20+ years of experience', desc: 'Operating since 2002, with deep relationships across 140+ primary cooperatives.' },
  { title: '50,000+ tonnes a year', desc: 'Consistent, scalable supply across a wide range of fruits and vegetables.' },
]

function Buyers() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // Phase 1: wire this up to a transactional email service (e.g. Resend/SendGrid).
    // Phase 2: POST to the Express API so it lands in a buyer-inquiries collection/dashboard.
    setSubmitted(true)
  }

  return (
    <>
      <PageHero
        eyebrow="For buyers & exporters"
        title="Source certified produce directly from Ethiopia"
        description="Meki Batu Union supplies fruits, vegetables, and seeds to domestic retail and export markets in Europe."
      />

      <section className="section">
        <div className="container feature-grid">
          {REASONS.map((r) => (
            <div key={r.title} className="feature-card">
              <p className="feature-card__title">{r.title}</p>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Request a quote</span>
            <h2>Tell us what you need</h2>
          </div>

          {submitted ? (
            <p style={{ fontWeight: 600, color: 'var(--color-primary-dark)' }}>
              Thanks — your request has been received. Our team will follow up shortly.
            </p>
          ) : (
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div>
                  <label htmlFor="name">Full name</label>
                  <input id="name" name="name" type="text" required />
                </div>
                <div>
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" type="text" required />
                </div>
              </div>
              <div className="form-row">
                <div>
                  <label htmlFor="country">Country</label>
                  <input id="country" name="country" type="text" required />
                </div>
                <div>
                  <label htmlFor="product">Product(s) of interest</label>
                  <input id="product" name="product" type="text" placeholder="e.g. Tomato, onion" required />
                </div>
              </div>
              <div>
                <label htmlFor="volume">Estimated volume</label>
                <input id="volume" name="volume" type="text" placeholder="e.g. 10 tonnes / month" />
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Tell us about your timeline and requirements" />
              </div>
              <button type="submit" className="btn btn--primary" style={{ alignSelf: 'flex-start' }}>
                Submit request
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}

export default Buyers
