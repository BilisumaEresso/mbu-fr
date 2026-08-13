import { Link } from 'react-router-dom'
import logo from '../assets/images/MBU_logo_new.webp'

function NotFound() {
  return (
    <section className="section container" style={{ textAlign: 'center', padding: '6rem 0' }}>
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
