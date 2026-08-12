import { useState } from 'react'
import PageHero from '../components/common/PageHero.jsx'
import './InnerPage.css'

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // Phase 1: wire this up to a transactional email service (e.g. Resend/SendGrid).
    setSubmitted(true)
  }

  return (
    <>
      <PageHero eyebrow="Contact" title="Get in touch" />

      <section className="section">
        <div className="container two-col">
          <div>
            <p><strong>Address</strong><br />Meki town, East Shewa Zone, Oromia, Ethiopia</p>
            <p><strong>Phone</strong><br />+251 00 000 0000</p>
            <p><strong>Email</strong><br />info@mekibatuunion.org</p>
            <div className="img-placeholder" style={{ height: 220, marginTop: 'var(--space-6)' }}>
              Map — Meki town
            </div>
          </div>

          <div>
            {submitted ? (
              <p style={{ fontWeight: 600, color: 'var(--color-primary-dark)' }}>
                Thanks for reaching out — we'll get back to you soon.
              </p>
            ) : (
              <form className="form" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="c-name">Name</label>
                  <input id="c-name" name="name" type="text" required />
                </div>
                <div>
                  <label htmlFor="c-email">Email</label>
                  <input id="c-email" name="email" type="email" required />
                </div>
                <div>
                  <label htmlFor="c-subject">Subject</label>
                  <input id="c-subject" name="subject" type="text" />
                </div>
                <div>
                  <label htmlFor="c-message">Message</label>
                  <textarea id="c-message" name="message" required />
                </div>
                <button type="submit" className="btn btn--primary" style={{ alignSelf: 'flex-start' }}>
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
