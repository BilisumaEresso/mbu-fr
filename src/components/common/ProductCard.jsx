import './ProductCard.css'

/**
 * Bento-grid product tile.
 * size: 'large' | 'wide' | 'small' (default: 'small')
 * gradeLabel: optional top-left label (e.g., "Export Grade") — shown on large tiles
 */
function ProductCard({ name, imageAlt, size = 'small', gradeLabel, className = '' }) {
  const isLarge = size === 'large'

  return (
    <div className={`product-card product-card--${size} ${className}`.trim()}>
      {/* Image placeholder — swap for real <img> when photography is ready */}
      <div className="product-card__image">
        REPLACE WITH REAL PHOTO — {imageAlt || name}
      </div>
      <div className={`product-card__overlay ${isLarge ? 'product-card__overlay--large' : ''}`.trim()} />
      <div className="product-card__content">
        {gradeLabel && (
          <div className="product-card__grade">{gradeLabel}</div>
        )}
        <h3 className="product-card__title">{name}</h3>
      </div>
    </div>
  )
}

export default ProductCard
