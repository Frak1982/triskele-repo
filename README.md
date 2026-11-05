# Triskele Gastronomie

Sito web multilingua per **Triskele Gastronomie**, attività di gastronomia italo-siciliana a Rennes, Francia. Il progetto presenta prodotti e specialità, un menu consultabile per categorie, informazioni sull'attività e un modulo contatti.

**Stack:** Angular 19, TypeScript, Angular Router, Reactive Forms, ngx-translate, Angular Material/CDK, Bootstrap, RxJS.

## Funzionalità

- Navigazione tra home, menu, chi siamo, contatti e informativa privacy.
- Menu prodotti organizzato per categorie, con varianti e prezzi.
- Interfaccia in francese, italiano e inglese, con selezione della lingua e rilevamento della lingua del browser.
- Download del menu PDF nella lingua selezionata.
- Modulo contatti con validazione Reactive Forms e integrazione Netlify Forms.
- Metadati SEO e Open Graph aggiornati in base alla lingua.
- Immagini WebP responsive con `srcset`.

## Architettura

Il codice applicativo è in `src/app/`:

- `pages/`: pagine principali, inclusi menu e contatti.
- `components/`: componenti riutilizzabili, come header, footer e prodotti in evidenza.
- `services/`: gestione SEO, scroll e download del menu.
- `directives/`: comportamenti riutilizzabili.
- `shared/`: utility, incluse quelle per le immagini responsive.
- `translations.ts`: contenuti localizzati.

L'app usa componenti standalone e le direttive di controllo del flusso `@if` e `@for`.

## Avvio in locale

Prerequisiti: Node.js e npm compatibili con Angular 19.

```bash
npm ci
npm start
```

Apri `http://localhost:4200/`.

## Build e test

```bash
npx ng build --configuration production
npm test
```

Nota: il comando di build sopra usa la sintassi Angular 19; lo script `build` nel `package.json` deve ancora essere aggiornato. Nel repository esaminato non sono presenti test applicativi `.spec.ts`: il comando di test è configurato, ma non costituisce una suite di test verificata.

## Miglioramenti previsti

- Scomposizione del componente menu in componenti più piccoli.
- Miglioramento dell'accessibilità dei controlli del carosello e della struttura delle intestazioni.
- Rimozione dell'attesa artificiale dello spinner iniziale.
- Introduzione di test per menu, form e servizi.
- Valutazione del lazy loading delle pagine.

## Contesto

Progetto web per un'attività reale. Il repository documenta il codice front-end; le funzionalità che dipendono dall'hosting, come l'invio del form, vanno verificate nell'ambiente di pubblicazione.
