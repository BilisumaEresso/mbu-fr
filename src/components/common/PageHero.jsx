/**
 * Interior page hero section.
 * Used by About, Products, Farmers, Buyers, News, Contact, etc.
 */
function PageHero({ eyebrow, title, description }) {
  return (
    <section className="bg-surface-container-low border-b border-outline-variant py-16 md:py-24">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {eyebrow && (
          <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest mb-4 block">{eyebrow}</span>
        )}
        <h1 className="font-headline-xl text-headline-xl text-primary mb-4">{title}</h1>
        {description && (
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">{description}</p>
        )}
      </div>
    </section>
  )
}

export default PageHero
