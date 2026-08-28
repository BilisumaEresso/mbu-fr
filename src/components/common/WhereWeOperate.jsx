import { useTranslation } from 'react-i18next'
import Reveal from './Reveal.jsx'
import './WhereWeOperate.css'

export default function WhereWeOperate() {
  const { t } = useTranslation('common')

  return (
    <section className="where-operate section">
      <div className="container">
        <div className="where-operate__grid">
          {/* Left — text content */}
          <Reveal className="where-operate__content">
            <span className="label-caps label-caps--secondary mb-2 block">
              {t('whereWeOperate.region')}
            </span>
            <h2 className="where-operate__title">
              {t('whereWeOperate.title')}
            </h2>
            <p className="where-operate__desc">
              {t('whereWeOperate.desc')}
            </p>
            <div className="where-operate__tags">
              <span className="where-operate__tag">{t('whereWeOperate.districts.dugda')}</span>
              <span className="where-operate__tag">{t('whereWeOperate.districts.adamiTulu')}</span>
              <span className="where-operate__tag">{t('whereWeOperate.districts.bora')}</span>
              <span className="where-operate__tag">{t('whereWeOperate.districts.zuwayDugda')}</span>
              <span className="where-operate__tag">{t('whereWeOperate.districts.adama')}</span>
              <span className="where-operate__tag">{t('whereWeOperate.districts.dodotaSire')}</span>
            </div>
            <a
              href="https://maps.app.goo.gl/HBFW3h7pe7W5tkMm8"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline btn--sm where-operate__cta"
            >
              {t('buttons.openGoogleMaps')}
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          </Reveal>

          {/* Right — embedded Google Map */}
          <Reveal className="where-operate__map-panel" delay={90}>
            <iframe
              className="where-operate__iframe"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15780!2d38.812974!3d8.143274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2set"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t('whereWeOperate.mapTitle', 'Meki Batu Union location — Meki Town, East Shewa Zone, Oromia, Ethiopia')}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
