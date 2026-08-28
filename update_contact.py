import json

with open('src/i18n/locales/en/contact.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

if 'info' not in data:
    data['info'] = {}
data['info']['imageAlt'] = 'Rich dark agricultural soil with green crops in Meki'

with open('src/i18n/locales/en/contact.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)


with open('src/pages/Contact.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('alt="Rich dark agricultural soil with green crops in Meki"', 'alt={t(\'contact:info.imageAlt\')}')

with open('src/pages/Contact.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
