import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import newsHeroImg from '../assets/images/newsHero.png'
import farmerMembershipImg from '../assets/images/FarmerMembership.jpg'
import buyerHeroImg from '../assets/images/buyerHero.jpg'
import farmerHeroImg from '../assets/images/farmerHero.png'
import womenFarmerImg from '../assets/images/womenFarmer.jpg'
import aboutHeroFarmImg from '../assets/images/about_hero_farm.webp'
import './InnerPage.css'

const NEWS_ARTICLES = [
  {
    id: 1,
    title: 'Record Yields Anticipated for the 2024 Coffee Harvest Season',
    category: 'Harvest Report',
    categoryType: 'primary',
    date: 'Oct 15, 2024',
    author: 'Meki Batu Agronomy Team',
    readTime: '4 min read',
    location: 'Meki, Oromia Region',
    desc: "Early reports from across our cooperative network indicate unprecedented yields and exceptional quality profiles for this year's harvest, driven by favorable weather conditions and improved sustainable farming practices implemented earlier this year.",
    fullContent: [
      "The 2024 harvest season is shaping up to be one of the most prolific in Meki Batu Union's history. Early field audits across our 140+ primary member cooperatives indicate a 28% increase in overall crop yield compared to the previous fiscal year.",
      "Favorable rainfall patterns across the Great Rift Valley, paired with modern drip irrigation systems introduced through our union mechanization program, have created optimal growing conditions for both coffee and fresh horticulture crops.",
      "Furthermore, over 12,000 member farmers completed GlobalG.A.P soil management and organic fertilization workshops earlier this spring. This emphasis on soil health has not only boosted output volume but also elevated crop grade metrics across all major export commodities.",
      "Our central packhouses in Meki are currently operating at peak efficiency to process, grade, and package incoming harvests for immediate domestic distribution and international shipment to European trade partners."
    ],
    highlights: [
      '28% overall yield increase verified across member cooperatives',
      'Over 12,000 farmers trained in sustainable soil management',
      'Expanded cold-chain logistics operational for peak season export'
    ],
    img: newsHeroImg,
    featuredLarge: true,
  },
  {
    id: 2,
    title: 'Annual Cooperative Members Summit Concludes',
    category: 'Community',
    categoryType: 'secondary',
    date: 'Oct 12, 2024',
    author: 'Cooperative Governance Board',
    readTime: '3 min read',
    location: 'Addis Ababa, Ethiopia',
    desc: 'Over 500 cooperative leaders gathered to discuss strategic initiatives, resource allocation, and market projections for the upcoming fiscal year.',
    fullContent: [
      "The 2024 Meki Batu Union Annual General Assembly brought together over 500 delegates representing 140+ primary agricultural cooperatives across East Shewa Zone.",
      "Key topics addressed during the three-day summit included dividend distribution protocols, bulk seed purchasing programs, and the adoption of modern agricultural technology.",
      "Delegates unanimously approved a new capital reinvestment plan allocating 15% of annual net revenue toward expanding regional storage warehouses and farmer micro-loan funds."
    ],
    highlights: [
      'Over 500 primary cooperative leaders attended',
      '15% capital reinvestment plan approved for storage & infrastructure',
      'Unanimous agreement on dividend distribution framework'
    ],
    img: farmerMembershipImg,
    featuredSmall: true,
  },
  {
    id: 3,
    title: 'New Trade Agreement Secured with European Buyers',
    category: 'Export Update',
    categoryType: 'primary',
    date: 'Oct 05, 2024',
    author: 'Global Export Operations',
    readTime: '5 min read',
    location: 'Frankfurt & Meki',
    desc: 'Meki Batu Union is proud to announce a long-term partnership expanding our premium grade export volume to Scandinavian markets.',
    fullContent: [
      "Meki Batu Union has formally signed a multi-year supply agreement with major European fresh produce importers, guaranteeing direct trade access for our cooperative farmers.",
      "The agreement covers seasonal shipments of high-grade red tomatoes, green beans, and papaya cultivated strictly under GlobalG.A.P certified protocols.",
      "This partnership reinforces fair trade pricing, providing member farmers with guaranteed minimum price floors above volatile spot market rates."
    ],
    highlights: [
      'Multi-year export contract signed with European import partners',
      'Guaranteed price floors protecting smallholder farmer incomes',
      '100% compliant with international food safety certifications'
    ],
    img: buyerHeroImg,
  },
  {
    id: 4,
    title: 'Expansion of Central Processing Facility Completed',
    category: 'Infrastructure',
    categoryType: 'primary',
    date: 'Sep 28, 2024',
    author: 'Engineering & Logistics',
    readTime: '4 min read',
    location: 'Meki Packhouse Hub',
    desc: 'The newly upgraded facility increases our processing capacity by 30%, ensuring faster turnaround times and improved quality control during peak season.',
    fullContent: [
      "Construction and calibration of our upgraded 3,500 square meter central packing and sorting facility in Meki Town has been successfully finalized.",
      "Equipped with automated optical sorting lines and temperature-controlled pre-cooling chambers, the facility can now process up to 150 metric tonnes of produce daily.",
      "The upgrade reduces post-harvest handling loss by an estimated 18%, preserving freshness from harvest field to export vessel."
    ],
    highlights: [
      '30% increase in daily sorting and washing throughput',
      '18% reduction in post-harvest spoilage loss',
      'Integrated cold storage chambers ensuring continuous freshness'
    ],
    img: farmerHeroImg,
  },
  {
    id: 5,
    title: 'Launch of the Women in Agriculture Initiative',
    category: 'Sustainability',
    categoryType: 'secondary',
    date: 'Sep 20, 2024',
    author: 'Social Impact Committee',
    readTime: '3 min read',
    location: 'Oromia Region',
    desc: 'A new seed-funding program designed to empower female cooperative members with micro-loans and specialized agronomy training.',
    fullContent: [
      "Meki Batu Union is proud to unveil the Women in Agriculture Empowerment Program, created to foster gender equity and financial independence among female farmers.",
      "The initiative provides tailored micro-financing packages for greenhouse farming, high-yield seed varieties, and modern irrigation tools.",
      "In addition to financial backing, participants receive hands-on agronomy mentorship and leadership training to support female representation on primary cooperative boards."
    ],
    highlights: [
      'Micro-finance seed funding granted to 250 female farmers',
      'Specialized agronomic and business management training',
      'Promotes female leadership across local primary co-op boards'
    ],
    img: womenFarmerImg,
  },
  {
    id: 6,
    title: 'GlobalG.A.P Renewal Achieved Across 14 Cooperatives',
    category: 'Certification',
    categoryType: 'primary',
    date: 'Sep 15, 2024',
    author: 'Quality Assurance Directorate',
    readTime: '4 min read',
    location: 'Audit Center, Meki',
    desc: 'Our commitment to sustainable and safe agricultural practices has been recognized with the successful renewal of key international certifications.',
    fullContent: [
      "Following rigorous independent third-party audits, Meki Batu Union has officially renewed its GlobalG.A.P (Good Agricultural Practices) certification for the 2024-2025 season.",
      "The certification validates strict compliance with international food safety, chemical residue limits, environmental conservation, and worker welfare standards.",
      "This benchmark allows our produce to be seamlessly accepted by premium supermarket chains across Europe, the Middle East, and Asia."
    ],
    highlights: [
      '100% compliance score across international safety standards',
      'Third-party audit verified traceably from farm to export port',
      'Opens premium international supermarket supply channels'
    ],
    img: aboutHeroFarmImg,
  },
]

function News() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activePage, setActivePage] = useState(1)
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [copiedLink, setCopiedLink] = useState(false)

  const filteredNews = NEWS_ARTICLES.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="container">
        {/* Header Section */}
        <header className="news-page-header">
          <div className="news-page-header__left">
            <span className="label-caps label-caps--primary block mb-2">
              Updates &amp; Announcements
            </span>
            <h1 className="news-page-header__title">News &amp; Updates</h1>
            <p className="news-page-header__desc">
              Stay informed with the latest reports on harvests, community initiatives, and global partnerships from Meki Batu Union.
            </p>
          </div>
          <div className="news-page-header__right">
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
          </div>
        </header>

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

