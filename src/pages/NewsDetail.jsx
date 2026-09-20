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

  // Helper function to resolve translated fields for an article
  const getNewsTrans = (item) => {
    if (!item) return {}
    const itemId = String(item.id)
    const contentObj = t(`news:items.${itemId}.fullContent`, { returnObjects: true })
    const highlightsObj = t(`news:items.${itemId}.highlights`, { returnObjects: true })

    return {
      title: t(`news:items.${itemId}.title`, item.title),
      category: t(`news:items.${itemId}.category`, item.category),
      desc: t(`news:items.${itemId}.desc`, item.desc),
      author: t(`news:items.${itemId}.author`, item.author || t('news:detail.authorDefault', 'Meki Batu Agronomy Desk')),
      location: t(`news:items.${itemId}.location`, item.location || t('news:detail.locationDefault', 'Meki, Oromia Region, Ethiopia')),
      readTime: t(`news:items.${itemId}.readTime`, item.readTime || t('news:labels.readTime', '4 min read')),
      fullContent: Array.isArray(contentObj) && contentObj.length > 0 ? contentObj : (item.fullContent || [
        t('news:article.paragraph1'),
        t('news:article.paragraph2')
      ]),
      highlights: Array.isArray(highlightsObj) && highlightsObj.length > 0 ? highlightsObj : (item.highlights || [])
    }
  }

  if (!article) {
    return (
      <div className="news-detail-page section">
        <SEO
          title={`${t('news:detail.notFoundTitle', 'Article Not Found')} - Meki Batu Union`}
          description={t('news:detail.notFoundDesc', 'The news update you are looking for does not exist or has been removed.')}
        />
        <div className="container text-center py-16">
          <h1 className="text-2xl font-bold mb-4">{t('news:detail.notFoundTitle', 'Article Not Found')}</h1>
          <p className="mb-6 text-muted">{t('news:detail.notFoundDesc', 'The news update you are looking for does not exist or has been removed.')}</p>
          <Link to={getLocalePath('/news', currentLang)} className="btn btn--primary inline-flex items-center gap-2">
            <ArrowLeft size={18} />
            {t('news:detail.backToNews', 'Back to News & Updates')}
          </Link>
        </div>
      </div>
    )
  }

  const trans = getNewsTrans(article)
  const relatedNews = news.filter((n) => String(n.id) !== String(article.id)).slice(0, 3)

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div className="news-detail-page">
      <SEO
        title={`${trans.title} | Meki Batu News`}
        description={trans.desc}
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
              aria-label={t('news:detail.backToNews', 'Back to News & Updates')}
            >
              <ArrowLeft size={18} />
              <span>{t('news:detail.backToNews', 'Back to News & Updates')}</span>
            </button>

            <nav className="news-breadcrumbs" aria-label="Breadcrumb">
              <Link to={getLocalePath('/', currentLang)}>{t('common:nav.home', 'Home')}</Link>
              <span className="separator">/</span>
              <Link to={getLocalePath('/news', currentLang)}>{t('common:nav.news', 'News')}</Link>
              <span className="separator">/</span>
              <span className="current">{trans.category}</span>
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
              <span className="news-badge-pill">{trans.category}</span>
              <span className="news-meta-item">
                <Calendar size={15} />
                <time>{article.date}</time>
              </span>
              <span className="news-meta-item">
                <Clock size={15} />
                <span>{trans.readTime}</span>
              </span>
            </div>

            <h1 className="news-detail-title">{trans.title}</h1>

            {/* Author / Location Card Bar */}
            <div className="news-detail-author-bar">
              <div className="news-author-avatar">
                <User size={18} />
              </div>
              <div className="news-author-info">
                <span className="news-author-name">{trans.author}</span>
                <span className="news-author-location">
                  <MapPin size={13} />
                  <span>{trans.location}</span>
                </span>
              </div>

              <div className="news-header-share">
                <button
                  type="button"
                  className="btn news-share-btn"
                  onClick={handleShare}
                  aria-label={t('news:detail.shareAria', 'Share article')}
                >
                  {copied ? <Check size={16} className="text-success" /> : <Share2 size={16} />}
                  <span>{copied ? t('news:labels.copied', 'Link Copied!') : t('news:labels.share', 'Share Article')}</span>
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
                alt={trans.title}
                className="news-detail-banner-img"
              />
              <figcaption className="news-detail-banner-caption">
                {trans.title} — {t('news:detail.captionSuffix', 'Meki Batu Farmers Cooperative Union Field Report')}
              </figcaption>
            </Reveal>
          )}

          {/* Article Main Body Content */}
          <Reveal delay={150} className="news-detail-body">
            {/* Lead Synopsis */}
            {trans.desc && (
              <p className="news-detail-lead">
                {trans.desc}
              </p>
            )}

            {/* Key Highlights Callout Box if present */}
            {Array.isArray(trans.highlights) && trans.highlights.length > 0 && (
              <div className="news-detail-highlights-box">
                <h2 className="news-highlights-title">
                  <Sparkles size={18} />
                  <span>{t('news:detail.highlightsTitle', 'Key Report Highlights & Insights')}</span>
                </h2>
                <ul className="news-highlights-list">
                  {trans.highlights.map((item, idx) => (
                    <li key={idx}>
                      <span className="bullet-icon">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Full Paragraphs */}
            {trans.fullContent.map((para, i) => (
              <p key={i} className="news-paragraph">
                {para}
              </p>
            ))}

            {/* Pull Quote Box */}
            <blockquote className="news-detail-quote">
              <p>
                "{t('news:detail.quoteText', 'Empowering smallholder farmers through collective bargaining, modern technology, and direct market access is at the core of our union’s mission.')}"
              </p>
              <cite>— {t('news:detail.quoteAuthor', 'Leadership Team, Meki Batu Union')}</cite>
            </blockquote>
          </Reveal>

          {/* Footer Sharing & Actions */}
          <div className="news-detail-footer-bar">
            <div className="news-footer-left">
              <span className="font-semibold text-sm">{t('news:detail.shareThis', 'Share this update:')}</span>
              <button
                type="button"
                className="btn news-share-btn"
                onClick={handleShare}
              >
                {copied ? <Check size={16} className="text-success" /> : <Share2 size={16} />}
                <span>{copied ? t('news:labels.copied', 'Link Copied!') : t('news:labels.copyLink', 'Copy Link')}</span>
              </button>
            </div>

            <button
              onClick={() => navigate(getLocalePath('/news', currentLang))}
              className="btn btn--primary btn--sm inline-flex items-center gap-2"
            >
              <BookOpen size={16} />
              <span>{t('news:detail.backToAll', 'Back to All News')}</span>
            </button>
          </div>
        </div>
      </article>

      <SectionDivider />

      {/* Related Articles Section */}
      {relatedNews.length > 0 && (
        <section className="section related-news-section">
          <div className="container">
            <div className="section-header text-center mb-10">
              <h2 className="section-title">{t('news:detail.relatedTitle', 'More Updates & Field Stories')}</h2>
              <p className="section-desc">{t('news:detail.relatedDesc', 'Stay informed with the latest developments from Meki Batu Cooperative Union.')}</p>
            </div>

            <div className="news-standard-grid">
              {relatedNews.map((relArticle, i) => {
                const relTrans = getNewsTrans(relArticle)
                return (
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
                          alt={relTrans.title}
                          className="news-article-card__img"
                        />
                      </div>
                      <div className="news-article-card__body">
                        <div className="news-article-card__meta">
                          <span className="news-badge-pill">{relTrans.category}</span>
                          <time className="news-date-text">{relArticle.date}</time>
                        </div>
                        <h3 className="news-article-card__title">{relTrans.title}</h3>
                        <p className="news-article-card__desc">{relTrans.desc}</p>
                        <div className="news-article-card__cta">
                          <span>{t('news:labels.readReport', 'Read Report')}</span>
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
