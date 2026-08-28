import { useTranslation } from 'react-i18next'
import Reveal from './Reveal.jsx'
import './ProcessTimeline.css'

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
                  <span className="material-symbols-outlined process-timeline__badge-icon">sync_alt</span>
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
          <span className="material-symbols-outlined text-xs">swipe</span>
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
