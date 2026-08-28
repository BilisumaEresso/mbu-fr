import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('images={HERO_IMAGES}', 'images={getHeroImages(t)}')
content = content.replace('items={TESTIMONIALS}', 'items={getTestimonials(t)}')

content = content.replace('>Meki, Oromia</span>', '>{t(\'home:hero.locationBadge\')}</span>')
content = content.replace('Our Story &bull; Meki Batu Union', '{t(\'home:hero.storyBadge\')}')
content = content.replace('title="Meki Batu Union Story Video"', 'title={t(\'home:hero.videoTitle\')}')

steps_old = '''[
              {
                num: '01',
                icon: 'verified',
                title: 'Grading & Intake',
                tag: 'Field Intake',
                desc: 'Rigorous physical intake inspection, moisture checks, and grade calibration at primary member cooperatives.',
              },
              {
                num: '02',
                icon: 'ac_unit',
                title: 'Cold Stabilization',
                tag: 'Pack House',
                desc: 'Rapid field heat removal, hydro-cooling, and temperature-controlled batch staging at our central union hub.',
              },
              {
                num: '03',
                icon: 'sanitizer',
                title: 'Sanitary Cleaning',
                tag: 'GlobalG.A.P',
                desc: 'Food-safe sanitizing wash lines, organic residue filtration, and GlobalG.A.P compliant sorting protocols.',
              },
              {
                num: '04',
                icon: 'local_shipping',
                title: 'Export Packing',
                tag: 'Global Freight',
                desc: 'Ventilated export cartons and refrigerated reefer dispatch to Ethiopian Airlines air cargo & regional markets.',
              },
            ]'''

steps_new = '''[
              {
                num: '01',
                icon: 'verified',
                title: t('home:process.steps.grading.title'),
                tag: t('home:process.steps.grading.tag'),
                desc: t('home:process.steps.grading.desc'),
              },
              {
                num: '02',
                icon: 'ac_unit',
                title: t('home:process.steps.cold.title'),
                tag: t('home:process.steps.cold.tag'),
                desc: t('home:process.steps.cold.desc'),
              },
              {
                num: '03',
                icon: 'sanitizer',
                title: t('home:process.steps.sanitary.title'),
                tag: t('home:process.steps.sanitary.tag'),
                desc: t('home:process.steps.sanitary.desc'),
              },
              {
                num: '04',
                icon: 'local_shipping',
                title: t('home:process.steps.packing.title'),
                tag: t('home:process.steps.packing.tag'),
                desc: t('home:process.steps.packing.desc'),
              },
            ]'''

content = content.replace(steps_old, steps_new)

content = content.replace('alt={`${partner.name} logo`}', 'alt={t(\'home:partners.logoAlt\', { name: partner.name })}')
content = content.replace('title={`${partner.name} (${partner.category})`}', 'title={t(\'home:partners.logoTitle\', { name: partner.name, category: partner.category })}')

content = content.replace('span className="label-caps label-caps--secondary mb-2 block">Documentation</span>', 'span className="label-caps label-caps--secondary mb-2 block">{t(\'home:documentation.tag\')}</span>')
content = content.replace('h2 className="home-resources__title">Key Resources &amp; Downloads</h2>', 'h2 className="home-resources__title">{t(\'home:documentation.title\')}</h2>')
content = content.replace('h3 className="home-resources__card-title">Company Profile</h3>', 'h3 className="home-resources__card-title">{t(\'home:documentation.companyProfile.title\')}</h3>')
content = content.replace('p className="home-resources__card-desc">History, cooperative governance, and operational capacity overview.</p>', 'p className="home-resources__card-desc">{t(\'home:documentation.companyProfile.desc\')}</p>')
content = content.replace('title="Download Meki Batu Union Company Profile (PDF)"', 'title={t(\'home:documentation.companyProfile.download\')}')
content = content.replace('p className="home-resources__card-desc">GlobalG.A.P certification and official seed producer documentation.</p>', 'p className="home-resources__card-desc">{t(\'home:documentation.impactReports.desc\')}</p>')
content = content.replace('p className="home-resources__card-desc">Full specifications for fresh produce and certified vegetable seeds.</p>', 'p className="home-resources__card-desc">{t(\'home:documentation.products.desc\')}</p>')

content = content.replace('alt="Green Beans"', 'alt={t(\'home:bento.items.greenBeans.alt\')}')

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
