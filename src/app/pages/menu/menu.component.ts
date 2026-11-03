import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ScrollToTopDirective } from '../../directives/scroll-to-top.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { MENU_VARIANTS, MenuVariant } from './menu-variants';
import { MenuDownloadService } from '../../services/menu-download.service';
import { productImageSrcset } from '../../shared/responsive-image';

interface MenuItem {
  id: number;
  translationKey: string;
  price: number;
  image?: string;
  featured?: boolean;
  category: string;
  images?: string[]; // solo per arancini
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, TranslateModule, ScrollToTopDirective],
  template: `
    <ng-template #variants let-item>
      @if (getVariants(item).length) {
      <ul class="menu-variants">
        @for (variant of getVariants(item); track variant.name) {
        <li>
          <div class="variant-heading">
            <h4>{{ variant.name }}</h4>
            <span class="variant-price">{{ formatPrice(variant.price) }}</span>
          </div>
          <p>{{ ('MENU_DETAILS.' + variant.descriptionKey) | translate }}</p>
        </li>
        }
      </ul>
      }
    </ng-template>
    <div class="menu-page">
      <div class="menu-header flex-column justify-content-center">
        <div class="container">
          <h1>{{ 'MENU_PAGE.TITLE' | translate }}</h1>
          <p>{{ 'MENU_PAGE.SUBTITLE' | translate }}</p>
        </div>
        <div class="view-all">
          <a [href]="menuDownload.url" [attr.download]="menuDownload.filename" class="view-all-btn">{{
            'FEATURED.VIEW_ALL' | translate
          }}</a>
        </div>
      </div>

      <div class="menu-tabs">
        <div class="container">
          <div class="tabs">
            @for (category of categories; track category) {
            <button
              [class.active]="selectedCategory === category"
              [attr.aria-label]="getCategoryLabel(category) | translate"
              (click)="selectCategory(category)"
              scrollToTop
            >
              <span class="tab-label-full">{{ getCategoryLabel(category) | translate }}</span>
              <span class="tab-label-short">{{ ('MENU_TABS.' + category) | translate }}</span>
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
              <h3>
                {{ 'MENU_PAGE.CATEGORIES.TAVOLA_CALDA_SUBTITLE' | translate }}
              </h3>
            </h2>
            <div class="menu-items">
              @for (item of getItemsByCategory('tavolaCalda'); track item.id) {
              @if (item.translationKey === 'MENU_ITEMS.TAVOLA_CALDA.ARANCINI') {
              <div
                class="menu-item"
                [attr.data-scroll-id]="item.translationKey"
              >
                <div
                  class="menu-item-image"
                  (touchstart)="onTouchStart($event)"
                  (touchend)="onTouchEnd($event)"
                >
                  <img
                    [src]="aranciniImages[aranciniIndex]"
                    [attr.srcset]="imageSrcset(aranciniImages[aranciniIndex])"
                    sizes="(max-width: 767px) calc(100vw - 24px), (max-width: 1199px) 450px, 410px"
                    decoding="async"
                    [alt]="getItemName(item)"
                    style="width:100%;object-fit:cover;display:block;margin:0 auto;"
                    loading="lazy"
                  />
                </div>
                <div class="carousel-dots">
                  @for (img of aranciniImages; track $index) {
                  <span
                    class="dot"
                    [class.active]="$index === aranciniIndex"
                    (click)="goToArancini($index)"
                  ></span>
                  }
                </div>
                @if (item.featured) {
                <span class="featured">{{
                  'MENU_PAGE.FEATURED' | translate
                }}</span>
                }
                <div class="menu-item-info">
                  <h3 class="menu-item-name">{{ getItemName(item) }}</h3>
                  <p class="menu-item-description">
                    {{ getItemDescription(item) }}
                  </p>
                  <ng-container *ngTemplateOutlet="variants; context: { $implicit: item }"></ng-container>
                  <div class="menu-item-price">
                    {{ 'MENU_PAGE.A_PARTIRE_DA' | translate }} €{{
                      item.price.toFixed(2)
                    }}
                  </div>
                </div>
              </div>
              } @else { @if (item.image) {
              <div
                class="menu-item"
                [attr.data-scroll-id]="item.translationKey"
              >
                <div class="menu-item-image">
                  <img
                    [src]="item.image"
                    [attr.srcset]="imageSrcset(item.image)"
                    sizes="(max-width: 767px) calc(100vw - 24px), (max-width: 1199px) 450px, 410px"
                    decoding="async"
                    [alt]="getItemName(item)"
                    loading="lazy"
                  />
                  @if (item.featured) {
                  <span class="featured">{{
                    'MENU_PAGE.FEATURED' | translate
                  }}</span>
                  }
                </div>
                <div class="menu-item-info">
                  <h3 class="menu-item-name">{{ getItemName(item) }}</h3>
                  <p class="menu-item-description">
                    {{ getItemDescription(item) }}
                  </p>
                  <ng-container *ngTemplateOutlet="variants; context: { $implicit: item }"></ng-container>
                  <div class="menu-item-price">
                    {{ 'MENU_PAGE.A_PARTIRE_DA' | translate }} €{{
                      item.price.toFixed(2)
                    }}
                  </div>
                </div>
              </div>
              } } }
            </div>
          </div>
          } @if (selectedCategory === 'primi') {
          <div class="menu-section">
            <h2 class="category-title">
              {{ 'MENU_PAGE.CATEGORIES.PRIMI' | translate }}
              <h3>
                {{ 'MENU_PAGE.CATEGORIES.PRIMI_SUBTITLE' | translate }}
              </h3>
            </h2>
            <div class="menu-items">
              @for (item of getItemsByCategory('primi'); track item.id) { @if
              (item.image) {
              <div
                class="menu-item"
                [attr.data-scroll-id]="item.translationKey"
              >
                <div class="menu-item-image">
                  <img
                    [src]="item.image"
                    [attr.srcset]="imageSrcset(item.image)"
                    sizes="(max-width: 767px) calc(100vw - 24px), (max-width: 1199px) 450px, 410px"
                    decoding="async"
                    [alt]="getItemName(item)"
                    loading="lazy"
                  />
                  @if (item.featured) {
                  <span class="featured">{{
                    'MENU_PAGE.FEATURED' | translate
                  }}</span>
                  }
                </div>
                <div class="menu-item-info">
                  <h3 class="menu-item-name">{{ getItemName(item) }}</h3>
                  <p class="menu-item-description">
                    {{ getItemDescription(item) }}
                  </p>
                  <div class="menu-item-price">
                    €{{ item.price.toFixed(2) }}
                  </div>
                </div>
              </div>
              } }
            </div>
          </div>
          } @if (selectedCategory === 'dolci') {
          <div class="menu-section">
            <h2 class="category-title">
              {{ 'MENU_PAGE.CATEGORIES.DOLCI' | translate }}
              <h3>
                {{ 'MENU_PAGE.CATEGORIES.DOLCI_SUBTITLE' | translate }}
              </h3>
            </h2>
            <div class="menu-items">
              @for (item of getItemsByCategory('dolci'); track item.id) { @if
              (item.image) {
              <div
                class="menu-item"
                [attr.data-scroll-id]="item.translationKey"
              >
                <div class="menu-item-image">
                  <img
                    [src]="item.image"
                    [attr.srcset]="imageSrcset(item.image)"
                    sizes="(max-width: 767px) calc(100vw - 24px), (max-width: 1199px) 450px, 410px"
                    decoding="async"
                    [alt]="getItemName(item)"
                    loading="lazy"
                  />
                  @if (item.featured) {
                  <span class="featured">{{
                    'MENU_PAGE.FEATURED' | translate
                  }}</span>
                  }
                </div>
                <div class="menu-item-info">
                  <h3 class="menu-item-name">{{ getItemName(item) }}</h3>
                  <p class="menu-item-description">
                    {{ getItemDescription(item) }}
                  </p>
                  <div class="menu-item-price">
                    €{{ item.price.toFixed(2) }}
                  </div>
                </div>
              </div>
              } }
            </div>
          </div>
          } @if (selectedCategory === 'bevande') {
          <div class="menu-section">
            <h2 class="category-title">
              {{ 'MENU_PAGE.CATEGORIES.BEVANDE' | translate }}
              <h3>
                {{ 'MENU_PAGE.CATEGORIES.BEVANDE_SUBTITLE' | translate }}
              </h3>
            </h2>
            <div class="menu-items">
              @for (item of getItemsByCategory('bevande'); track item.id) { @if
              (item.image) {
              <div
                class="menu-item"
                [attr.data-scroll-id]="item.translationKey"
              >
                <div class="menu-item-image">
                  <img
                    [src]="item.image"
                    [attr.srcset]="imageSrcset(item.image)"
                    sizes="(max-width: 767px) calc(100vw - 24px), (max-width: 1199px) 450px, 410px"
                    decoding="async"
                    [alt]="getItemName(item)"
                    loading="lazy"
                  />
                  @if (item.featured) {
                  <span class="featured">{{
                    'MENU_PAGE.FEATURED' | translate
                  }}</span>
                  }
                </div>
                <div class="menu-item-info">
                  <h3 class="menu-item-name">{{ getItemName(item) }}</h3>
                  <p class="menu-item-description">
                    {{ getItemDescription(item) }}
                  </p>
                  <div class="menu-item-price">
                    €{{ item.price.toFixed(2) }}
                  </div>
                </div>
              </div>
              } }
            </div>
          </div>
          }

          @if (selectedCategory === 'menuFisso') {
          <section class="menu-formule" aria-labelledby="formule-title">
            <h2 id="formule-title">{{ 'MENU_DETAILS.FORMULE_TITLE' | translate }}</h2>
            <p>{{ 'MENU_DETAILS.FORMULE_MAIN' | translate }}</p>
            <span class="formule-plus" aria-hidden="true">+</span>
            <p>{{ 'MENU_DETAILS.FORMULE_DESSERT' | translate }}</p>
            <span class="formule-plus" aria-hidden="true">+</span>
            <p>{{ 'MENU_DETAILS.FORMULE_DRINK' | translate }}</p>
            <strong class="formule-price">{{ formatPrice(13) }}</strong>
          </section>
          }

          <div class="menu-notice">
            <p>{{ 'MENU_PAGE.ALLERGIES_NOTICE' | translate }}</p>
          </div>
        </div>
      </div>

      <!-- <div class="cta-section">
        <div class="container">
          <h2>{{ 'MENU_PAGE.CTA_TITLE' | translate }}</h2>
          <p>{{ 'MENU_PAGE.CTA_SUBTITLE' | translate }}</p>
          <a routerLink="/order" class="cta-btn">{{
            'MENU_PAGE.ORDER_BUTTON' | translate
          }}</a>
        </div>
      </div> -->
    </div>
  `,
  styles: [
    `
      .menu-variants {
        list-style: none;
        padding: 0;
        margin: 20px 0;
      }
      .menu-variants li {
        padding: 14px 0;
        border-top: 1px solid #e6dfd3;
      }
      .variant-heading {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 12px;
      }
      .variant-heading h4 {
        margin: 0;
        font-size: 1.1rem;
      }
      .variant-price {
        white-space: nowrap;
        font-weight: 700;
      }
      .menu-variants p {
        margin: 6px 0 0;
        font-size: 0.95rem;
        line-height: 1.5;
      }
      .menu-formule {
        max-width: 540px;
        margin: 40px auto;
        padding: 32px 24px;
        border: 1px solid var(--primary-color);
        border-top: 4px solid var(--primary-color);
        border-radius: var(--border-radius);
        background: var(--secondary-color);
        color: var(--bg-light);
        box-shadow: var(--box-shadow);
        text-align: center;
      }
      .menu-formule h2 {
        color: var(--primary-color);
        font-family: var(--font-title);
        font-weight: 700;
      }
      .menu-formule p { margin: 12px 0; }
      .formule-plus {
        color: var(--primary-color);
        font-size: 1.4rem;
      }
      .formule-price {
        display: block;
        margin-top: 20px;
        font-size: 1.8rem;
        color: var(--primary-color);
      }
      .tabs {
        display: flex;
        justify-content: center;
        flex-wrap: nowrap;
        gap: 6px;
        overflow-x: auto;
        white-space: nowrap;
        scrollbar-width: none;
        -ms-overflow-style: none;
        -webkit-overflow-scrolling: touch;
      }
      .tabs::-webkit-scrollbar {
        display: none;
      }
      .tabs button {
        flex: 0 0 auto;
        white-space: nowrap;
      }
      .tab-label-short { display: none; }
      @media (max-width: 767px) {
        .menu-tabs .container { padding-inline: 8px; }
        .menu-tabs .tabs {
          gap: 2px;
          padding: 10px 0;
          overflow-x: visible;
          justify-content: center;
        }
        .menu-tabs .tabs button {
          flex: 0 1 auto;
          min-width: 0;
          min-height: 48px;
          padding: 10px 5px;
          font-size: clamp(0.7rem, 3vw, 0.95rem);
        }
        .tab-label-full { display: none; }
        .tab-label-short { display: inline; }
      }
      .carousel-dots {
        display: flex;
        justify-content: center;
        margin: 15px 0 0 0;
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
    `,
  ],
})
export class MenuComponent implements OnInit {
  readonly imageSrcset = productImageSrcset;
  categories = ['tavolaCalda', 'primi', 'dolci', 'bevande', 'menuFisso'];
  selectedCategory = 'tavolaCalda';

  categoryNames = {
    tavolaCalda: 'Tavola Calda',
    primi: 'Primi',
    dolci: 'Dolci',
    bevande: 'Bevande',
    menuFisso: 'Menu fisso',
  };

  constructor(
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    public readonly menuDownload: MenuDownloadService
  ) {}

  menuItems: MenuItem[] = [
    // Tavola calda
    {
      id: 1,
      translationKey: 'MENU_ITEMS.TAVOLA_CALDA.ARANCINI',
      price: 5,
      images: [
        '/assets/images/arancini.webp',
        '/assets/images/arancino.webp',
        '/assets/images/arancinopistacchio.webp',
      ],
      featured: true,
      category: 'tavolaCalda',
    },
    {
      id: 2,
      translationKey: 'MENU_ITEMS.TAVOLA_CALDA.FOCACCIA',
      price: 9,
      image: '/assets/images/focaccia.webp',
      category: 'tavolaCalda',
    },
    {
      id: 3,
      translationKey: 'MENU_ITEMS.TAVOLA_CALDA.PIZZA_FRITTA',
      price: 8,
      image: '/assets/images/pizzafritta1.webp',
      category: 'tavolaCalda',
    },
    {
      id: 4,
      translationKey: 'MENU_ITEMS.TAVOLA_CALDA.PIZZA_TEGLIA',
      price: 6.8,
      image: '/assets/images/pizzateglia.webp',
      category: 'tavolaCalda',
    },
    {
      id: 5,
      translationKey: 'MENU_ITEMS.TAVOLA_CALDA.PIZZA_PORTAFOGLIO',
      price: 7,
      image: '/assets/images/pizzaportafoglio.webp',
      category: 'tavolaCalda',
    },
    // Primi Piatti
    {
      id: 6,
      translationKey: 'MENU_ITEMS.PRIMI.LASAGNE',
      price: 9.5,
      image: '/assets/images/lasagnabolo.webp',
      featured: true,
      category: 'primi',
    },
    {
      id: 7,
      translationKey: 'MENU_ITEMS.PRIMI.LASAGNE_VEGETARIANE',
      price: 9.5,
      image: '/assets/images/lasagnavege.webp',
      featured: true,
      category: 'primi',
    },
    {
      id: 8,
      translationKey: 'MENU_ITEMS.PRIMI.PARMIGIANA',
      price: 8.5,
      image: '/assets/images/parmigiana.webp',
      featured: true,
      category: 'primi',
    },
    // Dolci
    {
      id: 9,
      translationKey: 'MENU_ITEMS.DOLCI.CANNOLI',
      price: 5,
      image: '/assets/images/cannoli1.webp',
      category: 'dolci',
    },
    {
      id: 10,
      translationKey: 'MENU_ITEMS.DOLCI.TIRAMISU',
      price: 5,
      image: '/assets/images/tiramisu.webp',
      category: 'dolci',
    },
    {
      id: 11,
      translationKey: 'MENU_ITEMS.DOLCI.GRAFFE',
      price: 3.7,
      image: '/assets/images/graffe.webp',
      category: 'dolci',
    },
    // Bevande
    {
      id: 12,
      translationKey: 'MENU_ITEMS.BEVANDE.CAFFE',
      price: 1.8,
      image: '/assets/images/caffe.webp',
      featured: true,
      category: 'bevande',
    },
    {
      id: 13,
      translationKey: 'MENU_ITEMS.BEVANDE.TOMARCHIO',
      price: 3.5,
      image: '/assets/images/tomarchio.webp',
      featured: true,
      category: 'bevande',
    },
  ];

  getVariants(item: MenuItem): MenuVariant[] {
    return MENU_VARIANTS[item.translationKey.split('.').pop() || ''] || [];
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat(this.translateService.currentLang || 'fr', {
      style: 'currency', currency: 'EUR',
    }).format(price);
  }

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
      menuFisso: 'MENU_DETAILS.FORMULE_TITLE',
    };
    return mapping[category] || category;
  }

  aranciniIndex = 0;
  touchStartX = 0;
  touchEndX = 0;

  get aranciniImages(): string[] {
    const arancini = this.menuItems.find(
      (item) => item.translationKey === 'MENU_ITEMS.TAVOLA_CALDA.ARANCINI'
    );
    return arancini?.images || [];
  }

  prevArancini() {
    this.aranciniIndex =
      (this.aranciniIndex - 1 + this.aranciniImages.length) %
      this.aranciniImages.length;
  }

  nextArancini() {
    this.aranciniIndex = (this.aranciniIndex + 1) % this.aranciniImages.length;
  }

  goToArancini(i: number) {
    this.aranciniIndex = i;
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
        this.prevArancini();
      } else {
        this.nextArancini();
      }
    }
  }

  trackById(index: number, item: MenuItem) {
    return item.id;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const category = params['category'];
      const scrollId = params['scrollId'];
      if (category && this.categories.includes(category)) {
        this.selectedCategory = category;
        setTimeout(() => {
          if (scrollId) {
            const el = document.querySelector(`[data-scroll-id='${scrollId}']`);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        }, 300);
      }
    });
  }
}
