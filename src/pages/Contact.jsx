import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import PageHero from '../components/common/PageHero.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import impactHeroImg from '../assets/images/impactHero.webp'
import farmerMembershipImg from '../assets/images/FarmerMembership.webp'
import './InnerPage.css'
import './Contact.css'

function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setErrorMessage('')

    const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    if (!endpoint) {
      // Fallback for local demo preview prior to setting VITE_CONTACT_FORM_ENDPOINT in .env.local
      setSubmitted(true)
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const errData = await res.json().catch(() => ({}))
        setErrorMessage(errData?.error || 'Form submission failed. Please try again.')
      }
    } catch {
      setErrorMessage('Network error occurred. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact Us | Meki Batu Union</title>
        <meta
          name="description"
          content="Get in touch with Meki Batu Union's headquarters in Meki, Oromia for export inquiries, cooperative membership, or general business questions."
        />
      </Helmet>
      {/* ---- Hero Section ---- */}
      <PageHero
        title="Get in Touch with Meki Batu Union"
        description="We welcome inquiries from global partners, local stakeholders, and farmers. Our team is ready to discuss agricultural exports, cooperative membership, and sustainable farming initiatives in the Great Rift Valley."
      />

      <SectionDivider />

      {/* ---- Contact Form & Info Grid ---- */}
      <section className="contact-main section section--alt">
        <div className="container contact-main__grid">
          {/* Info Sidebar Column */}
          <div className="contact-info-col">
            <div className="contact-info-card">
              <span className="label-caps label-caps--secondary block mb-3">Headquarters</span>
              <div className="contact-info-item">
                <span className="material-symbols-outlined contact-info-item__icon">location_on</span>
                <div>
                  <p className="font-medium">Meki Town</p>
                  <p className="text-muted">East Shewa Zone, Oromia, Ethiopia</p>
                  <a
                    href="https://maps.app.goo.gl/h6Wbr4RpR7n3hAYu7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--outline btn--sm mt-2 inline-flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-xs">map</span> View on Google Maps
                  </a>
                </div>
              </div>

              <span className="label-caps label-caps--secondary block mb-3 mt-6">Direct Lines</span>
              <div className="contact-info-item">
                <span className="material-symbols-outlined contact-info-item__icon">call</span>
                <p>+251 11 123 4567</p>
              </div>
              <div className="contact-info-item">
                <span className="material-symbols-outlined contact-info-item__icon">mail</span>
                <p>info@mekibatuunion.com</p>
              </div>
            </div>

            <div className="contact-info-media desktop-only">
              <img
                src={impactHeroImg}
                alt="Rich dark agricultural soil with green crops in Meki"
                className="contact-info-img"
              />
            </div>
          </div>

          {/* Form Column */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              {submitted ? (
                <div className="contact-success">
                  <span className="material-symbols-outlined contact-success__icon">check_circle</span>
                  <h2>Message Sent!</h2>
                  <p>Thank you for reaching out. Our team will review your inquiry and respond shortly.</p>
                </div>
              ) : (
                <form className="form contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div>
                      <label htmlFor="name">Full Name</label>
                      <input id="name" name="name" type="text" required placeholder="e.g. Abebe Bekele" />
                    </div>
                    <div>
                      <label htmlFor="email">Email Address</label>
                      <input id="email" name="email" type="email" required placeholder="email@organization.com" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject">Inquiry Subject</label>
                    <select id="subject" name="subject" required defaultValue="">
                      <option value="" disabled>Select a topic...</option>
                      <option value="export">Export Partnerships</option>
                      <option value="membership">Cooperative Membership</option>
                      <option value="media">Media &amp; Press</option>
                      <option value="other">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="How can we assist you today?"
                    />
                  </div>

                  {errorMessage && (
                    <div className="form-error-callout" style={{ color: 'var(--color-accent)', padding: '10px 14px', background: 'var(--surface-container)', borderRadius: 'var(--radius-md)', marginBottom: '16px', fontSize: '14px' }}>
                      {errorMessage}
                    </div>
                  )}

                  <div className="contact-form__submit-wrap">
                    <button type="submit" className="btn btn--primary" disabled={submitting}>
                      {submitting ? 'Sending...' : 'Send Message'} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Regional Map Section ---- */}
      <section className="contact-map section">
        <div className="container">
          <a
            href="https://maps.app.goo.gl/h6Wbr4RpR7n3hAYu7"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-map__card"
            style={{ display: 'block', textDecoration: 'none' }}
          >
            <img
              src={farmerMembershipImg}
              alt="Map showing Meki Headquarters location in Oromia, Ethiopia"
              className="contact-map__img"
            />
            <div className="contact-map__badge">
              <span className="material-symbols-outlined text-secondary">pin_drop</span>
              <span className="label-caps label-caps--primary">Meki Headquarters — Open in Google Maps</span>
              <span className="material-symbols-outlined text-xs">open_in_new</span>
            </div>
          </a>
        </div>
      </section>
    </>
  )
}

export default Contact
