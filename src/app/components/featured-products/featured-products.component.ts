import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ScrollToTopDirective } from '../../directives/scroll-to-top.directive';

interface Product {
  id: number;
  translationKey: string;
  // price: number;
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
      <div class="carousel-wrapper" (touchstart)="onTouchStart($event)" (touchend)="onTouchEnd($event)">
        <!-- <button class="carousel-arrow left" (click)="prev()" aria-label="Precedente">&#8592;</button> -->
        <div class="product-card carousel-card">
          <div class="product-image">
            <img
              [src]="'/assets/images/' + currentProduct.image"
              [alt]="getProductName(currentProduct)"
              class="product-img"
              loading="lazy"
            />
          </div>
          <div class="product-details">
            <h3 class="product-name">{{ getProductName(currentProduct) }}</h3>
            <p class="product-description">{{ getProductDescription(currentProduct) }}</p>
            <button class="product-btn" (click)="goToMenu(currentProduct)">{{ 'FEATURED.VIEW_MENU' | translate }}</button>
          </div>
        </div>
        <!-- <button class="carousel-arrow right" (click)="next()" aria-label="Successivo">&#8594;</button> -->
      </div>
      <div class="carousel-dots">
        @for (p of featuredProducts; track p.id) {
          <span class="dot" [class.active]="$index === currentIndex" (click)="goTo($index)"></span>
        }
      </div>
      <div class="view-all">
        <a href="/assets/menu.pdf" class="view-all-btn" target="_blank">{{ 'FEATURED.VIEW_ALL' | translate }}</a>
      </div>
    </div>
  `,
  styles: [`
    .carousel-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;z-index
      position: relative;
    }
    .carousel-arrow {
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      color: var(--primary-color, #333);
      padding: 0 10px;
      z-index: 2;
      transition: color 0.2s;
    }
    .carousel-arrow:hover {
      color: var(--secondary-color, #e67e22);
    }
    .carousel-card {
      min-width: 400px;
      // width: 400px;
      // height: 630px;
      // width: 100%;
      margin: 0 10px;
      box-shadow: var(--box-shadow, 0 2px 8px rgba(0,0,0,0.08));
      border-radius: var(--border-radius, 16px);
      background: #fff;
      transition: box-shadow 0.2s;
    }
    .carousel-dots {
      display: flex;
      justify-content: center;
      margin: 15px 0;
      gap: 8px;
    }
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #ccc;
      display: inline-block;
      cursor: pointer;
      transition: background 0.2s;
    }
    .dot.active {
      background: var(--primary-color, #333);
    }
    .product-image {
      height: 400px
    }
    img {
      object-fit: cover;
      height: 400px;
      width: 400px;
    }
  `]
})
export class FeaturedProductsComponent {
  constructor(private translateService: TranslateService, private router: Router) {}

  featuredProducts: Product[] = [
    {
      id: 1,
      translationKey: 'MENU_ITEMS.PRIMI.LASAGNE',
      category: 'primi',
      image: 'lasagnabolo.jpg',
    },
    {
      id: 2,
      translationKey: 'MENU_ITEMS.TAVOLA_CALDA.ARANCINI',
      category: 'tavola calda',
      image: 'arancini.jpg',
    },
    {
      id: 3,
      translationKey: 'MENU_ITEMS.DOLCI.CANNOLI',
      category: 'dolce',
      image: 'cannoli1.jpg',
    },
  ];

  currentIndex = 0;
  touchStartX = 0;
  touchEndX = 0;

  get currentProduct(): Product {
    return this.featuredProducts[this.currentIndex];
  }

  getProductName(product: Product): string {
    return this.translateService.instant(`${product.translationKey}.NAME`);
  }

  getProductDescription(product: Product): string {
    return this.translateService.instant(`${product.translationKey}.DESCRIPTION`);
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.featuredProducts.length) % this.featuredProducts.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.featuredProducts.length;
  }

  goTo(index: number) {
    this.currentIndex = index;
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  handleSwipe() {
    const delta = this.touchEndX - this.touchStartX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) {
        this.prev();
      } else {
        this.next();
      }
    }
  }

  goToMenu(product: Product) {
    let category = '';
    if (product.category === 'primi') category = 'primi';
    else if (product.category === 'tavola calda') category = 'tavolaCalda';
    else if (product.category === 'dolce') category = 'dolci';
    else if (product.category === 'bevanda') category = 'bevande';
    this.router.navigate(['/menu'], { queryParams: { category, scrollId: product.translationKey } });
  }
}
