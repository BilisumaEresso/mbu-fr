import SEO from '../components/common/SEO.jsx'
import { useTranslation } from 'react-i18next'
import PageHero from '../components/common/PageHero.jsx'
import './About.css'

function PrivacyPolicy() {
  const { t } = useTranslation(['legal', 'meta', 'common'])

  return (
    <>
      <SEO
        title={t('meta:privacyPolicy.title')}
        description={t('meta:privacyPolicy.description')}
      />

      <PageHero
        breadcrumbs={[{ label: t('common:breadcrumbs.home'), to: '/' }, { label: t('common:breadcrumbs.privacyPolicy') }]}
        eyebrow={t('legal:privacy.eyebrow')}
        title={t('legal:privacy.title')}
        description={t('legal:privacy.description')}
      />

      <section className="section">
        <div className="container">
          <div className="editorial-grid">
            <div className="editorial-grid__main">
              <p className="label-caps label-caps--muted" style={{ marginBottom: 'var(--space-8)' }}>
                {t('legal:privacy.lastUpdated')}
              </p>

              <h2>{t('legal:privacy.sections.s1.title')}</h2>
              <p>{t('legal:privacy.sections.s1.p1')}</p>

              <h2>{t('legal:privacy.sections.s2.title')}</h2>
              <p>{t('legal:privacy.sections.s2.p1')}</p>
              <ul>
                <li>{t('legal:privacy.sections.s2.li1')}</li>
                <li>{t('legal:privacy.sections.s2.li2')}</li>
              </ul>
              <p>{t('legal:privacy.sections.s2.p2')}</p>

              <h2>{t('legal:privacy.sections.s3.title')}</h2>
              <p>{t('legal:privacy.sections.s3.p1')}</p>
              <ul>
                <li>{t('legal:privacy.sections.s3.li1')}</li>
                <li>{t('legal:privacy.sections.s3.li2')}</li>
                <li>{t('legal:privacy.sections.s3.li3')}</li>
              </ul>
              <p>{t('legal:privacy.sections.s3.p2')}</p>

              <h2>{t('legal:privacy.sections.s4.title')}</h2>
              <p>{t('legal:privacy.sections.s4.p1')}</p>

              <h2>{t('legal:privacy.sections.s5.title')}</h2>
              <p>{t('legal:privacy.sections.s5.p1')}</p>

              <h2>{t('legal:privacy.sections.s6.title')}</h2>
              <p>{t('legal:privacy.sections.s6.p1')}</p>

              <h2>{t('legal:privacy.sections.s7.title')}</h2>
              <p>{t('legal:privacy.sections.s7.p1')}</p>

              <h2>{t('legal:privacy.sections.s8.title')}</h2>
              <p>{t('legal:privacy.sections.s8.p1')}</p>

              <h2>{t('legal:privacy.sections.s9.title')}</h2>
              <p>{t('legal:privacy.sections.s9.p1')}</p>

              <h2>{t('legal:privacy.sections.s10.title')}</h2>
              <p>{t('legal:privacy.sections.s10.p1')}</p>
              <p>
                {t('legal:privacy.sections.s10.entity', "Meki Batu Fruits and Vegetables Growers' Cooperative Union Ltd")}
                <br />
                {t('legal:privacy.sections.s10.address', 'Meki town, East Shewa Zone, Oromia, Ethiopia')}
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

export default PrivacyPolicy
