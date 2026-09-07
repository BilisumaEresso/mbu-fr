import { useState, useRef } from 'react'
import SEO from '../components/common/SEO.jsx'
import { useTranslation } from 'react-i18next'
import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import Toast from '../components/common/Toast.jsx'
import { useToast } from '../hooks/useToast.js'
import { validateFields } from '../utils/validateForm.js'
import { socialLinks } from '../data/socials.js'
import impactHeroImg from '../assets/images/heroes/impactHero.webp'
import impactHero480 from '../assets/images/heroes/impactHero-480w.webp'
import impactHero800 from '../assets/images/heroes/impactHero-800w.webp'
import { MapPin, Map, Phone, Smartphone, Printer, Mail, ArrowUpRight, CheckCircle } from 'lucide-react'
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
      <SEO
        title={t('meta:contact.title')}
        description={t('meta:contact.description')}
      />

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
                <MapPin size={20} className="contact-info-item__icon" />
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
                    <Map size={14} className="text-xs" /> {t('contact:info.viewMaps')}
                  </a>
                </div>
              </div>

              <span className="label-caps label-caps--secondary block mb-3 mt-6">{t('contact:info.directLines')}</span>
              <div className="contact-info-item">
                <Phone size={20} className="contact-info-item__icon" />
                <div>
                  <p className="font-medium">{t('contact:info.phone')}</p>
                  <a href="tel:+251221181114" className="text-muted">022-118-11-14 / 02</a>
                </div>
              </div>
              <div className="contact-info-item">
                <Smartphone size={20} className="contact-info-item__icon" />
                <div>
                  <p className="font-medium">{t('contact:info.mobile')}</p>
                  <a href="tel:+251904686868" className="text-muted">09-04-68-68-68 / 09-09-34-34-34</a>
                </div>
              </div>
              <div className="contact-info-item">
                <Printer size={20} className="contact-info-item__icon" />
                <div>
                  <p className="font-medium">{t('contact:info.fax')}</p>
                  <p className="text-muted">022-118-04-08</p>
                </div>
              </div>
              <div className="contact-info-item">
                <Mail size={20} className="contact-info-item__icon" />
                <div>
                  <p className="font-medium">{t('contact:info.email')}</p>
                  <a href="mailto:info@mekibatuunion.org" className="text-muted">info@mekibatuunion.org</a>
                </div>
              </div>
              <div className="contact-social-section">
                <span className="label-caps label-caps--secondary block mb-2 mt-6">{t('common:footer.followUs', 'Follow Us')}</span>
                <p className="contact-social-intro text-muted mb-3">
                  {t('contact:info.socialIntro', 'Connect with Meki Batu Union across our official digital channels:')}
                </p>
                <div className="contact-social-grid">
                  {socialLinks.facebook.url && (
                    <a
                      href={socialLinks.facebook.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-card"
                      title={`Facebook: ${socialLinks.facebook.handle}`}
                    >
                      <div className="contact-social-card__icon contact-social-card__icon--facebook">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.65 13.75 5.65c1.08 0 2.21.19 2.21.19v2.43h-1.25c-1.23 0-1.61.77-1.61 1.56V12h2.74l-.44 3h-2.3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                        </svg>
                      </div>
                      <div className="contact-social-card__meta">
                        <span className="contact-social-card__name">Facebook</span>
                        <span className="contact-social-card__handle">@{socialLinks.facebook.handle}</span>
                      </div>
                      <ArrowUpRight size={16} className="contact-social-card__arrow" />
                    </a>
                  )}

                  {socialLinks.telegram.url && (
                    <a
                      href={socialLinks.telegram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-card"
                      title={`Telegram: ${socialLinks.telegram.handle}`}
                    >
                      <div className="contact-social-card__icon contact-social-card__icon--telegram">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .54-1.43.53-.47-.01-1.37-.27-2.04-.49-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.66-2.89 8.01-3.45 3.82-1.6 4.61-1.88 5.13-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.26-.04.44z"/>
                        </svg>
                      </div>
                      <div className="contact-social-card__meta">
                        <span className="contact-social-card__name">Telegram</span>
                        <span className="contact-social-card__handle">{socialLinks.telegram.handle}</span>
                      </div>
                      <ArrowUpRight size={16} className="contact-social-card__arrow" />
                    </a>
                  )}

                  {socialLinks.linkedin.url && (
                    <a
                      href={socialLinks.linkedin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-card"
                      title={`LinkedIn: ${socialLinks.linkedin.handle}`}
                    >
                      <div className="contact-social-card__icon contact-social-card__icon--linkedin">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                        </svg>
                      </div>
                      <div className="contact-social-card__meta">
                        <span className="contact-social-card__name">LinkedIn</span>
                        <span className="contact-social-card__handle">{socialLinks.linkedin.handle}</span>
                      </div>
                      <ArrowUpRight size={16} className="contact-social-card__arrow" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="contact-info-media desktop-only">
              <img
                src={impactHeroImg}
                srcSet={`${impactHero480} 480w, ${impactHero800} 800w, ${impactHeroImg} 1280w`}
                sizes="(max-width: 1024px) 100vw, 450px"
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
                  <CheckCircle size={48} className="contact-success__icon" />
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
