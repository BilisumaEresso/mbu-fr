import { useTranslation } from 'react-i18next'
import { BadgeCheck, MapPin, Check } from 'lucide-react'
import './FacilityCard.css'

const KEY_MAP = {
  'central-cold-hub': 'centralColdHub',
  'refrigerated-fleet': 'refrigeratedFleet',
  'central-packhouse': 'centralPackhouse',
  'irrigation-schemes': 'irrigationSchemes',
  'agricultural-mechanization': 'agriculturalMechanization',
}

function FacilityCard({ resource }) {
  const { t } = useTranslation(['common'])

  if (!resource) return null

  const key = KEY_MAP[resource.id]
  const name = key ? t(`common:facilities.${key}.name`, resource.name) : resource.name
  const tag = key ? t(`common:facilities.${key}.tag`, resource.tag) : resource.tag
  const stat = key ? t(`common:facilities.${key}.stat`, resource.stat) : resource.stat
  const location = key ? t(`common:facilities.${key}.location`, resource.location) : resource.location
  const desc = key ? t(`common:facilities.${key}.desc`, resource.desc) : resource.desc
  const features = key
    ? (Array.isArray(t(`common:facilities.${key}.features`, { returnObjects: true }))
        ? t(`common:facilities.${key}.features`, { returnObjects: true })
        : resource.features)
    : resource.features

  const ResourceIcon = resource.icon

  return (
    <article className="facility-card">
      {/* Visual Media Header */}
      <div className="facility-card__media">
        <img
          src={resource.image}
          srcSet={resource.imageSrcSet}
          sizes={resource.imageSrcSet ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px' : undefined}
          alt={name}
          className="facility-card__img"
          loading="lazy"
          decoding="async"
        />
        <div className="facility-card__overlay" />

        {/* Top Badges: Category Tag & Icon */}
        <div className="facility-card__top-bar">
          <span className="facility-card__tag">{tag}</span>
          {ResourceIcon && (
            <div className="facility-card__icon-badge" aria-hidden="true">
              <ResourceIcon size={20} />
            </div>
          )}
        </div>

        {/* Bottom Stat Highlight Badge */}
        {stat && (
          <div className="facility-card__stat-badge">
            <BadgeCheck size={14} />
            <span className="facility-card__stat-val">{stat}</span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="facility-card__body">
        {/* Location Row */}
        <div className="facility-card__location">
          <MapPin size={16} className="facility-card__loc-icon" />
          <span>{location}</span>
        </div>

        {/* Title & Description */}
        <h3 className="facility-card__title">{name}</h3>
        <p className="facility-card__desc">{desc}</p>

        {/* Feature Highlights Pills */}
        {features && features.length > 0 && (
          <div className="facility-card__features">
            {features.map((feature, idx) => (
              <span key={idx} className="facility-card__feature-pill">
                <Check size={14} />
                {feature}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default FacilityCard
