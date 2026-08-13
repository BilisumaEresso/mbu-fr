import { useState } from 'react'
import './InnerPage.css'

const NEWS_ARTICLES = [
  {
    id: 1,
    title: 'Record Yields Anticipated for the 2024 Coffee Harvest Season',
    category: 'Harvest Report',
    categoryType: 'primary',
    date: 'Oct 15, 2024',
    desc: "Early reports from across our cooperative network indicate unprecedented yields and exceptional quality profiles for this year's harvest, driven by favorable weather conditions and improved sustainable farming practices implemented earlier this year.",
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpEFNVcIs2oLNCuJ7GC_KEoXXnc0wWpZ8jy4Y74fphvC9uWUF-oqI_3JVFQjuBbVe8_Q2q-OM0yFt-8GLxuUkXuZ2Db_LmZaeypiYYYO2Af4YdfIevMqHKQchJPwQjENulFOqCGxCxXTYa-pjkQyZY05ZXCioCWaOOOOETtKCyB-OrIcW2eKrK7l6sG9FYW2Jbh3feadYvTaBIQOGLTJ_-9lzxFvI9VoOmDir6UlBvmTOv6ZF2BY3H',
    featuredLarge: true,
  },
  {
    id: 2,
    title: 'Annual Cooperative Members Summit Concludes',
    category: 'Community',
    categoryType: 'secondary',
    date: 'Oct 12, 2024',
    desc: 'Over 500 cooperative leaders gathered to discuss strategic initiatives, resource allocation, and market projections for the upcoming fiscal year.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANgkMR3H3UeImqwTsZtaBg4QuSxb-0QiNaU7NbZ0HkjV7EF04UtYvN9Tjjr_Q1eyxHP0qYKgRqzQg_MATDSILPcIVSkj5JV6m4H_a_ewCbD4A25qdqK0xA8jNfgsEWg2zTMjw7fPdCO7j6Th1eaMaI8FQIMkC8T8Oi5E1fJ6tWUx_ntRFSi_UuD8vjvB3_KY03flYVY8dM193YWXdxKFf3T_W9EUwceRMywJXtnuT-2TPgMF_vF9cQ',
    featuredSmall: true,
  },
  {
    id: 3,
    title: 'New Trade Agreement Secured with European Buyers',
    category: 'Export Update',
    categoryType: 'primary',
    date: 'Oct 05, 2024',
    desc: 'Meki Batu Union is proud to announce a long-term partnership expanding our premium grade export volume to Scandinavian markets.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5MPkPV9sJhCbz--XDfHP8SLqoUPBkhbH1fEacPv8uZYX1oGVaeB9gHPZ0GwfmlM-oOAb9vqndErx7SdL2GnKTMI2Nw7u6eTAJXv-BnDwnLnRYZIdNO0bbUCs3CtjC7BUmQNEJUsMnmJ2zqZJXEKfArKNEtPUfHTZpgWsJUtwc-33BV3FhFlRhE9mNbDu47AgmVz-9B086v1p585s_8_F7nZsv39Kta54abh3V3IxyM14tJgx9fNfa',
  },
  {
    id: 4,
    title: 'Expansion of Central Processing Facility Completed',
    category: 'Infrastructure',
    categoryType: 'primary',
    date: 'Sep 28, 2024',
    desc: 'The newly upgraded facility increases our processing capacity by 30%, ensuring faster turnaround times and improved quality control during peak season.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEOlyEcz7X6gCmCnsAQytSPD874chO0YwIzsGSJpkUdf6FED-GGrCsJMMga5DoqefZA6kqs8TynJBqNjT0ptPpB3a9bhxc2UWIXmKfrgMNDg55QxImjhhRAr_RqSCxpbFa1zoQMewr0guyBKLtoHeMVwt73pY3DgrdE6KEx5Uam3a9PHGdanIYd7b1sHi8-CT1D7bYMbmztCSH3qVQHIIUtESmFs9uY1fU9VrYgot-FZUauQK9sUHD',
  },
  {
    id: 5,
    title: 'Launch of the Women in Agriculture Initiative',
    category: 'Sustainability',
    categoryType: 'secondary',
    date: 'Sep 20, 2024',
    desc: 'A new seed-funding program designed to empower female cooperative members with micro-loans and specialized agronomy training.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZGCY0F_0ZtPyoL_qhAWsHn6s6RxVvNWF-jaf9V-b4dvhwwvhKt5jTNhTK8R4hFEm-rsfTumqiyMKFjzrDMhBaCsmpb_3cRcfCjvFoWwdd_eTA6LyMfsuvQ25usqT4rN8d7mf-WhDHZvYUY7yLWWQZ7fBqQmPvZV30tfI7Q2E3UtdBoonijHC1_P7ZNOVMWB57pUoBL23hS8BwTppNkzb3IF-yhrVq5KZyuv6Fu8Y-NRGsBzdjCf2Q',
  },
  {
    id: 6,
    title: 'GlobalG.A.P Renewal Achieved Across 14 Cooperatives',
    category: 'Certification',
    categoryType: 'primary',
    date: 'Sep 15, 2024',
    desc: 'Our commitment to sustainable and safe agricultural practices has been recognized with the successful renewal of key international certifications.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDprjzSUOEWY_JmeGkFxZEWzs4g45wjzpGWaD8qzFz05AzQDDsJACCE9SraiQUt-gEaHC0RODXqWsdW_UzqEpSaXLRK3AFypPGndCyQ1FRUjwGsfAMoQiBQxc_HaJuveTJLg8iSAFLC3Jg1ACVwLF0nF-0Y5D3qJ0aKvhbCC9qnxpPRD9oRzzoxzeBCl2eidDDszmHNOUfAe_jjIGth_W4svs0MiY2bEnjSo1hKzWIBDZsFrhTwlhuj',
  },
]

function News() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activePage, setActivePage] = useState(1)

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

  return (
    <div className="news-page-container">
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
            <article className="news-article-card news-article-card--large">
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
            <article className="news-article-card news-article-card--small">
              <div className="news-article-card__media news-article-card__media--small">
                <img
                  src={featuredSmall.img}
                  alt={featuredSmall.title}
                  className="news-article-card__img"
                />
              </div>
              <div className="news-article-card__body">
                <div className="news-article-card__meta">
                  <span className="label-caps label-caps--secondary">
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
              </div>
            </article>
          </section>
        )}

        {/* Standard Grid Row (3 columns grid: Card 3, 4, 5 in Row 2, Card 6 in Row 3) */}
        <section className="news-standard-grid">
          {gridArticles.map((article) => (
            <article key={article.id} className="news-article-card news-article-card--grid">
              <div className="news-article-card__media news-article-card__media--small">
                <img
                  src={article.img}
                  alt={article.title}
                  className="news-article-card__img"
                />
              </div>
              <div className="news-article-card__body">
                <div className="news-article-card__meta">
                  <span
                    className={
                      article.categoryType === 'secondary'
                        ? 'label-caps label-caps--secondary'
                        : 'label-caps label-caps--primary'
                    }
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
    </div>
  )
}

export default News
