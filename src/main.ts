import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, TitleStrategy, withInMemoryScrolling } from '@angular/router';
import { routes } from './app/app-routing.module';
import { TriskeleComponent } from './app/triskele.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatedTitleStrategy } from './app/services/translated-title.strategy';

// Console log per debug
console.log('Avvio dell\'applicazione...');

bootstrapApplication(TriskeleComponent, {
  providers: [
    { provide: TitleStrategy, useClass: TranslatedTitleStrategy },
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      })
    ),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      ReactiveFormsModule,
      TranslateModule.forRoot({
        defaultLanguage: 'fr'
      })
    )
  ]
}).then(() => {
  console.log('ok');
}).catch(err => {
  console.error('error: ', err);
});
