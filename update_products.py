import json

with open('src/i18n/locales/en/products.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

if 'hero' not in data:
    data['hero'] = {}
data['hero']['imageAlt'] = 'Fresh harvest of red tomatoes in wooden crate on dark Ethiopian soil'

if 'catalog' not in data:
    data['catalog'] = {}
data['catalog']['showingPrefix'] = 'Showing'
data['catalog']['commodity'] = 'commodity'
data['catalog']['commodities'] = 'commodities'

if 'labels' not in data['catalog']:
    data['catalog']['labels'] = {}
data['catalog']['labels']['varieties'] = 'Varieties:'
data['catalog']['labels']['producedVarieties'] = 'Produced Varieties'
data['catalog']['labels']['globalGap'] = 'GlobalG.A.P Certified'

data['catalog']['ariaViewDetails'] = 'View specifications for {{name}}'

if 'perks' not in data['catalog']:
    data['catalog']['perks'] = {}
data['catalog']['perks']['traceable'] = '100% Traceable to Member Co-ops'
data['catalog']['perks']['coldChain'] = 'Direct Cold-Chain Transit'

if 'calendar' not in data:
    data['calendar'] = {}
data['calendar']['mobileHint'] = 'Scroll horizontally to view full calendar'

if 'table' not in data['calendar']:
    data['calendar']['table'] = {}
data['calendar']['table']['commodity'] = 'Commodity'
data['calendar']['table']['category'] = 'Category'
data['calendar']['table']['harvestWindow'] = 'Main Harvest Window'
data['calendar']['table']['exportAvailability'] = 'Export Availability'

with open('src/i18n/locales/en/products.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)


with open('src/pages/Products.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('imageAlt="Fresh harvest of red tomatoes in wooden crate on dark Ethiopian soil"', 'imageAlt={t(\'products:hero.imageAlt\')}')

showing_old = '''<span>
                Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'commodity' : 'commodities'}
              </span>'''
showing_new = '''<span>
                {t('products:catalog.showingPrefix')} <strong>{filtered.length}</strong> {filtered.length === 1 ? t('products:catalog.commodity') : t('products:catalog.commodities')}
              </span>'''
content = content.replace(showing_old, showing_new)

content = content.replace('>Varieties:</span>', '>{t(\'products:catalog.labels.varieties\')}</span>')
content = content.replace('aria-label={`View specifications for ${item.name}`}', 'aria-label={t(\'products:catalog.ariaViewDetails\', { name: item.name })}')
content = content.replace('>GlobalG.A.P Certified</span>', '>{t(\'products:catalog.labels.globalGap\')}</span>')
content = content.replace('>Produced Varieties</span>', '>{t(\'products:catalog.labels.producedVarieties\')}</span>')

content = content.replace('>100% Traceable to Member Co-ops</span>', '>{t(\'products:catalog.perks.traceable\')}</span>')
content = content.replace('>Direct Cold-Chain Transit</span>', '>{t(\'products:catalog.perks.coldChain\')}</span>')

content = content.replace('>Scroll horizontally to view full calendar</span>', '>{t(\'products:calendar.mobileHint\')}</span>')

content = content.replace('<th>Commodity</th>', '<th>{t(\'products:calendar.table.commodity\')}</th>')
content = content.replace('<th>Category</th>', '<th>{t(\'products:calendar.table.category\')}</th>')
content = content.replace('<th>Main Harvest Window</th>', '<th>{t(\'products:calendar.table.harvestWindow\')}</th>')
content = content.replace('<th>Export Availability</th>', '<th>{t(\'products:calendar.table.exportAvailability\')}</th>')

with open('src/pages/Products.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
