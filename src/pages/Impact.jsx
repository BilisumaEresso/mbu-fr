import SEO from '../components/common/SEO.jsx'
import { useTranslation } from 'react-i18next'
import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import StatCard from '../components/common/StatCard.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import impactHeroImg from '../assets/images/heroes/impactHero.webp'
import impactHero480 from '../assets/images/heroes/impactHero-480w.webp'
import impactHero800 from '../assets/images/heroes/impactHero-800w.webp'
import womenFarmerImg from '../assets/images/community/womenFarmer.webp'
import womenFarmer480 from '../assets/images/community/womenFarmer-480w.webp'
import womenFarmer800 from '../assets/images/community/womenFarmer-800w.webp'
import { COMPANY_PROFILE_BASE64 as companyProfilePdf } from '../data/companyProfilePdfBase64.js'
import './InnerPage.css'
import './Impact.css'

const stagger = (i) => Math.min(i * 90, 450)

function Impact() {
  const { t } = useTranslation(['impact', 'meta', 'common'])

  const stats = [
    { value: '8,089', label: t('impact:metrics.stats.farmers') },
    { value: '135', label: t('impact:metrics.stats.coops') },
    { value: '154.2M', label: t('impact:metrics.stats.capital') },
    { value: '5,910 ha', label: t('impact:metrics.stats.ha') },
    { value: '6', label: t('impact:metrics.stats.districts') },
    { value: '50k+ t', label: t('impact:metrics.stats.volume') },
  ]

  const reportItems = t('impact:reports.items', { returnObjects: true }) || []
  const reports = [
    {
      id: 1,
      title: reportItems[0]?.title || '',
      desc: reportItems[0]?.desc || '',
      link: companyProfilePdf,
      download: 'MekiBatuUnion_AnnualReport.pdf',
    },
    {
      id: 2,
      title: reportItems[1]?.title || '',
      desc: reportItems[1]?.desc || '',
      link: companyProfilePdf,
      download: 'MekiBatuUnion_GlobalGAP_Compliance.pdf',
    },
    {
      id: 3,
      title: reportItems[2]?.title || '',
      desc: reportItems[2]?.desc || '',
      link: companyProfilePdf,
      download: 'MekiBatuUnion_FinancialReview.pdf',
    },
  ]

  return (
    <>
      <SEO
        title={t('meta:impact.title')}
        description={t('meta:impact.description')}
      />
      {/* ---- Hero Section ---- */}
      <PageHero
        breadcrumbs={[{ label: t('common:breadcrumbs.home'), to: '/' }, { label: t('common:breadcrumbs.impact') }]}
        title={t('impact:hero.title')}
        description={t('impact:hero.desc')}
        actions={
          <>
            <a href="#metrics" className="btn btn--primary">
              {t('impact:hero.viewMetrics')} <span className="material-symbols-outlined text-sm">trending_up</span>
            </a>
            <a href="#reports" className="btn btn--outline">
              {t('impact:hero.impactReports')} <span className="material-symbols-outlined text-sm">download</span>
            </a>
          </>
        }
        image={impactHeroImg}
        imageSrcSet={`${impactHero480} 480w, ${impactHero800} 800w, ${impactHeroImg} 1280w`}
        imageSizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
        imageAlt={t('impact:hero.imageAlt')}
        badge={t('impact:hero.badge')}
      />

      <SectionDivider />

      {/* ---- Measurable Impact Stats — brand-moment dark green band ---- */}
      <section className="impact-metrics section" id="metrics">
        <div className="container">
          <Reveal className="impact-metrics__header">
            <h2 className="impact-metrics__title">{t('impact:metrics.title')}</h2>
            <p className="impact-metrics__desc">
              {t('impact:metrics.desc')}
            </p>
          </Reveal>

          <div className="impact-metrics__grid">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={stagger(i)}>
                <StatCard value={s.value} label={s.label} />
              </Reveal>
            ))}
          </div>

          {/* Farmer photo — sits below the stat row on mobile, beside on desktop */}
          <Reveal className="impact-metrics__photo" delay={stagger(stats.length)}>
            <img
              src={womenFarmerImg}
              srcSet={`${womenFarmer480} 480w, ${womenFarmer800} 800w, ${womenFarmerImg} 1280w`}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
              alt={t('impact:metrics.imageAlt')}
              className="impact-metrics__photo-img"
            />
          </Reveal>
        </div>
      </section>

      {/* ---- Reports & Documentation Section ---- */}
      <section className="impact-reports section" id="reports">
        <div className="container impact-reports__grid">
          <div className="impact-reports__sidebar">
            <h2 className="impact-reports__title">{t('impact:reports.title')}</h2>
            <p className="impact-reports__desc">
              {t('impact:reports.desc')}
            </p>
          </div>

          {/* Wrap whole list as one Reveal, no per-item stagger */}
          <Reveal className="impact-reports__list">
            {reports.map((r) => (
              <div key={r.id} className="impact-report-item">
                <div>
                  <h4 className="impact-report-item__title">{r.title}</h4>
                  <p className="impact-report-item__desc">{r.desc}</p>
                </div>
                <a
                  href={r.link}
                  download={r.download}
                  className="impact-report-item__download"
                >
                  <span className="label-caps label-caps--secondary">{t('common:buttons.downloadPdf')}</span>
                  <span className="material-symbols-outlined text-sm">download</span>
                </a>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default Impact
