import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class MenuDownloadService {
  private readonly translate = inject(TranslateService);

  get filename(): string {
    const language = (this.translate.currentLang || 'fr').toLowerCase().split(/[-_]/)[0];
    return language === 'it' || language === 'en'
      ? `menu2026-${language}.pdf`
      : 'menu2026.pdf';
  }

  get url(): string {
    return `/assets/${this.filename}`;
  }
}
