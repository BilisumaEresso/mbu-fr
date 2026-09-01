import { useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import Toast from '../components/common/Toast.jsx'
import { useToast } from '../hooks/useToast.js'
import { validateFields } from '../utils/validateForm.js'
import impactHeroImg from '../assets/images/heroes/impactHero.webp'
import './InnerPage.css'
import './Contact.css'

const VALIDATION_RULES = {
  name: ['required'],
  email: ['required', 'email'],
  message: ['required'],
}

const ERROR_ID = (field) => `contact-error-${field}`
const EMPTY_FIELDS = { name: '', email: '', subject: '', message: '' }

function Contact() {
  const { t } = useTranslation(['contact', 'meta', 'common'])
  const [fields, setFields] = useState(EMPTY_FIELDS)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
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

    const validationErrors = validateFields(fields, VALIDATION_RULES, {
      required: t('common:validation.required'),
      email: t('common:validation.email'),
    })
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      const firstInvalid = ['name', 'email', 'message'].find((f) => validationErrors[f])
      if (firstInvalid) fieldRefs[firstInvalid]?.current?.focus()
      return
    }

    setErrors({})
    setSubmitting(true)

    const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT

    if (!endpoint) {
      setSubmitted(true)
      setSubmitting(false)
      showToast(
        t('contact:form.toasts.success', "Thank you! We will get back to you soon."),
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
        showToast(t('contact:form.toasts.success', "Thank you! We will get back to you soon."), 'success')
      } else {
        showToast(t('contact:form.toasts.fail', "Submission failed. Please try again later."), 'error')
      }
    } catch {
      showToast(t('contact:form.toasts.network', "Network error. Please try again."), 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>{t('meta:contact.title')}</title>
        <meta
          name="description"
          content={t('meta:contact.description')}
        />
      </Helmet>

      {/* ---- Hero Section ---- */}
      <PageHero
        breadcrumbs={[{ label: t('common:breadcrumbs.home'), to: '/' }, { label: t('common:breadcrumbs.contact') }]}
        title={t('contact:hero.title')}
        description={t('contact:hero.desc')}
      />

      <SectionDivider />

      {/* ---- Contact Form & Info Grid ---- */}
      <section className="contact-main section section--alt" id="inquiry">
        <div className="container contact-main__grid">
          {/* Info Sidebar Column (Reveal delay 0ms) */}
          <Reveal delay={0} className="contact-info-col">
            <div className="contact-info-card">
              <span className="label-caps label-caps--secondary block mb-3">{t('contact:info.hqTitle')}</span>
              <div className="contact-info-item">
                <span className="material-symbols-outlined contact-info-item__icon">location_on</span>
                <div>
                  <p className="font-medium">Meki Town</p>
                  <p className="text-muted">{t('contact:info.address')}</p>
                  <p className="text-muted mt-1">{t('contact:info.poBox')}</p>
                  <a
                    href="https://maps.app.goo.gl/HBFW3h7pe7W5tkMm8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--outline btn--sm mt-2 inline-flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-xs">map</span> {t('contact:info.viewMaps')}
                  </a>
                </div>
              </div>

              <span className="label-caps label-caps--secondary block mb-3 mt-6">{t('contact:info.directLines')}</span>
              <div className="contact-info-item">
                <span className="material-symbols-outlined contact-info-item__icon">call</span>
                <div>
                  <p className="font-medium">{t('contact:info.phone')}</p>
                  <a href="tel:+251221181114" className="text-muted">022-118-11-14 / 02</a>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="material-symbols-outlined contact-info-item__icon">phone_iphone</span>
                <div>
                  <p className="font-medium">{t('contact:info.mobile')}</p>
                  <a href="tel:+251904686868" className="text-muted">09-04-68-68-68 / 09-09-34-34-34</a>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="material-symbols-outlined contact-info-item__icon">fax</span>
                <div>
                  <p className="font-medium">{t('contact:info.fax')}</p>
                  <p className="text-muted">022-118-04-08</p>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="material-symbols-outlined contact-info-item__icon">mail</span>
                <div>
                  <p className="font-medium">{t('contact:info.email')}</p>
                  <a href="mailto:info@mekibatuunion.org" className="text-muted">info@mekibatuunion.org</a>
                </div>
              </div>
            </div>

            <div className="contact-info-media desktop-only">
              <img
                src={impactHeroImg}
                alt={t('contact:info.imageAlt')}
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
                  <h2>{t('contact:form.success.title')}</h2>
                  <p>{t('contact:form.success.desc')}</p>
                </div>
              ) : (
                <form className="form contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div>
                      <label htmlFor="contact-name">{t('contact:form.name')}</label>
                      <input
                        ref={fieldRefs.name}
                        id="contact-name"
                        name="name"
                        type="text"
                        value={fields.name}
                        onChange={handleChange}
                        placeholder={t('contact:form.namePlaceholder')}
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
                      <label htmlFor="contact-email">{t('contact:form.email')}</label>
                      <input
                        ref={fieldRefs.email}
                        id="contact-email"
                        name="email"
                        type="email"
                        value={fields.email}
                        onChange={handleChange}
                        placeholder={t('contact:form.emailPlaceholder')}
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
                    <label htmlFor="contact-subject">{t('contact:form.subject')}</label>
                    <select
                      ref={fieldRefs.subject}
                      id="contact-subject"
                      name="subject"
                      value={fields.subject}
                      onChange={handleChange}
                    >
                      <option value="">{t('contact:form.subjects.select')}</option>
                      <option value="export">{t('contact:form.subjects.export')}</option>
                      <option value="membership">{t('contact:form.subjects.membership')}</option>
                      <option value="media">{t('contact:form.subjects.media')}</option>
                      <option value="other">{t('contact:form.subjects.other')}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message">{t('contact:form.message')}</label>
                    <textarea
                      ref={fieldRefs.message}
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={fields.message}
                      onChange={handleChange}
                      placeholder={t('contact:form.messagePlaceholder')}
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
                      {submitting ? t('contact:form.submitting') : t('contact:form.submit')}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Toast ---- */}
      <Toast toast={toast} onDismiss={dismissToast} />
    </>
  )
}

export default Contact
