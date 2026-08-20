import Reveal from './Reveal.jsx'
import './WhereWeOperate.css'

export default function WhereWeOperate() {
  return (
    <section className="where-operate section">
      <div className="container">
        <div className="where-operate__grid">
          {/* Left — text content */}
          <Reveal className="where-operate__content">
            <span className="label-caps label-caps--secondary mb-2 block">Our Region</span>
            <h2 className="where-operate__title">Where We Operate</h2>
            <p className="where-operate__desc">
              Our member cooperatives farm in the heart of Ethiopia&rsquo;s Great
              Rift Valley, near Lake Ziway&nbsp;&mdash; one of the country&rsquo;s
              most productive irrigated agricultural zones.
            </p>
            <div className="where-operate__tags">
              <span className="where-operate__tag">Dugda Woreda</span>
              <span className="where-operate__tag">Adami Tulu Jido Kombolcha</span>
            </div>
          </Reveal>

          {/* Right — stylised location graphic */}
          <Reveal className="where-operate__map-panel" delay={90}>
            <svg
              className="where-operate__svg"
              viewBox="0 0 320 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Stylised map showing operating regions near Lake Ziway"
            >
              {/* Rift Valley line */}
              <line x1="40" y1="10" x2="280" y2="230" className="where-operate__rift" />

              {/* Lake Ziway */}
              <ellipse cx="160" cy="148" rx="85" ry="48" className="where-operate__lake" />
              <text x="160" y="152" textAnchor="middle" className="where-operate__lake-label">
                Lake Ziway
              </text>

              {/* Pin — Dugda Woreda */}
              <g transform="translate(80, 42)">
                <path
                  d="M10 0C4.5 0 0 4.5 0 10c0 7.5 10 17 10 17s10-9.5 10-17C20 4.5 15.5 0 10 0zm0 13.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z"
                  className="where-operate__pin"
                />
              </g>
              <text x="90" y="74" textAnchor="middle" className="where-operate__place-label">
                Dugda
              </text>

              {/* Pin — Adami Tulu */}
              <g transform="translate(210, 55)">
                <path
                  d="M10 0C4.5 0 0 4.5 0 10c0 7.5 10 17 10 17s10-9.5 10-17C20 4.5 15.5 0 10 0zm0 13.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z"
                  className="where-operate__pin"
                />
              </g>
              <text x="220" y="88" textAnchor="middle" className="where-operate__place-label">
                Adami Tulu
              </text>

              {/* Meki town dot */}
              <circle cx="150" cy="70" r="4" className="where-operate__dot" />
              <circle cx="150" cy="70" r="8" className="where-operate__dot-ring" />
              <text x="163" y="68" textAnchor="start" className="where-operate__town-label">
                Meki
              </text>
            </svg>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
