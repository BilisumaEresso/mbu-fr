import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import Toast from '../components/common/Toast.jsx'
import FAQ from '../components/common/FAQ.jsx'
import ProcessTimeline from '../components/common/ProcessTimeline.jsx'
import { useToast } from '../hooks/useToast.js'
import { validateFields } from '../utils/validateForm.js'
import buyerHeroImg from '../assets/images/heroes/buyerHero.webp'
import { COMPANY_PROFILE_BASE64 as companyProfilePdf } from '../data/companyProfilePdfBase64.js'
import './InnerPage.css'
import './Buyers.css'

const BUYERS_FAQ = [
  {
    question: 'What commodities are available for export sourcing?',
    answer:
      'We supply export-grade Rift Valley tomatoes, red onions, green peppers, highland potatoes, cabbage, green beans, fresh papaya, and certified hybrid seeds.',
  },
  {
    question: 'What certifications back Meki Batu Union produce?',
    answer:
      'Our crops are GlobalG.A.P certified with full farm-gate traceability. We are also a licensed seed producer under Ethiopian national standards.',
  },
  {
    question: 'Which international markets do you currently supply?',
    answer:
      'We supply European export markets via air freight, as well as Ethiopian Airlines Inflight Catering and wholesale buyers in East Africa.',
  },
  {
    question: 'How do I request a tailored volume quote?',
    answer:
      'Submit the inquiry form on this page with your required commodity, tonnage, and destination. Our export team responds within 24 hours.',
  },
  {
    question: 'What are the minimum order quantities (MOQ)?',
    answer:
      'MOQs depend on commodity perishability and seasonal windows. Contact us with your delivery schedule for custom volume terms.',
  },
]

const VALUE_PROPS = [
  {
    icon: 'verified',
    title: 'Certified Quality',
    desc: 'Strict compliance with GlobalG.A.P and Ethiopian seed standards, ensuring full traceability from farm gate to destination ports.',
    tags: ['GAP', 'ORG'],
    iconColor: 'primary',
  },
  {
    icon: 'inventory_2',
    title: 'Reliable Supply Volume',
    desc: '135 member cooperatives across 5,910 irrigated hectares provide consistent, high-tonnage supply throughout harvest seasons.',
    iconColor: 'secondary',
  },
  {
    icon: 'language',
    title: 'Export-Grade Logistics',
    desc: 'Refrigerated fleet transport and central packhouse precooling maintain optimal cold-chain integrity for international air freight.',
    iconColor: 'primary',
  },
]

const VALIDATION_RULES = {
  name: ['required'],
  company: ['required'],
  country: ['required'],
  product: ['required'],
}

const ERROR_ID = (field) => `buyers-error-${field}`
const EMPTY_FIELDS = { name: '', company: '', country: '', product: '', volume: '', message: '' }

const stagger = (i) => Math.min(i * 90, 450)

function Buyers() {
  const [searchParams] = useSearchParams()
  const [fields, setFields] = useState(EMPTY_FIELDS)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const { toast, showToast, dismissToast } = useToast()

  const fieldRefs = {
    name: useRef(null),
    company: useRef(null),
    country: useRef(null),
    product: useRef(null),
    volume: useRef(null),
    message: useRef(null),
  }

  useEffect(() => {
    const productParam = searchParams.get('product')
    if (productParam) {
      setFields((prev) => ({ ...prev, product: productParam }))
      const quoteElement = document.getElementById('quote')
      if (quoteElement) {
        quoteElement.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [searchParams])

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
      const firstInvalid = ['name', 'company', 'country', 'product', 'volume', 'message'].find(
        (f) => validationErrors[f]
      )
      if (firstInvalid) fieldRefs[firstInvalid]?.current?.focus()
      return
    }

    setErrors({})
    setSubmitting(true)

    const endpoint = import.meta.env.VITE_BUYERS_FORM_ENDPOINT

    if (!endpoint) {
      setSubmitted(true)
      setSubmitting(false)
      showToast(
        "Thanks — your request has been received. Our team will follow up shortly.",
        'success'
      )
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
        showToast("Thanks — your request has been received.", 'success')
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
        <title>For Buyers &amp; Exporters | Meki Batu Union</title>
        <meta
          name="description"
          content="Partner with Meki Batu Union for reliable, certified, high-volume export of fresh Ethiopian fruits and vegetables with full supply chain traceability."
        />
      </Helmet>

      {/* ---- Hero Section ---- */}
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'For Buyers' }]}
        title="Reliable Global Export Partner"
        description="Meki Batu Union offers certified, high-volume agricultural products directly from our extensive network of Ethiopian cooperatives. Experience transparent sourcing and uncompromising quality control."
        actions={
          <>
            <a href="#quote" className="btn btn--primary">
              Request a Quote <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
            <a
              href={companyProfilePdf}
              download="MekiBatuUnion_CompanyProfile.pdf"
              className="btn btn--outline"
              title="Download Meki Batu Union Company Profile (PDF)"
            >
              Download company profile (PDF) <span className="material-symbols-outlined text-sm">download</span>
            </a>
          </>
        }
        image={buyerHeroImg}
        imageAlt="Fresh produce being inspected and packed in an export packhouse"
        badge="Export &amp; Wholesale"
      />

      <SectionDivider />

      {/* ---- Value Props (Why Source From Us) ---- */}
      <section className="buyers-props section section--alt" id="why-us">
        <div className="container">
          <h2 className="buyers-props__heading">Why Source From Us</h2>
          <div className="buyers-props__grid">
            {VALUE_PROPS.map((p, i) => (
              <Reveal key={p.title} delay={stagger(i)} className="buyers-prop-card">
                <span className={`material-symbols-outlined buyers-prop-card__icon buyers-prop-card__icon--${p.iconColor}`}>
                  {p.icon}
                </span>
                <h3 className="buyers-prop-card__title">{p.title}</h3>
                <p className="buyers-prop-card__desc">{p.desc}</p>
                {p.tags && (
                  <div className="buyers-prop-card__tags">
                    {p.tags.map((tag) => (
                      <span key={tag} className="buyers-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Supply Chain Process Timeline ---- */}
      <ProcessTimeline />

      {/* ---- Quote Form Section ---- */}
      <section className="buyers-quote section" id="quote">
        <div className="container">
          <Reveal className="buyers-quote__card">
            <div className="buyers-quote__header">
              <h2 className="buyers-quote__title">Request a Quote</h2>
              <p className="buyers-quote__subtitle">
                Provide your details below and our export team will contact you within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="buyers-quote__success">
                <span className="material-symbols-outlined buyers-quote__success-icon">check_circle</span>
                <h3>Thank you for your request!</h3>
                <p>Our export logistics team will follow up with your customized quote within 24 hours.</p>
              </div>
            ) : (
              <form className="form buyers-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div>
                    <label htmlFor="buyers-name">Full Name</label>
                    <input
                      ref={fieldRefs.name}
                      id="buyers-name"
                      name="name"
                      type="text"
                      value={fields.name}
                      onChange={handleChange}
                      placeholder="Enter full name"
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
                    <label htmlFor="buyers-company">Company</label>
                    <input
                      ref={fieldRefs.company}
                      id="buyers-company"
                      name="company"
                      type="text"
                      value={fields.company}
                      onChange={handleChange}
                      placeholder="Company name"
                      aria-invalid={!!errors.company}
                      aria-describedby={errors.company ? ERROR_ID('company') : undefined}
                    />
                    {errors.company && (
                      <span id={ERROR_ID('company')} className="form-field-error" role="alert">
                        {errors.company}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div>
                    <label htmlFor="buyers-country">Country of Destination</label>
                    <input
                      ref={fieldRefs.country}
                      id="buyers-country"
                      name="country"
                      type="text"
                      value={fields.country}
                      onChange={handleChange}
                      placeholder="e.g. Netherlands, UK, Germany"
                      aria-invalid={!!errors.country}
                      aria-describedby={errors.country ? ERROR_ID('country') : undefined}
                    />
                    {errors.country && (
                      <span id={ERROR_ID('country')} className="form-field-error" role="alert">
                        {errors.country}
                      </span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="buyers-product">Product of Interest</label>
                    <select
                      ref={fieldRefs.product}
                      id="buyers-product"
                      name="product"
                      value={fields.product}
                      onChange={handleChange}
                      aria-invalid={!!errors.product}
                      aria-describedby={errors.product ? ERROR_ID('product') : undefined}
                    >
                      <option value="">Select a product...</option>
                      <option value="tomatoes">Rift Valley Tomatoes</option>
                      <option value="onions">Red Onions</option>
                      <option value="peppers">Green Peppers</option>
                      <option value="potato">Highland Potatoes</option>
                      <option value="papaya">Fresh Papaya</option>
                      <option value="seeds">Certified Hybrid Seeds</option>
                      <option value="vegetables">General Fresh Vegetables</option>
                    </select>
                    {errors.product && (
                      <span id={ERROR_ID('product')} className="form-field-error" role="alert">
                        {errors.product}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="buyers-volume">Estimated Volume (Tonnes)</label>
                  <input
                    ref={fieldRefs.volume}
                    id="buyers-volume"
                    name="volume"
                    type="number"
                    value={fields.volume}
                    onChange={handleChange}
                    placeholder="e.g. 20"
                  />
                </div>

                <div>
                  <label htmlFor="buyers-message">Additional Requirements</label>
                  <textarea
                    ref={fieldRefs.message}
                    id="buyers-message"
                    name="message"
                    rows={4}
                    value={fields.message}
                    onChange={handleChange}
                    placeholder="Specify shipping terms, packaging specs, or delivery timelines..."
                  />
                </div>

                <div className="buyers-form__submit-wrap">
                  <button type="submit" className="btn btn--primary" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---- FAQ Section ---- */}
      <FAQ items={BUYERS_FAQ} />

      {/* ---- Toast ---- */}
      <Toast toast={toast} onDismiss={dismissToast} />
    </>
  )
}

export default Buyers
