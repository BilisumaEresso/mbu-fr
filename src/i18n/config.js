import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import commonEn from './locales/en/common.json'
import homeEn from './locales/en/home.json'
import aboutEn from './locales/en/about.json'
import productsEn from './locales/en/products.json'
import farmersEn from './locales/en/farmers.json'
import buyersEn from './locales/en/buyers.json'
import retailOutletsEn from './locales/en/retailOutlets.json'
import newsEn from './locales/en/news.json'
import impactEn from './locales/en/impact.json'
import contactEn from './locales/en/contact.json'
import legalEn from './locales/en/legal.json'
import metaEn from './locales/en/meta.json'
import orgchartEn from './locales/en/orgchart.json'

import commonOm from './locales/om/common.json'
import homeOm from './locales/om/home.json'
import aboutOm from './locales/om/about.json'
import productsOm from './locales/om/products.json'
import farmersOm from './locales/om/farmers.json'
import buyersOm from './locales/om/buyers.json'
import retailOutletsOm from './locales/om/retailOutlets.json'
import newsOm from './locales/om/news.json'
import impactOm from './locales/om/impact.json'
import contactOm from './locales/om/contact.json'
import legalOm from './locales/om/legal.json'
import metaOm from './locales/om/meta.json'
import orgchartOm from './locales/om/orgchart.json'

const resources = {
  en: {
    common: commonEn,
    home: homeEn,
    about: aboutEn,
    products: productsEn,
    farmers: farmersEn,
    buyers: buyersEn,
    retailOutlets: retailOutletsEn,
    news: newsEn,
    impact: impactEn,
    contact: contactEn,
    legal: legalEn,
    meta: metaEn,
    orgchart: orgchartEn,
  },
  om: {
    common: commonOm,
    home: homeOm,
    about: aboutOm,
    products: productsOm,
    farmers: farmersOm,
    buyers: buyersOm,
    retailOutlets: retailOutletsOm,
    news: newsOm,
    impact: impactOm,
    contact: contactOm,
    legal: legalOm,
    meta: metaOm,
    orgchart: orgchartOm,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'om'],
    defaultNS: 'common',
    detection: {
      order: ['path', 'htmlTag', 'navigator'],
      lookupFromPathIndex: 0,
      caches: [],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
