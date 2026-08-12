import PageHero from '../components/common/PageHero.jsx'
import { outlets } from '../data/outlets.js'
import './InnerPage.css'

function RetailOutlets() {
  return (
    <>
      <PageHero
        eyebrow="Retail outlets"
        title="Find us in Addis Ababa"
        description="Meki Batu Union produce is available at five retail outlets across the city."
      />

      <section className="section">
        <div className="container">
          <div className="img-placeholder" style={{ height: 320, marginBottom: 'var(--space-8)' }}>
            Map — Addis Ababa outlet locations
          </div>

          <ul className="outlet-list">
            {outlets.map((o) => (
              <li key={o.id} className="outlet-card">
                <div>
                  <p className="outlet-card__name">{o.name}</p>
                  <p className="outlet-card__meta">{o.address}</p>
                </div>
                <p className="outlet-card__meta">{o.hours}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default RetailOutlets
