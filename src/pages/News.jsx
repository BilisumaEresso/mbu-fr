import { useState, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import SEO from '../components/common/SEO.jsx'
import { useTranslation } from 'react-i18next'
import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import { news } from '../data/news.js'
import { getLocalePath } from '../utils/locale.js'
import { Search, ArrowRight } from 'lucide-react'
import './InnerPage.css'
import './News.css'

// Cap stagger at 450ms
const stagger = (i) => Math.min(i * 90, 450)

function News() {
  const { t, i18n } = useTranslation(['news', 'meta', 'common'])
  const currentLang = i18n.language || 'en'
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const hasInteractedRef = useRef(false)

  // Helper to get translated article properties
  const getNewsTrans = (item) => {
    if (!item) return {}
    const itemId = String(item.id)
    return {
      title: t(`news:items.${itemId}.title`, item.title),
      category: t(`news:items.${itemId}.category`, item.category),
      desc: t(`news:items.${itemId}.desc`, item.desc),
    }
  }

  // Filter articles based on search query matching localized or base content
  const filteredNews = useMemo(() => {
    if (!searchTerm.trim()) return news
    const term = searchTerm.toLowerCase()
    return news.filter((item) => {
      const trans = getNewsTrans(item)
      return (
        trans.title.toLowerCase().includes(term) ||
        trans.desc.toLowerCase().includes(term) ||
        trans.category.toLowerCase().includes(term) ||
        item.title.toLowerCase().includes(term) ||
        item.desc.toLowerCase().includes(term)
      )
    })
  }, [searchTerm, i18n.language])

  function handleSearchChange(e) {
    hasInteractedRef.current = true
    setSearchTerm(e.target.value)
  }

  // Divide into Featured (first 2) and Grid (remaining)
  const featuredLarge = filteredNews[0]
  const featuredSmall = filteredNews[1]
  const gridArticles = filteredNews.slice(2)

  return (
    <div className="news-page-container">
      <SEO
        title={t('meta:news.title')}
        description={t('meta:news.description')}
      />
      <PageHero
        breadcrumbs={[{ label: t('common:breadcrumbs.home'), to: '/' }, { label: t('common:breadcrumbs.news') }]}
        eyebrow={t('news:hero.eyebrow')}
        title={t('news:hero.title')}
        description={t('news:hero.desc')}
        rightContent={
          <div className="news-search-box">
            <input
              type="text"
              placeholder={t('news:hero.searchPlaceholder', 'Search news...')}
              className="news-search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Search size={20} className="news-search-icon" />
          </div>
        }
      />

      <SectionDivider />

      <div className="container" style={{ paddingTop: 'var(--space-6)' }} id="articles">
        {/* Top Featured Row (8-col + 4-col) */}
        {featuredLarge && featuredSmall && (
          <section className="news-featured-row">
            {/* Featured Large */}
            {(() => {
              const transLarge = getNewsTrans(featuredLarge)
              if (hasInteractedRef.current) {
                return (
                  <article
                    className="news-article-card news-article-card--large"
                    onClick={() => navigate(getLocalePath(`/news/${featuredLarge.id}`, currentLang))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        navigate(getLocalePath(`/news/${featuredLarge.id}`, currentLang))
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={t('news:labels.readReportAria', { title: transLarge.title })}
                  >
                    <div className="news-article-card__media">
                      <img
                        src={featuredLarge.img}
                        srcSet={featuredLarge.imgSrcSet}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                        alt={transLarge.title}
                        className="news-article-card__img"
                      />
                    </div>
                    <div className="news-article-card__body">
                      <div className="news-article-card__meta">
                        <span className="news-badge-pill">{transLarge.category}</span>
                        <time className="news-date-text">{featuredLarge.date}</time>
                      </div>
                      <h2 className="news-article-card__title news-article-card__title--large">
                        {transLarge.title}
                      </h2>
                      <p className="news-article-card__desc">{transLarge.desc}</p>
                      <div className="news-article-card__cta">
                        {t('news:labels.readReport')} <ArrowRight size={16} className="text-sm" />
                      </div>
                    </div>
                  </article>
                )
              }

              return (
                <Reveal
                  as="article"
                  delay={0}
                  className="news-article-card news-article-card--large"
                  onClick={() => navigate(getLocalePath(`/news/${featuredLarge.id}`, currentLang))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      navigate(getLocalePath(`/news/${featuredLarge.id}`, currentLang))
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={t('news:labels.readReportAria', { title: transLarge.title })}
                >
                  <div className="news-article-card__media">
                    <img
                      src={featuredLarge.img}
                      srcSet={featuredLarge.imgSrcSet}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                      alt={transLarge.title}
                      className="news-article-card__img"
                    />
                  </div>
                  <div className="news-article-card__body">
                    <div className="news-article-card__meta">
                      <span className="news-badge-pill">{transLarge.category}</span>
                      <time className="news-date-text">{featuredLarge.date}</time>
                    </div>
                    <h2 className="news-article-card__title news-article-card__title--large">
                      {transLarge.title}
                    </h2>
                    <p className="news-article-card__desc">{transLarge.desc}</p>
                    <div className="news-article-card__cta">
                      {t('news:labels.readReport')} <ArrowRight size={16} className="text-sm" />
                    </div>
                  </div>
                </Reveal>
              )
            })()}

            {/* Featured Small */}
            {(() => {
              const transSmall = getNewsTrans(featuredSmall)
              if (hasInteractedRef.current) {
                return (
                  <article
                    className="news-article-card news-article-card--small"
                    onClick={() => navigate(getLocalePath(`/news/${featuredSmall.id}`, currentLang))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        navigate(getLocalePath(`/news/${featuredSmall.id}`, currentLang))
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={t('news:labels.readArticleAria', { title: transSmall.title })}
                  >
                    <div className="news-article-card__media">
                      <img
                        src={featuredSmall.img}
                        srcSet={featuredSmall.imgSrcSet}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                        alt={transSmall.title}
                        className="news-article-card__img"
                      />
                    </div>
                    <div className="news-article-card__body">
                      <div className="news-article-card__meta">
                        <span className="news-badge-pill news-badge-pill--secondary">
                          {transSmall.category}
                        </span>
                        <time className="news-date-text">{featuredSmall.date}</time>
                      </div>
                      <h2 className="news-article-card__title">{transSmall.title}</h2>
                      <p className="news-article-card__desc">{transSmall.desc}</p>
                      <div className="news-article-card__cta">
                        {t('news:labels.readReport')} <ArrowRight size={16} className="text-sm" />
                      </div>
                    </div>
                  </article>
                )
              }

              return (
                <Reveal
                  as="article"
                  delay={90}
                  className="news-article-card news-article-card--small"
                  onClick={() => navigate(getLocalePath(`/news/${featuredSmall.id}`, currentLang))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      navigate(getLocalePath(`/news/${featuredSmall.id}`, currentLang))
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={t('news:labels.readArticleAria', { title: transSmall.title })}
                >
                  <div className="news-article-card__media">
                    <img
                      src={featuredSmall.img}
                      srcSet={featuredSmall.imgSrcSet}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                      alt={transSmall.title}
                      className="news-article-card__img"
                    />
                  </div>
                  <div className="news-article-card__body">
                    <div className="news-article-card__meta">
                      <span className="news-badge-pill news-badge-pill--secondary">
                        {transSmall.category}
                      </span>
                      <time className="news-date-text">{featuredSmall.date}</time>
                    </div>
                    <h2 className="news-article-card__title">{transSmall.title}</h2>
                    <p className="news-article-card__desc">{transSmall.desc}</p>
                    <div className="news-article-card__cta">
                      {t('news:labels.readReport')} <ArrowRight size={16} className="text-sm" />
                    </div>
                  </div>
                </Reveal>
              )
            })()}
          </section>
        )}

        {/* Standard Grid Row */}
        <section className="news-standard-grid">
          {gridArticles.map((article, i) => {
            const transArticle = getNewsTrans(article)
            const cardContent = (
              <>
                <div className="news-article-card__media">
                  <img
                    src={article.img}
                    srcSet={article.imgSrcSet}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    alt={transArticle.title}
                    className="news-article-card__img"
                  />
                </div>
                <div className="news-article-card__body">
                  <div className="news-article-card__meta">
                    <span
                      className={`news-badge-pill ${
                        article.categoryType === 'secondary' ? 'news-badge-pill--secondary' : ''
                      }`}
                    >
                      {transArticle.category}
                    </span>
                    <time className="news-date-text">{article.date}</time>
                  </div>
                  <h3 className="news-article-card__title">{transArticle.title}</h3>
                  <p className="news-article-card__desc">{transArticle.desc}</p>
                  <div className="news-article-card__cta">
                    {t('news:labels.readReport')} <ArrowRight size={16} className="text-sm" />
                  </div>
                </div>
              </>
            )

            const handleArticleClick = () => {
              navigate(getLocalePath(`/news/${article.id}`, currentLang))
            }

            const handleArticleKeyDown = (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleArticleClick()
              }
            }

            if (hasInteractedRef.current) {
              return (
                <article
                  key={article.id}
                  className="news-article-card news-article-card--grid"
                  onClick={handleArticleClick}
                  onKeyDown={handleArticleKeyDown}
                  tabIndex={0}
                  role="button"
                  aria-label={t('news:labels.readArticleAria', { title: transArticle.title })}
                >
                  {cardContent}
                </article>
              )
            }

            return (
              <Reveal
                key={article.id}
                as="article"
                delay={stagger(i + 2)}
                className="news-article-card news-article-card--grid"
                onClick={handleArticleClick}
                onKeyDown={handleArticleKeyDown}
                tabIndex={0}
                role="button"
                aria-label={t('news:labels.readArticleAria', { title: transArticle.title })}
              >
                {cardContent}
              </Reveal>
            )
          })}
        </section>
      </div>
    </div>
  )
}

export default News
