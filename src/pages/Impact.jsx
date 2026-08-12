import PageHero from '../components/common/PageHero.jsx'
import StatCard from '../components/common/StatCard.jsx'
import './InnerPage.css'

const IMPACT_STATS = [
  { value: '140+', label: 'Primary cooperatives' },
  { value: '527→', label: 'Founding members (2002)' },
  { value: '50,000t', label: 'Sold per year' },
  { value: '2', label: 'Districts served' },
]

const DOCS = [
  { title: 'GlobalG.A.P Certificate', type: 'PDF' },
  { title: 'Annual Impact Summary', type: 'PDF' },
  { title: 'Cooperative Bylaws', type: 'PDF' },
]

function Impact() {
  return (
    <>
      <PageHero
        eyebrow="Impact & reports"
        title="Two decades of measurable impact"
        description="From 527 founding members to a union of 140+ cooperatives moving over 50,000 tonnes a year."
      />

      <section className="section">
        <div className="container stat-block-grid">
          {IMPACT_STATS.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Documents</span>
            <h2>Certificates & reports</h2>
          </div>
          <ul className="outlet-list">
            {DOCS.map((doc) => (
              <li key={doc.title} className="outlet-card">
                <p className="outlet-card__name">{doc.title}</p>
                <span className="outlet-card__meta">{doc.type} — link coming soon</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default Impact
