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
    <div class="app-container">
      <app-header [currentLang]="currentLang" (languageChange)="useLanguage($event)"></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
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
  currentLang: 'it' | 'fr' | 'en' = 'it';

  constructor(
    private translate: TranslateService,
    private scrollService: ScrollService
  ) {}

  ngOnInit() {
    // Inizializza la lingua predefinita
    this.translate.setDefaultLang('it');
    this.translate.use('it');

    // Imposta le traduzioni statiche (funziona correttamente)
    this.setStaticTranslations('it');
  }

  useLanguage(language: 'it' | 'fr' | 'en'): void {
    this.currentLang = language;
    this.setStaticTranslations(language);
    // Forza lo scroll in alto quando cambia la lingua
    this.scrollService.scrollToTop();
  }

  setStaticTranslations(lang: 'it' | 'fr' | 'en'): void {
    // Imposta manualmente le traduzioni
    this.translate.setTranslation(lang, TRANSLATIONS[lang]);
    this.translate.use(lang);
  }
}
