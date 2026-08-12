import PageHero from '../components/common/PageHero.jsx'
import './InnerPage.css'

const SERVICES = [
  { title: 'Input supply', desc: 'Access to seeds, fertilizer, and farm inputs at fair, negotiated prices.' },
  { title: 'Credit access', desc: 'Support connecting member cooperatives with credit facilities.' },
  { title: 'Market information', desc: 'Regular updates on prices and demand so members can plan and price fairly.' },
  { title: 'Mechanization support', desc: 'Access to shared machinery and maintenance services.' },
  { title: 'Training', desc: 'Technical and advisory training on production and post-harvest handling.' },
  { title: 'Consolidated selling', desc: 'The union aggregates and sells members\u2019 produce locally and abroad.' },
]

function Farmers() {
  return (
    <>
      <PageHero
        eyebrow="For farmers & members"
        title="Support built for primary cooperatives"
        description="From input supply to training and mechanization, Meki Batu Union exists to strengthen its 140+ member cooperatives."
      />

      <section className="section">
        <div className="container">
          <div className="feature-grid">
            {SERVICES.map((s) => (
              <div key={s.title} className="feature-card">
                <p className="feature-card__title">{s.title}</p>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container two-col">
          <div>
            <span className="eyebrow">How to join</span>
            <h2>Becoming a member cooperative</h2>
            <p>
              Primary cooperatives in the union's operating districts &mdash; Dugda woreda and Adami
              Tulu Jido Kombolcha &mdash; can apply to join the union. Reach out to our membership
              office to learn about eligibility and the application process.
            </p>
          </div>
          <div className="feature-card">
            <p className="feature-card__title">Member portal &mdash; coming soon</p>
            <p>
              A dedicated login for member cooperatives to submit produce volumes, track input
              orders, and view credit status is planned for a future phase of this site.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Farmers
