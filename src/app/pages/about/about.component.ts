import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollToTopDirective } from '../../directives/scroll-to-top.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, ScrollToTopDirective],
  template: `
    <div class="about-page">
      <!-- Menu Header Style (stesso stile della pagina menu) -->
      <div class="menu-header">
        <div class="container">
          <h1>{{ 'ABOUT.TITLE' | translate }}</h1>
          <p>{{ 'ABOUT.SUBTITLE' | translate }}</p>
        </div>
      </div>

      <div class="container mx-auto px-4 py-16">
        <!-- Chi siamo section -->
        <div class="flex flex-col md:flex-row items-center mb-24 gap-12">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <div class="section-title-container">
              <h2 class="text-3xl font-bold mb-2 text-primary-900">{{ 'ABOUT.WHO_WE_ARE' | translate }}</h2>
              <div class="accent-line mb-8"></div>
            </div>
            <p class="mb-6 text-gray-700 leading-relaxed">
              {{ 'ABOUT.PARAGRAPH_1' | translate }}
            </p>
            <p class="mb-6 text-gray-700 leading-relaxed">
              {{ 'ABOUT.PARAGRAPH_2' | translate }}
            </p>
            <p class="text-gray-700 leading-relaxed">
              {{ 'ABOUT.PARAGRAPH_3' | translate }}
            </p>
          </div>
          <div class="md:w-1/2">
            <div class="img-frame">
              <img
                src="/assets/images/team.jpg"
                alt="{{ 'ABOUT.IMAGE_ALT' | translate }}"
                class="w-full h-auto object-cover rounded-md"
              />
            </div>
          </div>
        </div>

        <!-- I nostri valori section -->
        <div class="mb-24">
          <div class="section-title-container text-center">
            <h2 class="text-3xl font-bold mb-2 text-primary-900">{{ 'ABOUT.VALUES_TITLE' | translate }}</h2>
            <div class="accent-line mx-auto mb-12"></div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div class="value-card">
              <div class="icon-container">
                <i class="fas fa-award"></i>
              </div>
              <h3 class="text-xl font-bold mb-4 text-primary-800">{{ 'ABOUT.QUALITY_TITLE' | translate }}</h3>
              <p class="text-gray-600">
                {{ 'ABOUT.QUALITY_DESC' | translate }}
              </p>
            </div>
            <div class="value-card">
              <div class="icon-container">
                <i class="fas fa-utensils"></i>
              </div>
              <h3 class="text-xl font-bold mb-4 text-primary-800">{{ 'ABOUT.TRADITION_TITLE' | translate }}</h3>
              <p class="text-gray-600">
                {{ 'ABOUT.TRADITION_DESC' | translate }}
              </p>
            </div>
            <div class="value-card">
              <div class="icon-container">
                <i class="fas fa-heart"></i>
              </div>
              <h3 class="text-xl font-bold mb-4 text-primary-800">{{ 'ABOUT.HOSPITALITY_TITLE' | translate }}</h3>
              <p class="text-gray-600">
                {{ 'ABOUT.HOSPITALITY_DESC' | translate }}
              </p>
            </div>
          </div>
        </div>

        <!-- Team section -->
        <div class="mb-24">
          <div class="section-title-container text-center">
            <h2 class="text-3xl font-bold mb-2 text-primary-900">{{ 'ABOUT.TEAM_TITLE' | translate }}</h2>
            <div class="accent-line mx-auto mb-12"></div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div class="team-card">
              <div class="img-container">
                <img
                  src="/assets/images/chef.jpg"
                  alt="{{ 'ABOUT.CHEF_ALT' | translate }}"
                  class="w-full h-full object-cover"
                />
                <div class="team-overlay"></div>
              </div>
              <div class="content">
                <h3 class="text-2xl font-bold text-primary-800">Alessandro</h3>
                <p class="text-primary-500 mb-4 font-medium">{{ 'ABOUT.CHEF_POSITION' | translate }}</p>
                <p class="text-gray-600">
                  {{ 'ABOUT.CHEF_DESC' | translate }}
                </p>
              </div>
            </div>
            <div class="team-card">
              <div class="img-container">
                <img
                  src="/assets/images/manager.jpg"
                  alt="{{ 'ABOUT.MANAGER_ALT' | translate }}"
                  class="w-full h-full object-cover"
                />
                <div class="team-overlay"></div>
              </div>
              <div class="content">
                <h3 class="text-2xl font-bold text-primary-800">Roberta</h3>
                <p class="text-primary-500 mb-4 font-medium">{{ 'ABOUT.MANAGER_POSITION' | translate }}</p>
                <p class="text-gray-600">
                  {{ 'ABOUT.MANAGER_DESC' | translate }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA section -->
        <div class="cta-section">
          <h2 class="text-4xl font-bold mb-6">{{ 'ABOUT.CTA_TITLE' | translate }}</h2>
          <p class="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            {{ 'ABOUT.CTA_SUBTITLE' | translate }}
          </p>
          <div class="flex flex-wrap justify-center gap-6">
            <a
              [routerLink]="['/menu']"
              class="btn"
              scrollToTop
            >
              {{ 'ABOUT.EXPLORE_MENU' | translate }}
            </a>
            <a
              [routerLink]="['/contact']"
              class="btn"
              scrollToTop
            >
              {{ 'ABOUT.CONTACT_US' | translate }}
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AboutComponent {}
