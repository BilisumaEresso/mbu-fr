import { useState } from 'react'
import Reveal from './Reveal.jsx'
import ResourceCard from './ResourceCard.jsx'
import ResourceModal from './ResourceModal.jsx'
import { resources, RESOURCE_CATEGORIES, RESOURCE_METRICS } from '../../data/resources.js'
import './InfrastructureSection.css'

function InfrastructureSection() {
  const [selectedCategory, setSelectedCategory] = useState(RESOURCE_CATEGORIES.ALL)
  const [activeModalResource, setActiveModalResource] = useState(null)

  const filteredResources = selectedCategory === RESOURCE_CATEGORIES.ALL
    ? resources
    : resources.filter((r) => r.category === selectedCategory)

  return (
    <section className="infrastructure-section section" id="infrastructure" aria-label="Union Operational Resources and Infrastructure">
      <div className="container">
        {/* Section Header */}
        <Reveal className="infrastructure-section__header text-center">
          <span className="label-caps label-caps--secondary mb-2 block">Physical Infrastructure &amp; Assets</span>
          <h2 className="infrastructure-section__title">Operational Resources</h2>
          <p className="infrastructure-section__desc">
            The logistical and technical backbone powering our 135 member cooperatives — from 2,000-tonne cold storage and refrigerated transport fleets to seed conditioning plants and lake pumping stations.
          </p>
        </Reveal>

        {/* Telemetry Metrics Bar */}
        <Reveal className="infrastructure-section__metrics-bar mb-12">
          {RESOURCE_METRICS.map((m) => (
            <div key={m.label} className="infrastructure-metric-pill">
              <span className="material-symbols-outlined infrastructure-metric-pill__icon">{m.icon}</span>
              <div className="infrastructure-metric-pill__text">
                <strong className="infrastructure-metric-pill__val">{m.value}</strong>
                <span className="infrastructure-metric-pill__lbl">{m.label}</span>
                <span className="infrastructure-metric-pill__desc">{m.desc}</span>
              </div>
            </div>
          ))}
        </Reveal>

        {/* Category Filter Tabs */}
        <div className="infrastructure-section__filter-bar" role="tablist" aria-label="Filter resources by category">
          {Object.values(RESOURCE_CATEGORIES).map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`infrastructure-tab-btn ${selectedCategory === cat ? 'infrastructure-tab-btn--active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
              <span className="infrastructure-tab-count">
                {cat === RESOURCE_CATEGORIES.ALL
                  ? resources.length
                  : resources.filter((r) => r.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Resource Cards Grid */}
        <div className="infrastructure-section__grid">
          {filteredResources.map((res, index) => (
            <Reveal key={res.id} delay={Math.min(index * 60, 360)} className="infrastructure-card-wrap">
              <ResourceCard resource={res} onSelect={setActiveModalResource} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Detail Specifications Modal */}
      {activeModalResource && (
        <ResourceModal
          resource={activeModalResource}
          onClose={() => setActiveModalResource(null)}
        />
      )}
    </section>
  )
}

export default InfrastructureSection
