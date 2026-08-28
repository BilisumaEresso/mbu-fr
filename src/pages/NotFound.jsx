import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import logo from '../assets/images/brand/MBU_logo_new.webp'
import { getLocalePath } from '../utils/locale.js'

function NotFound() {
  const { t, i18n } = useTranslation(['meta', 'common'])
  const currentLang = i18n.language || 'en'

  return (
    <section className="section container" style={{ textAlign: 'center', padding: '6rem 0' }}>
      <Helmet>
        <title>{t('meta:notFound.title')}</title>
        <meta
          name="description"
          content={t('meta:notFound.description')}
        />
      </Helmet>
      <img
        src={logo}
        alt={t('common:header.brandLogoAlt')}
        style={{
          width: '100px',
          height: '100px',
          objectFit: 'contain',
          margin: '0 auto var(--space-6)',
          opacity: 0.35,
        }}
      />
      <h1>{t('common:notFound.title', 'Page not found')}</h1>
      <p>{t('common:notFound.desc', "The page you're looking for doesn't exist.")}</p>
      <Link to={getLocalePath('/', currentLang)} className="btn btn--primary">
        {t('common:notFound.button', 'Back to home')}
      </Link>
    </section>
  )
}

export default NotFound
