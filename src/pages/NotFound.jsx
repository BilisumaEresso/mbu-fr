import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import logo from '../assets/images/MBU_logo_new.webp'

function NotFound() {
  return (
    <section className="section container" style={{ textAlign: 'center', padding: '6rem 0' }}>
      <Helmet>
        <title>Page Not Found | Meki Batu Union</title>
        <meta
          name="description"
          content="The page you are looking for could not be found on Meki Batu Union."
        />
      </Helmet>
      <img
        src={logo}
        alt="Meki Batu Union logo"
        style={{
          width: '100px',
          height: '100px',
          objectFit: 'contain',
          margin: '0 auto var(--space-6)',
          opacity: 0.35,
        }}
      />
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn--primary">Back to home</Link>
    </section>
  )
}

export default NotFound
