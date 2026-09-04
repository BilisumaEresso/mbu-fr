import { useState } from 'react'
import SEO from '../components/common/SEO.jsx'
import { useTranslation } from 'react-i18next'
import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import Certifications from '../components/common/Certifications.jsx'
import OrgChart from '../components/common/OrgChart.jsx'
import { partners, PARTNER_CATEGORIES } from '../data/partners.js'
import { resources } from '../data/resources.js'
import FacilityCard from '../components/common/FacilityCard.jsx'
import aboutHeroImg from '../assets/images/heroes/aboutHero.webp'
import aboutHero480 from '../assets/images/heroes/aboutHero-480w.webp'
import aboutHero800 from '../assets/images/heroes/aboutHero-800w.webp'
import { getTeamMembers } from '../data/team.js'
import { COMPANY_PROFILE_BASE64 as companyProfilePdf } from '../data/companyProfilePdfBase64.js'
import './About.css'

// Cap stagger at 450ms for card grids
const stagger = (i) => Math.min(i * 70, 450)

const PARTNER_CATEGORY_KEYS = {
  [PARTNER_CATEGORIES.ALL]: 'all',
  [PARTNER_CATEGORIES.DEVELOPMENT]: 'development',
  [PARTNER_CATEGORIES.RESEARCH]: 'research',
  [PARTNER_CATEGORIES.FINANCE_MARKETS]: 'finance',
  [PARTNER_CATEGORIES.GOVERNMENT]: 'government',
}

const PARTNER_TAG_KEYS = {
  'Development Partner': 'development',
  'Environmental Partner': 'environmental',
  'Industry Partner': 'industry',
  'Research Partner': 'research',
  'Off-Taker': 'offTaker',
  'Financial Partner': 'financial',
  'Market Partner': 'market',
  'Regulatory Body': 'regulatory',
  'Government Bureau': 'government',
}

function About() {
  const { t } = useTranslation(['about', 'meta', 'common'])
  const teamMembersList = getTeamMembers(t)
  const [selectedCategory, setSelectedCategory] = useState(PARTNER_CATEGORIES.ALL)
  const [showAllPartners, setShowAllPartners] = useState(false)

  const getCategoryLabel = (category) => {
    const key = PARTNER_CATEGORY_KEYS[category]
    return key ? t(`about:partners.categories.${key}`, category) : category
  }

  const getTagLabel = (tag) => {
    const key = PARTNER_TAG_KEYS[tag]
    return key ? t(`about:partners.tags.${key}`, tag) : tag
  }

  const filteredPartners = selectedCategory === PARTNER_CATEGORIES.ALL
    ? partners
    : partners.filter((p) => p.category === selectedCategory)

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setShowAllPartners(false)
  }

  const objectives = t('about:missionVision.objectives', { returnObjects: true }) || []

  return (
    <>
      <SEO
        title={t('meta:about.title')}
        description={t('meta:about.description')}
      />
      {/* ---- Hero Section ---- */}
      <PageHero
        breadcrumbs={[{ label: t('common:breadcrumbs.home'), to: '/' }, { label: t('common:breadcrumbs.about') }]}
        eyebrow={t('about:hero.eyebrow')}
        title={t('about:hero.title')}
        description={t('about:hero.desc')}
        image={aboutHeroImg}
        imageSrcSet={`${aboutHero480} 480w, ${aboutHero800} 800w, ${aboutHeroImg} 1448w`}
        imageAlt={t('about:hero.imageAlt')}
        badge={t('about:hero.badge')}
      />

      <SectionDivider />

      {/* ---- History Timeline (Our Foundation) ---- */}
      <section id="foundation" className="about-foundation section section--alt">
        <div className="container">
          <div className="about-foundation__header">
            <span className="material-symbols-outlined about-foundation__icon">history</span>
            <h2 className="about-foundation__title">{t('about:foundation.title')}</h2>
          </div>

          {/* Timeline Items revealed individually as user scrolls */}
          <div className="about-timeline">
            <div className="about-timeline__line desktop-only" />

            {/* Timeline Item 1 */}
            <Reveal className="about-timeline__item">
              <div className="about-timeline__node desktop-only about-timeline__node--secondary" />
              <div className="about-timeline__left">
                <span className="label-caps label-caps--secondary block mb-1">{t('about:foundation.item1.date')}</span>
                <h3 className="about-timeline__heading">{t('about:foundation.item1.heading')}</h3>
              </div>
              <div className="about-timeline__right">
                <p className="about-timeline__text">
                  {t('about:foundation.item1.text')}
                </p>
              </div>
            </Reveal>

            {/* Timeline Item 2 */}
            <Reveal className="about-timeline__item about-timeline__item--reverse" delay={80}>
              <div className="about-timeline__node desktop-only about-timeline__node--tint" />
              <div className="about-timeline__left">
                <span className="label-caps label-caps--tint block mb-1">{t('about:foundation.item2.date')}</span>
                <h3 className="about-timeline__heading">{t('about:foundation.item2.heading')}</h3>
              </div>
              <div className="about-timeline__right">
                <p className="about-timeline__text">
                  {t('about:foundation.item2.text')}
                </p>
              </div>
            </Reveal>

            {/* Timeline Item 3 */}
            <Reveal className="about-timeline__item" delay={160}>
              <div className="about-timeline__node desktop-only about-timeline__node--primary" />
              <div className="about-timeline__left">
                <span className="label-caps label-caps--primary block mb-1">{t('about:foundation.item3.date')}</span>
                <h3 className="about-timeline__heading">{t('about:foundation.item3.heading')}</h3>
              </div>
              <div className="about-timeline__right">
                <p className="about-timeline__text">
                  {t('about:foundation.item3.text')}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Mission & Certification ---- */}
      <section id="mission-vision" className="about-mission-cert section">
        <div className="container">
          <div className="about-mission-cert__grid">
            {/* Left: Mission, Vision & Objectives */}
            <Reveal className="about-mission-card">
              <div className="about-vision-block mb-6">
                <span className="label-caps label-caps--secondary block mb-1">{t('about:missionVision.visionTitle')}</span>
                <h3 className="about-vision__heading text-xl font-display font-semibold mb-2">
                  {t('about:missionVision.visionHeading')}
                </h3>
                <p className="about-mission__text italic">
                  {t('about:missionVision.visionText')}
                </p>
              </div>

              <div className="about-mission-block mb-6">
                <span className="label-caps label-caps--secondary block mb-1">{t('about:missionVision.missionTitle')}</span>
                <h3 className="about-vision__heading text-xl font-display font-semibold mb-2">
                  {t('about:missionVision.missionHeading')}
                </h3>
                <p className="about-mission__text italic">
                  {t('about:missionVision.missionText')}
                </p>
              </div>

              <div className="about-objectives-block">
                <span className="label-caps label-caps--secondary block mb-3">{t('about:missionVision.objectivesTitle')}</span>
                <ul className="about-mission__list">
                  {Array.isArray(objectives) && objectives.map((obj, i) => (
                    <li key={i} className="about-mission__item">
                      <span className="material-symbols-outlined about-mission__check">check_circle</span>
                      <span className="about-mission__text">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Right: Certifications & Compliance */}
            <Reveal className="about-cert-wrap" delay={90}>
              <Certifications />
              <div className="about-cert-wrap__footer">
                <a
                  href={companyProfilePdf}
                  download="MekiBatuUnion_CompanyProfile.pdf"
                  className="btn btn--outline btn--sm"
                  title={t('about:missionVision.downloadPdfTitle')}
                >
                  {t('common:buttons.downloadPdf')} <span className="material-symbols-outlined text-sm">download</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Leadership & Governance Structure ---- */}
      <section className="about-governance section section--alt" id="leadership">
        <div className="container">
          <div className="about-governance__header text-center">
            <span className="label-caps label-caps--secondary mb-2 block">{t('about:governance.eyebrow')}</span>
            <h2 className="about-governance__title">{t('about:governance.title')}</h2>
            <p className="about-governance__desc">
              {t('about:governance.desc')}
            </p>
          </div>

          {/* 3-Tier Organizational Hierarchy Chart */}
          <Reveal>
            <OrgChart />
          </Reveal>

          {/* Leadership & Staff Tiers */}
          <div className="about-governance__subheader">
            <span className="label-caps label-caps--secondary mb-2 block">{t('about:governance.teamTag')}</span>
            <h3 className="about-governance__subtitle">{t('about:governance.teamSubtitle')}</h3>
            <p className="about-governance__subdesc">{t('about:governance.teamDesc')}</p>
          </div>

          {/* Tier 1: Executive Spotlight (GM & Deputy GM) */}
          <div className="about-governance__tier about-governance__tier--exec">
            <div className="about-governance__exec-grid">
              {teamMembersList.slice(0, 2).map((member, i) => (
                <Reveal
                  key={member.id}
                  delay={stagger(i)}
                  className="about-governance__exec-card-wrapper"
                >
                  <div className="about-governance__exec-card">
                    <div className="about-governance__exec-photo-wrap">
                      <img
                        src={member.photo}
                        alt={t('about:governance.memberAlt', { name: member.name, title: member.title })}
                        className="about-governance__exec-photo"
                        loading="lazy"
                      />
                    </div>

                    <div className="about-governance__exec-body">
                      <div className="about-governance__exec-meta">
                        <span className="about-governance__exec-dept">{member.department}</span>
                        <h3 className="about-governance__exec-name">{member.name}</h3>
                        <p className="about-governance__exec-title">{member.title}</p>
                      </div>

                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="about-governance__exec-action"
                          title={t('about:governance.emailTitle', { name: member.name, email: member.email })}
                          aria-label={t('about:governance.emailAria', { name: member.name, email: member.email })}
                        >
                          <span className="material-symbols-outlined about-governance__exec-action-icon">mail</span>
                          <span className="about-governance__exec-action-text">{member.email}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Tier 2: Department Heads & Advisory Mosaic */}
          <div className="about-governance__tier about-governance__tier--dept">
            <div className="about-governance__dept-header">
              <span className="label-caps label-caps--secondary mb-1 block">{t('about:governance.deptTag')}</span>
              <h4 className="about-governance__dept-title">{t('about:governance.deptSubtitle')}</h4>
              <p className="about-governance__dept-desc">{t('about:governance.deptDesc')}</p>
            </div>

            <div className="about-governance__dept-grid">
              {teamMembersList.slice(2).map((member, i) => (
                <Reveal
                  key={member.id}
                  delay={stagger(i)}
                  className="about-governance__card-wrapper"
                >
                  <div className="about-governance__card">
                    <div className="about-governance__photo-wrap">
                      <img
                        src={member.photo}
                        alt={t('about:governance.memberAlt', { name: member.name, title: member.title })}
                        className="about-governance__photo"
                        loading="lazy"
                      />
                      <span className="about-governance__role-badge">
                        {member.department}
                      </span>
                    </div>
                    <div className="about-governance__card-body">
                      <span className="about-governance__dept-tag-inline">{member.department}</span>
                      <h3 className="about-governance__name">{member.name}</h3>
                      <p className="about-governance__dept-role">{member.title}</p>

                      {member.email && (
                        <div className="about-governance__contacts">
                          <a
                            href={`mailto:${member.email}`}
                            className="about-governance__contact-link"
                            title={t('about:governance.emailTitle', { name: member.name, email: member.email })}
                            aria-label={t('about:governance.emailAria', { name: member.name, email: member.email })}
                          >
                            <span className="material-symbols-outlined about-governance__contact-icon">mail</span>
                            <span className="about-governance__contact-text">{member.email}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Operations & Physical Infrastructure ---- */}
      <section className="about-infrastructure section" id="infrastructure">
        <div className="container">
          <div className="about-infrastructure__header text-center">
            <span className="label-caps label-caps--secondary mb-2 block">{t('about:facilities.tag')}</span>
            <h2 className="about-infrastructure__title">{t('about:facilities.title')}</h2>
            <p className="about-infrastructure__subtitle">
              {t('about:facilities.desc')}
            </p>
          </div>

          {/* Facilities 2x2 Showcase Grid */}
          <div className="about-infrastructure__grid">
            {resources.map((res, i) => (
              <Reveal key={res.id} delay={Math.min(i * 100, 300)} className="about-infra-card-wrap">
                <FacilityCard resource={res} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Multi-Stakeholder Collaboration Ecosystem ---- */}
      <section className="about-partners section section--alt" id="partners">
        <div className="container">
          <div className="about-partners__header text-center">
            <span className="label-caps label-caps--secondary mb-2 block">{t('about:partners.eyebrow')}</span>
            <h2 className="about-partners__title">{t('about:partners.title')}</h2>
            <p className="about-partners__subtitle">
              {t('about:partners.desc')}
            </p>
          </div>

          {/* 4-P Collaboration Model Cards */}
          <div className="about-model__grid mb-12">
            <Reveal delay={0} className="about-model__card">
              <div className="about-model__card-top">
                <div className="about-model__icon-wrap">
                  <span className="material-symbols-outlined about-model__icon">science</span>
                </div>
                <span className="about-model__step">{t('about:partners.pillars.p1.step')}</span>
              </div>
              <h3 className="about-model__title">{t('about:partners.pillars.p1.title')}</h3>
              <p className="about-model__desc">{t('about:partners.pillars.p1.desc')}</p>
            </Reveal>

            <Reveal delay={100} className="about-model__card">
              <div className="about-model__card-top">
                <div className="about-model__icon-wrap">
                  <span className="material-symbols-outlined about-model__icon">water_drop</span>
                </div>
                <span className="about-model__step">{t('about:partners.pillars.p2.step')}</span>
              </div>
              <h3 className="about-model__title">{t('about:partners.pillars.p2.title')}</h3>
              <p className="about-model__desc">{t('about:partners.pillars.p2.desc')}</p>
            </Reveal>

            <Reveal delay={200} className="about-model__card">
              <div className="about-model__card-top">
                <div className="about-model__icon-wrap">
                  <span className="material-symbols-outlined about-model__icon">local_shipping</span>
                </div>
                <span className="about-model__step">{t('about:partners.pillars.p3.step')}</span>
              </div>
              <h3 className="about-model__title">{t('about:partners.pillars.p3.title')}</h3>
              <p className="about-model__desc">{t('about:partners.pillars.p3.desc')}</p>
            </Reveal>

            <Reveal delay={300} className="about-model__card">
              <div className="about-model__card-top">
                <div className="about-model__icon-wrap">
                  <span className="material-symbols-outlined about-model__icon">flight_takeoff</span>
                </div>
                <span className="about-model__step">{t('about:partners.pillars.p4.step')}</span>
              </div>
              <h3 className="about-model__title">{t('about:partners.pillars.p4.title')}</h3>
              <p className="about-model__desc">{t('about:partners.pillars.p4.desc')}</p>
            </Reveal>
          </div>

          {/* Category Filter Tabs */}
          <div className="about-partners__filter-bar" role="tablist" aria-label={t('about:partners.filterAriaLabel', 'Filter by category')}>
            {Object.values(PARTNER_CATEGORIES).map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selectedCategory === category}
                className={`about-partners__tab-btn ${selectedCategory === category ? 'about-partners__tab-btn--active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                <span>{getCategoryLabel(category)}</span>
                <span className="about-partners__tab-count">
                  {category === PARTNER_CATEGORIES.ALL
                    ? partners.length
                    : partners.filter((p) => p.category === category).length}
                </span>
              </button>
            ))}
          </div>

          {/* Filtered Partner Cards Grid (Two-Tone Logo Stage Cards) */}
          <div className="about-partners__cards-grid">
            {filteredPartners.map((partner, index) => (
              <Reveal
                key={partner.id}
                delay={Math.min(index * 50, 300)}
                className={`about-partner-card-wrapper ${index >= 6 && !showAllPartners ? 'about-partner-card-wrapper--hidden' : ''}`}
              >
                <div className="about-partner-card">
                  {/* Two-Tone Top Logo Stage */}
                  <div className="about-partner-card__stage">
                    <div className="about-partner-card__logo-wrap">
                      {partner.logo ? (
                        <img
                          src={partner.logo}
                          alt={t('about:partners.logoAlt', { name: partner.name })}
                          className="about-partner-card__logo"
                          loading="lazy"
                        />
                      ) : (
                        <div className="about-partner-card__fallback-icon">
                          <span className="material-symbols-outlined">{partner.icon}</span>
                        </div>
                      )}
                    </div>
                    <span className="about-partner-card__tag">{getTagLabel(partner.tag)}</span>
                  </div>

                  {/* Card Content Body */}
                  <div className="about-partner-card__body">
                    <div className="about-partner-card__meta">
                      <span className="about-partner-card__acronym">{partner.acronym}</span>
                      <span className="about-partner-card__category">{getCategoryLabel(partner.category)}</span>
                    </div>
                    <h3 className="about-partner-card__name">{partner.name}</h3>
                    <p className="about-partner-card__role">{partner.role}</p>
                  </div>

                  {/* Card Footer */}
                  <div className="about-partner-card__footer">
                    {partner.impactHighlight && (
                      <div className="about-partner-card__highlight">
                        <span className="material-symbols-outlined text-xs">verified</span>
                        <span>{partner.impactHighlight}</span>
                      </div>
                    )}
                    {partner.url && (
                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="about-partner-card__link"
                        title={t('about:partners.visitTitle', { name: partner.name })}
                      >
                        <span>{t('about:partners.officialWebsite')}</span>
                        <span className="material-symbols-outlined text-xs">open_in_new</span>
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Show All / Show Less Toggle Button (Desktop + Mobile) */}
          {filteredPartners.length > 6 && (
            <div className="about-partners__toggle">
              <button
                type="button"
                className="about-partners__toggle-btn"
                onClick={() => setShowAllPartners(!showAllPartners)}
                aria-expanded={showAllPartners}
              >
                {showAllPartners ? (
                  <>
                    <span>{t('about:partners.showLess')}</span>
                    <span className="material-symbols-outlined text-sm">expand_less</span>
                  </>
                ) : (
                  <>
                    <span>{t('about:partners.showAll', { count: filteredPartners.length })}</span>
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default About
