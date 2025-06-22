import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TRANSLATIONS } from './translations';
import { ScrollService } from './services/scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent, TranslateModule],
  template: `
    <div *ngIf="isLoading" class="app-loading">
      <img src="/assets/images/triskele.svg" alt="Triskele Logo" />
      <h1>Triskele</h1>
      <p>{{ 'LOADING.DESCRIPTION' | translate }}</p>
      <div class="spinner"></div>
    </div>

    <div class="app-container" [hidden]="isLoading">
      <app-header [currentLang]="currentLang" (languageChange)="useLanguage($event)"></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app-loading {
      position: fixed;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      width: 100vw;
      background-color: #fff;
      z-index: 1000;
      text-align: center;
    }

    .app-loading img {
      max-width: 150px;
      margin-bottom: 20px;
    }

    .app-loading h1 {
      font-family: "Playfair Display", serif;
      color: #333;
      margin-bottom: 20px;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #deb16d;
      border-top: 4px solid transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    .main-content {
      flex: 1;
    }
  `]
})
export class TriskeleComponent implements OnInit {
  title = 'Triskele - Site Showcase';
  currentLang: 'fr' | 'it' | 'en' = 'fr';
  isLoading = true;

  constructor(
    private translate: TranslateService,
    private scrollService: ScrollService
  ) {}

  ngOnInit() {
    // Imposta il francese come lingua di fallback
    this.translate.setDefaultLang('fr');

    // Rileva la lingua del browser e imposta la lingua dell'app
    const browserLang = (this.translate.getBrowserLang() || 'fr').substring(0, 2);
    const langToUse = ['fr', 'it', 'en'].includes(browserLang)
      ? (browserLang as 'fr' | 'it' | 'en')
      : 'fr';

    this.currentLang = langToUse;
    this.setStaticTranslations(langToUse);

    // Simula l'inizializzazione dell'app
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  useLanguage(language: 'fr' | 'it' | 'en'): void {
    this.currentLang = language;
    this.setStaticTranslations(language);
    // Forza lo scroll in alto quando cambia la lingua
    this.scrollService.scrollToTop();
  }

  setStaticTranslations(lang: 'fr' | 'it' | 'en'): void {
    // Imposta manualmente le traduzioni
    this.translate.setTranslation(lang, TRANSLATIONS[lang]);
    this.translate.use(lang);
  }
}
