import Reveal from './Reveal.jsx'
import './ProcessTimeline.css'

const DEFAULT_STEPS = [
  {
    number: '01',
    phase: 'Stage 01 • Intake & Grading',
    location: 'Primary Co-ops to Pack House',
    icon: 'verified',
    title: 'Intake Inspection & Grading',
    tag: '153 Primary Co-ops',
    description:
      'Harvested produce arrives from 153 member primary cooperatives across 6 Rift Valley districts. Certified quality specialists immediately inspect, sort, and calibrate crops into precise export and domestic grades.',
    highlights: [
      '153 Member Primary Cooperatives',
      '8,410 Member Farmers',
      'Multi-tier size & grade calibration',
    ],
    stat: { value: '153', label: 'Primary Co-ops' },
  },
  {
    number: '02',
    phase: 'Stage 02 • Post-Harvest Handling',
    location: 'Meki Pack House Processing Center',
    icon: 'inventory_2',
    title: 'Pack House Processing',
    tag: 'Temperature Stabilization',
    description:
      'Volumes from member farmers undergo rapid pre-cooling and processing at our central pack house hub. Field heat is removed swiftly to lock in texture, nutritional value, and post-harvest freshness.',
    highlights: [
      'Rapid field-heat precooling',
      'Batch traceability from farm gate',
      'Stabilized cold aggregation',
    ],
    stat: { value: '600 ha', label: 'Member Irrigated Land' },
  },
  {
    number: '03',
    phase: 'Stage 03 • Hygiene & Safety',
    location: 'Sanitary Processing Line',
    icon: 'sanitizer',
    title: 'Sanitary Cleaning & QA',
    tag: 'GlobalG.A.P Certified',
    description:
      'Produce moves through dedicated sanitizing and washing lines adhering strictly to GlobalG.A.P food safety standards. Chemical residue verification and hygiene controls ensure full compliance with international protocols.',
    highlights: [
      'Zero-tolerance residue testing',
      'GlobalG.A.P food safety compliance',
      'Purified water washing lines',
    ],
    stat: { value: '100%', label: 'Safety Verified' },
  },
  {
    number: '04',
    phase: 'Stage 04 • Packaging & Dispatch',
    location: 'Addis Ababa Outlets & Global Export',
    icon: 'local_shipping',
    title: 'Packaging & Market Distribution',
    tag: 'Domestic & Export Fulfillment',
    description:
      'Graded and cleaned produce is packed into ventilated export cartons and loaded into temperature-controlled transport, supplying five Addis Ababa retail storefronts and international air freight shipments.',
    highlights: [
      '5 Addis Ababa retail storefronts',
      'Direct European export air freight',
      '50,000+ tonnes annual produce volume',
    ],
    stat: { value: '5 Outlets', label: 'Addis Ababa & Export' },
  },
]

const stagger = (i) => Math.min(i * 120, 600)

function ProcessTimeline({
  title = 'From Rift Valley Farms to Global Tables',
  subtitle = 'From 153 primary cooperatives through our central pack house to domestic consumers and global export markets.',
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

