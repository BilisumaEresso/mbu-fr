import { Helmet } from 'react-helmet-async'
import PageHero from '../components/common/PageHero.jsx'
import './About.css'

function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Meki Batu Union</title>
        <meta
          name="description"
          content="The terms that apply when you use the Meki Batu Fruits and Vegetables Growers' Cooperative Union website."
        />
      </Helmet>

      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Terms of Service' }]}
        eyebrow="Legal"
        title="Terms of service"
        description="The terms that apply when you use this website."
      />

      <section className="section">
        <div className="container">
          <div className="editorial-grid">
            <div className="editorial-grid__main">
              <p className="label-caps label-caps--muted" style={{ marginBottom: 'var(--space-8)' }}>
                Last updated: 15 August 2026
              </p>

              <h2>1. Acceptance of these terms</h2>
              <p>
                By accessing or using this website, you agree to these Terms of Service. If you do
                not agree, please do not use this website.
              </p>

              <h2>2. About this website</h2>
              <p>
                This website is operated by Meki Batu Fruits and Vegetables Growers' Cooperative
                Union Ltd, an agricultural cooperative union based in Meki town, Oromia, Ethiopia.
                It provides information about our cooperative, our members, our products, and ways
                to get in touch as a farmer, buyer, or member of the public.
              </p>

              <h2>3. Informational purpose</h2>
              <p>
                The content on this website, including product listings, production volumes,
                certifications, and cooperative statistics, is provided for general informational
                purposes. It does not constitute a binding offer to sell or supply goods. Any
                commercial arrangement, including pricing, quantities, and delivery terms, must be
                confirmed directly and separately with Meki Batu Union.
              </p>

              <h2>4. Request a Quote and Contact forms</h2>
              <p>
                Submitting a form on this website (including the Request a Quote or Contact form) is
                an inquiry only and does not create a contract or purchase obligation on either
                side. We aim to respond to genuine inquiries in a timely manner but do not guarantee
                a response time.
              </p>

              <h2>5. Accuracy of information</h2>
              <p>
                We make reasonable efforts to keep the information on this website accurate and up
                to date, including membership numbers, production volumes, certifications, and
                retail outlet details. However, we do not guarantee that all information is
                complete, current, or error-free at all times.
              </p>

              <h2>6. Intellectual property</h2>
              <p>
                All content on this website, including text, images, logos, and branding, is the
                property of Meki Batu Union or its licensors, unless otherwise noted. You may not
                reproduce, distribute, or use this content for commercial purposes without our prior
                written permission.
              </p>

              <h2>7. Acceptable use</h2>
              <p>You agree not to use this website to:</p>
              <ul>
                <li>Submit false or misleading information</li>
                <li>
                  Attempt to disrupt or gain unauthorized access to the site or any related systems
                </li>
                <li>Use the site for any unlawful purpose</li>
              </ul>

              <h2>8. Limitation of liability</h2>
              <p>
                To the fullest extent permitted by law, Meki Batu Union is not liable for any
                indirect, incidental, or consequential damages arising from your use of this website
                or reliance on its content.
              </p>

              <h2>9. Governing law</h2>
              <p>
                These terms are governed by the laws of the Federal Democratic Republic of
                Ethiopia. Any disputes arising from the use of this website will be subject to the
                jurisdiction of the courts of Oromia Region, Ethiopia.
              </p>

              <h2>10. Changes to these terms</h2>
              <p>
                We may update these Terms of Service from time to time. The "Last updated" date at
                the top of this page reflects the most recent revision. Continued use of this site
                after changes are posted constitutes acceptance of the updated terms.
              </p>

              <h2>11. Contact us</h2>
              <p>Questions about these terms can be sent to:</p>
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

export default TermsOfService
