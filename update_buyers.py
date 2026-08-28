import json

with open('src/i18n/locales/en/buyers.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

if 'hero' not in data:
    data['hero'] = {}
data['hero']['imageAlt'] = 'Export quality produce being sorted and packed in modern facility'
data['hero']['downloadPdfTitle'] = 'Download Meki Batu Union Company Profile (PDF)'

with open('src/i18n/locales/en/buyers.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)


with open('src/pages/Buyers.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('imageAlt="Export quality produce being sorted and packed in modern facility"', 'imageAlt={t(\'buyers:hero.imageAlt\')}')
content = content.replace('title="Download Meki Batu Union Company Profile (PDF)"', 'title={t(\'buyers:hero.downloadPdfTitle\')}')

with open('src/pages/Buyers.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
