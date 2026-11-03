const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
function loadTs(file) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.ES2022, true);
  function checkDuplicates(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const seen = new Set();
      for (const property of node.properties) {
        if (!property.name) continue;
        const name = property.name.getText(ast).replace(/^['"]|['"]$/g, '');
        assert.ok(!seen.has(name), `${file}: duplicate key ${name}`);
        seen.add(name);
      }
    }
    ts.forEachChild(node, checkDuplicates);
  }
  checkDuplicates(ast);
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  }).outputText;
  const context = { exports: {} };
  vm.runInNewContext(code, context);
  return context.exports;
}

const { TRANSLATIONS } = loadTs('src/app/translations.ts');
if (process.argv.includes('--json')) {
  process.stdout.write(JSON.stringify(TRANSLATIONS));
  process.exit(0);
}

function flatten(value, prefix = '') {
  return Object.fromEntries(Object.entries(value).flatMap(([key, item]) => {
    const name = prefix ? `${prefix}.${key}` : key;
    return typeof item === 'string' ? [[name, item]] : Object.entries(flatten(item, name));
  }));
}
const catalogs = Object.fromEntries(Object.entries(TRANSLATIONS).map(([lang, data]) => [lang, flatten(data)]));
const keys = Object.keys(catalogs.fr).sort();
const { MENU_VARIANTS } = loadTs('src/app/pages/menu/menu-variants.ts');
for (const [lang, catalog] of Object.entries(catalogs)) {
  assert.deepEqual(Object.keys(catalog).sort(), keys, `${lang}: translation keys differ`);
  for (const [key, text] of Object.entries(catalog)) {
    assert.ok(text.trim(), `${lang}.${key}: empty translation`);
    assert.ok(!/[�]|Ã[\u0080-\u00bf]|â[€™]/u.test(text), `${lang}.${key}: invalid encoding`);
  }
  for (const variant of Object.values(MENU_VARIANTS).flat()) {
    assert.ok(catalog[`MENU_DETAILS.${variant.descriptionKey}`], `${lang}: missing ${variant.descriptionKey}`);
  }
  if (lang !== 'fr') {
    for (const [key, text] of Object.entries(catalog)) {
      assert.ok(!/cr[eè]me\s+fra[iî]che|gratinées|Wallet Pizza/iu.test(text), `${lang}.${key}: untranslated text`);
    }
  }
  if (lang === 'fr') {
    for (const [key, text] of Object.entries(catalog)) {
      assert.ok(!/\bCart\b/u.test(text), `${lang}.${key}: use Carte`);
    }
  }
}
function scan(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) scan(file);
    else if (file.endsWith('.ts') && !file.endsWith('translations.ts')) {
      const source = fs.readFileSync(file, 'utf8');
      for (const [, key] of source.matchAll(/['"]([A-Z][A-Z_]+(?:\.[A-Z_]+)+)['"]\s*\|\s*translate/g)) {
        for (const [lang, catalog] of Object.entries(catalogs)) {
          assert.ok(catalog[key], `${file}: missing ${lang}.${key}`);
        }
      }
      for (const [, key] of source.matchAll(/title:\s*['"](PAGE_TITLES\.[A-Z_]+)['"]/g)) {
        for (const [lang, catalog] of Object.entries(catalogs)) {
          assert.ok(catalog[key], `${file}: missing ${lang}.${key}`);
        }
      }
    }
  }
}
scan(path.join(root, 'src/app'));
console.log(`PASS: ${keys.length} translations per language; matching keys, template references, variant descriptions and encoding.`);
