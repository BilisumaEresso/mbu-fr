import PageHero from '../components/common/PageHero.jsx'
import { news } from '../data/news.js'
import './InnerPage.css'
import './Home.css' // reuses .news-grid / .news-card

function News() {
  return (
    <>
      <PageHero
        eyebrow="News & updates"
        title="What's happening at the union"
      />

      <section className="section">
        <div className="container news-grid">
          {news.map((n) => (
            <article key={n.id} className="news-card">
              <div className="img-placeholder news-card__image">REPLACE WITH REAL PHOTO</div>
              <p className="news-card__date">
                {new Date(n.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
              <p className="news-card__title">{n.title}</p>
              <p>{n.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default News
