import { Helmet } from 'react-helmet-async'
import { useLocation, useParams } from 'react-router-dom'
import { isSupportedLocale, DEFAULT_LOCALE } from '../../utils/locale.js'

const BASE_URL = 'https://mekibatuunion.org'
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.webp`

/**
 * Reusable SEO component for dynamic meta, canonical, and Open Graph tags.
 *
 * @param {Object} props
 * @param {string} props.title - Document and Open Graph title
 * @param {string} props.description - Meta and Open Graph description
 * @param {string} [props.path] - Optional relative path override (e.g. '/products')
 * @param {string} [props.image] - Optional absolute or relative OG image URL
 * @param {boolean} [props.noindex=false] - Whether to disallow indexing (for 404)
 */
export default function SEO({ title, description, path, image, noindex = false }) {
  const location = useLocation()
  const { lang } = useParams()
  const validLocale = isSupportedLocale(lang) ? lang : DEFAULT_LOCALE

  // Determine path without the language prefix
  let cleanPath = path
  if (cleanPath === undefined) {
    cleanPath = location.pathname.replace(new RegExp(`^/${validLocale}`), '') || ''
  }

  // Ensure cleanPath starts with a slash if not empty
  if (cleanPath && !cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`
  }

  // Construct absolute canonical URL (e.g. https://mekibatuunion.org/en or https://mekibatuunion.org/en/about)
  const canonicalUrl = `${BASE_URL}/${validLocale}${cleanPath}`

  // Resolve image URL
  let resolvedImage = DEFAULT_OG_IMAGE
  if (image) {
    resolvedImage = image.startsWith('http') ? image : `${BASE_URL}${image.startsWith('/') ? '' : '/'}${image}`
  }

  return (
    <Helmet>
      {/* Title & Description */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}

      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots Directive */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={resolvedImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      {title && <meta property="twitter:title" content={title} />}
      {description && <meta property="twitter:description" content={description} />}
      <meta property="twitter:image" content={resolvedImage} />
    </Helmet>
  )
}
