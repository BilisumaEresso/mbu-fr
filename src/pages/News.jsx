import { useState, useMemo, useRef, useEffect } from 'react'
import SEO from '../components/common/SEO.jsx'
import { useTranslation } from 'react-i18next'
import PageHero from '../components/common/PageHero.jsx'
import Reveal from '../components/common/Reveal.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import { news } from '../data/news.js'
import { Search, ArrowRight, X, Calendar, Clock, Share2 } from 'lucide-react'
import './InnerPage.css'
import './News.css'

// Cap stagger at 450ms
const stagger = (i) => Math.min(i * 90, 450)

function News() {
  const { t } = useTranslation(['news', 'meta', 'common'])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [copiedLink, setCopiedLink] = useState(false)
  const hasInteractedRef = useRef(false)

  // Filter articles based on search
  const filteredNews = useMemo(() => {
    if (!searchTerm.trim()) return news
    const term = searchTerm.toLowerCase()
    return news.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.desc.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
    )
  }, [searchTerm])

  function handleSearchChange(e) {
    hasInteractedRef.current = true
    setSearchTerm(e.target.value)
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedArticle])

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
            {hasInteractedRef.current ? (
              <article
                className="news-article-card news-article-card--large"
                onClick={() => setSelectedArticle(featuredLarge)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedArticle(featuredLarge)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={t('news:labels.readReportAria', { title: featuredLarge.title })}
              >
                <div className="news-article-card__media">
                  <img
                    src={featuredLarge.img}
                    srcSet={featuredLarge.imgSrcSet}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                    alt={featuredLarge.title}
                    className="news-article-card__img"
                  />
                </div>
                <div className="news-article-card__body">
                  <div className="news-article-card__meta">
                    <span className="news-badge-pill">{featuredLarge.category}</span>
                    <time className="news-date-text">{featuredLarge.date}</time>
                  </div>
                  <h2 className="news-article-card__title news-article-card__title--large">
                    {featuredLarge.title}
                  </h2>
                  <p className="news-article-card__desc">{featuredLarge.desc}</p>
                  <div className="news-article-card__cta">
                    {t('news:labels.readReport')} <ArrowRight size={16} className="text-sm" />
                  </div>
                </div>
              </article>
            ) : (
              <Reveal
                as="article"
                delay={0}
                className="news-article-card news-article-card--large"
                onClick={() => setSelectedArticle(featuredLarge)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedArticle(featuredLarge)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={t('news:labels.readReportAria', { title: featuredLarge.title })}
              >
                <div className="news-article-card__media">
                  <img
                    src={featuredLarge.img}
                    srcSet={featuredLarge.imgSrcSet}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                    alt={featuredLarge.title}
                    className="news-article-card__img"
                  />
                </div>
                <div className="news-article-card__body">
                  <div className="news-article-card__meta">
                    <span className="news-badge-pill">{featuredLarge.category}</span>
                    <time className="news-date-text">{featuredLarge.date}</time>
                  </div>
                  <h2 className="news-article-card__title news-article-card__title--large">
                    {featuredLarge.title}
                  </h2>
                  <p className="news-article-card__desc">{featuredLarge.desc}</p>
                  <div className="news-article-card__cta">
                    {t('news:labels.readReport')} <ArrowRight size={16} className="text-sm" />
                  </div>
                </div>
              </Reveal>
            )}

            {/* Featured Small */}
            {hasInteractedRef.current ? (
              <article
                className="news-article-card news-article-card--small"
                onClick={() => setSelectedArticle(featuredSmall)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedArticle(featuredSmall)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={t('news:labels.readArticleAria', { title: featuredSmall.title })}
              >
                <div className="news-article-card__media">
                  <img
                    src={featuredSmall.img}
                    srcSet={featuredSmall.imgSrcSet}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    alt={featuredSmall.title}
                    className="news-article-card__img"
                  />
                </div>
                <div className="news-article-card__body">
                  <div className="news-article-card__meta">
                    <span className="news-badge-pill news-badge-pill--secondary">
                      {featuredSmall.category}
                    </span>
                    <time className="news-date-text">{featuredSmall.date}</time>
                  </div>
                  <h2 className="news-article-card__title">{featuredSmall.title}</h2>
                  <p className="news-article-card__desc">{featuredSmall.desc}</p>
                  <div className="news-article-card__cta">
                    {t('news:labels.readReport')} <ArrowRight size={16} className="text-sm" />
                  </div>
                </div>
              </article>
            ) : (
              <Reveal
                as="article"
                delay={90}
                className="news-article-card news-article-card--small"
                onClick={() => setSelectedArticle(featuredSmall)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedArticle(featuredSmall)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={t('news:labels.readArticleAria', { title: featuredSmall.title })}
              >
                <div className="news-article-card__media">
                  <img
                    src={featuredSmall.img}
                    srcSet={featuredSmall.imgSrcSet}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    alt={featuredSmall.title}
                    className="news-article-card__img"
                  />
                </div>
                <div className="news-article-card__body">
                  <div className="news-article-card__meta">
                    <span className="news-badge-pill news-badge-pill--secondary">
                      {featuredSmall.category}
                    </span>
                    <time className="news-date-text">{featuredSmall.date}</time>
                  </div>
                  <h2 className="news-article-card__title">{featuredSmall.title}</h2>
                  <p className="news-article-card__desc">{featuredSmall.desc}</p>
                  <div className="news-article-card__cta">
                    {t('news:labels.readReport')} <ArrowRight size={16} className="text-sm" />
                  </div>
                </div>
              </Reveal>
            )}
          </section>
        )}

        {/* Standard Grid Row */}
        <section className="news-standard-grid">
          {gridArticles.map((article, i) => {
            const cardContent = (
              <>
                <div className="news-article-card__media">
                  <img
                    src={article.img}
                    srcSet={article.imgSrcSet}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    alt={article.title}
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
                      {article.category}
                    </span>
                    <time className="news-date-text">{article.date}</time>
                  </div>
                  <h3 className="news-article-card__title">{article.title}</h3>
                  <p className="news-article-card__desc">{article.desc}</p>
                  <div className="news-article-card__cta">
                    {t('news:labels.readReport')} <ArrowRight size={16} className="text-sm" />
                  </div>
                </div>
              </>
            )

            const handleArticleKeyDown = (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setSelectedArticle(article)
              }
            }

            if (hasInteractedRef.current) {
              return (
                <article
                  key={article.id}
                  className="news-article-card news-article-card--grid"
                  onClick={() => setSelectedArticle(article)}
                  onKeyDown={handleArticleKeyDown}
                  tabIndex={0}
                  role="button"
                  aria-label={t('news:labels.readArticleAria', { title: article.title })}
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
                onClick={() => setSelectedArticle(article)}
                onKeyDown={handleArticleKeyDown}
                tabIndex={0}
                role="button"
                aria-label={t('news:labels.readArticleAria', { title: article.title })}
              >
                {cardContent}
              </Reveal>
            )
          })}
        </section>
      </div>

      {/* ---- Wide Open Article Reader Modal ---- */}
      {selectedArticle && (
        <div className="news-modal-backdrop" onClick={() => setSelectedArticle(null)}>
          <div className="news-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="news-modal-close"
              onClick={() => setSelectedArticle(null)}
              aria-label={t('common:buttons.close')}
            >
              <X size={20} />
            </button>

            <div className="news-modal-meta-bar">
              <span className="news-badge-pill">{selectedArticle.category}</span>
              <span className="news-modal-meta-item">
                <Calendar size={14} className="text-xs" />
                {selectedArticle.date}
              </span>
              <span className="news-modal-meta-item">
                <Clock size={14} className="text-xs" />
                {t('news:labels.readTime')}
              </span>
            </div>

            <h1 className="news-modal-title">{selectedArticle.title}</h1>

            <div className="news-modal-media-banner">
              <img
                src={selectedArticle.img}
                srcSet={selectedArticle.imgSrcSet}
                sizes="(max-width: 768px) 100vw, 900px"
                alt={selectedArticle.title}
                className="news-modal-banner-img"
              />
            </div>

            <div className="news-modal-body-content">
              <p className="news-modal-lead">{selectedArticle.desc}</p>
              <p>
                {t('news:article.paragraph1')}
              </p>
              <p>
                {t('news:article.paragraph2')}
              </p>
            </div>

            <div className="news-modal-footer-actions">
              <button
                type="button"
                className="btn btn--outline btn--sm inline-flex items-center gap-1"
                onClick={handleCopyLink}
              >
                <Share2 size={14} className="text-xs" />
                {copiedLink ? t('news:labels.copied') : t('news:labels.share')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default News
