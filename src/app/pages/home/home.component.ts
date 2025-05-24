import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../../components/hero/hero.component';
import { FeaturedProductsComponent } from '../../components/featured-products/featured-products.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeroComponent,
    FeaturedProductsComponent,
    // TestimonialsComponent,
    TranslateModule,
  ],
  template: `
    <section>
      <app-hero></app-hero>
    </section>

    <section>
      <div class="sub-hero-container justify-content-center d-flex align-items-center">
        <h1 class="sub-hero-title">{{ 'SUB-HERO.TITLE' | translate }}</h1>
      </div>
    </section>

    <!-- <section class="features">
      <div class="container">
        <h2 class="section-title">{{ 'HOME.SERVICES_TITLE' | translate }}</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="icon">🍲</div>
            <h3>{{ 'HOME.AUTHENTIC_CUISINE_TITLE' | translate }}</h3>
            <p>{{ 'HOME.AUTHENTIC_CUISINE_DESC' | translate }}</p>
          </div>
          <div class="feature-card">
            <div class="icon">🥡</div>
            <h3>{{ 'HOME.DELIVERY_TITLE' | translate }}</h3>
            <p>{{ 'HOME.DELIVERY_DESC' | translate }}</p>
          </div>
          <div class="feature-card">
            <div class="icon">🍝</div>
            <h3>{{ 'HOME.FRESH_PASTA_TITLE' | translate }}</h3>
            <p>{{ 'HOME.FRESH_PASTA_DESC' | translate }}</p>
          </div>
        </div>
      </div>
    </section> -->

    <section class="featured">
      <app-featured-products></app-featured-products>
    </section>

    <!-- <section class="testimonials">
      <app-testimonials></app-testimonials>
    </section> -->

    <section class="cta">
      <div class="container">
        <h2>Gusta l'Italia a Rennes</h2>
        <!-- <p>
          Vieni a trovarci o ordina i nostri autentici piatti italiani da
          asporto.
        </p>
        <div class="cta-buttons">
          <a routerLink="/menu" class="btn primary">Vedi il Menu</a>
          <a routerLink="/contact" class="btn secondary">Contattaci</a>
        </div> -->
      </div>
    </section>
  `,
  styles: [],
})
export class HomeComponent {}
