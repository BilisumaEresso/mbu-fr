import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageHero from '../components/common/PageHero.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import buyerHeroImg from '../assets/images/buyerHero.webp'
import './InnerPage.css'
import './Buyers.css'

const VALUE_PROPS = [
  {
    icon: 'verified',
    title: 'Certified Quality',
    desc: 'Adhering to strict international standards including GlobalG.A.P and Organic certifications, ensuring every shipment meets premium market requirements.',
    tags: ['GAP', 'ORG'],
    iconColor: 'primary',
  },
  {
    icon: 'inventory_2',
    title: 'Consistent Volume',
    desc: 'With over 140 cooperatives in our network, we provide reliable, large-scale supply capacities throughout the harvest seasons to meet your operational demands.',
    iconColor: 'secondary',
  },
  {
    icon: 'language',
    title: 'Export Experience',
    desc: 'Decades of experience navigating international logistics, customs, and global market expectations, ensuring smooth end-to-end delivery.',
    iconColor: 'primary',
  },
]

function Buyers() {
  const [searchParams] = useSearchParams()
  const [selectedProduct, setSelectedProduct] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const productParam = searchParams.get('product')
    if (productParam) {
      setSelectedProduct(productParam)
      // Smooth scroll to quote section
      const quoteElement = document.getElementById('quote')
      if (quoteElement) {
        quoteElement.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [searchParams])

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setErrorMessage('')

    const endpoint = import.meta.env.VITE_BUYERS_FORM_ENDPOINT
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    if (!endpoint) {
      // Fallback for local demo preview prior to setting VITE_BUYERS_FORM_ENDPOINT in .env.local
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
        <title>For Buyers &amp; Exporters | Meki Batu Union</title>
        <meta
          name="description"
          content="Partner with Meki Batu Union for reliable, certified, high-volume export of fresh Ethiopian fruits and vegetables with full supply chain traceability."
        />
      </Helmet>
      {/* ---- Hero Section ---- */}
      <PageHero
        title="Reliable Global Export Partner"
        description="Meki Batu Union offers certified, high-volume agricultural products directly from our extensive network of Ethiopian cooperatives. Experience transparent sourcing and uncompromising quality control."
        actions={
          <>
            <a href="#quote" className="btn btn--primary">
              Request a Quote <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
            <Link to="/products" className="btn btn--outline">
              View Catalog <span className="material-symbols-outlined text-sm">inventory_2</span>
            </Link>
          </>
        }
        image={buyerHeroImg}
        imageAlt="Fresh produce being inspected and packed in an export packhouse"
        badge="Export &amp; Wholesale"
      />

      <SectionDivider />

      {/* ---- Value Props (Why Source From Us) ---- */}
      <section className="buyers-props section section--alt">
        <div className="container">
          <h2 className="buyers-props__heading">Why Source From Us</h2>
          <div className="buyers-props__grid">
            {VALUE_PROPS.map((p) => (
              <div key={p.title} className="buyers-prop-card">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Quote Form Section ---- */}
      <section className="buyers-quote section" id="quote">
        <div className="container">
          <div className="buyers-quote__card">
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
              <form className="form buyers-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div>
                    <label htmlFor="name">Full Name</label>
                    <input id="name" name="name" type="text" required placeholder="Enter full name" />
                  </div>
                  <div>
                    <label htmlFor="company">Company</label>
                    <input id="company" name="company" type="text" required placeholder="Company name" />
                  </div>
                </div>

                <div className="form-row">
                  <div>
                    <label htmlFor="country">Country of Destination</label>
                    <input id="country" name="country" type="text" required placeholder="e.g. Netherlands, UK, Germany" />
                  </div>
                  <div>
                    <label htmlFor="product">Product of Interest</label>
                    <select
                      id="product"
                      name="product"
                      required
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                      <option value="" disabled>Select a product...</option>
                      <option value="tomatoes">Rift Valley Tomatoes</option>
                      <option value="onions">Red Onions</option>
                      <option value="peppers">Green Peppers</option>
                      <option value="potato">Highland Potatoes</option>
                      <option value="papaya">Fresh Papaya</option>
                      <option value="seeds">Certified Hybrid Seeds</option>
                      <option value="vegetables">General Fresh Vegetables</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="volume">Estimated Volume (Tonnes)</label>
                  <input id="volume" name="volume" type="number" required placeholder="e.g. 20" />
                </div>

                <div>
                  <label htmlFor="message">Additional Requirements</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Specify shipping terms, packaging specs, or delivery timelines..."
                  />
                </div>

                {errorMessage && (
                  <div className="form-error-callout" style={{ color: 'var(--color-accent)', padding: '10px 14px', background: 'var(--surface-container)', borderRadius: 'var(--radius-md)', marginBottom: '16px', fontSize: '14px' }}>
                    {errorMessage}
                  </div>
                )}

                <div className="buyers-form__submit-wrap">
                  <button type="submit" className="btn btn--primary" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Buyers
