import { useTranslation } from 'react-i18next'
import './ResourceCard.css'

const KEY_MAP = {
  'central-cold-hub': 'centralColdHub',
  'refrigerated-fleet': 'refrigeratedFleet',
  'central-packhouse': 'centralPackhouse',
  'irrigation-schemes': 'irrigationSchemes',
}

function ResourceCard({ resource, onSelect }) {
  const { t } = useTranslation(['common', 'about'])

  if (!resource) return null

  const key = KEY_MAP[resource.id]
  const name = key ? t(`common:facilities.${key}.name`, resource.name) : resource.name
  const tag = key ? t(`common:facilities.${key}.tag`, resource.tag) : resource.tag
  const stat = key ? t(`common:facilities.${key}.stat`, resource.stat) : resource.stat
  const location = key ? t(`common:facilities.${key}.location`, resource.location) : resource.location
  const desc = key ? t(`common:facilities.${key}.desc`, resource.desc) : resource.desc

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect && onSelect(resource)
    }
  }

  return (
    <article
      className="resource-photo-card"
      onClick={() => onSelect && onSelect(resource)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={t('about:resourceCard.viewDetailsFor', { name, defaultValue: `View details for ${name}` })}
    >
      <div className="resource-photo-card__media">
        <img
          src={resource.image}
          alt={name}
          className="resource-photo-card__img"
          loading="lazy"
        />
        <div className="resource-photo-card__overlay" />
        <span className="resource-photo-card__tag">{tag}</span>
        {stat && (
          <span className="resource-photo-card__stat-badge">
            <span className="material-symbols-outlined text-xs">verified</span>
            {stat}
          </span>
        )}
      </div>

      <div className="resource-photo-card__body">
        <div className="resource-photo-card__loc">
          <span className="material-symbols-outlined text-xs">location_on</span>
          <span>{location}</span>
        </div>
        <h3 className="resource-photo-card__title">{name}</h3>
        <p className="resource-photo-card__desc">{desc}</p>
      </div>
    </article>
  )
}

export default ResourceCard
