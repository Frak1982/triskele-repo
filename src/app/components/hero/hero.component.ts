import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollToTopDirective } from '../../directives/scroll-to-top.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, ScrollToTopDirective],
  template: `
    <div class="hero-container">
      <div class="overlay"></div>
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">{{ 'HERO.TITLE' | translate }}</h1>
          <p class="hero-subtitle">{{ 'HERO.SUBTITLE' | translate }}</p>
          <div class="hero-buttons">
            <a routerLink="/menu" class="hero-btn primary" scrollToTop>{{ 'HERO.MENU_BUTTON' | translate }}</a>
            <a routerLink="/about" class="hero-btn secondary" scrollToTop>{{ 'HERO.ABOUT_BUTTON' | translate }}</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class HeroComponent {}
