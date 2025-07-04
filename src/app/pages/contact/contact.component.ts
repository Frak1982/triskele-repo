import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, RouterLink],
  template: `
    <div class="contact-page">
      <!-- Menu Header Style (stesso stile della pagina menu) -->
      <div class="menu-header">
        <div class="container">
          <h1>{{ 'CONTACT.TITLE' | translate }}</h1>
          <p>{{ 'CONTACT.SUBTITLE' | translate }}</p>
        </div>
      </div>

      <div class="container mx-auto px-4 py-16">
        <div class="flex flex-col lg:flex-row gap-12">
          <!-- Form Section -->
          <div class="lg:w-2/3">
            <div class="section-title-container">
              <h2 class="text-2xl font-bold mb-2 text-primary-900">
                {{ 'CONTACT.FORM_TITLE' | translate }}
              </h2>
              <div class="accent-line mb-8"></div>
            </div>

            <div class="form-container">
              <form
                [formGroup]="contactForm"
                (ngSubmit)="onSubmit()"
                name="contact"
                method="POST"
                class="space-y-6"
                netlify
                data-netlify="true"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div class="form-group">
                  <label for="name" class="form-label">
                    {{ 'CONTACT.NAME_LABEL' | translate }}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    formControlName="name"
                    class="form-input"
                    [placeholder]="'CONTACT.NAME_PLACEHOLDER' | translate"
                  />
                  @if (contactForm.get('name')?.invalid &&
                  contactForm.get('name')?.touched) {
                  <div class="error-message">
                    {{ 'CONTACT.NAME_ERROR' | translate }}
                  </div>
                  }
                </div>
                <div class="form-group">
                  <label for="email" class="form-label">
                    {{ 'CONTACT.EMAIL_LABEL' | translate }}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    formControlName="email"
                    class="form-input"
                    [placeholder]="'CONTACT.EMAIL_PLACEHOLDER' | translate"
                  />
                  @if (contactForm.get('email')?.invalid &&
                  contactForm.get('email')?.touched) {
                  <div class="error-message">
                    {{ 'CONTACT.EMAIL_ERROR' | translate }}
                  </div>
                  }
                </div>
                <div class="form-group">
                  <label for="phone" class="form-label">
                    {{ 'CONTACT.PHONE_LABEL' | translate }}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    formControlName="phone"
                    class="form-input"
                    [placeholder]="'CONTACT.PHONE_PLACEHOLDER' | translate"
                  />
                </div>

                <div class="form-group">
                  <label for="subject" class="form-label">
                    {{ 'CONTACT.SUBJECT_LABEL' | translate }}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    formControlName="subject"
                    class="form-input"
                    [placeholder]="'CONTACT.SUBJECT_PLACEHOLDER' | translate"
                  />
                  @if (contactForm.get('subject')?.invalid &&
                  contactForm.get('subject')?.touched) {
                  <div class="error-message">
                    {{ 'CONTACT.SUBJECT_ERROR' | translate }}
                  </div>
                  }
                </div>

                <div class="form-group">
                  <label for="message" class="form-label">
                    {{ 'CONTACT.MESSAGE_LABEL' | translate }}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    formControlName="message"
                    rows="5"
                    class="form-textarea"
                    [placeholder]="'CONTACT.MESSAGE_PLACEHOLDER' | translate"
                  ></textarea>
                  @if (contactForm.get('message')?.invalid &&
                  contactForm.get('message')?.touched) {
                  <div class="error-message">
                    {{ 'CONTACT.MESSAGE_ERROR' | translate }}
                  </div>
                  }
                </div>

                <div class="privacy-check">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    formControlName="privacy"
                    class="form-checkbox"
                  />
                  <label for="privacy" class="privacy-label">
                    {{ 'CONTACT.PRIVACY_LABEL' | translate }}
                    <a href="#" class="privacy-link" (click)="openPrivacy($event)">{{
                      'CONTACT.PRIVACY_LINK' | translate
                    }}</a>
                  </label>
                </div>
                @if (contactForm.get('privacy')?.invalid &&
                contactForm.get('privacy')?.touched) {
                <div class="error-message mb-4">
                  {{ 'CONTACT.PRIVACY_ERROR' | translate }}
                </div>
                }

                <div class="form-actions">
                  <button
                    type="submit"
                    [disabled]="contactForm.invalid || isSubmitting"
                    class="submit-btn"
                  >
                    @if (isSubmitting) {
                    <span>{{ 'CONTACT.SENDING' | translate }}</span>
                    } @else {
                    <span>{{ 'CONTACT.SEND' | translate }}</span>
                    }
                  </button>
                </div>
              </form>
            </div>

            @if (submitted) {
            <div class="success-message">
              {{ 'CONTACT.SUCCESS_MESSAGE' | translate }}
            </div>
            }
          </div>

          <!-- Contact Info Section -->
          <!-- <div class="lg:w-1/3">
            <div class="info-card">
              <div class="section-title-container">
                <h2 class="text-2xl font-bold mb-2 text-primary-900">
                  {{ 'CONTACT.INFO_TITLE' | translate }}
                </h2>
                <div class="accent-line mb-8"></div>
              </div>

              <div class="space-y-8">
                <div class="info-item">
                  <div class="info-icon">
                    <i class="fas fa-map-marker-alt"></i>
                  </div>
                  <div class="info-content">
                    <h3 class="text-lg font-medium">
                      {{ 'CONTACT.ADDRESS_TITLE' | translate }}
                    </h3>
                    <p class="text-gray-600">
                      {{ 'CONTACT.ADDRESS' | translate }}
                    </p>
                  </div>
                </div>

                <div class="info-item">
                  <div class="info-icon">
                    <i class="fas fa-phone-alt"></i>
                  </div>
                  <div class="info-content">
                    <h3 class="text-lg font-medium">
                      {{ 'CONTACT.PHONE_TITLE' | translate }}
                    </h3>
                    <p class="text-gray-600">
                      {{ 'CONTACT.PHONE_NUMBER' | translate }}
                    </p>
                  </div>
                </div>

                <div class="info-item">
                  <div class="info-icon">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div class="info-content">
                    <h3 class="text-lg font-medium">
                      {{ 'CONTACT.EMAIL_TITLE' | translate }}
                    </h3>
                    <p class="text-gray-600">
                      {{ 'CONTACT.EMAIL_ADDRESS' | translate }}
                    </p>
                  </div>
                </div>

                <div class="info-item">
                  <div class="info-icon">
                    <i class="fas fa-clock"></i>
                  </div>
                  <div class="info-content">
                    <h3 class="text-lg font-medium">
                      {{ 'CONTACT.HOURS_TITLE' | translate }}
                    </h3>
                    <div class="hours-table">
                      <p class="hours-row">
                        <span>{{ 'CONTACT.MONDAY_FRIDAY' | translate }}:</span>
                        <span>{{ 'CONTACT.WEEKDAY_HOURS' | translate }}</span>
                      </p>
                      <p class="hours-row">
                        <span>{{ 'CONTACT.SATURDAY' | translate }}:</span>
                        <span>{{ 'CONTACT.SATURDAY_HOURS' | translate }}</span>
                      </p>
                      <p class="hours-row">
                        <span>{{ 'CONTACT.SUNDAY' | translate }}:</span>
                        <span>{{ 'CONTACT.SUNDAY_HOURS' | translate }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>

      <!-- MODALE PRIVACY POLICY -->
      @if (showPrivacy) {
        <div class="privacy-modal" tabindex="-1" role="dialog" aria-modal="true">
          <div class="privacy-modal-content">
            <button class="privacy-modal-close" (click)="closePrivacy()" aria-label="Chiudi">
              &times;
            </button>
            <h2>{{ 'PRIVACYPOLICY.TITLE' | translate }}</h2>
            <p><strong>{{ 'PRIVACYPOLICY.SUBTITLE' | translate }}</strong></p>
            <ul class="privacy-list">
              <li><strong>{{ 'PRIVACYPOLICY.PRIMO' | translate }}</strong><br>{{ 'PRIVACYPOLICY.SUBPRIMO' | translate }}</li>
              <li><strong>{{ 'PRIVACYPOLICY.SECONDO' | translate }}</strong><br>{{ 'PRIVACYPOLICY.SUBSECONDO' | translate }}</li>
              <li><strong>{{ 'PRIVACYPOLICY.TERZO' | translate }}</strong><br>{{ 'PRIVACYPOLICY.SUBTERZO' | translate }}</li>
              <li><strong>{{ 'PRIVACYPOLICY.QUARTO' | translate }}</strong><br>{{ 'PRIVACYPOLICY.SUBQUARTO' | translate }}</li>
              <li><strong>{{ 'PRIVACYPOLICY.QUINTO' | translate }}</strong><br>{{ 'PRIVACYPOLICY.SUBQUINTO' | translate }}</li>
              <li><strong>{{ 'PRIVACYPOLICY.SESTO' | translate }}</strong><br>{{ 'PRIVACYPOLICY.SUBSESTO' | translate }}</li>
              <li><strong>{{ 'PRIVACYPOLICY.SETTIMO' | translate }}</strong><br>{{ 'PRIVACYPOLICY.SUBSETTIMO' | translate }}</li>
            </ul>
            <p>{{ 'PRIVACYPOLICY.CONCLUSIONI' | translate }}</p>
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `.privacy-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
    }
    .privacy-modal-content {
      background: #fff;
      border-radius: 12px;
      max-width: 600px;
      width: 90vw;
      padding: 2rem 1.5rem 1.5rem 1.5rem;
      position: relative;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
      max-height: 90vh;
      overflow-y: auto;
    }
    .privacy-modal-close {
      position: absolute;
      top: 12px;
      right: 16px;
      background: none;
      border: none;
      font-size: 2rem;
      color: #888;
      cursor: pointer;
      z-index: 10;
      transition: color 0.2s;
    }
    .privacy-modal-close:hover {
      color: #d6249f;
    }
    .privacy-list {
      padding-left: 1.2rem;
      margin-bottom: 1.5rem;
    }
    .privacy-list li {
      margin-bottom: 1rem;
    }
    @media (max-width: 600px) {
      .privacy-modal-content {
        padding: 1rem 0.5rem 1rem 0.5rem;
      }
    }
    `
  ],
})
export class ContactComponent {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
    privacy: new FormControl(false, [Validators.requiredTrue]),
  });

  isSubmitting = false;
  submitted = false;
  showPrivacy = false;

  openPrivacy(event: Event) {
    event.preventDefault();
    this.showPrivacy = true;
  }
  closePrivacy() {
    this.showPrivacy = false;
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    // Invia il form a Netlify
    const form = document.querySelector(
      'form[name="contact"]'
    ) as HTMLFormElement;
    const formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => {
        this.isSubmitting = false;
        this.submitted = true;
        this.contactForm.reset();
      })
      .catch((error) => {
        console.error("Errore durante l'invio del form:", error);
        this.isSubmitting = false;
      });
  }
}
