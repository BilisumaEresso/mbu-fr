import Reveal from './Reveal.jsx'
import './ProcessTimeline.css'

const DEFAULT_STEPS = [
  {
    number: '01',
    icon: 'eco',
    title: 'Harvest',
    tag: '140+ Primary Co-ops',
    description:
      'Member cooperatives harvest fruits and vegetables across 140+ primary cooperatives in Dugda woreda and Adami Tulu Jido Kombolcha.',
  },
  {
    number: '02',
    icon: 'verified',
    title: 'Grading & Quality Control',
    tag: 'GlobalG.A.P Certified',
    description:
      'Produce is sorted and graded to meet GlobalG.A.P certified quality and food safety standards.',
  },
  {
    number: '03',
    icon: 'inventory_2',
    title: 'Consolidation',
    tag: 'Domestic & Export',
    description:
      'The union consolidates volumes from member cooperatives for both domestic retail and export.',
  },
  {
    number: '04',
    icon: 'local_shipping',
    title: 'Delivery',
    tag: 'EU & Addis Ababa Outlets',
    description:
      'Produce reaches five retail outlets in Addis Ababa or is prepared for export to markets in Europe.',
  },
]

const stagger = (i) => Math.min(i * 90, 450)

function ProcessTimeline({
  title = 'How It Works',
  subtitle = 'Our end-to-end supply chain ensures quality, GlobalG.A.P compliance, and reliable delivery.',
  steps = DEFAULT_STEPS,
  className = '',
}) {
  if (!steps || steps.length === 0) return null

  return (
    <section className={`process-timeline section section--alt ${className}`.trim()}>
      <div className="container">
        <Reveal className="process-timeline__header">
          <span className="label-caps label-caps--secondary mb-2 block">Supply Chain Process</span>
          <h2 className="process-timeline__title">{title}</h2>
          {subtitle && <p className="process-timeline__desc">{subtitle}</p>}
        </Reveal>

        <div className="process-timeline__wrapper">
          {/* Connector Line between step nodes */}
          <div className="process-timeline__line" aria-hidden="true" />

          <div className="process-timeline__grid">
            {steps.map((step, index) => (
              <Reveal
                key={step.title}
                delay={stagger(index)}
                className="process-timeline__step"
              >
                {/* Node Circle */}
                <div className="process-timeline__node">
                  <div className="process-timeline__circle">
                    {step.icon ? (
                      <span className="material-symbols-outlined process-timeline__icon">
                        {step.icon}
                      </span>
                    ) : (
                      <span>{step.number || index + 1}</span>
                    )}
                  </div>
                  <span className="process-timeline__step-num desktop-only">
                    Step {step.number || `0${index + 1}`}
                  </span>
                </div>

                {/* Content Card */}
                <div className="process-timeline__card">
                  <div className="process-timeline__card-top">
                    <span className="process-timeline__step-badge">
                      Step {step.number || `0${index + 1}`}
                    </span>
                    {step.tag && (
                      <span className="process-timeline__tag">{step.tag}</span>
                    )}
                  </div>

                  <h3 className="process-timeline__step-title">{step.title}</h3>
                  <p className="process-timeline__step-desc">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessTimeline
