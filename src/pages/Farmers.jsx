import SEO from '../components/common/SEO.jsx'
import { useTranslation } from 'react-i18next'
import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import Toast from '../components/common/Toast.jsx'
import FAQ from '../components/common/FAQ.jsx'
import { useToast } from '../hooks/useToast.js'
import farmerHeroImg from '../assets/images/heroes/farmerHero.webp'
import farmerHero480 from '../assets/images/heroes/farmerHero-480w.webp'
import farmerHero800 from '../assets/images/heroes/farmerHero-800w.webp'
import newsHeroImg from '../assets/images/heroes/newsHero.webp'
import newsHero480 from '../assets/images/heroes/newsHero-480w.webp'
import newsHero800 from '../assets/images/heroes/newsHero-800w.webp'
import './InnerPage.css'
import './Farmers.css'

// Cap stagger at 450ms
const stagger = (i) => Math.min(i * 90, 450)

function Farmers() {
  const { t } = useTranslation(['farmers', 'meta', 'common'])
  const { toast, showToast, dismissToast } = useToast()

  function handleLoginClick() {
    showToast(
      t('farmers:memberLoginToast', 'Member Login is under active development. Online portal features will launch in Phase 2.'),
      'info'
    )
  }

  const services = [
    {
      icon: 'local_shipping',
      title: t('farmers:services.items.input.title'),
      desc: t('farmers:services.items.input.desc'),
    },
    {
      icon: 'account_balance',
      title: t('farmers:services.items.credit.title'),
      desc: t('farmers:services.items.credit.desc'),
    },
    {
      icon: 'storefront',
      title: t('farmers:services.items.market.title'),
      desc: t('farmers:services.items.market.desc'),
    },
    {
      icon: 'precision_manufacturing',
      title: t('farmers:services.items.mechanization.title'),
      desc: t('farmers:services.items.mechanization.desc'),
    },
    {
      icon: 'warehouse',
      title: t('farmers:services.items.storage.title'),
      desc: t('farmers:services.items.storage.desc'),
    },
    {
      icon: 'school',
      title: t('farmers:services.items.training.title'),
      desc: t('farmers:services.items.training.desc'),
    },
  ]

  const steps = [
    {
      number: t('farmers:steps.step1.number', '01'),
      title: t('farmers:steps.step1.title'),
      desc: t('farmers:steps.step1.desc'),
    },
    {
      number: t('farmers:steps.step2.number', '02'),
      title: t('farmers:steps.step2.title'),
      desc: t('farmers:steps.step2.desc'),
    },
    {
      number: t('farmers:steps.step3.number', '03'),
      title: t('farmers:steps.step3.title'),
      desc: t('farmers:steps.step3.desc'),
    },
    {
      number: t('farmers:steps.step4.number', '04'),
      title: t('farmers:steps.step4.title'),
      desc: t('farmers:steps.step4.desc'),
    },
  ]

  const faqItems = t('farmers:faq.items', { returnObjects: true }) || []

  return (
    <>
      <SEO
        title={t('meta:farmers.title')}
        description={t('meta:farmers.description')}
      />
      {/* ---- Hero Section ---- */}
      <PageHero
        breadcrumbs={[{ label: t('common:breadcrumbs.home'), to: '/' }, { label: t('common:breadcrumbs.farmers') }]}
        title={t('farmers:hero.title')}
        description={t('farmers:hero.desc')}
        actions={
          <>
            <a href="#services" className="btn btn--primary">
              {t('farmers:hero.viewBenefits')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
            <a href="#membership" className="btn btn--outline">
              {t('farmers:hero.joinCoop')} <span className="material-symbols-outlined text-sm">info</span>
            </a>
          </>
        }
        image={farmerHeroImg}
        imageSrcSet={`${farmerHero480} 480w, ${farmerHero800} 800w, ${farmerHeroImg} 1536w`}
        imageAlt={t('farmers:hero.imageAlt')}
        badge={t('farmers:hero.badge')}
      />

      <SectionDivider />

      {/* ---- Member Services Section — stagger each service card ---- */}
      <section className="farmers-services section section--alt" id="services">
        <div className="container">
          <div className="farmers-services__header text-center mb-8">
            <span className="label-caps label-caps--secondary mb-2 block">{t('farmers:services.tag')}</span>
            <h2 className="farmers-services__heading">{t('farmers:services.title')}</h2>
            <p className="farmers-services__desc max-w-2xl mx-auto">{t('farmers:services.desc')}</p>
          </div>
          <div className="farmers-services__grid">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={stagger(i)} className="farmers-service-card">
                <span className="material-symbols-outlined farmers-service-card__icon">
                  {s.icon}
                </span>
                <h3 className="farmers-service-card__title">{s.title}</h3>
                <p className="farmers-service-card__desc">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- How to Join + Member Portal — one Reveal for the whole two-column block ---- */}
      <Reveal as="section" className="farmers-membership section" id="membership">
        <div className="container farmers-membership__grid">
          <div className="farmers-membership__content">
            <span className="label-caps label-caps--secondary mb-2">{t('farmers:steps.tag')}</span>
            <h2 className="farmers-membership__title">{t('farmers:steps.title')}</h2>
            <div className="farmers-membership__steps">
              {steps.map((step) => (
                <div key={step.number} className="farmers-step">
                  <div className="farmers-step__num">{step.number}</div>
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
              src={newsHeroImg}
              srcSet={`${newsHero480} 480w, ${newsHero800} 800w, ${newsHeroImg} 1600w`}
              sizes="(max-width: 768px) 100vw, 500px"
              alt={t('farmers:steps.imageAlt')}
              className="farmers-membership__img"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </Reveal>

      {/* ---- Digital Member Portal Teaser — one Reveal ---- */}
      <section className="farmers-portal section section--alt" id="portal">
        <div className="container">
          <Reveal className="farmers-portal__card">
            <span className="material-symbols-outlined farmers-portal__icon">terminal</span>
            <h2 className="farmers-portal__title">{t('farmers:portal.title')}</h2>
            <span className="label-caps label-caps--secondary mb-4 block">
              {t('farmers:portal.badge')}
            </span>
            <p className="farmers-portal__desc">
              {t('farmers:portal.desc')}
            </p>
            <button
              type="button"
              className="farmers-portal__btn"
              onClick={handleLoginClick}
            >
              {t('farmers:portal.button')}
              <span className="material-symbols-outlined text-sm">lock</span>
            </button>
          </Reveal>
        </div>
      </section>

      {/* ---- FAQ Section ---- */}
      <FAQ
        title={t('farmers:faq.title')}
        description={t('farmers:faq.desc')}
        items={Array.isArray(faqItems) ? faqItems : []}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onDismiss={dismissToast} />
    </>
  )
}

export default Farmers
