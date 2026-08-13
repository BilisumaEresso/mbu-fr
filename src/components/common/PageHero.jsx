import './PageHero.css'

/**
 * Interior page hero section.
 * Used by About, Products, Farmers, Buyers, News, Contact, etc.
 */
function PageHero({ eyebrow, title, description }) {
  return (
    <section className="page-hero">
      <div className="page-hero__container">
        {eyebrow && (
          <span className="page-hero__eyebrow">{eyebrow}</span>
        )}
        <h1 className="page-hero__title">{title}</h1>
        {description && (
          <p className="page-hero__description">{description}</p>
        )}
      </div>
    </section>
  )
}

export default PageHero
