import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEO from '../components/common/SEO.jsx'
import Reveal from '../components/common/Reveal.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import { news } from '../data/news.js'
import { getLocalePath, isSupportedLocale, DEFAULT_LOCALE } from '../utils/locale.js'
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  MapPin,
  Share2,
  Check,
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react'
import './InnerPage.css'
import './NewsDetail.css'

export default function NewsDetail() {
  const { id, lang } = useParams()
  const { t } = useTranslation(['news', 'common'])
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  const currentLang = isSupportedLocale(lang) ? lang : DEFAULT_LOCALE

  const article = news.find((n) => String(n.id) === String(id))

  if (!article) {
    return (
      <div className="news-detail-page section">
        <SEO title="Article Not Found - Meki Batu Union" description="The requested news article could not be found." />
        <div className="container text-center py-12">
          <h1 className="text-2xl font-bold mb-4">{t('news:notFound.title', 'Article Not Found')}</h1>
          <p className="mb-6 text-muted">{t('news:notFound.desc', 'The news update you are looking for does not exist or has been removed.')}</p>
          <Link to={getLocalePath('/news', currentLang)} className="btn btn--primary inline-flex items-center gap-2">
            <ArrowLeft size={18} />
            {t('news:labels.backToNews', 'Back to News & Updates')}
          </Link>
        </div>
      </div>
    )
  }

  const relatedNews = news.filter((n) => String(n.id) !== String(article.id)).slice(0, 3)

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  // Determine paragraph array (use rich fullContent if available, or fallbacks)
  const paragraphs = Array.isArray(article.fullContent) && article.fullContent.length > 0
    ? article.fullContent
    : [
        t('news:article.paragraph1', 'Meki Batu Union continues to drive agricultural transformation through sustainable farming techniques, improved market linkages, and direct support for primary cooperatives across the Oromia region.'),
        t('news:article.paragraph2', 'Through strategic partnerships and modern cold-chain infrastructure, our member farmers are achieving higher crop yields and reaching international export markets with top-quality produce.')
      ]

  return (
    <div className="news-detail-page">
      <SEO
        title={`${article.title} | Meki Batu News`}
        description={article.desc || article.excerpt}
        image={article.img}
        path={`/news/${article.id}`}
      />

      {/* Hero / Navigation Bar */}
      <section className="news-detail-hero">
        <div className="container">
          <div className="news-detail-nav">
            <button
              onClick={() => navigate(getLocalePath('/news', currentLang))}
              className="news-back-btn"
              aria-label={t('news:labels.backToNews', 'Back to News')}
            >
              <ArrowLeft size={18} />
              <span>{t('news:labels.backToNews', 'Back to News')}</span>
            </button>

            <nav className="news-breadcrumbs" aria-label="Breadcrumb">
              <Link to={getLocalePath('/', currentLang)}>{t('common:nav.home', 'Home')}</Link>
              <span className="separator">/</span>
              <Link to={getLocalePath('/news', currentLang)}>{t('common:nav.news', 'News')}</Link>
              <span className="separator">/</span>
              <span className="current">{article.category}</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Article Reader Container */}
      <article className="section py-8">
        <div className="container container--readable">
          {/* Category & Meta Header */}
          <Reveal className="news-detail-header">
            <div className="news-detail-meta-pills">
              <span className="news-badge-pill">{article.category}</span>
              <span className="news-meta-item">
                <Calendar size={15} />
                <time>{article.date}</time>
              </span>
              <span className="news-meta-item">
                <Clock size={15} />
                <span>{article.readTime || t('news:labels.readTime', '4 min read')}</span>
              </span>
            </div>

            <h1 className="news-detail-title">{article.title}</h1>

            {/* Author / Location Bar */}
            <div className="news-detail-author-bar">
              <div className="news-author-avatar">
                <User size={18} />
              </div>
              <div className="news-author-info">
                <span className="news-author-name">{article.author || 'Meki Batu Agronomy Desk'}</span>
                <span className="news-author-location">
                  <MapPin size={13} />
                  {article.location || 'Meki, Oromia Region, Ethiopia'}
                </span>
              </div>

              <div className="news-header-share">
                <button
                  type="button"
                  className="btn btn--outline btn--sm news-share-btn"
                  onClick={handleShare}
                  aria-label="Share article"
                >
                  {copied ? <Check size={16} className="text-success" /> : <Share2 size={16} />}
                  <span>{copied ? t('news:labels.copied', 'Copied!') : t('news:labels.share', 'Share')}</span>
                </button>
              </div>
            </div>
          </Reveal>

          {/* Featured Banner Image */}
          {article.img && (
            <Reveal delay={100} className="news-detail-banner-wrapper">
              <img
                src={article.img}
                srcSet={article.imgSrcSet}
                sizes="(max-width: 768px) 100vw, 840px"
                alt={article.title}
                className="news-detail-banner-img"
              />
              <figcaption className="news-detail-banner-caption">
                {article.title} — Meki Batu Farmers Cooperative Union Field Report
              </figcaption>
            </Reveal>
          )}

          {/* Article Main Body Content */}
          <Reveal delay={150} className="news-detail-body">
            {/* Lead Synopsis */}
            {article.desc && (
              <p className="news-detail-lead">
                {article.desc}
              </p>
            )}

            {/* Key Highlights Callout Box if present */}
            {Array.isArray(article.highlights) && article.highlights.length > 0 && (
              <div className="news-detail-highlights-box">
                <h3 className="news-highlights-title">
                  <Sparkles size={18} />
                  Key Report Highlights & Insights
                </h3>
                <ul className="news-highlights-list">
                  {article.highlights.map((item, idx) => (
                    <li key={idx}>
                      <span className="bullet-icon">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Paragraphs */}
            {paragraphs.map((para, i) => (
              <p key={i} className="news-paragraph">
                {para}
              </p>
            ))}

            {/* Pull Quote Box */}
            <blockquote className="news-detail-quote">
              <p>
                "Empowering smallholder farmers through collective bargaining, modern technology, and direct market access is at the core of our union’s mission."
              </p>
              <cite>— Leadership Team, Meki Batu Union</cite>
            </blockquote>
          </Reveal>

          {/* Footer Sharing & Actions */}
          <div className="news-detail-footer-bar">
            <div className="news-footer-left">
              <span className="font-semibold text-sm">{t('news:labels.shareThisArticle', 'Share this update:')}</span>
              <button
                type="button"
                className="btn btn--outline btn--sm"
                onClick={handleShare}
              >
                {copied ? <Check size={16} className="text-success" /> : <Share2 size={16} />}
                <span>{copied ? t('news:labels.copied', 'Copied Link!') : t('news:labels.copyLink', 'Copy Link')}</span>
              </button>
            </div>

            <button
              onClick={() => navigate(getLocalePath('/news', currentLang))}
              className="btn btn--primary btn--sm inline-flex items-center gap-2"
            >
              <BookOpen size={16} />
              <span>{t('news:labels.backToNews', 'Back to All News')}</span>
            </button>
          </div>
        </div>
      </article>

      <SectionDivider />

      {/* Related Articles Section */}
      {relatedNews.length > 0 && (
        <section className="section related-news-section">
          <div className="container">
            <div className="section-header text-center mb-8">
              <h2 className="section-title">{t('news:labels.relatedNewsTitle', 'More Updates & Field Stories')}</h2>
              <p className="section-desc">{t('news:labels.relatedNewsDesc', 'Stay informed with the latest developments from Meki Batu Cooperative Union.')}</p>
            </div>

            <div className="news-standard-grid">
              {relatedNews.map((relArticle, i) => (
                <Reveal key={relArticle.id} delay={i * 100}>
                  <Link
                    to={getLocalePath(`/news/${relArticle.id}`, currentLang)}
                    className="news-article-card news-article-card--grid text-decoration-none"
                  >
                    <div className="news-article-card__media">
                      <img
                        src={relArticle.img}
                        srcSet={relArticle.imgSrcSet}
                        sizes="(max-width: 768px) 100vw, 400px"
                        alt={relArticle.title}
                        className="news-article-card__img"
                      />
                    </div>
                    <div className="news-article-card__body">
                      <div className="news-article-card__meta">
                        <span className="news-badge-pill">{relArticle.category}</span>
                        <time className="news-date-text">{relArticle.date}</time>
                      </div>
                      <h3 className="news-article-card__title">{relArticle.title}</h3>
                      <p className="news-article-card__desc">{relArticle.desc || relArticle.excerpt}</p>
                      <div className="news-article-card__cta">
                        {t('news:labels.readReport', 'Read Full Article')} <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
