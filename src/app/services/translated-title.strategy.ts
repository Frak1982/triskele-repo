import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TranslatedTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly translate = inject(TranslateService);
  private snapshot?: RouterStateSnapshot;

  constructor() {
    super();
    this.translate.onLangChange.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.snapshot) this.updateTitle(this.snapshot);
    });
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.snapshot = snapshot;
    const key = this.buildTitle(snapshot);
    if (key) this.title.setTitle(this.translate.instant(key));
  }
}
