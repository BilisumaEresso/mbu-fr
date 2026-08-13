import { Link } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import './Home.css'

const STATS = [
  { value: '140+', label: 'Primary Co-ops' },
  { value: '50k+', label: 'Tonnes Sold/Yr' },
  { value: '5', label: 'Retail Outlets' },
  { value: 'EU', label: 'Export Markets' },
]

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="home-hero">
        <div className="container home-hero__grid">
          <div className="home-hero__content">
            <h1 className="home-hero__title">
              Trusted Ethiopian fruit &amp; vegetable cooperative since 2002.
            </h1>
            <p className="home-hero__desc">
              Empowering 140+ primary cooperatives and over 50,000 farmers in the Great Rift Valley. Delivering sustainable, export-quality produce to the world.
            </p>
            <div className="home-hero__actions">
              <Button to="/products" variant="primary">
                View our products
              </Button>
              <Button to="/buyers" variant="outline">
                Request a quote
              </Button>
            </div>
          </div>
          <div className="home-hero__media">
            <img
              className="home-hero__img"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFch0HzPZdK6IBUm9F6o0BhHdnU6J8JwTAh4YOmI_T7LMhHKJB_as_Zg_NPO3687HsO271QgwQYzMkGx__hnlSRMPazW6FngVOwQbZknlUi5FH4LfCmgJcHiailwsnSFzkaYqHtkYvuH-S_Bz-4VHhkIXS2ji1Sw1bk2kjdXtQUW1kz-2ZWUKn84VfUCIyeJ3ZrG8vuEHeAilW4ZYmqjb-Awx6yPeESVKIO7W0nZaJaHcSIxms1WsP"
              alt="Lush vegetable farm in the Ethiopian Rift Valley Meki region"
            />
            <div className="home-hero__badge">
              <span className="label-caps">Meki, Oromia Region</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="home-stats section">
        <div className="container">
          <div className="home-stats__grid">
            {STATS.map((s) => (
              <div key={s.label} className="home-stats__card">
                <div className="home-stats__value">{s.value}</div>
                <div className="home-stats__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Strip */}
      <section className="home-cert">
        <div className="container home-cert__inner">
          <div className="home-cert__info">
            <span className="material-symbols-outlined home-cert__icon">verified</span>
            <div>
              <h3 className="home-cert__title">GlobalG.A.P Certified</h3>
              <p className="home-cert__desc">
                Meeting international standards for safe and sustainable agriculture.
              </p>
            </div>
          </div>
          <Link to="/about" className="btn btn--outline home-cert__btn">
            View Certificate
          </Link>
        </div>
      </section>

      {/* Featured Products Bento Grid */}
      <section className="home-bento section">
        <div className="container">
          <div className="home-bento__header">
            <div>
              <h2 className="home-bento__title">Export Quality Produce</h2>
              <p className="home-bento__desc">
                Sourced directly from our member cooperatives, ensuring freshness, quality, and fair trade.
              </p>
            </div>
            <Link to="/products" className="home-bento__link desktop-only">
              View full catalog <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="home-bento__grid">
            {/* Large Item */}
            <div className="home-bento__item home-bento__item--large">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfP0xqvF1OumYSfc4KDP0RB2RvYIWuZGy-JyOgV-f0GlTjSy4EXJt3sdkyaXStrbwwZhSgH2FZ8n-DEu-jPbY5GLtrdiQjbuh1fXAyQFtjpjLssD1SQAW-QEEIHFYYJ7JF6KA8RHpb6VfF6bATaeMT-gqx93rIbJ6aWy5Q8boskMG_SVdyTeqnT8Q4kY4anl5bSm1b9y0gAEW6b8VULbHx43q-v5014TeUNwuiNvFlfDqukclSRBL9"
                alt="Rift Valley Tomatoes"
                className="home-bento__img"
              />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <span className="label-caps label-caps--white mb-2">Export Grade</span>
                <h3 className="home-bento__item-title text-xl">Rift Valley Tomatoes</h3>
              </div>
            </div>

            {/* Small Item 1 */}
            <div className="home-bento__item home-bento__item--small">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvYlX5ibp4MNwbpUgoVGZztasklKa994UQuFT5_WCOSWJzPOMP07bsAr2ydONNPEi_eeSi5yVmfNrsIfB5JUptvt00jVaPt1r8S4V_gKQ__oHeBJgegRc6fHT8DsJFIpjcKDd8ZkCu6DVbLENp_lMqFnNSECjGXeM2SeUqp7cskRWB0iQ0liD7fhiwsTC_RbizFBGJ8WJkEj-iDeiNyn5nBqo5V6Z5yPcWIsIzEc0PG5BwwpM0emH7"
                alt="Red Onions"
                className="home-bento__img"
              />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <h3 className="home-bento__item-title">Red Onions</h3>
              </div>
            </div>

            {/* Small Item 2 */}
            <div className="home-bento__item home-bento__item--small">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBl2WKGQHcO7oUsiBiuca6vqTzEKbZsLXsyvfOPRp6YRe0ikpGg47m6dMix-_mzq28D8CMLQtW8CxtcEXrP5yeVtSerCWU8biSdX48vbbxUf9GF4oOs4GnaIKRne_OOVEby0qpSWfwt0hyJdiBhegrdUP6Nb0knbVvOSiMgPaCbgqj-bezIOy9UQ0etOvmV-X3G6tvpgXRr-C3AwV9FMRYPlVakfgXa9q56zK127dZl0RbDoCl_k7sc"
                alt="Green Peppers"
                className="home-bento__img"
              />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <h3 className="home-bento__item-title">Green Peppers</h3>
              </div>
            </div>

            {/* Wide Item 1 */}
            <div className="home-bento__item home-bento__item--wide">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC6-LnBnxoec0RzspHWkNKcW-DLU1c_pGnxJkQwjanGYvAeVGHpEodLsFhm_zOMXeOe_0c-MpBfMlt6e6qK6Kzmyt9bkLenffQ33XzB5YylZO2OmvCKRKcOeVFpBfXawZjQ-U34HA9-BZtYpXtq6rCmeNGeEvfRJW86sqXv1i74wrNlDzbdmlsjqUf0fZ7lMQtE0SL-xqpedsDAVoPQC1mvxAjQKr-wQXO-r4-IudvbuSX0rugBoUA"
                alt="Green Beans"
                className="home-bento__img"
              />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <h3 className="home-bento__item-title">Green Beans</h3>
              </div>
            </div>

            {/* Wide Item 2 */}
            <div className="home-bento__item home-bento__item--wide">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApao1nWS1-JcPHH-aOam-vXV-2F1nx4p3qvYdy853RrLoSPgTwa9kve6NyVNNgWa7O6llryn_c3RAeHtmBKqeptnPWOAK3-sidQ2csQYELSWb7ChtbqNAwtvNfdtfxMwSkPjqOKClrr1Nw10Qzq7n5IQQD8o9ztxI3K4N1-RP258eHdp-J5gMlc9QsIJctqGjpwaWbNhgKicllKpbap5sRQ_XJGEgcnZF4zLUpAYSSeU_sLJeuFAXh"
                alt="Papaya"
                className="home-bento__img"
              />
              <div className="home-bento__overlay" />
              <div className="home-bento__content">
                <h3 className="home-bento__item-title">Papaya</h3>
              </div>
            </div>
          </div>

          <Link to="/products" className="home-bento__link mobile-only mt-6">
            View full catalog <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* Audience Split */}
      <section className="home-audience section">
        <div className="container">
          <div className="home-audience__grid">
            <div className="home-audience__card">
              <span className="material-symbols-outlined home-audience__icon">group</span>
              <h2 className="home-audience__card-title">For member cooperatives</h2>
              <p className="home-audience__card-desc">
                Access agricultural inputs, training, and direct market linkages. We support our members in improving yields and ensuring sustainable livelihoods.
              </p>
              <Link to="/farmers" className="home-audience__link">
                Join the union <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            <div className="home-audience__card">
              <span className="material-symbols-outlined home-audience__icon">local_shipping</span>
              <h2 className="home-audience__card-title">For buyers &amp; exporters</h2>
              <p className="home-audience__card-desc">
                Source reliable, certified, and traceable produce directly from the heart of Ethiopia's agricultural hub. Consistent quality and volume guaranteed.
              </p>
              <Link to="/buyers" className="home-audience__link">
                Partner with us <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
