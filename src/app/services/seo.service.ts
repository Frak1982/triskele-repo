import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly metaTags = {
    it: {
      title: 'Triskele - Autentica Gastronomia Italiana a Rennes',
      description: 'Triskele - Autentica gastronomia italo-siciliana a Rennes. Specialità italiane e siciliane, arancini, cannoli, lasagne e molto altro. Ordina online o vieni a trovarci!',
      keywords: 'ristorante italiano, gastronomia siciliana, arancini, cannoli, lasagne, pizza fritta, focaccia, Rennes, Francia, cucina italiana autentica, street food italiano',
      ogTitle: 'Triskele - Autentica Gastronomia Italiana a Rennes',
      ogDescription: 'Specialità italo-siciliane autentiche: arancini, cannoli, lasagne, pizza fritta e molto altro. Ordina online o vieni a trovarci a Rennes!',
      ogLocale: 'it_IT'
    },
    en: {
      title: 'Triskele - Authentic Italian Gastronomy in Rennes',
      description: 'Triskele - Authentic Italo-Sicilian gastronomy in Rennes. Italian and Sicilian specialties, arancini, cannoli, lasagne and much more. Order online or come visit us!',
      keywords: 'Italian restaurant, Sicilian gastronomy, arancini, cannoli, lasagne, fried pizza, focaccia, Rennes, France, authentic Italian cuisine, Italian street food',
      ogTitle: 'Triskele - Authentic Italian Gastronomy in Rennes',
      ogDescription: 'Authentic Italo-Sicilian specialties: arancini, cannoli, lasagne, fried pizza and much more. Order online or come visit us in Rennes!',
      ogLocale: 'en_US'
    },
    fr: {
      title: 'Triskele - Gastronomie Italienne Authentique à Rennes',
      description: 'Triskele - Gastronomie italo-sicilienne authentique à Rennes. Spécialités italiennes et siciliennes, arancini, cannoli, lasagnes et bien plus. Commandez en ligne ou venez nous rendre visite !',
      keywords: 'restaurant italien, gastronomie sicilienne, arancini, cannoli, lasagnes, pizza frite, focaccia, Rennes, France, cuisine italienne authentique, street food italien',
      ogTitle: 'Triskele - Gastronomie Italienne Authentique à Rennes',
      ogDescription: 'Spécialités italo-siciliennes authentiques : arancini, cannoli, lasagnes, pizza frite et bien plus. Commandez en ligne ou venez nous rendre visite à Rennes !',
      ogLocale: 'fr_FR'
    }
  };

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private translateService: TranslateService
  ) {}

  updateMetaTags(language: string = 'it'): void {
    const lang = language as keyof typeof this.metaTags;
    const meta = this.metaTags[lang] || this.metaTags.it;

    // Aggiorna il titolo della pagina
    this.document.title = meta.title;

    // Aggiorna meta description
    this.updateMetaTag('description', meta.description);

    // Aggiorna meta keywords
    this.updateMetaTag('keywords', meta.keywords);

    // Aggiorna meta language
    this.updateMetaTag('language', language === 'it' ? 'Italian' : language === 'en' ? 'English' : 'French');

    // Aggiorna Open Graph tags
    this.updateMetaProperty('og:title', meta.ogTitle);
    this.updateMetaProperty('og:description', meta.ogDescription);
    this.updateMetaProperty('og:locale', meta.ogLocale);

    // Aggiorna Twitter Card tags
    this.updateMetaName('twitter:title', meta.ogTitle);
    this.updateMetaName('twitter:description', meta.ogDescription);

    // Aggiorna l'attributo lang dell'html
    this.document.documentElement.lang = language;
  }

  private updateMetaTag(name: string, content: string): void {
    let meta = this.document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = this.document.createElement('meta');
      meta.name = name;
      this.document.head.appendChild(meta);
    }
    meta.content = content;
  }

  private updateMetaProperty(property: string, content: string): void {
    let meta = this.document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = this.document.createElement('meta');
      meta.setAttribute('property', property);
      this.document.head.appendChild(meta);
    }
    meta.content = content;
  }

  private updateMetaName(name: string, content: string): void {
    let meta = this.document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = this.document.createElement('meta');
      meta.name = name;
      this.document.head.appendChild(meta);
    }
    meta.content = content;
  }
}
