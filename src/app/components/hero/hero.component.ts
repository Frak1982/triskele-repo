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
      <div class="container container-fluid">
        <div class="hero-content row">
          <div class="col-md-5 d-flex flex-column align-items-center">
            <h1 class="hero-title">{{ 'HERO.TITLE' | translate }}</h1>
            <img
              src="assets/images/triskele.svg"
              alt="Triskele Logo"
              class="hero-logo"
            />
          </div>
          <div class="col-md-7">
            <p class="hero-subtitle">{{ 'HERO.SUBTITLE' | translate }}</p>
            <div class="hero-buttons justify-content-center">
              <a routerLink="/about" class="hero-btn secondary" scrollToTop>{{
                'HERO.ABOUT_BUTTON' | translate
              }}</a>
            </div>
          </div>
        </div>
        <!-- <div class="hero-buttons justify-content-center">
          <a routerLink="/menu" class="hero-btn primary" scrollToTop>{{
            'HERO.MENU_BUTTON' | translate
          }}</a>
          <a routerLink="/about" class="hero-btn secondary" scrollToTop>{{
            'HERO.ABOUT_BUTTON' | translate
          }}</a>
        </div> -->
      </div>
    </div>
  `,
})
export class HeroComponent {}
