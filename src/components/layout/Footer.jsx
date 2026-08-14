import { Link } from 'react-router-dom'
import logoImg from '../../assets/images/MBU_logo_new.webp'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Brand Column */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo-link">
            <img src={logoImg} alt="Meki Batu Union Logo" className="footer__logo-img" />
            <span className="footer__logo-text">Meki Batu Union</span>
          </Link>
          <p className="footer__tagline">
            Trusted Ethiopian fruit &amp; vegetable cooperative since 2002.
          </p>
          <div className="footer__badge">
            <span className="footer__badge-dot" />
            <span>GlobalG.A.P Certified</span>
          </div>
        </div>

        {/* Link Columns */}
        <div className="footer__links-group">
          <div>
            <h4 className="footer__heading">Company</h4>
            <ul className="footer__list">
              <li><Link className="footer__link" to="/about">About Us</Link></li>
              <li><Link className="footer__link" to="/products">Our Products</Link></li>
              <li><Link className="footer__link" to="/impact">Impact</Link></li>
              <li><Link className="footer__link" to="/news">News</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer__heading">Stakeholders</h4>
            <ul className="footer__list">
              <li><Link className="footer__link" to="/farmers">For Farmers</Link></li>
              <li><Link className="footer__link" to="/buyers">For Buyers</Link></li>
              <li><Link className="footer__link" to="/retail-outlets">Retail Outlets</Link></li>
              <li><Link className="footer__link" to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Connect & Social Media Column */}
        <div className="footer__connect">
          <h4 className="footer__heading">Contact</h4>
          <ul className="footer__contact-list">
            <li>
              <a className="footer__contact-item" href="mailto:info@mekibatuunion.org">
                <span className="material-symbols-outlined footer__contact-icon">mail</span>
                <span>info@mekibatuunion.org</span>
              </a>
            </li>
            <li>
              <a className="footer__contact-item" href="tel:+251000000000">
                <span className="material-symbols-outlined footer__contact-icon">phone</span>
                <span>+251 (0) 11 000 0000</span>
              </a>
            </li>
            <li>
              <a
                className="footer__contact-item"
                href="https://maps.app.goo.gl/h6Wbr4RpR7n3hAYu7"
                target="_blank"
                rel="noopener noreferrer"
                title="Open location on Google Maps"
              >
                <span className="material-symbols-outlined footer__contact-icon">location_on</span>
                <span>Meki Town, Oromia, Ethiopia</span>
              </a>
            </li>
          </ul>

          <h5 className="footer__social-heading">Follow Us</h5>
          <div className="footer__socials">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-btn"
              aria-label="Facebook"
              title="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.65 13.75 5.65c1.08 0 2.21.19 2.21.19v2.43h-1.25c-1.23 0-1.61.77-1.61 1.56V12h2.74l-.44 3h-2.3v6.8c4.56-.93 8-4.96 8-9.8z"/>
              </svg>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-btn"
              aria-label="Telegram"
              title="Telegram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .54-1.43.53-.47-.01-1.37-.27-2.04-.49-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.66-2.89 8.01-3.45 3.82-1.6 4.61-1.88 5.13-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.26-.04.44z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-btn"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright & Bottom Links */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Meki Batu Union. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <Link to="/about" className="footer__bottom-link">Privacy Policy</Link>
            <Link to="/about" className="footer__bottom-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
