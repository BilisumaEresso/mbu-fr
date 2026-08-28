import json

with open('src/i18n/locales/en/legal.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

if 'common' not in data:
    data['common'] = {}
data['common']['emailLabel'] = 'Email: '

with open('src/i18n/locales/en/legal.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)


with open('src/pages/PrivacyPolicy.jsx', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('<strong>Email: </strong>', '<strong>{t(\'legal:common.emailLabel\')}</strong>')
content = content.replace('<strong>Email:</strong>', '<strong>{t(\'legal:common.emailLabel\')}</strong>')
with open('src/pages/PrivacyPolicy.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

with open('src/pages/TermsOfService.jsx', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('<strong>Email: </strong>', '<strong>{t(\'legal:common.emailLabel\')}</strong>')
content = content.replace('<strong>Email:</strong>', '<strong>{t(\'legal:common.emailLabel\')}</strong>')
with open('src/pages/TermsOfService.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
