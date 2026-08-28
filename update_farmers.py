import json

with open('src/i18n/locales/en/farmers.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

if 'hero' not in data:
    data['hero'] = {}
data['hero']['imageAlt'] = 'Ethiopian farmers in a professional agricultural packhouse'

if 'steps' not in data:
    data['steps'] = {}
data['steps']['imageAlt'] = 'Cooperative training session outdoors in a field in Ethiopia'

data['portal'] = {
    'title': 'Digital Member Portal',
    'badge': 'Phase 2 Development - Coming Soon',
    'desc': 'A secure digital platform under active development for member cooperatives to track crop deliveries, access market prices, request inputs, and manage union accounts online.',
    'button': 'Access Member Portal'
}

with open('src/i18n/locales/en/farmers.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)


with open('src/pages/Farmers.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('imageAlt="Ethiopian farmers in a professional agricultural packhouse"', 'imageAlt={t(\'farmers:hero.imageAlt\')}')
content = content.replace('alt="Cooperative training session outdoors in a field in Ethiopia"', 'alt={t(\'farmers:steps.imageAlt\')}')

content = content.replace('>Digital Member Portal</h2>', '>{t(\'farmers:portal.title\')}</h2>')
content = content.replace('>\n              Phase 2 Development - Coming Soon\n            </span>', '>\n              {t(\'farmers:portal.badge\')}\n            </span>')
content = content.replace('>\n              A secure digital platform under active development for member cooperatives to track crop deliveries, access market prices, request inputs, and manage union accounts online.\n            </p>', '>\n              {t(\'farmers:portal.desc\')}\n            </p>')
content = content.replace('>\n              Access Member Portal\n              <span', '>\n              {t(\'farmers:portal.button\')}\n              <span')

with open('src/pages/Farmers.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
