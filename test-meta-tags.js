// Script per testare i meta tag dinamici
// Esegui questo script nella console del browser

function testMetaTags() {
  const languages = ['it', 'en', 'fr'];
  const results = {};

  languages.forEach(lang => {
    console.log(`\n🧪 Testando lingua: ${lang.toUpperCase()}`);

    // Simula il cambio di lingua (se hai accesso al componente Angular)
    if (window.ng && window.ng.getComponent) {
      // Questo funziona solo se hai accesso al componente Angular
      try {
        const appComponent = window.ng.getComponent(document.querySelector('app-root'));
        if (appComponent && appComponent.useLanguage) {
          appComponent.useLanguage(lang);

          // Aspetta che i meta tag si aggiornino
          setTimeout(() => {
            const metaData = {
              title: document.title,
              description: document.querySelector('meta[name="description"]')?.content || 'N/A',
              ogTitle: document.querySelector('meta[property="og:title"]')?.content || 'N/A',
              ogLocale: document.querySelector('meta[property="og:locale"]')?.content || 'N/A',
              htmlLang: document.documentElement.lang
            };

            results[lang] = metaData;
            console.log(`✅ ${lang.toUpperCase()}:`, metaData);
          }, 100);
        }
      } catch (e) {
        console.log(`❌ Errore nel test ${lang}:`, e.message);
      }
    } else {
      // Test manuale - verifica i meta tag attuali
      const metaData = {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content || 'N/A',
        ogTitle: document.querySelector('meta[property="og:title"]')?.content || 'N/A',
        ogLocale: document.querySelector('meta[property="og:locale"]')?.content || 'N/A',
        htmlLang: document.documentElement.lang
      };

      results[lang] = metaData;
      console.log(`📋 Meta tag attuali per ${lang}:`, metaData);
    }
  });

  return results;
}

// Funzione per verificare che i meta tag siano diversi per ogni lingua
function verifyMetaTagDifferences(results) {
  console.log('\n🔍 Verifica differenze tra le lingue:');

  const languages = Object.keys(results);
  const fields = ['title', 'description', 'ogTitle', 'ogLocale'];

  fields.forEach(field => {
    const values = languages.map(lang => results[lang][field]);
    const uniqueValues = [...new Set(values)];

    if (uniqueValues.length === languages.length) {
      console.log(`✅ ${field}: Tutte le lingue hanno valori diversi`);
    } else {
      console.log(`❌ ${field}: Alcune lingue hanno lo stesso valore`);
      console.log(`   Valori:`, values);
    }
  });
}

// Esegui i test
console.log('🚀 Iniziando test dei meta tag dinamici...');
const results = testMetaTags();

// Aspetta un po' e poi verifica le differenze
setTimeout(() => {
  verifyMetaTagDifferences(results);
}, 1000);

console.log('\n📝 Istruzioni per test manuale:');
console.log('1. Cambia lingua usando il selettore nel header');
console.log('2. Osserva i meta tag nella tab Elements degli strumenti per sviluppatori');
console.log('3. Verifica che title, description, og:title e og:locale cambino');
console.log('4. Controlla che document.documentElement.lang cambi');
