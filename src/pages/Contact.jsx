import { useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import Toast from '../components/common/Toast.jsx'
import { useToast } from '../hooks/useToast.js'
import { validateFields } from '../utils/validateForm.js'
import impactHeroImg from '../assets/images/heroes/impactHero.webp'
import farmerMembershipImg from '../assets/images/community/FarmerMembership.webp'
import './InnerPage.css'
import './Contact.css'

const VALIDATION_RULES = {
  name: ['required'],
  email: ['required', 'email'],
  message: ['required'],
}

const ERROR_ID = (field) => `contact-error-${field}`

function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const { toast, showToast, dismissToast } = useToast()

  const fieldRefs = {
    name: useRef(null),
    email: useRef(null),
    subject: useRef(null),
    message: useRef(null),
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const validationErrors = validateFields(fields, VALIDATION_RULES)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      const firstInvalid = ['name', 'email', 'subject', 'message'].find(
        (f) => validationErrors[f]
      )
      if (firstInvalid) fieldRefs[firstInvalid]?.current?.focus()
      return
    }

    setErrors({})
    setSubmitting(true)

    const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT

    if (!endpoint) {
      setSubmitted(true)
      setSubmitting(false)
      showToast("Thanks — we'll get back to you soon.", 'success')
      return
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      if (res.ok) {
        setSubmitted(true)
        showToast("Thanks — we'll get back to you soon.", 'success')
      } else {
        showToast("Submission failed. Please try again later.", 'error')
      }
    } catch {
      showToast("Network error. Please try again.", 'error')
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
          content="Get in touch with Meki Batu Union headquarters in Meki, Oromia, Ethiopia. Reach out for export inquiries, cooperative membership, or sales."
        />
      </Helmet>

      {/* ---- Hero Section ---- */}
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        title="Get in Touch with Meki Batu Union"
        description="Get in touch with our headquarters team in Meki for agricultural export partnerships, cooperative membership, wholesale supply, or general inquiries."
      />

      <SectionDivider />

      {/* ---- Contact Form & Info Grid ---- */}
      <section className="contact-main section section--alt" id="inquiry">
        <div className="container contact-main__grid">
          {/* Info Sidebar Column (Reveal delay 0ms) */}
          <Reveal delay={0} className="contact-info-col">
            <div className="contact-info-card">
              <span className="label-caps label-caps--secondary block mb-3">Headquarters</span>
              <div className="contact-info-item">
                <span className="material-symbols-outlined contact-info-item__icon">location_on</span>
                <div>
                  <p className="font-medium">Meki Town</p>
                  <p className="text-muted">138km on the road to Hawassa, 60km south of Mojo town, East Shoa Zone, Dugda Woreda, Oromia, Ethiopia</p>
                  <p className="text-muted mt-1">P.O. Box: 006, Meki, Ethiopia</p>
                  <a
                    href="https://maps.app.goo.gl/HBFW3h7pe7W5tkMm8"
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
                <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:+251221181114" className="text-muted">022-118-11-14 / 02</a>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="material-symbols-outlined contact-info-item__icon">phone_iphone</span>
                <div>
                  <p className="font-medium">Mobile</p>
                  <a href="tel:+251904686868" className="text-muted">09-04-68-68-68 / 09-09-34-34-34</a>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="material-symbols-outlined contact-info-item__icon">fax</span>
                <div>
                  <p className="font-medium">Fax</p>
                  <p className="text-muted">022-118-04-08</p>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="material-symbols-outlined contact-info-item__icon">mail</span>
                <div>
                  <p className="font-medium">Email <span className="text-xs text-muted font-normal">(pending confirmation)</span></p>
                  <a href="mailto:info@mekibatuunion.org" className="text-muted">info@mekibatuunion.org</a>
                </div>
              </div>
            </div>

            <div className="contact-info-media desktop-only">
              <img
                src={impactHeroImg}
                alt="Rich dark agricultural soil with green crops in Meki"
                className="contact-info-img"
              />
            </div>
          </Reveal>

          {/* Form Column (Reveal delay 100ms) */}
          <Reveal delay={100} className="contact-form-col">
            <div className="contact-form-card">
              {submitted ? (
                <div className="contact-success">
                  <span className="material-symbols-outlined contact-success__icon">check_circle</span>
                  <h2>Message Sent!</h2>
                  <p>Thank you for reaching out. Our team will review your inquiry and respond shortly.</p>
                </div>
              ) : (
                <form className="form contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div>
                      <label htmlFor="contact-name">Full Name</label>
                      <input
                        ref={fieldRefs.name}
                        id="contact-name"
                        name="name"
                        type="text"
                        value={fields.name}
                        onChange={handleChange}
                        placeholder="e.g. Abebe Bekele"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? ERROR_ID('name') : undefined}
                      />
                      {errors.name && (
                        <span id={ERROR_ID('name')} className="form-field-error" role="alert">
                          {errors.name}
                        </span>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-email">Email Address</label>
                      <input
                        ref={fieldRefs.email}
                        id="contact-email"
                        name="email"
                        type="email"
                        value={fields.email}
                        onChange={handleChange}
                        placeholder="email@organization.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? ERROR_ID('email') : undefined}
                      />
                      {errors.email && (
                        <span id={ERROR_ID('email')} className="form-field-error" role="alert">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject">Inquiry Subject</label>
                    <select
                      ref={fieldRefs.subject}
                      id="contact-subject"
                      name="subject"
                      value={fields.subject}
                      onChange={handleChange}
                    >
                      <option value="">Select a topic...</option>
                      <option value="export">Export Partnerships</option>
                      <option value="membership">Cooperative Membership</option>
                      <option value="media">Media &amp; Press</option>
                      <option value="other">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message">Your Message</label>
                    <textarea
                      ref={fieldRefs.message}
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={fields.message}
                      onChange={handleChange}
                      placeholder="How can we assist you today?"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? ERROR_ID('message') : undefined}
                    />
                    {errors.message && (
                      <span id={ERROR_ID('message')} className="form-field-error" role="alert">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <div className="contact-form__submit-wrap">
                    <button type="submit" className="btn btn--primary" disabled={submitting}>
                      {submitting ? 'Sending...' : 'Send Message'}{' '}
                      {!submitting && (
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Regional Map Section ---- */}
      <section className="contact-map section" id="map">
        <div className="container">
          <Reveal>
            <a
              href="https://maps.app.goo.gl/HBFW3h7pe7W5tkMm8"
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
          </Reveal>
        </div>
      </section>

      {/* ---- Toast ---- */}
      <Toast toast={toast} onDismiss={dismissToast} />
    </>
  )
}

export default Contact
