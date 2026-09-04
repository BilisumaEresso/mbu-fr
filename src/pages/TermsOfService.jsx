import SEO from '../components/common/SEO.jsx'
import { useTranslation } from 'react-i18next'
import PageHero from '../components/common/PageHero.jsx'
import './About.css'

function TermsOfService() {
  const { t } = useTranslation(['legal', 'meta', 'common'])

  return (
    <>
      <SEO
        title={t('meta:termsOfService.title')}
        description={t('meta:termsOfService.description')}
      />

      <PageHero
        breadcrumbs={[{ label: t('common:breadcrumbs.home'), to: '/' }, { label: t('common:breadcrumbs.termsOfService') }]}
        eyebrow={t('legal:terms.eyebrow')}
        title={t('legal:terms.title')}
        description={t('legal:terms.description')}
      />

      <section className="section">
        <div className="container">
          <div className="editorial-grid">
            <div className="editorial-grid__main">
              <p className="label-caps label-caps--muted" style={{ marginBottom: 'var(--space-8)' }}>
                {t('legal:terms.lastUpdated')}
              </p>

              <h2>{t('legal:terms.sections.s1.title')}</h2>
              <p>{t('legal:terms.sections.s1.p1')}</p>

              <h2>{t('legal:terms.sections.s2.title')}</h2>
              <p>{t('legal:terms.sections.s2.p1')}</p>

              <h2>{t('legal:terms.sections.s3.title')}</h2>
              <p>{t('legal:terms.sections.s3.p1')}</p>

              <h2>{t('legal:terms.sections.s4.title')}</h2>
              <p>{t('legal:terms.sections.s4.p1')}</p>

              <h2>{t('legal:terms.sections.s5.title')}</h2>
              <p>{t('legal:terms.sections.s5.p1')}</p>

              <h2>{t('legal:terms.sections.s6.title')}</h2>
              <p>{t('legal:terms.sections.s6.p1')}</p>

              <h2>{t('legal:terms.sections.s7.title')}</h2>
              <p>{t('legal:terms.sections.s7.p1')}</p>
              <ul>
                <li>{t('legal:terms.sections.s7.li1')}</li>
                <li>{t('legal:terms.sections.s7.li2')}</li>
                <li>{t('legal:terms.sections.s7.li3')}</li>
              </ul>

              <h2>{t('legal:terms.sections.s8.title')}</h2>
              <p>{t('legal:terms.sections.s8.p1')}</p>

              <h2>{t('legal:terms.sections.s9.title')}</h2>
              <p>{t('legal:terms.sections.s9.p1')}</p>

              <h2>{t('legal:terms.sections.s10.title')}</h2>
              <p>{t('legal:terms.sections.s10.p1')}</p>

              <h2>{t('legal:terms.sections.s11.title')}</h2>
              <p>{t('legal:terms.sections.s11.p1')}</p>
              <p>
                {t('legal:terms.sections.s11.entity', "Meki Batu Fruits and Vegetables Growers' Cooperative Union Ltd")}
                <br />
                {t('legal:terms.sections.s11.address', 'Meki town, East Shewa Zone, Oromia, Ethiopia')}
                <br />
                {t('legal:common.emailLabel', 'Email:')}{' '}
                <a href="mailto:info@mekibatuunion.org" style={{ color: 'var(--color-accent)' }}>
                  info@mekibatuunion.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TermsOfService
