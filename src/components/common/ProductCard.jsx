/**
 * Bento-grid product tile.
 * size: 'large' | 'wide' | 'small' (default: 'small')
 * gradeLabel: optional top-left label (e.g., "Export Grade") — shown on large tiles
 */
function ProductCard({ name, imageAlt, size = 'small', gradeLabel, className = '' }) {
  const sizeClasses = {
    large: 'md:col-span-8 md:row-span-2',
    wide: 'md:col-span-6',
    small: 'md:col-span-4',
  }

  const isLarge = size === 'large'
  const gradientFrom = isLarge ? 'from-black/70 via-black/20' : 'from-black/60'
  const padding = isLarge ? 'p-8' : 'p-6'

  return (
    <div className={`${sizeClasses[size] || sizeClasses.small} rounded-xl overflow-hidden border border-outline-variant relative group ${className}`}>
      {/* Image placeholder — swap for real <img> when photography is ready */}
      <div className="w-full h-full bg-surface-container-high border border-dashed border-outline-variant flex items-center justify-center text-on-surface-variant text-sm text-center p-4 transition-transform duration-700 group-hover:scale-105">
        REPLACE WITH REAL PHOTO — {imageAlt || name}
      </div>
      <div className={`absolute inset-0 bg-gradient-to-t ${gradientFrom} to-transparent pointer-events-none`}></div>
      <div className={`absolute bottom-0 left-0 ${padding}`}>
        {gradeLabel && (
          <div className="font-label-caps text-label-caps text-white/80 uppercase mb-2">{gradeLabel}</div>
        )}
        <h3 className={`${isLarge ? 'font-headline-lg text-headline-lg' : 'font-headline-md text-headline-md'} text-white`}>{name}</h3>
      </div>
    </div>
  )
}

export default ProductCard
