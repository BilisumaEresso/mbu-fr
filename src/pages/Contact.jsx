import { useState } from 'react'
import './InnerPage.css'

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* ---- Hero Section ---- */}
      <section className="contact-hero section">
        <div className="container">
          <h1 className="contact-hero__title">
            Get in Touch with Meki Batu Union
          </h1>
          <p className="contact-hero__desc">
            We welcome inquiries from global partners, local stakeholders, and farmers. Our team is ready to discuss agricultural exports, cooperative membership, and sustainable farming initiatives in the Great Rift Valley.
          </p>
        </div>
      </section>

      {/* ---- Contact Form & Info Grid ---- */}
      <section className="contact-main section section--alt">
        <div className="container contact-main__grid">
          {/* Info Sidebar Column */}
          <div className="contact-info-col">
            <div className="contact-info-card">
              <span className="label-caps label-caps--secondary block mb-3">Headquarters</span>
              <div className="contact-info-item">
                <span className="material-symbols-outlined contact-info-item__icon">location_on</span>
                <div>
                  <p className="font-medium">Meki Town</p>
                  <p className="text-muted">East Shewa Zone, Oromia</p>
                  <p className="text-muted">Ethiopia</p>
                </div>
              </div>

              <span className="label-caps label-caps--secondary block mb-3 mt-6">Direct Lines</span>
              <div className="contact-info-item">
                <span className="material-symbols-outlined contact-info-item__icon">call</span>
                <p>+251 11 123 4567</p>
              </div>
              <div className="contact-info-item">
                <span className="material-symbols-outlined contact-info-item__icon">mail</span>
                <p>info@mekibatuunion.com</p>
              </div>
            </div>

            <div className="contact-info-media desktop-only">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWtRsi-Koe-nBfOqSS5HJljv_0RDEHckkgTna9Cjr3LLEVfFlf3PM6yIk9IoOZEAKKBRbepAlSUCN53nYl-IrGoFRjoQdvJoKWRKrUfQwFZlpVuNIzfP1k0Pgq0iomva4WeKd9auJx9uY_vYp3VGEoHBZWZdXEethuLbRFSl7BBQHQeAotnGKVJn2KKDOWoJp8bmBOkBAwi9y82DWHUhc_irl1KHej3ZYOs0-I9crg5WFIxD1m2E7v"
                alt="Rich dark agricultural soil with green crops in Meki"
                className="contact-info-img"
              />
            </div>
          </div>

          {/* Form Column */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              {submitted ? (
                <div className="contact-success">
                  <span className="material-symbols-outlined contact-success__icon">check_circle</span>
                  <h2>Message Sent!</h2>
                  <p>Thank you for reaching out. Our team will review your inquiry and respond shortly.</p>
                </div>
              ) : (
                <form className="form contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div>
                      <label htmlFor="name">Full Name</label>
                      <input id="name" name="name" type="text" required placeholder="e.g. Abebe Bekele" />
                    </div>
                    <div>
                      <label htmlFor="email">Email Address</label>
                      <input id="email" name="email" type="email" required placeholder="email@organization.com" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject">Inquiry Subject</label>
                    <select id="subject" name="subject" required defaultValue="">
                      <option value="" disabled>Select a topic...</option>
                      <option value="export">Export Partnerships</option>
                      <option value="membership">Cooperative Membership</option>
                      <option value="media">Media &amp; Press</option>
                      <option value="other">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="How can we assist you today?"
                    />
                  </div>

                  <div className="contact-form__submit-wrap">
                    <button type="submit" className="btn btn--primary">
                      Send Message <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Regional Map Placeholder ---- */}
      <section className="contact-map section">
        <div className="container">
          <div className="contact-map__card">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxQeQ1AtLrFEWnP0RzsJJYKfiqP2ofAqycTJjMNGqftXPmq2HNjOJB0HutlHfp6LhMluKsAmY0GW_vdHJFUgaY2gEukDTaXefOVUmU7TWhqdCOJe6SZoXWVd9upnZamF0yA8KOdeht4MgL8ufAa4jf9doQQWbSdBgA9vhQo4RTBocMg92wXAEQM3j1mSUxMvXURJFQNIp1Rhvkg6k18Z4VB_qw6Wl3SF-oNGWFWVG7tGqBXAkUGdQo"
              alt="Map showing Meki Headquarters location in Oromia, Ethiopia"
              className="contact-map__img"
            />
            <div className="contact-map__badge">
              <span className="material-symbols-outlined text-secondary">pin_drop</span>
              <span className="label-caps label-caps--primary">Meki Headquarters</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
