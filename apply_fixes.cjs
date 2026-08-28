const fs = require('fs');
const path = require('path');

const omDir = './src/i18n/locales/om';
const mdFile = './review_translations.md';

const content = fs.readFileSync(mdFile, 'utf8');
const lines = content.split('\n');

// Extract all tab-separated lines with [FIX: ...] in 3rd column
const fixes = [];
for (const line of lines) {
  const parts = line.split('\t');
  if (parts.length >= 3) {
    const key = parts[0].trim();
    const fixCol = parts[2] ? parts[2].trim() : '';
    const fixMatch = fixCol.match(/^\[FIX:\s*([\s\S]+)\]$/);
    if (fixMatch && key && !key.startsWith('#') && !key.startsWith('>') && !key.startsWith('KEY')) {
      fixes.push({ key, value: fixMatch[1].trim() });
    }
  }
}

console.log('Total fixes found:', fixes.length);

// Group by file prefix based on first segment — we need to map keys to their JSON files
// Strategy: load all OM JSON files, try to find & update key using dot notation
function getNestedFiles() {
  const result = {};
  fs.readdirSync(omDir).filter(f => f.endsWith('.json')).forEach(file => {
    result[file] = JSON.parse(fs.readFileSync(path.join(omDir, file), 'utf8'));
  });
  return result;
}

function setNestedKey(obj, keyPath, value) {
  const parts = keyPath.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (cur[parts[i]] === undefined) return false;
    cur = cur[parts[i]];
    if (typeof cur !== 'object' || cur === null) return false;
  }
  const last = parts[parts.length - 1];
  if (cur[last] === undefined && !(last in cur)) return false;
  cur[last] = value;
  return true;
}

function hasNestedKey(obj, keyPath) {
  const parts = keyPath.split('.');
  let cur = obj;
  for (const part of parts) {
    if (typeof cur !== 'object' || cur === null || !(part in cur)) return false;
    cur = cur[part];
  }
  return true;
}

// Parse value: if it starts with [ or {, try JSON.parse, else keep string
function parseValue(raw) {
  const trimmed = raw.trim();
  if ((trimmed.startsWith('[') && trimmed.endsWith(']')) ||
      (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
    try {
      return JSON.parse(trimmed);
    } catch (e) {
      // return as string if invalid JSON
      return trimmed;
    }
  }
  return trimmed;
}

const jsonFiles = getNestedFiles();
const stats = { applied: 0, notFound: 0, skipped: [] };

for (const { key, value } of fixes) {
  const parsedValue = parseValue(value);
  let applied = false;
  for (const [file, data] of Object.entries(jsonFiles)) {
    if (hasNestedKey(data, key)) {
      setNestedKey(data, key, parsedValue);
      applied = true;
      stats.applied++;
      break;
    }
  }
  if (!applied) {
    stats.notFound++;
    stats.skipped.push(key);
  }
}

// Write all updated files back
for (const [file, data] of Object.entries(jsonFiles)) {
  fs.writeFileSync(path.join(omDir, file), JSON.stringify(data, null, 2) + '\n', 'utf8');
}

console.log('Applied:', stats.applied);
console.log('Not found in any file:', stats.notFound);
if (stats.skipped.length > 0) {
  console.log('Skipped keys:', stats.skipped.slice(0, 20));
}
