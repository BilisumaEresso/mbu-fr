const fs = require('fs');
const path = require('path');

const enDir = './src/i18n/locales/en';
const omDir = './src/i18n/locales/om';
const outFile = './review_translations.md';

const files = fs.readdirSync(enDir).filter(f => f.endsWith('.json')).sort();

function flattenKeys(obj, prefix) {
  prefix = prefix || '';
  const result = {};
  for (const k in obj) {
    const fullKey = prefix ? prefix + '.' + k : k;
    const val = obj[k];
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      Object.assign(result, flattenKeys(val, fullKey));
    } else {
      result[fullKey] = typeof val === 'string' ? val : JSON.stringify(val);
    }
  }
  return result;
}

let md = '# MBU Translation Review\n\n';
md += '> **How to review:** Each section covers one JSON file. Rows show `KEY | EN | OM`. ';
md += 'To request a fix, replace the OM cell content with `[FIX: your corrected text here]`. ';
md += 'Return this file and all marked fixes will be applied automatically to the JSON source files.\n\n';
md += '---\n\n';

files.forEach(function(file) {
  const enData = JSON.parse(fs.readFileSync(path.join(enDir, file), 'utf8'));
  const omData = JSON.parse(fs.readFileSync(path.join(omDir, file), 'utf8'));

  const enFlat = flattenKeys(enData);
  const omFlat = flattenKeys(omData);

  md += '## ' + file + '\n\n';
  md += '| KEY | EN (English) | OM (Afaan Oromoo) |\n';
  md += '|-----|-------------|-------------------|\n';

  Object.keys(enFlat).forEach(function(key) {
    const enVal = (enFlat[key] || '').replace(/\|/g, '\uFF5C').replace(/\n/g, ' \u21B5 ');
    const omVal = (omFlat[key] || '\u26A0\uFE0F MISSING').replace(/\|/g, '\uFF5C').replace(/\n/g, ' \u21B5 ');
    const safeKey = key.replace(/\|/g, '\uFF5C');
    md += '| `' + safeKey + '` | ' + enVal + ' | ' + omVal + ' |\n';
  });

  md += '\n---\n\n';
});

fs.writeFileSync(outFile, md, 'utf8');
console.log('Done. Total lines: ' + md.split('\n').length);
console.log('Output: ' + path.resolve(outFile));
