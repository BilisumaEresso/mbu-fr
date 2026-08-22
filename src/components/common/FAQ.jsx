import { useState } from 'react'
import Reveal from './Reveal.jsx'
import './FAQ.css'

/**
 * FAQ Accordion Component.
 *
 * Props:
 *   title: string (default "Frequently Asked Questions")
 *   description?: string
 *   items: Array<{ question: string, answer: string }>
 *   className?: string
 */
function FAQ({
  title = 'Frequently Asked Questions',
  description,
  items = [],
  className = '',
  id = 'faq',
}) {
  const [openIndex, setOpenIndex] = useState(0) // Default first item open for immediate clarity

  function toggleItem(index) {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  if (!items || items.length === 0) return null

  return (
    <section id={id} className={`faq-section section section--alt ${className}`.trim()}>
      <div className="container">
        <Reveal className="faq-section__header">
          <h2 className="faq-section__title">{title}</h2>
          {description && <p className="faq-section__desc">{description}</p>}
        </Reveal>

        <div className="faq-accordion">
          {items.map((item, index) => {
            const isOpen = openIndex === index
            const contentId = `faq-content-${index}`
            const buttonId = `faq-button-${index}`

            return (
              <Reveal key={item.question} delay={Math.min(index * 60, 360)} className="faq-item">
                <div className={`faq-item__wrap ${isOpen ? 'faq-item__wrap--open' : ''}`}>
                  <button
                    id={buttonId}
                    type="button"
                    className="faq-item__trigger"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleItem(index)}
                  >
                    <span className="faq-item__question">{item.question}</span>
                    <span className="material-symbols-outlined faq-item__icon" aria-hidden="true">
                      expand_more
                    </span>
                  </button>

                  {isOpen && (
                    <div id={contentId} role="region" aria-labelledby={buttonId} className="faq-item__content">
                      <p className="faq-item__answer">{item.answer}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
