import { useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import PageHero from '../components/common/PageHero.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import Toast from '../components/common/Toast.jsx'
import { useToast } from '../hooks/useToast.js'
import { validateFields } from '../utils/validateForm.js'
import impactHeroImg from '../assets/images/impactHero.webp'
import farmerMembershipImg from '../assets/images/FarmerMembership.webp'
import './InnerPage.css'
import './Contact.css'

const VALIDATION_RULES = {
  name: ['required'],
  email: ['required', 'email'],
  message: ['required'],
}

// IDs used for aria-describedby associations
const ERROR_ID = (field) => `contact-error-${field}`

function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const { toast, showToast, dismissToast } = useToast()

  // Ref map for focusing the first invalid field
  const fieldRefs = {
    name: useRef(null),
    email: useRef(null),
    subject: useRef(null),
    message: useRef(null),
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    // Clear the error for this field as the user edits it
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

    // --- Client-side validation ---
    const validationErrors = validateFields(fields, VALIDATION_RULES)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // Focus the first invalid field in DOM order
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
      // Fallback for local demo preview prior to setting VITE_CONTACT_FORM_ENDPOINT in .env.local
      setSubmitted(true)
      setSubmitting(false)
      showToast("Thanks — we'll get back to you soon.", 'success')
      return
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      })

      if (res.ok) {
        setSubmitted(true)
        setFields({ name: '', email: '', subject: '', message: '' })
        showToast("Thanks — we'll get back to you soon.", 'success')
      } else {
        showToast(
          'Something went wrong. Please try again or email us directly.',
          'error'
        )
      }
    } catch {
      showToast(
        'Something went wrong. Please try again or email us directly.',
        'error'
      )
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

      {/* ---- Toast ---- */}
      <Toast toast={toast} onDismiss={dismissToast} />
    </>
  )
}

export default Contact
