import Breadcrumbs from './Breadcrumbs.jsx'
import './PageHero.css'

/**
 * Shared interior page hero section component.
 * Used by About, Products, Farmers, Buyers, RetailOutlets, News, Impact, Contact, PrivacyPolicy, TermsOfService.
 */
function PageHero({
  eyebrow,
  title,
  description,
  actions,
  image,
  imageAlt,
  badge,
  rightContent,
  breadcrumbs,
  className = '',
}) {
  const hasRightColumn = Boolean(image || rightContent)

  return (
    <section className={`page-hero ${className}`.trim()}>
      <div className="container">
        {breadcrumbs && <Breadcrumbs trail={breadcrumbs} />}
        {hasRightColumn ? (
          <div className="page-hero__grid">
            <div className="page-hero__content">
              {eyebrow && (
                <span className="label-caps label-caps--primary block mb-2">{eyebrow}</span>
              )}
              <h1 className="page-hero__title">{title}</h1>
              {description && <p className="page-hero__description">{description}</p>}
              {actions && <div className="page-hero__actions">{actions}</div>}
            </div>

            <div className="page-hero__right">
              {image ? (
                <div className="page-hero__media">
                  <img src={image} alt={imageAlt || title} className="page-hero__img" />
                  {badge && (
                    <div className="page-hero__badge desktop-only">
                      <span className="label-caps">{badge}</span>
                    </div>
                  )}
                </div>
              ) : (
                rightContent
              )}
            </div>
          </div>
        ) : (
          <div className="page-hero__simple">
            {eyebrow && (
              <span className="label-caps label-caps--primary block mb-2">{eyebrow}</span>
            )}
            <h1 className="page-hero__title">{title}</h1>
            {description && <p className="page-hero__description">{description}</p>}
            {actions && <div className="page-hero__actions">{actions}</div>}
          </div>
        )}
      </div>
    </section>
  )
}

export default PageHero
