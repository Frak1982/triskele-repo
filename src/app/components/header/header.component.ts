import { Component, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollToTopDirective } from '../../directives/scroll-to-top.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule, ScrollToTopDirective],
  template: `
    <header [class.scrolled]="scrolled">
      <div class="container">
        <div class="logo">
          <a routerLink="/" scrollToTop>
            <img src="/src/assets/images/triskele-logo.jpg" alt="Triskele Logo">
            <span>Triskele</span>
          </a>
        </div>

        <nav>
          <button class="mobile-menu-btn" (click)="toggleMenu()" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
          <ul [class.active]="menuActive">
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" scrollToTop (click)="closeMenu()">{{ 'HEADER.HOME' | translate }}</a></li>
            <li><a routerLink="/menu" routerLinkActive="active" scrollToTop (click)="closeMenu()">{{ 'HEADER.MENU' | translate }}</a></li>
            <li><a routerLink="/about" routerLinkActive="active" scrollToTop (click)="closeMenu()">{{ 'HEADER.ABOUT' | translate }}</a></li>
            <li><a routerLink="/contact" routerLinkActive="active" scrollToTop (click)="closeMenu()">{{ 'HEADER.CONTACT' | translate }}</a></li>
            <!-- <li><a routerLink="/order" routerLinkActive="active" class="order-btn" scrollToTop (click)="closeMenu()">{{ 'HEADER.ORDER' | translate }}</a></li> -->
            <li class="language-dropdown">
              <button class="lang-btn" [class]="'flag-' + currentLang" (click)="toggleLangMenu()">
              </button>
              <div class="lang-menu" [class.active]="langMenuActive">
                <button [class.active]="currentLang === 'it'" (click)="changeLang('it')">
                  <div class="flag flag-it"></div>
                  <span>Italiano</span>
                </button>
                <button [class.active]="currentLang === 'fr'" (click)="changeLang('fr')">
                  <div class="flag flag-fr"></div>
                  <span>Français</span>
                </button>
                <button [class.active]="currentLang === 'en'" (click)="changeLang('en')">
                  <div class="flag flag-en"></div>
                  <span>English</span>
                </button>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styles: []
})
export class HeaderComponent {
  @Input() currentLang: 'it' | 'fr' | 'en' = 'it';
  @Output() languageChange = new EventEmitter<'it' | 'fr' | 'en'>();

  scrolled = false;
  menuActive = false;
  langMenuActive = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrolled = window.scrollY > 50;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Chiudi il menu della lingua se si clicca fuori
    const target = event.target as HTMLElement;
    if (!target.closest('.language-dropdown')) {
      this.langMenuActive = false;
    }
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  closeMenu() {
    this.menuActive = false;
  }

  toggleLangMenu() {
    this.langMenuActive = !this.langMenuActive;
  }

  changeLang(lang: 'it' | 'fr' | 'en') {
    this.currentLang = lang;
    this.languageChange.emit(lang);
    this.langMenuActive = false;
  }
}
