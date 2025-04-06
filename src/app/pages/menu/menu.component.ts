import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface MenuItem {
  id: number;
  translationKey: string;
  price: number;
  image?: string;
  featured?: boolean;
  category: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  template: `
    <div class="menu-page">
      <div class="menu-header">
        <div class="container">
          <h1>{{ 'MENU_PAGE.TITLE' | translate }}</h1>
          <p>{{ 'MENU_PAGE.SUBTITLE' | translate }}</p>
        </div>
      </div>

      <div class="menu-tabs">
        <div class="container">
          <div class="tabs">
            @for (category of categories; track category) {
              <button
                [class.active]="selectedCategory === category"
                (click)="selectCategory(category)"
              >
                {{ getCategoryLabel(category) | translate }}
              </button>
            }
          </div>
        </div>
      </div>

      <div class="menu-content">
        <div class="container">
          @if (selectedCategory === 'tavolaCalda') {
            <div class="menu-section">
              <h2 class="category-title">
                {{ 'MENU_PAGE.CATEGORIES.TAVOLA_CALDA' | translate }}
              </h2>
              <div class="menu-items">
                @for (item of getItemsByCategory('tavolaCalda'); track item.id) {
                  <div class="menu-item">
                    @if (item.image) {
                      <div class="menu-item-image">
                        <img [src]="item.image" [alt]="getItemName(item)" />
                        @if (item.featured) {
                          <span class="featured">{{
                            'MENU_PAGE.FEATURED' | translate
                          }}</span>
                        }
                      </div>
                    }
                    <div class="menu-item-info">
                      <h3 class="menu-item-name">{{ getItemName(item) }}</h3>
                      <p class="menu-item-description">{{ getItemDescription(item) }}</p>
                      <div class="menu-item-price">
                        €{{ item.price.toFixed(2) }}
                      </div>
                    </div>
                    <!-- <div class="menu-item-action">
                      <a routerLink="/order" class="order-btn">{{
                        'MENU_PAGE.ORDER_BUTTON' | translate
                      }}</a>
                    </div> -->
                  </div>
                }
              </div>
            </div>
          }

          @if (selectedCategory === 'primi') {
            <div class="menu-section">
              <h2 class="category-title">
                {{ 'MENU_PAGE.CATEGORIES.PRIMI' | translate }}
              </h2>
              <div class="menu-items">
                @for (item of getItemsByCategory('primi'); track item.id) {
                  <div class="menu-item">
                    @if (item.image) {
                      <div class="menu-item-image">
                        <img [src]="item.image" [alt]="getItemName(item)" />
                        @if (item.featured) {
                          <span class="featured">{{
                            'MENU_PAGE.FEATURED' | translate
                          }}</span>
                        }
                      </div>
                    }
                    <div class="menu-item-info">
                      <h3 class="menu-item-name">{{ getItemName(item) }}</h3>
                      <p class="menu-item-description">{{ getItemDescription(item) }}</p>
                      <div class="menu-item-price">
                        €{{ item.price.toFixed(2) }}
                      </div>
                    </div>
                    <!-- <div class="menu-item-action">
                      <a routerLink="/order" class="order-btn">{{
                        'MENU_PAGE.ORDER_BUTTON' | translate
                      }}</a>
                    </div> -->
                  </div>
                }
              </div>
            </div>
          }

          @if (selectedCategory === 'dolci') {
            <div class="menu-section">
              <h2 class="category-title">
                {{ 'MENU_PAGE.CATEGORIES.DOLCI' | translate }}
              </h2>
              <div class="menu-items">
                @for (item of getItemsByCategory('dolci'); track item.id) {
                  <div class="menu-item">
                    @if (item.image) {
                      <div class="menu-item-image">
                        <img [src]="item.image" [alt]="getItemName(item)" />
                        @if (item.featured) {
                          <span class="featured">{{
                            'MENU_PAGE.FEATURED' | translate
                          }}</span>
                        }
                      </div>
                    }
                    <div class="menu-item-info">
                      <h3 class="menu-item-name">{{ getItemName(item) }}</h3>
                      <p class="menu-item-description">{{ getItemDescription(item) }}</p>
                      <div class="menu-item-price">
                        €{{ item.price.toFixed(2) }}
                      </div>
                    </div>
                    <!-- <div class="menu-item-action">
                      <a routerLink="/order" class="order-btn">{{
                        'MENU_PAGE.ORDER_BUTTON' | translate
                      }}</a>
                    </div> -->
                  </div>
                }
              </div>
            </div>
          }

          @if (selectedCategory === 'bevande') {
            <div class="menu-section">
              <h2 class="category-title">
                {{ 'MENU_PAGE.CATEGORIES.BEVANDE' | translate }}
              </h2>
              <div class="menu-items">
                @for (item of getItemsByCategory('bevande'); track item.id) {
                  <div class="menu-item">
                    @if (item.image) {
                      <div class="menu-item-image">
                        <img [src]="item.image" [alt]="getItemName(item)" />
                        @if (item.featured) {
                          <span class="featured">{{
                            'MENU_PAGE.FEATURED' | translate
                          }}</span>
                        }
                      </div>
                    }
                    <div class="menu-item-info">
                      <h3 class="menu-item-name">{{ getItemName(item) }}</h3>
                      <p class="menu-item-description">{{ getItemDescription(item) }}</p>
                      <div class="menu-item-price">
                        €{{ item.price.toFixed(2) }}
                      </div>
                    </div>
                    <!-- <div class="menu-item-action">
                      <a routerLink="/order" class="order-btn">{{
                        'MENU_PAGE.ORDER_BUTTON' | translate
                      }}</a>
                    </div> -->
                  </div>
                }
              </div>
            </div>
          }

          <div class="menu-notice">
            <p>{{ 'MENU_PAGE.ALLERGIES_NOTICE' | translate }}</p>
          </div>
        </div>
      </div>

      <div class="cta-section">
        <div class="container">
          <h2>{{ 'MENU_PAGE.CTA_TITLE' | translate }}</h2>
          <p>{{ 'MENU_PAGE.CTA_SUBTITLE' | translate }}</p>
          <a routerLink="/order" class="cta-btn">{{
            'MENU_PAGE.ORDER_BUTTON' | translate
          }}</a>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MenuComponent {
  categories = ['tavolaCalda', 'primi', 'dolci', 'bevande'];
  selectedCategory = 'tavolaCalda';

  categoryNames = {
    tavolaCalda: 'Tavola Calda',
    primi: 'Primi',
    dolci: 'Dolci',
    bevande: 'Bevande',
  };

  constructor(private translateService: TranslateService) {}

  menuItems: MenuItem[] = [
    // Tavola calda
    {
      id: 1,
      translationKey: 'MENU_ITEMS.TAVOLA_CALDA.ARANCINI',
      price: 7.5,
      image: '/src/assets/images/arancini.jpg',
      featured: true,
      category: 'tavolaCalda',
    },
    {
      id: 2,
      translationKey: 'MENU_ITEMS.TAVOLA_CALDA.FOCACCIA',
      price: 6.0,
      image: '/src/assets/images/focacce.jpg',
      category: 'tavolaCalda',
    },
    {
      id: 3,
      translationKey: 'MENU_ITEMS.TAVOLA_CALDA.PIZZA_FRITTA',
      price: 8.5,
      image: '/src/assets/images/siciliana.jpg',
      category: 'tavolaCalda',
    },
    {
      id: 4,
      translationKey: 'MENU_ITEMS.TAVOLA_CALDA.PIZZA_TEGLIA',
      price: 8.5,
      image: '/src/assets/images/pizza-in-teglia.png',
      category: 'tavolaCalda',
    },
    {
      id: 5,
      translationKey: 'MENU_ITEMS.TAVOLA_CALDA.PIZZA_PORTAFOGLIO',
      price: 8.5,
      image: '/src/assets/images/cartocciata.jpg',
      category: 'tavolaCalda',
    },
    // Primi Piatti
    {
      id: 6,
      translationKey: 'MENU_ITEMS.PRIMI.LASAGNE',
      price: 12.5,
      image: '/src/assets/images/lasagne-alla-bolognese.jpg',
      featured: true,
      category: 'primi',
    },
    // Dolci
    {
      id: 7,
      translationKey: 'MENU_ITEMS.DOLCI.CANNOLI',
      price: 10.5,
      image: '/src/assets/images/cannoli.webp',
      category: 'dolci',
    },
    {
      id: 8,
      translationKey: 'MENU_ITEMS.DOLCI.TIRAMISU',
      price: 14.5,
      image: '/src/assets/images/tiramisu.jpg',
      category: 'dolci',
    },
    // Bevande
    {
      id: 10,
      translationKey: 'MENU_ITEMS.BEVANDE.CAFFE',
      price: 5.5,
      image: '/src/assets/images/caffe.jpg',
      featured: true,
      category: 'bevande',
    },
  ];

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  getItemsByCategory(category: string): MenuItem[] {
    return this.menuItems.filter((item) => item.category === category);
  }

  getItemName(item: MenuItem): string {
    return this.translateService.instant(`${item.translationKey}.NAME`);
  }

  getItemDescription(item: MenuItem): string {
    return this.translateService.instant(`${item.translationKey}.DESCRIPTION`);
  }

  addToOrder(item: MenuItem) {
    // In una implementazione reale, qui aggiungeresti l'item a un servizio di carrello
    console.log("Aggiunto all'ordine:", item);
    alert(`${this.getItemName(item)} aggiunto al tuo ordine!`);
    // Redirect o apri modal per completare l'ordine
    // window.location.href = '/order';
  }

  getCategoryLabel(category: string): string {
    const mapping: { [key: string]: string } = {
      tavolaCalda: 'MENU_PAGE.CATEGORIES.TAVOLA_CALDA',
      primi: 'MENU_PAGE.CATEGORIES.PRIMI',
      dolci: 'MENU_PAGE.CATEGORIES.DOLCI',
      bevande: 'MENU_PAGE.CATEGORIES.BEVANDE',
    };
    return mapping[category] || category;
  }
}
