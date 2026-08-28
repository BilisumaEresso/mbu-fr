import { Routes, Route, Navigate, Outlet, useParams, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { isSupportedLocale, DEFAULT_LOCALE } from './utils/locale.js'

import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import WhatsAppButton from './components/common/WhatsAppButton.jsx'
import ScrollToHashElement from './components/common/ScrollToHashElement.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Products from './pages/Products.jsx'
import Farmers from './pages/Farmers.jsx'
import Buyers from './pages/Buyers.jsx'
import RetailOutlets from './pages/RetailOutlets.jsx'
import News from './pages/News.jsx'
import Impact from './pages/Impact.jsx'
import Contact from './pages/Contact.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsOfService from './pages/TermsOfService.jsx'
import NotFound from './pages/NotFound.jsx'

function LanguageLayout() {
  const { lang } = useParams()
  const { t, i18n } = useTranslation('common')
  const location = useLocation()

  const validLocale = isSupportedLocale(lang) ? lang : DEFAULT_LOCALE

  useEffect(() => {
    if (i18n.language !== validLocale) {
      i18n.changeLanguage(validLocale)
    }
    document.documentElement.lang = validLocale
  }, [validLocale, i18n])

  if (!isSupportedLocale(lang)) {
    return <Navigate to={`/${DEFAULT_LOCALE}${location.pathname}${location.search}${location.hash}`} replace />
  }

  const pathWithoutLang = location.pathname.replace(new RegExp(`^/${validLocale}`), '') || ''

  return (
    <div className="site">
      <Helmet htmlAttributes={{ lang: validLocale }}>
        <link rel="alternate" hrefLang="en" href={`https://mekibatuunion.org/en${pathWithoutLang}`} />
        <link rel="alternate" hrefLang="om" href={`https://mekibatuunion.org/om${pathWithoutLang}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://mekibatuunion.org/en${pathWithoutLang}`} />
      </Helmet>
      <ScrollToHashElement />
      <a href="#main-content" className="skip-link">
        {t('skipLink', 'Skip to main content')}
      </a>
      <Header />
      <main id="main-content" className="site-main" tabIndex="-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

function LegacyRedirect() {
  const location = useLocation()
  return <Navigate to={`/${DEFAULT_LOCALE}${location.pathname}${location.search}${location.hash}`} replace />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />
      <Route path="/:lang" element={<LanguageLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="farmers" element={<Farmers />} />
        <Route path="buyers" element={<Buyers />} />
        <Route path="retail-outlets" element={<RetailOutlets />} />
        <Route path="news" element={<News />} />
        <Route path="impact" element={<Impact />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-of-service" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<LegacyRedirect />} />
    </Routes>
  )
}

export default App
