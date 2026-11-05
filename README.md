# Triskele Gastronomie

A multilingual website for **Triskele Gastronomie**, an Italian-Sicilian food business based in Rennes, France. The application showcases the business and its specialties, provides a categorized product menu, and offers contact information and a contact form.

**Tech stack:** Angular 19, TypeScript, Angular Router, Reactive Forms, ngx-translate, Angular Material/CDK, Bootstrap, and RxJS.

## Features

- Pages for Home, Menu, About, Contact, and Privacy Policy.
- Product menu organized by category, including variants and prices.
- French, Italian, and English localization, with language switching and browser-language detection.
- Language-specific PDF menu downloads.
- Contact form built with Angular Reactive Forms and Netlify Forms integration.
- Language-aware SEO and Open Graph metadata.
- Responsive WebP images with `srcset`.

## Project structure

Application code lives in `src/app/`:

- `pages/`: main pages, including Menu and Contact.
- `components/`: reusable UI components such as the header, footer, and featured products.
- `services/`: SEO metadata, scrolling, and menu download functionality.
- `directives/`: reusable UI behavior.
- `shared/`: shared utilities, including responsive image helpers.
- `translations.ts`: localized content.

The application uses Angular standalone components and the `@if` and `@for` template control-flow syntax.

## Getting started

**Prerequisites:** Node.js and npm versions compatible with Angular 19.

```bash
npm ci
npm start
```

Open `http://localhost:4200/`.

## Build and tests

```bash
npx ng build --configuration production
npm test
```

The production build command above uses Angular 19 syntax. The `build` script in `package.json` has not yet been updated. Although the test runner is configured, no application `.spec.ts` test files were found during this review; automated test coverage has not been verified.

## Planned improvements

- Split the menu page into smaller, focused components.
- Improve keyboard accessibility of carousel controls and heading semantics.
- Remove the artificial delay from the initial loading indicator.
- Add tests for menu behavior, form validation, and services.
- Evaluate lazy loading for individual routes.

## About this project

This is a front-end project for a real business. Hosting-dependent features, including form submissions, should be verified in the deployed environment.
