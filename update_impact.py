import json

with open('src/i18n/locales/en/impact.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

if 'hero' not in data:
    data['hero'] = {}
data['hero']['imageAlt'] = 'Vibrant thriving agricultural field in Ethiopia during golden hour'

if 'metrics' not in data:
    data['metrics'] = {}
data['metrics']['imageAlt'] = 'Women farmers in cooperative fields in Ethiopia'

with open('src/i18n/locales/en/impact.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)


with open('src/pages/Impact.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('imageAlt="Vibrant thriving agricultural field in Ethiopia during golden hour"', 'imageAlt={t(\'impact:hero.imageAlt\')}')
content = content.replace('alt="Women farmers in cooperative fields in Ethiopia"', 'alt={t(\'impact:metrics.imageAlt\')}')

with open('src/pages/Impact.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
