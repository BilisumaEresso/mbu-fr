import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageHero from '../components/common/PageHero.jsx'
import SectionDivider from '../components/common/SectionDivider.jsx'
import { news } from '../data/news.js'
import './InnerPage.css'
import './News.css'

function News() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activePage, setActivePage] = useState(1)
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [copiedLink, setCopiedLink] = useState(false)

  const filteredNews = news.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.desc && item.desc.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const featuredLarge = filteredNews.find((n) => n.featuredLarge) || filteredNews[0]
  const featuredSmall = filteredNews.find((n) => n.featuredSmall) || filteredNews[1]
  const gridArticles = filteredNews.filter(
    (n) => n.id !== featuredLarge?.id && n.id !== featuredSmall?.id
  )

  function handleCopyLink() {
    navigator.clipboard?.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  return (
    <div className="news-page-container">
      <Helmet>
        <title>News &amp; Updates | Meki Batu Union</title>
        <meta
          name="description"
          content="Read the latest updates on harvest forecasts, trade agreements, community initiatives, and infrastructure upgrades from Meki Batu Union."
        />
      </Helmet>
      <PageHero
        eyebrow="Updates & Announcements"
        title="News & Updates"
        description="Stay informed with the latest reports on harvests, community initiatives, and global partnerships from Meki Batu Union."
        rightContent={
          <div className="news-search-box">
            <input
              type="text"
              placeholder="Search news..."
              className="news-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="material-symbols-outlined news-search-icon">search</span>
          </div>
        }
      />

      <SectionDivider />

      <div className="container" style={{ paddingTop: 'var(--space-6)' }}>

        {/* Top Featured Row (8-col + 4-col) */}
        {featuredLarge && featuredSmall && (
          <section className="news-featured-row">
            {/* Featured Large (8 cols) */}
            <article
              className="news-article-card news-article-card--large"
              onClick={() => setSelectedArticle(featuredLarge)}
            >
              <div className="news-article-card__media">
                <img
                  src={featuredLarge.img}
                  alt={featuredLarge.title}
                  className="news-article-card__img"
                />
              </div>
              <div className="news-article-card__body">
                <div className="news-article-card__meta">
                  <span className="news-badge-pill">
                    {featuredLarge.category}
                  </span>
                  <time className="news-date-text">{featuredLarge.date}</time>
                </div>
                <h2 className="news-article-card__title news-article-card__title--large">
                  {featuredLarge.title}
                </h2>
                <p className="news-article-card__desc">
                  {featuredLarge.desc}
                </p>
                <div className="news-article-card__cta">
                  Read Full Report <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </article>

            {/* Featured Small (4 cols) */}
            <article
              className="news-article-card news-article-card--small"
              onClick={() => setSelectedArticle(featuredSmall)}
            >
              <div className="news-article-card__media">
                <img
                  src={featuredSmall.img}
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
                <h2 className="news-article-card__title">
                  {featuredSmall.title}
                </h2>
                <p className="news-article-card__desc">
                  {featuredSmall.desc}
                </p>
                <div className="news-article-card__cta">
                  Read Article <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </article>
          </section>
        )}

        {/* Standard Grid Row */}
        <section className="news-standard-grid">
          {gridArticles.map((article) => (
            <article
              key={article.id}
              className="news-article-card news-article-card--grid"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="news-article-card__media">
                <img
                  src={article.img}
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
                <h3 className="news-article-card__title">
                  {article.title}
                </h3>
                <p className="news-article-card__desc">
                  {article.desc}
                </p>
                <div className="news-article-card__cta">
                  Read Article <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Pagination */}
        <nav className="news-pagination">
          <button className="news-pagination__btn" disabled>
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              type="button"
              className={`news-pagination__page ${activePage === page ? 'news-pagination__page--active' : ''}`}
              onClick={() => setActivePage(page)}
            >
              {page}
            </button>
          ))}
          <span className="news-pagination__ellipsis">...</span>
          <button
            type="button"
            className={`news-pagination__page ${activePage === 8 ? 'news-pagination__page--active' : ''}`}
            onClick={() => setActivePage(8)}
          >
            8
          </button>
          <button className="news-pagination__btn">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </nav>
      </div>

      {/* ---- Wide Open Article Reader Modal ---- */}
      {selectedArticle && (
        <div className="news-modal-backdrop" onClick={() => setSelectedArticle(null)}>
          <div className="news-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="news-modal-close"
              onClick={() => setSelectedArticle(null)}
              aria-label="Close article modal"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="news-modal-meta-bar">
              <span className="news-badge-pill">{selectedArticle.category}</span>
              <span className="news-modal-meta-item">
                <span className="material-symbols-outlined text-xs">calendar_today</span>
                {selectedArticle.date}
              </span>
              {selectedArticle.readTime && (
                <span className="news-modal-meta-item">
                  <span className="material-symbols-outlined text-xs">schedule</span>
                  {selectedArticle.readTime}
                </span>
              )}
              {selectedArticle.location && (
                <span className="news-modal-meta-item">
                  <span className="material-symbols-outlined text-xs">location_on</span>
                  {selectedArticle.location}
                </span>
              )}
            </div>

            <h1 className="news-modal-title">{selectedArticle.title}</h1>

            {selectedArticle.author && (
              <div className="news-modal-author-bar">
                <span className="material-symbols-outlined text-sm">edit_note</span>
                <span>Published by <strong>{selectedArticle.author}</strong></span>
              </div>
            )}

            <div className="news-modal-media">
              <img
                src={selectedArticle.img}
                alt={selectedArticle.title}
                className="news-modal-img"
              />
            </div>

            {selectedArticle.highlights && selectedArticle.highlights.length > 0 && (
              <div className="news-modal-highlights">
                <div className="news-modal-highlights-title">
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  Key Takeaways
                </div>
                <ul className="news-modal-highlights-list">
                  {selectedArticle.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="news-modal-body-text">
              {selectedArticle.fullContent ? (
                selectedArticle.fullContent.map((p, idx) => <p key={idx}>{p}</p>)
              ) : (
                <p>{selectedArticle.desc}</p>
              )}
            </div>

            <div className="news-modal-footer">
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button
                  type="button"
                  className="btn btn--outline btn--sm"
                  onClick={handleCopyLink}
                >
                  <span className="material-symbols-outlined text-sm">share</span>
                  {copiedLink ? 'Link Copied!' : 'Share Article'}
                </button>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Link
                  to="/products"
                  className="btn btn--primary btn--sm"
                  onClick={() => setSelectedArticle(null)}
                >
                  Explore Our Products <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default News

