import json

with open('src/i18n/locales/en/about.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

if 'hero' not in data:
    data['hero'] = {}
data['hero']['imageAlt'] = 'Fertile Ethiopian agricultural land during golden hour'
data['governance']['teamTag'] = 'Management Team'
data['governance']['teamSubtitle'] = 'Executive Leadership'
data['governance']['teamDesc'] = 'Union directors and department heads driving cooperative operations.'
data['governance']['swipeHint'] = 'Swipe to browse leadership ({{count}})'
data['governance']['memberAlt'] = '{{name}} - {{title}}'
data['governance']['emailTitle'] = 'Email {{name}}: {{email}}'
data['governance']['emailAria'] = 'Email {{name}} at {{email}}'

data['missionVision']['downloadPdfTitle'] = 'Download Meki Batu Union Company Profile (PDF)'

data['partners']['pillars'] = {
    'p1': {
        'step': 'Pillar 01',
        'title': 'Research & Seed Trials',
        'desc': 'Partnering with EIAR and OARI to test and multiply high-germination certified seed varieties.'
    },
    'p2': {
        'step': 'Pillar 02',
        'title': 'Landscape & Sustainability',
        'desc': 'Collaborating with Wetlands International and IDH on Rift Valley conservation and drip irrigation.'
    },
    'p3': {
        'step': 'Pillar 03',
        'title': 'Cold-Chain & Logistics',
        'desc': 'Equipped with ATI refrigerated fleet and pack house precooling to minimize post-harvest loss.'
    },
    'p4': {
        'step': 'Pillar 04',
        'title': 'Market Access & Off-Taking',
        'desc': 'Supplying Ethiopian Airlines Inflight Catering, European exporters, and Addis Ababa retail outlets.'
    }
}
data['partners']['logoAlt'] = '{{name}} logo'
data['partners']['visitTitle'] = 'Visit {{name}} website'
data['partners']['officialWebsite'] = 'Official Website'

with open('src/i18n/locales/en/about.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

with open('src/pages/About.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('imageAlt="Fertile Ethiopian agricultural land during golden hour"', 'imageAlt={t(\'about:hero.imageAlt\')}')
content = content.replace('title="Download Meki Batu Union Company Profile (PDF)"', 'title={t(\'about:missionVision.downloadPdfTitle\')}')
content = content.replace('>Management Team</span>', '>{t(\'about:governance.teamTag\')}</span>')
content = content.replace('>Executive Leadership</h3>', '>{t(\'about:governance.teamSubtitle\')}</h3>')
content = content.replace('>Union directors and department heads driving cooperative operations.</p>', '>{t(\'about:governance.teamDesc\')}</p>')
content = content.replace('>Swipe to browse leadership ({teamMembers.length})</span>', '>{t(\'about:governance.swipeHint\', { count: teamMembers.length })}</span>')

content = content.replace('alt={`${member.name} - ${member.title}`}', 'alt={t(\'about:governance.memberAlt\', { name: member.name, title: member.title })}')
content = content.replace('title={`Email ${member.name}: ${member.email}`}', 'title={t(\'about:governance.emailTitle\', { name: member.name, email: member.email })}')
content = content.replace('aria-label={`Email ${member.name} at ${member.email}`}', 'aria-label={t(\'about:governance.emailAria\', { name: member.name, email: member.email })}')

content = content.replace('>Pillar 01</span>', '>{t(\'about:partners.pillars.p1.step\')}</span>')
content = content.replace('>Research &amp; Seed Trials</h3>', '>{t(\'about:partners.pillars.p1.title\')}</h3>')
content = content.replace('>\n                Partnering with EIAR and OARI to test and multiply high-germination certified seed varieties.\n              </p>', '>{t(\'about:partners.pillars.p1.desc\')}</p>')

content = content.replace('>Pillar 02</span>', '>{t(\'about:partners.pillars.p2.step\')}</span>')
content = content.replace('>Landscape &amp; Sustainability</h3>', '>{t(\'about:partners.pillars.p2.title\')}</h3>')
content = content.replace('>\n                Collaborating with Wetlands International and IDH on Rift Valley conservation and drip irrigation.\n              </p>', '>{t(\'about:partners.pillars.p2.desc\')}</p>')

content = content.replace('>Pillar 03</span>', '>{t(\'about:partners.pillars.p3.step\')}</span>')
content = content.replace('>Cold-Chain &amp; Logistics</h3>', '>{t(\'about:partners.pillars.p3.title\')}</h3>')
content = content.replace('>\n                Equipped with ATI refrigerated fleet and pack house precooling to minimize post-harvest loss.\n              </p>', '>{t(\'about:partners.pillars.p3.desc\')}</p>')

content = content.replace('>Pillar 04</span>', '>{t(\'about:partners.pillars.p4.step\')}</span>')
content = content.replace('>Market Access &amp; Off-Taking</h3>', '>{t(\'about:partners.pillars.p4.title\')}</h3>')
content = content.replace('>\n                Supplying Ethiopian Airlines Inflight Catering, European exporters, and Addis Ababa retail outlets.\n              </p>', '>{t(\'about:partners.pillars.p4.desc\')}</p>')

content = content.replace('alt={`${partner.name} logo`}', 'alt={t(\'about:partners.logoAlt\', { name: partner.name })}')
content = content.replace('title={`Visit ${partner.name} website`}', 'title={t(\'about:partners.visitTitle\', { name: partner.name })}')
content = content.replace('>Official Website</span>', '>{t(\'about:partners.officialWebsite\')}</span>')

with open('src/pages/About.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
