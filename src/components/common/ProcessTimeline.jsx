import Reveal from './Reveal.jsx'
import './ProcessTimeline.css'

const DEFAULT_STEPS = [
  {
    number: '01',
    phase: 'Stage 01 • Origin',
    location: 'Dugda & Adami Tulu Woredas',
    icon: 'agriculture',
    title: 'Harvest at the Source',
    tag: '140+ Primary Co-ops',
    description:
      'Our journey begins in the fertile Rift Valley basin. Over 8,000 dedicated smallholder farmers harvest produce at peak physiological maturity under sustainable, GlobalG.A.P-aligned agricultural practices, backed by guaranteed fair farm-gate pricing.',
    highlights: [
      '140+ Member Primary Cooperatives',
      'Direct smallholder empowerment',
      'Sustainable drip & river-fed irrigation',
    ],
    stat: { value: '8,000+', label: 'Growers Empowered' },
  },
  {
    number: '02',
    phase: 'Stage 02 • Quality & Safety',
    location: 'Central QA Inspection Center',
    icon: 'verified',
    title: 'Grading & Quality Control',
    tag: 'GlobalG.A.P Certified',
    description:
      'Within hours of harvest, raw produce undergoes rigorous intake inspection. Certified quality specialists sort, calibrate, and conduct chemical residue testing to verify strict compliance with European and domestic food safety standards.',
    highlights: [
      'Multi-tier size & grade calibration',
      'Zero-tolerance chemical residue testing',
      'Traceability batch coding from farm gate',
    ],
    stat: { value: '100%', label: 'Quality Inspected' },
  },
  {
    number: '03',
    phase: 'Stage 03 • Cold Aggregation',
    location: 'Meki-Batu Packhouse Hub',
    icon: 'inventory_2',
    title: 'Consolidation & Cold Staging',
    tag: 'High-Volume Aggregation',
    description:
      'Volumes from across member co-ops are consolidated at our central packhouse. High-efficiency precooling rooms rapidly remove field heat, stabilizing produce texture and locking in nutritional value before final packing and dispatch.',
    highlights: [
      'Custom ventilated export cartons',
      'Rapid precooling to preserve shelf life',
      'Real-time digital lot management',
    ],
    stat: { value: 'Cold-Chain', label: 'Field Heat Removed' },
  },
  {
    number: '04',
    phase: 'Stage 04 • Fulfillment',
    location: 'Addis Ababa & Global Export Ports',
    icon: 'local_shipping',
    title: 'Cold-Chain Delivery & Export',
    tag: 'Domestic & European Markets',
    description:
      'Consignments are loaded into refrigerated transport for rapid delivery. Fresh produce supplies our five dedicated retail outlets across Addis Ababa, key institutional partners, and scheduled air freight direct to European importers.',
    highlights: [
      '5 Dedicated retail stores in Addis Ababa',
      'Direct European air freight connections',
      'Unbroken freshness from farm to table',
    ],
    stat: { value: '< 24-48h', label: 'Farm-to-Market Window' },
  },
]

const stagger = (i) => Math.min(i * 120, 600)

function ProcessTimeline({
  title = 'From Rift Valley Farms to Global Tables',
  subtitle = 'Follow the complete journey of our fresh produce — an unbroken chain of smallholder empowerment, certified quality control, and cold-chain logistics.',
  steps = DEFAULT_STEPS,
  className = '',
  compact = false,
  header = null,
}) {
  if (!steps || steps.length === 0) return null

  return (
    <section
      className={`process-timeline section section--alt${compact ? ' process-timeline--compact' : ''} ${className}`.trim()}
      aria-label="Supply Chain Process"
    >
      <div className="container">
        {compact ? (
          header
        ) : (
          <Reveal className="process-timeline__header">
            <div className="process-timeline__badge-wrap">
              <span className="label-caps label-caps--secondary">
                End-to-End Story
              </span>
              <span className="process-timeline__flow-indicator">
                <span className="process-timeline__pulse-dot" />
                Farm to Market Flow
              </span>
            </div>
            <h2 className="process-timeline__title">{title}</h2>
            {subtitle && <p className="process-timeline__desc">{subtitle}</p>}
          </Reveal>
        )}

        <div className="process-timeline__wrapper">
          {/* Vertical Storytelling Spine */}
          <div className="process-timeline__track" aria-hidden="true">
            <div className="process-timeline__track-line" />
            <div className="process-timeline__track-start">
              <span className="material-symbols-outlined">psychiatry</span>
            </div>
            <div className="process-timeline__track-end">
              <span className="material-symbols-outlined">flag</span>
            </div>
          </div>

          <div className="process-timeline__stream">
            {steps.map((step, index) => {
              const isEven = index % 2 === 1
              const stepNumber = step.number || `0${index + 1}`

              return (
                <div
                  key={step.title || index}
                  className={`process-timeline__row ${isEven ? 'process-timeline__row--even' : 'process-timeline__row--odd'}`}
                >
                  {/* Central Timeline Milestone Node */}
                  <div className="process-timeline__milestone" aria-hidden="true">
                    <div className="process-timeline__node-halo" />
                    <div className="process-timeline__circle">
                      {step.icon ? (
                        <span className="material-symbols-outlined process-timeline__icon">
                          {step.icon}
                        </span>
                      ) : (
                        <span className="process-timeline__circle-num">{stepNumber}</span>
                      )}
                    </div>
                    <span className="process-timeline__node-label">
                      {stepNumber}
                    </span>
                  </div>

                  {/* Horizontal Connector Branch */}
                  <div className="process-timeline__branch" aria-hidden="true">
                    <div className="process-timeline__branch-dot" />
                  </div>

                  {/* Storytelling Card */}
                  <Reveal
                    delay={stagger(index)}
                    className="process-timeline__card-col"
                  >
                    <article className="process-timeline__card">
                      {/* Watermark Step Number */}
                      <span className="process-timeline__backdrop-num" aria-hidden="true">
                        {stepNumber}
                      </span>

                      {/* Header Eyebrow: Phase & Location */}
                      <div className="process-timeline__card-header">
                        <div className="process-timeline__phase-info">
                          <span className="process-timeline__step-badge">
                            {step.phase || `Step ${stepNumber}`}
                          </span>
                          {step.location && (
                            <span className="process-timeline__location">
                              <span className="material-symbols-outlined">location_on</span>
                              {step.location}
                            </span>
                          )}
                        </div>

                        {step.tag && (
                          <span className="process-timeline__tag">
                            {step.tag}
                          </span>
                        )}
                      </div>

                      {/* Main Title & Narrative */}
                      <h3 className="process-timeline__step-title">{step.title}</h3>
                      <p className="process-timeline__step-desc">{step.description}</p>

                      {/* Highlights / Proof points list */}
                      {Array.isArray(step.highlights) && step.highlights.length > 0 && (
                        <ul className="process-timeline__highlights" aria-label="Key Highlights">
                          {step.highlights.map((highlight, hIdx) => (
                            <li key={hIdx} className="process-timeline__highlight-item">
                              <span className="material-symbols-outlined process-timeline__highlight-icon">
                                check_circle
                              </span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Stat callout footer */}
                      {step.stat && (
                        <div className="process-timeline__card-footer">
                          <div className="process-timeline__stat-pill">
                            <span className="process-timeline__stat-val">{step.stat.value}</span>
                            <span className="process-timeline__stat-lbl">{step.stat.label}</span>
                          </div>
                        </div>
                      )}
                    </article>
                  </Reveal>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessTimeline

