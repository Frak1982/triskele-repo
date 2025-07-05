import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-column about">
            <h3 class="footer-title">Triskele</h3>
            <p class="footer-description">
              {{ 'FOOTER.DESCRIPTION' | translate }}
            </p>
          </div>

          <div class="footer-column social">
            <h3 class="footer-title">{{ 'FOOTER.SOCIAL' | translate }}</h3>
            <div class="social-icons">
              <!-- <a href="#" class="social-icon" aria-label="Facebook">
                <i class="icon-facebook">f</i>
              </a> -->
              <a
                href="https://www.instagram.com/triskele_gastronomie/"
                class="social-icon"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="icon-instagram">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="36"
                    height="36"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </a>
              <!-- <a href="#" class="social-icon" aria-label="Twitter">
                <i class="icon-twitter">t</i>
              </a> -->
              <!-- <a href="#" class="social-icon" aria-label="LinkedIn">
                <i class="icon-linkedin">l</i>
              </a> -->
            </div>
          </div>

          <!-- <div class="footer-column links">
            <h3 class="footer-title">{{ 'FOOTER.LINKS' | translate }}</h3>
            <ul class="footer-links">
              <li><a routerLink="/" scrollToTop>{{ 'FOOTER.HOME' | translate }}</a></li>
              <li><a routerLink="/about" scrollToTop>{{ 'FOOTER.ABOUT' | translate }}</a></li>
              <li><a routerLink="/menu" scrollToTop>{{ 'FOOTER.MENU' | translate }}</a></li>
              <li><a routerLink="/contact" scrollToTop>{{ 'FOOTER.CONTACT' | translate }}</a></li>
              <li><a routerLink="/order" scrollToTop>{{ 'FOOTER.ORDER' | translate }}</a></li>
            </ul>
          </div> -->

          <div class="footer-column contact">
            <h3 class="footer-title">{{ 'FOOTER.CONTACT_US' | translate }}</h3>
            <ul class="contact-info">
              <li>
                <i class="icon-location">📍</i>
                <span>{{ 'FOOTER.ADDRESS' | translate }}</span>
              </li>
              <li>
                <i class="icon-phone">📱</i>
                <span>{{ 'FOOTER.PHONE' | translate }}</span>
              </li>
              <li>
                <i class="icon-email me-1">✉️ </i>
                <span>{{ 'FOOTER.EMAIL' | translate }}</span>
              </li>
            </ul>
            <div class="flex flex-wrap justify-center gap-6">
              <a [routerLink]="['/contact']" class="btn" scrollToTop>
                {{ 'ABOUT.CONTACT_US' | translate }}
              </a>
            </div>
          </div>

          <div class="footer-column newsletter">
            <h3 class="footer-title">
              {{ 'FOOTER.OPENING_HOURS' | translate }}
            </h3>
            <ul class="contact-info">
              <li>
                <span
                  ><strong>{{ 'FOOTER.MONDAY_FRIDAY' | translate }}:</strong>
                  {{ 'FOOTER.HOURS_MON_FRI' | translate }}</span
                >
              </li>
              <li>
                <span
                  ><strong>{{ 'FOOTER.SATURDAY' | translate }}:</strong>
                  {{ 'FOOTER.HOURS_SAT' | translate }}</span
                >
              </li>
              <li>
                <span
                  ><strong>{{ 'FOOTER.SUNDAY' | translate }}:</strong>
                  {{ 'FOOTER.HOURS_SUN' | translate }}</span
                >
              </li>
            </ul>
          </div>
        </div>

        <div class="map-container">
          <h3 class="footer-title">
            {{ 'FOOTER.OUR_LOCATION' | translate }}
          </h3>
          <h5 class="footer-our-location-subtitle">
            {{ 'FOOTER.OUR_LOCATION_SUBTITLE1' | translate }}
          </h5>
          <h5 class="footer-our-location-subtitle">
            {{ 'FOOTER.OUR_LOCATION_SUBTITLE2' | translate }}
          </h5>
          <h5 class="footer-our-location-subtitle">
            {{ 'FOOTER.OUR_LOCATION_SUBTITLE3' | translate }}
          </h5>
          <div class="google-map">
            <iframe
              [src]="mapUrl"
              width="100%"
              height="300"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            >
            </iframe>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="copyright">
            © {{ currentYear }} {{ 'FOOTER.COPYRIGHT' | translate }}
          </div>
          <!-- <div class="footer-bottom-links">
            {{ 'FOOTER.MADE_WITH_LOVE' | translate }}
          </div> -->
        </div>
      </div>
    </footer>
  `,
  styles: [`
    /* Stili per il bottone nella sezione contatti */
    .contact .flex {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }

    .contact .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 12px 24px;
      background-color: transparent;
      color: var(--primary-color);
      text-decoration: none;
      border-radius: 30px;
      font-weight: 500;
      transition: all 0.3s ease;
      border: 2px solid var(--primary-color);
      min-width: 140px;
    }

    .contact .btn:hover {
      background-color: var(--primary-color);
      color: var(--secondary-color);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .contact .btn:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.3);
    }

    /* Responsive per il bottone */
    @media (max-width: 768px) {
      .contact .btn {
        padding: 10px 20px;
        font-size: 0.9rem;
        min-width: 120px;
      }
    }
  `],
})
export class FooterComponent implements OnInit, OnDestroy {
  mapUrl!: SafeResourceUrl;
  private langSubscription?: Subscription;

  constructor(
    private translateService: TranslateService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // Imposta l'URL iniziale della mappa basato sulla lingua corrente
    this.updateMapUrl();

    // Sottoscriviti ai cambiamenti di lingua
    this.langSubscription = this.translateService.onLangChange.subscribe(() => {
      this.updateMapUrl();
    });
  }

  ngOnDestroy(): void {
    // Pulisci la sottoscrizione quando il componente viene distrutto
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }

  private updateMapUrl(): void {
    const currentLang = this.translateService.currentLang || 'it';

    // URL base della mappa con le coordinate di Rennes
    const baseUrl =
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21316.651273938823!2d-1.6949653!3d48.1113387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480ede2fa7d69085%3A0x40ca5cd36e4ab30!2sCentro%20citt%C3%A0%2C%20Rennes%2C%20Francia';

    // Aggiungi i parametri di lingua
    const mapUrlString = `${baseUrl}!5e0!3m2!1s${currentLang}!2s${currentLang}!4v1687547965661!5m2!1s${currentLang}!2s${currentLang}`;

    // Sanitizza l'URL per renderlo sicuro
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(mapUrlString);
  }
}
