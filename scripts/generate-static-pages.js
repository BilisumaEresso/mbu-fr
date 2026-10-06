import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')
const DIST_DIR = path.resolve(ROOT_DIR, 'dist')

const BASE_URL = 'https://mekibatuunion.org'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.webp`

// Load JSON helper
function loadJson(relPath) {
  try {
    const fullPath = path.resolve(ROOT_DIR, relPath)
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'))
  } catch (err) {
    console.warn(`Could not load ${relPath}:`, err.message)
    return {}
  }
}

// Load translations
const meta = {
  en: loadJson('src/i18n/locales/en/meta.json'),
  om: loadJson('src/i18n/locales/om/meta.json'),
}

const common = {
  en: loadJson('src/i18n/locales/en/common.json'),
  om: loadJson('src/i18n/locales/om/common.json'),
}

const buyersJson = {
  en: loadJson('src/i18n/locales/en/buyers.json'),
  om: loadJson('src/i18n/locales/om/buyers.json'),
}

const farmersJson = {
  en: loadJson('src/i18n/locales/en/farmers.json'),
  om: loadJson('src/i18n/locales/om/farmers.json'),
}

const productsJson = {
  en: loadJson('src/i18n/locales/en/products.json'),
  om: loadJson('src/i18n/locales/om/products.json'),
}

// Extract news items from news.js
function extractNewsItems() {
  const content = fs.readFileSync(path.resolve(ROOT_DIR, 'src/data/news.js'), 'utf8')
  // Turn import statements into variable declarations so referenced images don't throw ReferenceErrors
  const cleanCode = content
    .replace(/import\s+(\w+)\s+from\s+['"].*?['"]/g, 'const $1 = "";')
    .replace(/export\s+const\s+news\s*=/, 'const news =')
  const funcBody = `${cleanCode}\nreturn news;`
  try {
    const fn = new Function(funcBody)
    return fn()
  } catch (err) {
    console.error('Failed to parse news.js:', err)
    return []
  }
}

const newsList = extractNewsItems()

// Base Organization Schema
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: "Meki Batu Fruits and Vegetables Growers' Cooperative Union Ltd",
  alternateName: 'Meki Batu Union',
  url: BASE_URL,
  logo: `${BASE_URL}/icon-512.png`,
  image: DEFAULT_IMAGE,
  description: 'Meki Batu Union is a GlobalG.A.P certified and licensed seed producer cooperative uniting 135 primary cooperatives and 8,089 member farmers in Oromia, Ethiopia.',
  telephone: '+251-22-118-1114',
  faxNumber: '+251-22-118-0022',
  email: 'mekibatuunion@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '138km on the road to Hawassa, 60km south of Mojo town, P.O. Box 006',
    addressLocality: 'Meki Town',
    addressRegion: 'East Shoa Zone, Dugda Woreda, Oromia',
    addressCountry: 'ET',
  },
  sameAs: [
    'https://www.facebook.com/MekiBatuUnion',
    'https://www.linkedin.com/company/meki-batu-union',
    'https://www.youtube.com/@MekiBatuUnion',
  ],
}

// Contact LocalBusiness Schema
const contactLocalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'Organization'],
  '@id': `${BASE_URL}/#organization`,
  name: "Meki Batu Fruits and Vegetables Growers' Cooperative Union Ltd",
  alternateName: 'Meki Batu Union',
  url: BASE_URL,
  logo: `${BASE_URL}/icon-512.png`,
  image: DEFAULT_IMAGE,
  telephone: '+251-22-118-1114',
  faxNumber: '+251-22-118-0022',
  email: 'mekibatuunion@gmail.com',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '138km on the road to Hawassa, 60km south of Mojo town, P.O. Box 006',
    addressLocality: 'Meki Town',
    addressRegion: 'East Shoa Zone, Dugda Woreda, Oromia',
    addressCountry: 'ET',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 8.1504,
    longitude: 38.816,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  sameAs: [
    'https://www.facebook.com/MekiBatuUnion',
    'https://www.linkedin.com/company/meki-batu-union',
    'https://www.youtube.com/@MekiBatuUnion',
  ],
}

// Product list schema generator
function getProductsItemListSchema(lang) {
  const products = [
    { name: 'Rift Valley Tomatoes', desc: 'High-yield, export-grade tomatoes grown under GlobalG.A.P protocols', category: 'Vegetables' },
    { name: 'Red Onions', desc: 'Dense bulbs with exceptional storage life, cultivated across East Shewa', category: 'Vegetables' },
    { name: 'Green Peppers', desc: 'Crisp bell peppers for export and domestic markets', category: 'Vegetables' },
    { name: 'Export Green Beans', desc: 'Fresh export-grade green beans with European import compliance', category: 'Vegetables' },
    { name: 'Fresh Papaya', desc: 'Sweet, tropical papaya harvested in the Central Rift Valley', category: 'Fruits' },
    { name: 'Cavendish Bananas', desc: 'Premium quality Rift Valley bananas', category: 'Fruits' },
    { name: 'Certified Hybrid Seeds', desc: 'Oromia Seed Enterprise inspected high-germination seeds', category: 'Seeds' },
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Meki Batu Union Export Horticultural Produce & Certified Seeds',
    description: 'GlobalG.A.P certified fresh vegetables, fruits, and licensed seeds produced by 8,089 cooperative farmers in Ethiopia.',
    url: `${BASE_URL}/${lang}/products`,
    numberOfItems: products.length,
    itemListElement: products.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Product',
        name: item.name,
        description: item.desc,
        category: item.category,
        brand: { '@type': 'Brand', name: 'Meki Batu Union' },
        countryOfOrigin: { '@type': 'Country', name: 'Ethiopia' },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  }
}

// FAQ schema generator
function getFaqSchema(faqList) {
  if (!Array.isArray(faqList) || faqList.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

// NewsArticle schema generator
function getNewsArticleSchema(article, lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.desc,
    image: DEFAULT_IMAGE,
    datePublished: article.isoDate || '2024-10-15',
    dateModified: article.isoDate || '2024-10-15',
    author: {
      '@type': 'Organization',
      name: article.author || 'Meki Batu Union Agronomy Desk',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Meki Batu Union',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/icon-512.png`,
      },
    },
    mainEntityOfPage: `${BASE_URL}/${lang}/news/${article.slug || article.id}`,
  }
}

// Core page route definitions
const standardRoutes = [
  { key: 'home', path: '' },
  { key: 'about', path: '/about' },
  { key: 'products', path: '/products' },
  { key: 'farmers', path: '/farmers' },
  { key: 'buyers', path: '/buyers' },
  { key: 'retailOutlets', path: '/retail-outlets' },
  { key: 'news', path: '/news' },
  { key: 'impact', path: '/impact' },
  { key: 'contact', path: '/contact' },
  { key: 'privacyPolicy', path: '/privacy-policy' },
  { key: 'termsOfService', path: '/terms-of-service' },
]

function renderStaticBody(pageKey, lang, extraData = null) {
  const brandName = lang === 'om' ? 'Yuniyeenii Maqii Baatuu' : 'Meki Batu Union'
  const nav = lang === 'om' ? [
    { to: '/om', label: 'Fuula Duraa' },
    { to: '/om/about', label: 'Waa\'ee Keenya' },
    { to: '/om/products', label: 'Oomishaalee' },
    { to: '/om/farmers', label: 'Qoteebulaa' },
    { to: '/om/buyers', label: 'Daldala' },
    { to: '/om/retail-outlets', label: 'Dukkaanoota' },
    { to: '/om/news', label: 'Oduu' },
    { to: '/om/impact', label: 'Misooma' },
    { to: '/om/contact', label: 'Quunnamaa' },
  ] : [
    { to: '/en', label: 'Home' },
    { to: '/en/about', label: 'About Us' },
    { to: '/en/products', label: 'Products' },
    { to: '/en/farmers', label: 'Farmers' },
    { to: '/en/buyers', label: 'Buyers' },
    { to: '/en/retail-outlets', label: 'Retail Outlets' },
    { to: '/en/news', label: 'News' },
    { to: '/en/impact', label: 'Impact' },
    { to: '/en/contact', label: 'Contact' },
  ]

  const navHtml = `<nav aria-label="Main Navigation" class="header__nav"><ul>${nav.map(n => `<li><a href="${n.to}">${n.label}</a></li>`).join('')}</ul></nav>`

  let contentHtml = ''

  if (extraData && extraData.type === 'news-article') {
    const art = extraData.article
    contentHtml = `
      <article class="article-content">
        <header>
          <span class="badge">${art.category}</span>
          <h1>${art.title}</h1>
          <p class="meta">Published: ${art.date} | By ${art.author} | Location: ${art.location}</p>
        </header>
        <p class="lead">${art.desc}</p>
        <div class="article-body">
          ${(art.fullContent || []).map(p => `<p>${p}</p>`).join('')}
        </div>
        ${Array.isArray(art.highlights) && art.highlights.length > 0 ? `
          <div class="highlights">
            <h2>Key Highlights</h2>
            <ul>${art.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
          </div>
        ` : ''}
        <p><a href="/${lang}/news">&larr; Back to all news</a></p>
      </article>
    `
  } else {
    const pageMeta = meta[lang]?.[pageKey] || meta.en[pageKey] || {}
    const h1Title = pageMeta.title?.split('|')[0]?.trim() || brandName
    const desc = pageMeta.description || ''

    contentHtml = `
      <section class="page-hero">
        <h1>${h1Title}</h1>
        <p class="lead">${desc}</p>
      </section>
      <section class="page-overview">
        <p>Meki Batu Fruits and Vegetables Growers' Cooperative Union Ltd unites 135 primary cooperatives and 8,089 member farming households across the Central Rift Valley of Oromia, Ethiopia. We specialize in GlobalG.A.P certified fresh horticultural produce, cold-chain handling, and licensed seed production.</p>
      </section>
    `
  }

  return `
    <header class="header">
      <div class="header__container">
        <a href="/${lang}" class="header__brand"><strong>${brandName}</strong></a>
        ${navHtml}
      </div>
    </header>
    <main id="main-content" class="site-main">
      ${contentHtml}
    </main>
    <footer class="footer">
      <div class="container">
        <p>&copy; ${new Date().getFullYear()} ${brandName}. All rights reserved.</p>
        <p>Meki Town, East Shoa Zone, Dugda Woreda, Oromia, Ethiopia | Tel: +251-22-118-1114</p>
      </div>
    </footer>
  `
}

function cleanTemplate(raw) {
  let html = raw
  html = html.replace(/<link rel="(canonical|alternate)"[^>]*>/gi, '')
  html = html.replace(/<!-- Canonical[\s\S]*?-->/gi, '')
  html = html.replace(/<!-- Open Graph[\s\S]*?-->/gi, '')
  html = html.replace(/<meta property="(og|twitter):[^>]*>/gi, '')
  html = html.replace(/<meta name="twitter:[^>]*>/gi, '')
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '')
  html = html.replace(/<div id="root">[\s\S]*?<\/div>/i, '<div id="root"></div>')
  html = html.replace(/<!-- canonical injected per-page by SEO component -->/g, '')
  return html
}

function generateStaticHtml(templateHtml, config) {
  const {
    lang,
    path: routePath,
    title,
    description,
    canonicalUrl,
    schemas = [],
    bodyHtml,
    image = DEFAULT_IMAGE,
  } = config

  let html = cleanTemplate(templateHtml)

  // 1. Set html lang attribute
  html = html.replace(/<html[^>]*>/i, `<html lang="${lang}">`)

  // 2. Set title tag
  if (title) {
    html = html.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
  }

  // 3. Set meta description
  if (description) {
    if (html.includes('<meta name="description"')) {
      html = html.replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${description.replace(/"/g, '&quot;')}" />`)
    } else {
      html = html.replace('</head>', `  <meta name="description" content="${description.replace(/"/g, '&quot;')}" />\n</head>`)
    }
  }

  // 4. Construct canonical & hreflang tags
  const hreflangTags = `
    <!-- Canonical & Alternate Locales -->
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="en" href="${BASE_URL}/en${routePath}" />
    <link rel="alternate" hreflang="om" href="${BASE_URL}/om${routePath}" />
    <link rel="alternate" hreflang="x-default" href="${BASE_URL}/en${routePath}" />`

  // 5. Construct Open Graph & Twitter tags
  const socialMetaTags = `
    <!-- Open Graph / Social Sharing -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Meki Batu Union" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />
    <meta property="og:description" content="${description.replace(/"/g, '&quot;')}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:locale" content="${lang === 'om' ? 'om_ET' : 'en_US'}" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${canonicalUrl}" />
    <meta property="twitter:title" content="${title.replace(/"/g, '&quot;')}" />
    <meta property="twitter:description" content="${description.replace(/"/g, '&quot;')}" />
    <meta property="twitter:image" content="${image}" />`

  // 6. Construct JSON-LD schemas
  const schemasHtml = schemas
    .filter(Boolean)
    .map(s => `\n    <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n    </script>`)
    .join('')

  // Remove any placeholder canonical comment from template
  html = html.replace(/<!-- canonical injected per-page by SEO component -->/g, '')

  // Inject metadata into <head>
  html = html.replace('</head>', `${hreflangTags}\n${socialMetaTags}${schemasHtml}\n  </head>`)

  // 7. Inject static HTML inside <div id="root"></div>
  if (bodyHtml) {
    html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`)
  }

  return html
}

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

export function generateAllStaticPages() {
  const templatePath = path.resolve(DIST_DIR, 'index.html')
  if (!fs.existsSync(templatePath)) {
    console.error('Error: dist/index.html not found. Run "vite build" first.')
    return
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf8')
  let generatedCount = 0

  const languages = ['en', 'om']

  languages.forEach((lang) => {
    // 1. Generate standard routes
    standardRoutes.forEach(({ key, path: routePath }) => {
      const pageMeta = meta[lang]?.[key] || meta.en[key] || {}
      const title = pageMeta.title || 'Meki Batu Union'
      const description = pageMeta.description || ''
      const canonicalUrl = `${BASE_URL}/${lang}${routePath}`

      // Select appropriate schemas
      const schemas = [orgSchema]
      if (key === 'contact') {
        schemas.push(contactLocalBusinessSchema)
      } else if (key === 'products') {
        schemas.push(getProductsItemListSchema(lang))
      } else if (key === 'buyers') {
        const buyerFaq = buyersJson[lang]?.faq?.items || buyersJson.en?.faq?.items
        const faqSchema = getFaqSchema(buyerFaq)
        if (faqSchema) schemas.push(faqSchema)
      } else if (key === 'farmers') {
        const farmerFaq = farmersJson[lang]?.faq?.items || farmersJson.en?.faq?.items
        const faqSchema = getFaqSchema(farmerFaq)
        if (faqSchema) schemas.push(faqSchema)
      }

      const bodyHtml = renderStaticBody(key, lang)
      const pageHtml = generateStaticHtml(templateHtml, {
        lang,
        path: routePath,
        title,
        description,
        canonicalUrl,
        schemas,
        bodyHtml,
      })

      // Output directory: dist/[lang]/[route]/index.html
      const outDir = routePath === ''
        ? path.resolve(DIST_DIR, lang)
        : path.resolve(DIST_DIR, lang, routePath.replace(/^\//, ''))

      ensureDirSync(outDir)
      fs.writeFileSync(path.resolve(outDir, 'index.html'), pageHtml, 'utf8')
      generatedCount++
    })

    // 2. Generate News Article routes
    newsList.forEach((article) => {
      const slug = article.slug || String(article.id)
      const routePath = `/news/${slug}`
      const canonicalUrl = `${BASE_URL}/${lang}${routePath}`
      const title = `${article.title} | Meki Batu Union`
      const description = article.desc || article.excerpt || ''
      const articleSchema = getNewsArticleSchema(article, lang)

      const bodyHtml = renderStaticBody('newsArticle', lang, {
        type: 'news-article',
        article,
      })

      const pageHtml = generateStaticHtml(templateHtml, {
        lang,
        path: routePath,
        title,
        description,
        canonicalUrl,
        schemas: [orgSchema, articleSchema],
        bodyHtml,
      })

      const outDir = path.resolve(DIST_DIR, lang, 'news', slug)
      ensureDirSync(outDir)
      fs.writeFileSync(path.resolve(outDir, 'index.html'), pageHtml, 'utf8')
      generatedCount++
    })
  })

  // 3. Generate root index.html redirect/canonical to /en
  const rootMeta = meta.en.home || {}
  const rootHtml = generateStaticHtml(templateHtml, {
    lang: 'en',
    path: '',
    title: rootMeta.title || 'Meki Batu Union',
    description: rootMeta.description || '',
    canonicalUrl: `${BASE_URL}/en`,
    schemas: [orgSchema],
    bodyHtml: renderStaticBody('home', 'en'),
  })
  fs.writeFileSync(templatePath, rootHtml, 'utf8')

  console.log(`[SSG] Successfully pre-rendered ${generatedCount} static pages across /en and /om with full HTML, H1 headings, metadata, and JSON-LD schemas.`)
}

// Run when executed directly
generateAllStaticPages()
