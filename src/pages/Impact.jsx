import './InnerPage.css'

const REPORTS = [
  {
    id: 1,
    title: 'Annual Impact Report 2023',
    desc: 'Comprehensive overview of operational output and community initiatives.',
    link: '#',
  },
  {
    id: 2,
    title: 'GlobalG.A.P Certification Document',
    desc: 'Official validation of safe and sustainable agricultural practices.',
    link: '#',
  },
  {
    id: 3,
    title: 'Financial Transparency Review Q4',
    desc: 'Detailed financial breakdown and cooperative dividend distribution.',
    link: '#',
  },
]

function Impact() {
  return (
    <>
      {/* ---- Hero Section ---- */}
      <section className="impact-hero section">
        <div className="container impact-hero__grid">
          <div className="impact-hero__content">
            <h1 className="impact-hero__title">
              Cultivating Growth, Sustaining Communities
            </h1>
            <p className="impact-hero__desc">
              Our impact extends beyond agricultural output. We are dedicated to empowering farmers, fostering sustainable practices, and driving economic resilience across the Great Rift Valley.
            </p>
          </div>
          <div className="impact-hero__media">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuARKpjZhHgYJvocHwFGgS3of9YIH6JY43l-urwLuHS27ls4iL3KBxMHc_Mn4abkAfwsPQP2FJo1qbOoYkJQYMQI7PUMIFFCkLtm168OJDIW81zVwmt96qdii-I4bZnqe-Gl8zbZU-ZPCwAQVUtOOAv-WkP2LmmAP_kF47FADb5YPWrc3s9_IUl9DRfeOHbSb_2ffCpNYhHDmLso9jW9dvzmDCgYBdemNnmqHbd88Uq7nfceAYHbp2oq"
              alt="Vibrant thriving agricultural field in Ethiopia during golden hour"
              className="impact-hero__img"
            />
          </div>
        </div>
      </section>

      {/* ---- Measurable Impact Bento Grid ---- */}
      <section className="impact-metrics section section--alt">
        <div className="container">
          <div className="impact-metrics__header">
            <h2 className="impact-metrics__title">Measurable Impact</h2>
            <p className="impact-metrics__desc">
              Key performance indicators reflecting our commitment to the cooperative network.
            </p>
          </div>

          <div className="impact-metrics__grid">
            {/* Metric 1 */}
            <div className="impact-card">
              <span className="impact-card__number impact-card__number--secondary">50k+</span>
              <span className="label-caps label-caps--muted">Tonnes Exported</span>
            </div>

            {/* Metric 2 */}
            <div className="impact-card impact-card--primary impact-card--wide">
              <span className="impact-card__number text-white">140+</span>
              <span className="label-caps label-caps--tint">Member Cooperatives</span>
            </div>

            {/* Metric 3 */}
            <div className="impact-card">
              <span className="impact-card__number impact-card__number--secondary">12</span>
              <span className="label-caps label-caps--muted">Districts Served</span>
            </div>

            {/* Metric 4 Visual */}
            <div className="impact-card impact-card--media impact-card--wide">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnaL5e2415LzDfdyXYCg0LgkGi0wUmcUIciD17ILuL_bIekXnojLwQag29sHuHPkoOBmMEHKVDejEr6Ne9h6goQX5-suygemAIBDja4pYXFVDCmQ01SnoZEoLC0Dirq6rrNMnsf4Vuv9Qt5kcTi-CweNSnkyfnuISQAFXyidymBFmUsuW6IOnWrg5QBrdCp_eIvZ6L0gtDQOp9s6jZfK0kYVFkPD2oCrPwI19oZr0VM7YKVX1NYUq-"
                alt="Farmer hands holding organic produce"
                className="impact-card__img"
              />
            </div>

            {/* Metric 5 */}
            <div className="impact-card impact-card--wide">
              <h3 className="impact-card__title">Empowering Women in Agriculture</h3>
              <div className="impact-card__stat-row">
                <span className="impact-card__number impact-card__number--secondary">35%</span>
                <span className="impact-card__stat-label">of cooperative leadership</span>
              </div>
              <p className="impact-card__desc">
                Active initiatives to increase female participation in decision-making roles and agricultural training programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Reports & Documentation Section ---- */}
      <section className="impact-reports section">
        <div className="container impact-reports__grid">
          <div className="impact-reports__sidebar">
            <h2 className="impact-reports__title">Reports &amp; Documentation</h2>
            <p className="impact-reports__desc">
              Access our annual performance reviews, sustainability reports, and official certifications validating our global export standards.
            </p>
          </div>
          <div className="impact-reports__list">
            {REPORTS.map((r) => (
              <div key={r.id} className="impact-report-item">
                <div>
                  <h4 className="impact-report-item__title">{r.title}</h4>
                  <p className="impact-report-item__desc">{r.desc}</p>
                </div>
                <a href={r.link} className="impact-report-item__download">
                  <span className="label-caps label-caps--secondary">Download PDF</span>
                  <span className="material-symbols-outlined text-sm">download</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Impact
