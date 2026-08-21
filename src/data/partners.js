import shaLogo from '../assets/images/partners/self_help_africa.webp'
import unidoLogo from '../assets/images/partners/unido.webp'
import lviaLogo from '../assets/images/partners/lvia.webp'
import idhLogo from '../assets/images/partners/idh.webp'
import snvLogo from '../assets/images/partners/snv.webp'
import wetlandsLogo from '../assets/images/partners/wetlands_international.webp'
import faoLogo from '../assets/images/partners/fao.webp'
import aicsLogo from '../assets/images/partners/aics.webp'
import croplifeLogo from '../assets/images/partners/croplife.webp'
import marcLogo from '../assets/images/partners/marc.webp'
import atarcLogo from '../assets/images/partners/atarc.webp'
import airlinesLogo from '../assets/images/partners/airlines.webp'
import coopbankLogo from '../assets/images/partners/coop_bank_oromia.webp'
import cbeLogo from '../assets/images/partners/cbe.webp'
import atiLogo from '../assets/images/partners/ati.webp'
import ehpeaLogo from '../assets/images/partners/ehpea.webp'
import ocaLogo from '../assets/images/partners/oca.webp'

export const PARTNER_CATEGORIES = {
  ALL: 'All Partners',
  DEVELOPMENT: 'Development & Sustainability',
  RESEARCH: 'Research & Innovation',
  FINANCE_MARKETS: 'Finance & Off-Takers',
  GOVERNMENT: 'Government & Regulatory',
}

export const partners = [
  /* ── 1. International Development & Sustainability ── */
  {
    id: 'self-help-africa',
    name: 'Self Help Africa',
    acronym: 'SHA',
    category: PARTNER_CATEGORIES.DEVELOPMENT,
    tag: 'Development Partner',
    role: 'International development partner supporting agricultural and rural cooperative development.',
    icon: 'volunteer_activism',
    logo: shaLogo,
    featuredHome: true,
  },
  {
    id: 'unido',
    name: 'United Nations Industrial Development Organization (UNIDO)',
    acronym: 'UNIDO',
    category: PARTNER_CATEGORIES.DEVELOPMENT,
    tag: 'Development Partner',
    role: 'United Nations specialized agency promoting inclusive and sustainable industrial and agro-value chain development.',
    icon: 'domain',
    logo: unidoLogo,
    featuredHome: false,
  },
  {
    id: 'lvia',
    name: 'Lay Volunteers International Association (LVIA)',
    acronym: 'LVIA',
    category: PARTNER_CATEGORIES.DEVELOPMENT,
    tag: 'Development Partner',
    role: 'International development cooperation organization supporting rural and community development.',
    icon: 'handshake',
    logo: lviaLogo,
    featuredHome: false,
  },
  {
    id: 'idh',
    name: 'IDH Sustainable Trade Initiative',
    acronym: 'IDH',
    category: PARTNER_CATEGORIES.DEVELOPMENT,
    tag: 'Development Partner',
    role: 'Sustainable trade and landscape development partner.',
    icon: 'eco',
    logo: idhLogo,
    featuredHome: true,
  },
  {
    id: 'snv',
    name: 'SNV Netherlands Development Organisation',
    acronym: 'SNV',
    category: PARTNER_CATEGORIES.DEVELOPMENT,
    tag: 'Development Partner',
    role: 'International development partner supporting agricultural value chains and capacity building.',
    icon: 'groups',
    logo: snvLogo,
    featuredHome: false,
  },
  {
    id: 'wetlands-international',
    name: 'Wetlands International',
    acronym: 'Wetlands Int.',
    category: PARTNER_CATEGORIES.DEVELOPMENT,
    tag: 'Environmental Partner',
    role: 'Wetland and water resource conservation partner.',
    icon: 'water_drop',
    logo: wetlandsLogo,
    featuredHome: false,
  },
  {
    id: 'fao',
    name: 'Food and Agriculture Organization (FAO)',
    acronym: 'FAO',
    category: PARTNER_CATEGORIES.DEVELOPMENT,
    tag: 'Development Partner',
    role: 'United Nations specialized agency leading international efforts to defeat hunger.',
    icon: 'agriculture',
    logo: faoLogo,
    featuredHome: false,
  },
  {
    id: 'isvcd-italy',
    name: 'Italian Agency for Development Cooperation (AICS / ISVCD)',
    acronym: 'AICS / ISVCD',
    category: PARTNER_CATEGORIES.DEVELOPMENT,
    tag: 'Development Partner',
    role: 'International cooperation partner supporting agricultural development initiatives.',
    icon: 'factory',
    logo: aicsLogo,
    featuredHome: false,
  },
  {
    id: 'croplife',
    name: 'CropLife Ethiopia',
    acronym: 'CropLife',
    category: PARTNER_CATEGORIES.DEVELOPMENT,
    tag: 'Industry Partner',
    role: 'Agricultural industry association supporting plant science and crop protection.',
    icon: 'shield_with_heart',
    logo: croplifeLogo,
    featuredHome: false,
  },

  /* ── 2. Research & Innovation Centers ── */
  {
    id: 'melkasa',
    name: 'Melkasa Agricultural Research Center (EIAR)',
    acronym: 'EIAR / MARC',
    category: PARTNER_CATEGORIES.RESEARCH,
    tag: 'Research Partner',
    role: 'National agricultural research center conducting horticultural and crop research.',
    icon: 'biotech',
    logo: marcLogo,
    featuredHome: false,
  },
  {
    id: 'adami-tulu',
    name: 'Adami Tulu Agricultural Research Center (OARI)',
    acronym: 'OARI / ATARC',
    category: PARTNER_CATEGORIES.RESEARCH,
    tag: 'Research Partner',
    role: 'Regional agricultural research center conducting agricultural and agronomic research.',
    icon: 'science',
    logo: atarcLogo,
    featuredHome: false,
  },

  /* ── 3. Commercial, Financial & Off-Takers ── */
  {
    id: 'ethiopian-airlines',
    name: 'Ethiopian Airlines',
    acronym: 'Ethiopian Airlines',
    category: PARTNER_CATEGORIES.FINANCE_MARKETS,
    tag: 'Commercial Partner',
    role: 'National carrier and commercial partner.',
    icon: 'flight_takeoff',
    logo: airlinesLogo,
    featuredHome: true,
  },
  {
    id: 'coop-bank-oromia',
    name: 'Cooperative Bank of Oromia',
    acronym: 'Coopbank',
    category: PARTNER_CATEGORIES.FINANCE_MARKETS,
    tag: 'Financial Partner',
    role: 'Commercial banking partner providing cooperative financial services.',
    icon: 'account_balance',
    logo: coopbankLogo,
    featuredHome: false,
  },
  {
    id: 'cbe',
    name: 'Commercial Bank of Ethiopia',
    acronym: 'CBE',
    category: PARTNER_CATEGORIES.FINANCE_MARKETS,
    tag: 'Financial Partner',
    role: 'Commercial banking and financial services partner.',
    icon: 'payments',
    logo: cbeLogo,
    featuredHome: false,
  },
  {
    id: 'cmt',
    name: 'Center for Market Transformation (CMT)',
    acronym: 'CMT',
    category: PARTNER_CATEGORIES.FINANCE_MARKETS,
    tag: 'Market Partner',
    role: 'Agricultural market development and trade linkage partner.',
    icon: 'storefront',
    logo: null,
    featuredHome: false,
  },

  /* ── 4. Government & Regulatory Agencies ── */
  {
    id: 'ati',
    name: 'Agricultural Transformation Institute (ATI / ATA)',
    acronym: 'ATI',
    category: PARTNER_CATEGORIES.GOVERNMENT,
    tag: 'Government Agency',
    role: 'Government agency supporting systemic agricultural transformation in Ethiopia.',
    icon: 'local_shipping',
    logo: atiLogo,
    featuredHome: true,
  },
  {
    id: 'ehpea',
    name: 'Ethiopian Horticulture Producer Exporters Association (EHPEA)',
    acronym: 'EHPEA',
    category: PARTNER_CATEGORIES.GOVERNMENT,
    tag: 'Industry Association',
    role: 'National association representing Ethiopian horticulture producers and exporters.',
    icon: 'verified',
    logo: ehpeaLogo,
    featuredHome: false,
  },
  {
    id: 'oromia-coop-agency',
    name: 'Oromia Cooperative Agency',
    acronym: 'OCA',
    category: PARTNER_CATEGORIES.GOVERNMENT,
    tag: 'Regulatory Body',
    role: 'Regional government agency providing cooperative oversight and guidance.',
    icon: 'gavel',
    logo: ocaLogo,
    featuredHome: false,
  },
  {
    id: 'oromia-agri-bureau',
    name: 'Oromia Bureau of Agriculture & Natural Resource',
    acronym: 'OBANR',
    category: PARTNER_CATEGORIES.GOVERNMENT,
    tag: 'Government Bureau',
    role: 'Regional government authority for agriculture and natural resources.',
    icon: 'policy',
    logo: null,
    featuredHome: false,
  },
]
