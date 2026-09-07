import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import SEO from '../components/common/SEO.jsx'
import { useTranslation } from 'react-i18next'
import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import Toast from '../components/common/Toast.jsx'
import FAQ from '../components/common/FAQ.jsx'
import ProcessTimeline from '../components/common/ProcessTimeline.jsx'
import { useToast } from '../hooks/useToast.js'
import { validateFields } from '../utils/validateForm.js'
import buyerHeroImg from '../assets/images/heroes/buyerHero.webp'
import buyerHero480 from '../assets/images/heroes/buyerHero-480w.webp'
import buyerHero800 from '../assets/images/heroes/buyerHero-800w.webp'
import { COMPANY_PROFILE_BASE64 as companyProfilePdf } from '../data/companyProfilePdfBase64.js'
import { ArrowRight, Download, BadgeCheck, Package, Globe, CheckCircle } from 'lucide-react'
import './InnerPage.css'
import './Buyers.css'

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
  const { t } = useTranslation(['buyers', 'meta', 'common'])
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

  const valueProps = [
    {
      icon: BadgeCheck,
      title: t('buyers:valueProps.prop1.title'),
      desc: t('buyers:valueProps.prop1.desc'),
      tags: ['GAP', 'ORG'],
      iconColor: 'primary',
    },
    {
      icon: Package,
      title: t('buyers:valueProps.prop2.title'),
      desc: t('buyers:valueProps.prop2.desc'),
      iconColor: 'secondary',
    },
    {
      icon: Globe,
      title: t('buyers:valueProps.prop3.title'),
      desc: t('buyers:valueProps.prop3.desc'),
      iconColor: 'primary',
    },
  ]

  const faqItems = t('buyers:faq.items', { returnObjects: true }) || []

  useEffect(() => {
    const productParam = searchParams.get('product')
    if (productParam) {
      const normalizedProduct =
        productParam === 'green-beans' ? 'greenBeans' :
        productParam.includes('seed') ? 'seeds' :
        productParam
      setFields((prev) => ({ ...prev, product: normalizedProduct }))
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

    const validationErrors = validateFields(fields, VALIDATION_RULES, {
      required: t('common:validation.required'),
      email: t('common:validation.email'),
    })
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
        t('buyers:form.toasts.success', "Thank you! Your request has been received. Our team will follow up shortly."),
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
        showToast(t('buyers:form.toasts.success', "Thank you! Your request has been received."), 'success')
      } else {
        showToast(t('buyers:form.toasts.fail', "Submission failed. Please try again later."), 'error')
      }
    } catch {
      showToast(t('buyers:form.toasts.network', "Network error. Please try again."), 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <SEO
        title={t('meta:buyers.title')}
        description={t('meta:buyers.description')}
      />

      {/* ---- Hero Section ---- */}
      <PageHero
        breadcrumbs={[{ label: t('common:breadcrumbs.home'), to: '/' }, { label: t('common:breadcrumbs.buyers') }]}
        title={t('buyers:hero.title')}
        description={t('buyers:hero.desc')}
        actions={
          <>
            <a href="#quote" className="btn btn--primary">
              {t('buyers:hero.requestQuote')} <ArrowRight size={16} className="text-sm" />
            </a>
            <a
              href={companyProfilePdf}
              download="MekiBatuUnion_CompanyProfile.pdf"
              className="btn btn--outline"
              title={t('buyers:hero.downloadPdfTitle')}
            >
              {t('common:buttons.downloadPdf')} <Download size={16} className="text-sm" />
            </a>
          </>
        }
        image={buyerHeroImg}
        imageSrcSet={`${buyerHero480} 480w, ${buyerHero800} 800w, ${buyerHeroImg} 1537w`}
        imageAlt={t('buyers:hero.imageAlt')}
        badge={t('buyers:hero.badge')}
      />

      <SectionDivider />

      {/* ---- Value Props (Why Source From Us) ---- */}
      <section className="buyers-props section section--alt" id="why-us">
        <div className="container">
          <h2 className="buyers-props__heading">{t('home:audience.buyers.tag', 'Why Source From Us')}</h2>
          <div className="buyers-props__grid">
            {valueProps.map((p, i) => {
              const PropIcon = p.icon
              return (
                <Reveal key={p.title} delay={stagger(i)} className="buyers-prop-card">
                  <PropIcon size={28} className={`buyers-prop-card__icon buyers-prop-card__icon--${p.iconColor}`} />
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
              )
            })}
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
              <span className="label-caps label-caps--secondary mb-2 block">{t('buyers:form.tag')}</span>
              <h2 className="buyers-quote__title">{t('buyers:form.title')}</h2>
              <p className="buyers-quote__subtitle">
                {t('buyers:form.desc')}
              </p>
            </div>

            {submitted ? (
              <div className="buyers-quote__success">
                <CheckCircle size={48} className="buyers-quote__success-icon" />
                <h3>{t('buyers:form.success.title')}</h3>
                <p>{t('buyers:form.success.desc')}</p>
                <button
                  type="button"
                  className="btn btn--outline mt-4"
                  onClick={() => {
                    setFields(EMPTY_FIELDS)
                    setSubmitted(false)
                  }}
                >
                  {t('buyers:form.success.button')}
                </button>
              </div>
            ) : (
              <form className="form buyers-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div>
                    <label htmlFor="buyers-name">{t('buyers:form.fields.name')}</label>
                    <input
                      ref={fieldRefs.name}
                      id="buyers-name"
                      name="name"
                      type="text"
                      value={fields.name}
                      onChange={handleChange}
                      placeholder={t('buyers:form.fields.namePlaceholder')}
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
                    <label htmlFor="buyers-company">{t('buyers:form.fields.company')}</label>
                    <input
                      ref={fieldRefs.company}
                      id="buyers-company"
                      name="company"
                      type="text"
                      value={fields.company}
                      onChange={handleChange}
                      placeholder={t('buyers:form.fields.companyPlaceholder')}
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
                    <label htmlFor="buyers-country">{t('buyers:form.fields.country')}</label>
                    <input
                      ref={fieldRefs.country}
                      id="buyers-country"
                      name="country"
                      type="text"
                      value={fields.country}
                      onChange={handleChange}
                      placeholder={t('buyers:form.fields.countryPlaceholder')}
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
                    <label htmlFor="buyers-product">{t('buyers:form.fields.product')}</label>
                    <select
                      ref={fieldRefs.product}
                      id="buyers-product"
                      name="product"
                      value={fields.product}
                      onChange={handleChange}
                      aria-invalid={!!errors.product}
                      aria-describedby={errors.product ? ERROR_ID('product') : undefined}
                    >
                      <option value="">{t('buyers:form.fields.productSelect')}</option>
                      <option value="tomatoes">{t('buyers:form.fields.products.tomatoes')}</option>
                      <option value="onions">{t('buyers:form.fields.products.onions')}</option>
                      <option value="peppers">{t('buyers:form.fields.products.peppers')}</option>
                      <option value="potato">{t('buyers:form.fields.products.potato')}</option>
                      <option value="cabbage">{t('buyers:form.fields.products.cabbage')}</option>
                      <option value="greenBeans">{t('buyers:form.fields.products.greenBeans')}</option>
                      <option value="papaya">{t('buyers:form.fields.products.papaya')}</option>
                      <option value="watermelon">{t('buyers:form.fields.products.watermelon')}</option>
                      <option value="carrot">{t('buyers:form.fields.products.carrot')}</option>
                      <option value="garlic">{t('buyers:form.fields.products.garlic')}</option>
                      <option value="seeds">{t('buyers:form.fields.products.seeds')}</option>
                    </select>
                    {errors.product && (
                      <span id={ERROR_ID('product')} className="form-field-error" role="alert">
                        {errors.product}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="buyers-volume">{t('buyers:form.fields.volume')}</label>
                  <input
                    ref={fieldRefs.volume}
                    id="buyers-volume"
                    name="volume"
                    type="text"
                    value={fields.volume}
                    onChange={handleChange}
                    placeholder={t('buyers:form.fields.volumePlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="buyers-message">{t('buyers:form.fields.message')}</label>
                  <textarea
                    ref={fieldRefs.message}
                    id="buyers-message"
                    name="message"
                    rows={4}
                    value={fields.message}
                    onChange={handleChange}
                    placeholder={t('buyers:form.fields.messagePlaceholder')}
                  />
                </div>

                <div className="buyers-form__submit-wrap">
                  <button type="submit" className="btn btn--primary" disabled={submitting}>
                    {submitting ? t('buyers:form.fields.submitting') : t('buyers:form.fields.submit')}
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---- FAQ Section ---- */}
      <FAQ
        title={t('buyers:faq.title')}
        description={t('buyers:faq.desc')}
        items={Array.isArray(faqItems) ? faqItems : []}
      />

      {/* ---- Toast ---- */}
      <Toast toast={toast} onDismiss={dismissToast} />
    </>
  )
}

export default Buyers
