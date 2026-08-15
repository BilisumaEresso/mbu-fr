import { Helmet } from 'react-helmet-async'
import PageHero from '../components/common/PageHero.jsx'
import './About.css'

function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Meki Batu Union</title>
        <meta
          name="description"
          content="How Meki Batu Fruits and Vegetables Growers' Cooperative Union collects, uses, and protects your personal information."
        />
      </Helmet>

      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        description="How Meki Batu Union collects, uses, and protects your information."
      />

      <section className="section">
        <div className="container">
          <div className="editorial-grid">
            <div className="editorial-grid__main">
              <p className="label-caps label-caps--muted" style={{ marginBottom: 'var(--space-8)' }}>
                Last updated: 15 August 2026
              </p>

              <h2>1. Who we are</h2>
              <p>
                Meki Batu Fruits and Vegetables Growers' Cooperative Union Ltd ("Meki Batu Union,"
                "we," "us," or "our") is an agricultural cooperative union based in Meki town, East
                Shewa Zone, Oromia, Ethiopia. This policy explains how we collect, use, and protect
                information you provide through this website.
              </p>

              <h2>2. What information we collect</h2>
              <p>
                We currently collect information only when you voluntarily submit it through a form
                on this site:
              </p>
              <ul>
                <li>
                  <strong>Contact form:</strong> name, email address, subject, and message
                </li>
                <li>
                  <strong>Request a Quote form (Buyers/Exporters page):</strong> name, company name,
                  country, product(s) of interest, estimated volume, and message
                </li>
              </ul>
              <p>
                We do not currently use cookies, analytics tracking, or any automated data
                collection on this website.
              </p>

              <h2>3. How we use your information</h2>
              <p>We use the information you submit to:</p>
              <ul>
                <li>Respond to your inquiry or quote request</li>
                <li>Communicate with you about your request by email or phone</li>
                <li>Maintain a record of business inquiries for our own internal purposes</li>
              </ul>
              <p>
                We do not use your information for advertising, and we do not sell your information
                to any third party.
              </p>

              <h2>4. How your information is processed</h2>
              <p>
                Form submissions on this site are processed through a third-party form-handling
                service, which delivers your submission to us by email. We do not currently operate
                a database that stores form submissions independently of this service. As our systems
                develop, this section will be updated to reflect any additional processing.
              </p>

              <h2>5. How long we keep your information</h2>
              <p>
                We retain information submitted through our forms for as long as reasonably
                necessary to respond to and follow up on your inquiry, and generally no longer than
                12 months from your last contact with us, unless a longer period is required for
                legitimate business or legal reasons.
              </p>

              <h2>6. Your rights</h2>
              <p>
                Depending on where you are located, you may have the right to request access to,
                correction of, or deletion of the personal information you have submitted to us. To
                make such a request, contact us using the details below.
              </p>

              <h2>7. Cookies</h2>
              <p>
                This website does not currently set cookies or use browser tracking technologies. If
                this changes in the future, this policy will be updated accordingly, and where
                required by law we will request your consent first.
              </p>

              <h2>8. Children's privacy</h2>
              <p>
                This website is intended for business use by farmers, cooperative members, buyers,
                and members of the public, and is not directed at children. We do not knowingly
                collect information from children.
              </p>

              <h2>9. Changes to this policy</h2>
              <p>
                We may update this policy from time to time. The "Last updated" date at the top of
                this page reflects the most recent revision. Continued use of this site after
                changes are posted constitutes acceptance of the updated policy.
              </p>

              <h2>10. Contact us</h2>
              <p>
                If you have questions about this privacy policy or wish to exercise your rights
                regarding your information, contact us at:
              </p>
              <p>
                Meki Batu Fruits and Vegetables Growers' Cooperative Union Ltd
                <br />
                Meki town, East Shewa Zone, Oromia, Ethiopia
                <br />
                Email:{' '}
                <a href="mailto:info@mekibatuunion.org" style={{ color: 'var(--color-accent)' }}>
                  info@mekibatuunion.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PrivacyPolicy
