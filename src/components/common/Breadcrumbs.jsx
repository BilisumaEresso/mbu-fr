import { Link } from 'react-router-dom'
import './Breadcrumbs.css'

/**
 * Breadcrumbs navigation component.
 *
 * Props:
 *   trail: Array<{ label: string, to?: string }>
 */
function Breadcrumbs({ trail }) {
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
        listItem.item = `https://mekibatuunion.org${item.to}`
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
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol className="breadcrumbs__list">
          {trail.map((item, index) => {
            const isLast = index === trail.length - 1

            return (
              <li key={item.label} className="breadcrumbs__item">
                {!isLast && item.to ? (
                  <Link to={item.to} className="breadcrumbs__link">
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
