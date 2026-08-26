import Reveal from './Reveal.jsx'
import './ProcessTimeline.css'

const DEFAULT_STEPS = [
  {
    number: '01',
    phase: 'Intake & Grading',
    location: 'Primary Co-ops',
    icon: 'verified',
    title: 'Intake & Calibration',
    tag: '135 Primary Co-ops',
    description:
      'Harvested produce arrives from 135 member cooperatives and is immediately inspected, sorted, and calibrated into export and domestic grades.',
    highlights: [
      '8,089 Member Farmers',
      'Multi-tier size & grade calibration',
    ],
    stat: { value: '135', label: 'Primary Co-ops' },
  },
  {
    number: '02',
    phase: 'Pre-Cooling & Pack House',
    location: 'Meki Central Hub',
    icon: 'inventory_2',
    title: 'Post-Harvest Precooling',
    tag: 'Rapid Cold Aggregation',
    description:
      'Swift pre-cooling removes field heat within hours of harvest, locking in nutritional value, firm texture, and extended post-harvest freshness.',
    highlights: [
      'Field-heat rapid removal',
      'Farm-gate batch traceability',
    ],
    stat: { value: '5,910 ha', label: 'Irrigated Land' },
  },
  {
    number: '03',
    phase: 'Hygiene & Quality Assurance',
    location: 'Certified Processing Line',
    icon: 'sanitizer',
    title: 'Sanitary Washing & QA',
    tag: 'GlobalG.A.P Certified',
    description:
      'Produce undergoes sanitized washing, residue testing, and rigorous QA inspection adhering strictly to GlobalG.A.P compliance.',
    highlights: [
      'Zero chemical residue testing',
      'Purified water washing lines',
    ],
    stat: { value: '100%', label: 'Food Safety Verified' },
  },
  {
    number: '04',
    phase: 'Packaging & Global Dispatch',
    location: 'Addis Ababa & Air Freight',
    icon: 'local_shipping',
    title: 'Cold Logistics & Export',
    tag: 'Direct Off-Taking',
    description:
      'Packed into ventilated export cartons and dispatched via refrigerated transport to 5 Addis retail outlets and international air freight.',
    highlights: [
      '5 Addis Ababa retail storefronts',
      'Direct European & airline export',
    ],
    stat: { value: '50k+ t', label: 'Annual Volume' },
  },
]

const stagger = (i) => Math.min(i * 70, 280)

function ProcessTimeline({
  title = 'From Rift Valley Farms to Global Tables',
  subtitle = 'A fully traceable 4-stage cold chain connecting 135 primary cooperatives to domestic consumers and international buyers.',
  steps = DEFAULT_STEPS,
  className = '',
  compact = false,
  header = null,
  id = 'process',
}) {
  if (!steps || steps.length === 0) return null

  return (
    <section
      id={id}
      className={`process-timeline section section--alt${compact ? ' process-timeline--compact' : ''} ${className}`.trim()}
      aria-label="Supply Chain Process"
    >
      <div className="container">
        {compact ? (
          header
        ) : (
          <Reveal className="process-timeline__header">
            <div className="process-timeline__badge-wrap">
              <div className="process-timeline__badge">
                <span className="process-timeline__badge-text">End-to-End Supply Chain</span>
                <span className="process-timeline__badge-sep" aria-hidden="true" />
                <span className="process-timeline__badge-flow">
                  <span className="material-symbols-outlined process-timeline__badge-icon">sync_alt</span>
                  <span>Farm to Market Flow</span>
                </span>
              </div>
            </div>
            <h2 className="process-timeline__title">{title}</h2>
            {subtitle && <p className="process-timeline__desc">{subtitle}</p>}
          </Reveal>
        )}

        {/* Mobile Swipe Hint */}
        <div className="process-timeline__swipe-hint mobile-only">
          <span className="material-symbols-outlined text-xs">swipe</span>
          <span>Swipe to explore 4-stage pipeline</span>
        </div>

        {/* 4-Step Pipeline Cards Grid */}
        <div className="process-timeline__pipeline">
          {steps.map((step, index) => {
            const stepNumber = step.number || `0${index + 1}`
            const isLast = index === steps.length - 1

            return (
              <Reveal
                key={step.title || index}
                delay={stagger(index)}
                className="process-timeline__step-col"
              >
                <article className="process-timeline__card">
                  {/* Connector line to next card on desktop */}
                  {!isLast && (
                    <div className="process-timeline__connector-line desktop-only" aria-hidden="true" />
                  )}

                  {/* Card Top: Step Number Badge & Stage Icon */}
                  <div className="process-timeline__card-top">
                    <div className="process-timeline__step-badge">
                      <span className="process-timeline__step-num">{stepNumber}</span>
                    </div>
                    <div className="process-timeline__icon-box">
                      <span className="material-symbols-outlined process-timeline__icon">
                        {step.icon || 'verified'}
                      </span>
                    </div>
                  </div>

                  {/* Stage Meta: Phase Name & Location */}
                  <div className="process-timeline__meta">
                    <span className="process-timeline__phase-tag">{step.phase}</span>
                    {step.location && (
                      <span className="process-timeline__location-tag">
                        <span className="material-symbols-outlined text-xs">location_on</span>
                        {step.location}
                      </span>
                    )}
                  </div>

                  {/* Title & Concise Narrative */}
                  <h3 className="process-timeline__card-title">{step.title}</h3>
                  <p className="process-timeline__card-desc">{step.description}</p>

                  {/* Feature Highlights */}
                  {Array.isArray(step.highlights) && step.highlights.length > 0 && (
                    <ul className="process-timeline__highlights">
                      {step.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="process-timeline__highlight-item">
                          <span className="material-symbols-outlined process-timeline__check-icon">
                            check_circle
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Footer Stat Pill */}
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
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProcessTimeline
