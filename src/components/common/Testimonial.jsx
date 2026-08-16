// PLACEHOLDER CONTENT — replace with real buyer/member testimonials and remove the "Example" badge before launch.

import { useState, useEffect, useRef } from 'react'
import Reveal from './Reveal.jsx'
import './Testimonial.css'

/**
 * Interactive Testimonial Slider & Card Component.
 *
 * Props:
 *   title: string
 *   subtitle?: string
 *   items: Array<{
 *     id: number|string,
 *     name: string,
 *     role: string,
 *     org?: string,
 *     location?: string,
 *     category?: string,
 *     avatar?: string,
 *     rating?: number,
 *     quote: string
 *   }>
 */
function Testimonials({
  title = 'Partner & Member Voice',
  subtitle = 'Feedback from global agricultural buyers and primary cooperative members across the Great Rift Valley.',
  items = [],
  className = '',
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const touchStartX = useRef(null)

  // Handle responsive items per page
  useEffect(() => {
    function updateItemsPerPage() {
      if (window.innerWidth < 768) {
        setItemsPerPage(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2)
      } else {
        setItemsPerPage(3)
      }
    }

    updateItemsPerPage()
    window.addEventListener('resize', updateItemsPerPage)
    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [])

  if (!items || items.length === 0) return null

  const maxIndex = Math.max(0, items.length - itemsPerPage)

  function prevSlide() {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))
  }

  function nextSlide() {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
  }

  // Touch Swipe handlers
  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
    touchStartX.current = null
  }

  return (
    <section className={`testimonials-section section section--alt ${className}`.trim()}>
      <div className="container">
        <div className="testimonials-section__header-row">
          <Reveal className="testimonials-section__header">
            <span className="label-caps label-caps--secondary mb-2 block">Testimonials</span>
            <h2 className="testimonials-section__title">{title}</h2>
            {subtitle && <p className="testimonials-section__desc">{subtitle}</p>}
          </Reveal>

          {/* Controls header desktop */}
          <div className="testimonials-slider__controls">
            <button
              type="button"
              className="testimonials-slider__btn"
              onClick={prevSlide}
              aria-label="Previous testimonials"
              title="Previous testimonials"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button
              type="button"
              className="testimonials-slider__btn"
              onClick={nextSlide}
              aria-label="Next testimonials"
              title="Next testimonials"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Carousel Slider Window */}
        <div
          className="testimonials-slider__window"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="testimonials-slider__track"
            style={{
              transform: `translateX(-${(currentIndex * (100 / itemsPerPage))}%)`,
            }}
          >
            {items.map((item, index) => (
              <div
                key={item.id || index}
                className="testimonials-slider__slide"
                style={{ flex: `0 0 ${100 / itemsPerPage}%` }}
              >
                <div className="testimonial-card">
                  <div className="testimonial-card__header-meta">
                    {item.category && (
                      <span className="testimonial-card__category">{item.category}</span>
                    )}
                    <span className="testimonial-card__placeholder-badge">
                      Example — pending real content
                    </span>
                  </div>

                  {/* 5-Star Rating */}
                  <div className="testimonial-card__rating" aria-label="5 out of 5 stars">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <span key={i} className="material-symbols-outlined testimonial-card__star">
                        star
                      </span>
                    ))}
                  </div>

                  <p className="testimonial-card__quote">"{item.quote}"</p>

                  <div className="testimonial-card__author">
                    <div className="testimonial-card__avatar-wrap">
                      {item.avatar ? (
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="testimonial-card__avatar"
                        />
                      ) : (
                        <div className="testimonial-card__avatar-placeholder">
                          {item.name ? item.name.charAt(0) : 'M'}
                        </div>
                      )}
                      <span
                        className="material-symbols-outlined testimonial-card__verified"
                        title="Verified Cooperative Partner"
                      >
                        verified
                      </span>
                    </div>

                    <div className="testimonial-card__info">
                      <h4 className="testimonial-card__name">{item.name}</h4>
                      <p className="testimonial-card__role">
                        {item.role}
                        {item.org ? ` • ${item.org}` : ''}
                      </p>
                      {item.location && (
                        <p className="testimonial-card__location">
                          <span className="material-symbols-outlined text-xs">location_on</span>
                          {item.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="testimonials-slider__dots">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={`testimonials-slider__dot ${
                currentIndex === i ? 'testimonials-slider__dot--active' : ''
              }`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
