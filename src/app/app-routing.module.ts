import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'PAGE_TITLES.HOME' },
  { path: 'menu', component: MenuComponent, title: 'PAGE_TITLES.MENU' },
  { path: 'products', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'about', component: AboutComponent, title: 'PAGE_TITLES.ABOUT' },
  { path: 'contact', component: ContactComponent, title: 'PAGE_TITLES.CONTACT' },
  { path: 'privacy-policy', component: PrivacyPolicyComponent, title: 'PAGE_TITLES.PRIVACY' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
