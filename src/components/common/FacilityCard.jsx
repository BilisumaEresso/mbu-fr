import './FacilityCard.css'

function FacilityCard({ resource }) {
  if (!resource) return null

  return (
    <article className="facility-card">
      {/* Visual Media Header */}
      <div className="facility-card__media">
        <img
          src={resource.image}
          alt={resource.name}
          className="facility-card__img"
          loading="lazy"
        />
        <div className="facility-card__overlay" />

        {/* Top Badges: Category Tag & Icon */}
        <div className="facility-card__top-bar">
          <span className="facility-card__tag">{resource.tag}</span>
          {resource.icon && (
            <div className="facility-card__icon-badge" aria-hidden="true">
              <span className="material-symbols-outlined">{resource.icon}</span>
            </div>
          )}
        </div>

        {/* Bottom Stat Highlight Badge */}
        {resource.stat && (
          <div className="facility-card__stat-badge">
            <span className="material-symbols-outlined text-xs">verified</span>
            <span className="facility-card__stat-val">{resource.stat}</span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="facility-card__body">
        {/* Location Row */}
        <div className="facility-card__location">
          <span className="material-symbols-outlined facility-card__loc-icon">location_on</span>
          <span>{resource.location}</span>
        </div>

        {/* Title & Description */}
        <h3 className="facility-card__title">{resource.name}</h3>
        <p className="facility-card__desc">{resource.desc}</p>

        {/* Feature Highlights Pills */}
        {resource.features && resource.features.length > 0 && (
          <div className="facility-card__features">
            {resource.features.map((feature, idx) => (
              <span key={idx} className="facility-card__feature-pill">
                <span className="material-symbols-outlined text-xs">check</span>
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
