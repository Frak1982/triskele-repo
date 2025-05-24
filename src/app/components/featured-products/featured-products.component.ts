import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ScrollToTopDirective } from '../../directives/scroll-to-top.directive';

interface Product {
  id: number;
  translationKey: string;
  price: number;
  category: string;
  image: string;
}

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, ScrollToTopDirective],
  template: `
    <div class="container">
      <h2 class="section-title">{{ 'FEATURED.TITLE' | translate }}</h2>
      <div class="products-grid">
        @for (product of featuredProducts; track product.id) {
          <div class="product-card">
            <div class="product-image" style="height: 200px; width: 100%;">
              <img
                [src]="'/assets/images/' + product.image"
                [alt]="getProductName(product)"
                class="product-img"
                style="width: 100%; height: 100%; object-fit: cover;"
              />
            </div>
            <div class="product-details">
              <h3 class="product-name">{{ getProductName(product) }}</h3>
              <p class="product-description">{{ getProductDescription(product) }}</p>
              <div class="product-price">€{{ product.price.toFixed(2) }}</div>
              <a routerLink="/menu" class="product-btn" scrollToTop>{{ 'FEATURED.VIEW_MENU' | translate }}</a>
            </div>
          </div>
        }
      </div>
      <div class="view-all">
        <a routerLink="/menu" class="view-all-btn" scrollToTop>{{ 'FEATURED.VIEW_ALL' | translate }}</a>
      </div>
    </div>
  `,
  styles: []
})
export class FeaturedProductsComponent {
  constructor(private translateService: TranslateService) {}

  featuredProducts: Product[] = [
    {
      id: 1,
      translationKey: 'MENU_ITEMS.PRIMI.LASAGNE',
      price: 9.9,
      category: 'primi',
      image: 'lasagne-alla-bolognese.jpg',
    },
    {
      id: 2,
      translationKey: 'MENU_ITEMS.TAVOLA_CALDA.ARANCINI',
      price: 7.5,
      category: 'tavola calda',
      image: 'arancini.jpg',
    },
    {
      id: 3,
      translationKey: 'MENU_ITEMS.DOLCI.CANNOLI',
      price: 4.5,
      category: 'dolce',
      image: 'cannoli.webp',
    },
  ];

  getProductName(product: Product): string {
    return this.translateService.instant(`${product.translationKey}.NAME`);
  }

  getProductDescription(product: Product): string {
    return this.translateService.instant(`${product.translationKey}.DESCRIPTION`);
  }
}
