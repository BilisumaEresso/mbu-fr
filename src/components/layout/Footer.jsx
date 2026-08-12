import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-surface-container dark:bg-surface-container-highest border-t border-outline-variant dark:border-outline w-full mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter w-full px-margin-mobile md:px-margin-desktop py-12 max-w-container-max mx-auto">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          {/* Image logo available at src/assets/images/MBU_logo_new.png — swap in when brand guidelines are finalized */}
          <Link to="/" className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim mb-4 block">
            Meki Batu Union
          </Link>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface mb-6">
            Trusted Ethiopian fruit &amp; vegetable cooperative since 2002.
          </p>
        </div>

        {/* Link Columns */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8">
          <div>
            <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-4 tracking-widest">Company</h4>
            <ul className="space-y-3">
              <li><Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface hover:text-secondary transition-colors duration-200" to="/about">About Us</Link></li>
              <li><Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface hover:text-secondary transition-colors duration-200" to="/products">Our Products</Link></li>
              <li><Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface hover:text-secondary transition-colors duration-200" to="/impact">Impact</Link></li>
              <li><Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface hover:text-secondary transition-colors duration-200" to="/news">News</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-4 tracking-widest">Stakeholders</h4>
            <ul className="space-y-3">
              <li><Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface hover:text-secondary transition-colors duration-200" to="/farmers">For Farmers</Link></li>
              <li><Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface hover:text-secondary transition-colors duration-200" to="/buyers">For Buyers</Link></li>
              <li><Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface hover:text-secondary transition-colors duration-200" to="/retail-outlets">Retail Outlets</Link></li>
              <li><Link className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface hover:text-secondary transition-colors duration-200" to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Connect */}
        <div className="col-span-1">
          <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-4 tracking-widest">Connect</h4>
          <div className="flex gap-4">
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="mailto:info@mekibatuunion.org"><span className="material-symbols-outlined">mail</span></a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="tel:+251000000000"><span className="material-symbols-outlined">phone</span></a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="/contact"><span className="material-symbols-outlined">location_on</span></a>
          </div>
        </div>

        {/* Copyright */}
        <div className="col-span-1 md:col-span-4 mt-8 pt-8 border-t border-outline-variant">
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface text-sm">
            © {new Date().getFullYear()} Meki Batu Union. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
