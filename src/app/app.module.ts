import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      defaultLanguage: 'it'
    })
  ],
  providers: []
})
export class AppModule { }
