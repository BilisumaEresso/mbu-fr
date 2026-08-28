import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getLocalePath } from '../../utils/locale.js'
import './Breadcrumbs.css'

/**
 * Breadcrumbs navigation component.
 *
 * Props:
 *   trail: Array<{ label: string, to?: string }>
 */
function Breadcrumbs({ trail }) {
  const { t, i18n } = useTranslation('common')
  const currentLang = i18n.language || 'en'

  if (!trail || trail.length === 0) return null

  // Generate Schema.org BreadcrumbList JSON-LD
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => {
      const listItem = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
      }
      if (item.to) {
        const localeTo = getLocalePath(item.to, currentLang)
        listItem.item = `https://mekibatuunion.org${localeTo}`
      }
      return listItem
    }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <nav aria-label={t('breadcrumbs.ariaLabel', 'Breadcrumb')} className="breadcrumbs">
        <ol className="breadcrumbs__list">
          {trail.map((item, index) => {
            const isLast = index === trail.length - 1
            const localeTo = item.to ? getLocalePath(item.to, currentLang) : null

            return (
               <li key={item.label} className="breadcrumbs__item">
                {!isLast && localeTo ? (
                  <Link to={localeTo} className="breadcrumbs__link">
                    {item.label}
                  </Link>
                ) : (
                  <span className="breadcrumbs__current" aria-current="page">
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <span className="breadcrumbs__separator" aria-hidden="true">
                    /
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

export default Breadcrumbs
