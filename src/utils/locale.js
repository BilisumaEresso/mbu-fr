export const SUPPORTED_LOCALES = ['en', 'om']
export const DEFAULT_LOCALE = 'en'

/**
 * Checks if a string is a supported locale code.
 * @param {string} lang
 * @returns {boolean}
 */
export function isSupportedLocale(lang) {
  return SUPPORTED_LOCALES.includes(lang)
}

/**
 * Returns the locale-prefixed path given the current language and target path.
 * e.g. getLocalePath('/products', 'om') -> '/om/products'
 * getLocalePath('/en/products', 'om') -> '/om/products'
 * getLocalePath('https://example.com', 'en') -> 'https://example.com'
 *
 * @param {string} path - Target path or URL
 * @param {string} lang - Active language code ('en' | 'om')
 * @returns {string}
 */
export function getLocalePath(path, lang = DEFAULT_LOCALE) {
  if (!path || typeof path !== 'string') return `/${lang}`

  // Ignore external links, mailto, tel, and anchor-only links
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#')
  ) {
    return path
  }

  // Handle hash or search in path
  const hashIdx = path.indexOf('#')
  const searchIdx = path.indexOf('?')
  let cleanPath = path
  let extra = ''

  const cutIdx = (hashIdx !== -1 && searchIdx !== -1)
    ? Math.min(hashIdx, searchIdx)
    : (hashIdx !== -1 ? hashIdx : searchIdx)

  if (cutIdx !== -1) {
    cleanPath = path.slice(0, cutIdx)
    extra = path.slice(cutIdx)
  }

  // Normalize leading slash
  if (!cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`
  }

  // Check if cleanPath already starts with a supported locale
  const segments = cleanPath.split('/').filter(Boolean)
  if (segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0])) {
    segments[0] = lang
    return `/${segments.join('/')}${extra}`
  }

  // Prepend target lang
  const prefix = `/${lang}`
  return `${cleanPath === '/' ? prefix : prefix + cleanPath}${extra}`
}
