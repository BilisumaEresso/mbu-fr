import json

with open('src/i18n/locales/en/retailOutlets.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

if 'hero' not in data:
    data['hero'] = {}
data['hero']['imageAlt'] = 'Pristine fresh produce display in a modern retail setting'

data['locations']['ariaViewDetails'] = 'View details and map for {{name}}'
data['locations']['mapTitle'] = 'Map showing {{name}}'

if 'freshProduce' not in data:
    data['freshProduce'] = {}
data['freshProduce']['imageAlt'] = 'Fresh produce delivery arrives at an Addis Ababa retail store'

with open('src/i18n/locales/en/retailOutlets.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)


with open('src/pages/RetailOutlets.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('imageAlt="Pristine fresh produce display in a modern retail setting"', 'imageAlt={t(\'retailOutlets:hero.imageAlt\')}')
content = content.replace('aria-label={`View details and map for ${outlet.name}`}', 'aria-label={t(\'retailOutlets:locations.ariaViewDetails\', { name: outlet.name })}')
content = content.replace('title={`Map showing ${activeOutlet.name}`}', 'title={t(\'retailOutlets:locations.mapTitle\', { name: activeOutlet.name })}')
content = content.replace('title={`Map showing ${activeModalOutlet.name}`}', 'title={t(\'retailOutlets:locations.mapTitle\', { name: activeModalOutlet.name })}')
content = content.replace('alt="Fresh produce delivery arrives at an Addis Ababa retail store"', 'alt={t(\'retailOutlets:freshProduce.imageAlt\')}')

with open('src/pages/RetailOutlets.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
