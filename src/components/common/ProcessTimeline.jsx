import { useTranslation } from 'react-i18next'
import { RefreshCw, Move, MapPin, CheckCircle, BadgeCheck, Package, Sparkles, Truck } from 'lucide-react'
import Reveal from './Reveal.jsx'
import './ProcessTimeline.css'

const STEP_ICON_MAP = {
  verified: BadgeCheck,
  inventory_2: Package,
  inventory: Package,
  sanitizer: Sparkles,
  local_shipping: Truck,
}

function ProcessStepIcon({ name, size = 20, className = '' }) {
  const Comp = STEP_ICON_MAP[name] || BadgeCheck
  return <Comp size={size} className={className} />
}

const getDefaultSteps = (t) => t('process.steps', { returnObjects: true })

const stagger = (i) => Math.min(i * 70, 280)

function ProcessTimeline({
  title,
  subtitle,
  steps,
  className = '',
  compact = false,
  header = null,
  id = 'process',
}) {
  const { t } = useTranslation('home')
  
  const displayTitle = title || t('process.title')
  const displaySubtitle = subtitle || t('process.desc')
  const displaySteps = steps || getDefaultSteps(t)

  if (!displaySteps || displaySteps.length === 0) return null

  return (
    <section
      id={id}
      className={`process-timeline section section--alt${compact ? ' process-timeline--compact' : ''} ${className}`.trim()}
      aria-label={t('process.ariaLabel', 'Supply Chain Process')}
    >
      <div className="container">
        {compact ? (
          header
        ) : (
          <Reveal className="process-timeline__header">
            <div className="process-timeline__badge-wrap">
              <div className="process-timeline__badge">
                <span className="process-timeline__badge-text">{t('process.badge', 'End-to-End Supply Chain')}</span>
                <span className="process-timeline__badge-sep" aria-hidden="true" />
                <span className="process-timeline__badge-flow">
                  <RefreshCw size={16} className="process-timeline__badge-icon" />
                  <span>{t('process.badgeFlow', 'Farm to Market Flow')}</span>
                </span>
              </div>
            </div>
            <h2 className="process-timeline__title">{displayTitle}</h2>
            {displaySubtitle && <p className="process-timeline__desc">{displaySubtitle}</p>}
          </Reveal>
        )}

        {/* Mobile Swipe Hint */}
        <div className="process-timeline__swipe-hint mobile-only">
          <Move size={14} />
          <span>{t('process.swipeHint', 'Swipe to explore 4-stage pipeline')}</span>
        </div>

        {/* 4-Step Pipeline Cards Grid */}
        <div className="process-timeline__pipeline">
          {displaySteps.map((step, index) => {
            const stepNumber = step.number || `0${index + 1}`
            const isLast = index === displaySteps.length - 1

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
                      <ProcessStepIcon name={step.icon} size={20} className="process-timeline__icon" />
                    </div>
                  </div>

                  {/* Stage Meta: Phase Name & Location */}
                  <div className="process-timeline__meta">
                    <span className="process-timeline__phase-tag">{step.phase}</span>
                    {step.location && (
                      <span className="process-timeline__location-tag">
                        <MapPin size={14} />
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
                          <CheckCircle size={16} className="process-timeline__check-icon" />
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
