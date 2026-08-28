import json

with open('src/i18n/locales/en/news.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

if 'labels' not in data:
    data['labels'] = {}
data['labels']['readReportAria'] = 'Read report: {{title}}'
data['labels']['readArticleAria'] = 'Read article: {{title}}'
data['labels']['readTime'] = '5 min read'

data['article'] = {
    'paragraph1': 'Meki Batu Union continues to drive agricultural innovation across our 135 member primary cooperatives representing 8,089 farmers. Through strategic investments in infrastructure, technology, and sustainable farming practices, we empower smallholder farmers in the Great Rift Valley to achieve high-yield, export-grade output.',
    'paragraph2': 'This initiative directly aligns with our core mission of promoting economic resilience, environmental stewardship, and fair trade. By bridging local agricultural communities with international markets, we ensure high quality, traceable produce for our global partners.'
}

with open('src/i18n/locales/en/news.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)


with open('src/pages/News.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('aria-label={`Read report: ${featuredLarge.title}`}', 'aria-label={t(\'news:labels.readReportAria\', { title: featuredLarge.title })}')
content = content.replace('aria-label={`Read article: ${featuredSmall.title}`}', 'aria-label={t(\'news:labels.readArticleAria\', { title: featuredSmall.title })}')
content = content.replace('aria-label={`Read article: ${article.title}`}', 'aria-label={t(\'news:labels.readArticleAria\', { title: article.title })}')
content = content.replace('5 min read', '{t(\'news:labels.readTime\')}')

p1_old = 'Meki Batu Union continues to drive agricultural innovation across our 135 member primary cooperatives representing 8,089 farmers. Through strategic investments in infrastructure, technology, and sustainable farming practices, we empower smallholder farmers in the Great Rift Valley to achieve high-yield, export-grade output.'
content = content.replace(p1_old, '{t(\'news:article.paragraph1\')}')

p2_old = 'This initiative directly aligns with our core mission of promoting economic resilience, environmental stewardship, and fair trade. By bridging local agricultural communities with international markets, we ensure high quality, traceable produce for our global partners.'
content = content.replace(p2_old, '{t(\'news:article.paragraph2\')}')

with open('src/pages/News.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
