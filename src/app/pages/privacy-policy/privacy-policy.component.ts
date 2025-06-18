import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'privacy-policy',
  standalone: true,
  imports: [TranslateModule],
  template: `
    <div class="p-3">
      <h1>{{ 'PRIVACYPOLICY.TITLE' | translate }}</h1>
      <p>{{ 'PRIVACYPOLICY.SUBTITLE' | translate }}</p>

      <h2>{{ 'PRIVACYPOLICY.PRIMO' | translate }}</h2>
      <p>{{ 'PRIVACYPOLICY.SUBPRIMO' | translate }}</p>

      <h2>{{ 'PRIVACYPOLICY.SECONDO' | translate }}</h2>
      <p>{{ 'PRIVACYPOLICY.SUBSECONDO' | translate }}</p>

      <h2>{{ 'PRIVACYPOLICY.TERZO' | translate }}</h2>
      <p>{{ 'PRIVACYPOLICY.SUBTERZO' | translate }}</p>

      <h2>{{ 'PRIVACYPOLICY.QUARTO' | translate }}</h2>
      <p>{{ 'PRIVACYPOLICY.SUBQUARTO' | translate }}</p>

      <h2>{{ 'PRIVACYPOLICY.QUINTO' | translate }}</h2>
      <p>{{ 'PRIVACYPOLICY.SUBQUINTO' | translate }}</p>

      <h2>{{ 'PRIVACYPOLICY.SESTO' | translate }}</h2>
      <p>{{ 'PRIVACYPOLICY.SUBSESTO' | translate }}</p>

      <h2>{{ 'PRIVACYPOLICY.SETTIMO' | translate }}</h2>
      <p>{{ 'PRIVACYPOLICY.SUBSETTIMO' | translate }}</p>

      <p>{{ 'PRIVACYPOLICY.CONCLUSIONI' | translate }}</p>
    </div>
  `,
})
export class PrivacyPolicyComponent {}
