import './ResourceCard.css'

function ResourceCard({ resource, onSelect }) {
  return (
    <article className="resource-photo-card" onClick={() => onSelect && onSelect(resource)}>
      <div className="resource-photo-card__media">
        <img
          src={resource.image}
          alt={resource.name}
          className="resource-photo-card__img"
          loading="lazy"
        />
        <div className="resource-photo-card__overlay" />
        <span className="resource-photo-card__tag">{resource.tag}</span>
        {resource.stat && (
          <span className="resource-photo-card__stat-badge">
            <span className="material-symbols-outlined text-xs">verified</span>
            {resource.stat}
          </span>
        )}
      </div>

      <div className="resource-photo-card__body">
        <div className="resource-photo-card__loc">
          <span className="material-symbols-outlined text-xs">location_on</span>
          <span>{resource.location}</span>
        </div>
        <h3 className="resource-photo-card__title">{resource.name}</h3>
        <p className="resource-photo-card__desc">{resource.desc}</p>
      </div>
    </article>
  )
}

export default ResourceCard
