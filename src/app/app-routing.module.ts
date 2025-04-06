import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { OrderComponent } from './pages/order/order.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Triskele - Autentica Gastronomia Italiana a Rennes' },
  { path: 'menu', component: MenuComponent, title: 'Menu - Triskele' },
  { path: 'products', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'about', component: AboutComponent, title: 'Chi Siamo - Triskele' },
  { path: 'contact', component: ContactComponent, title: 'Contatti - Triskele' },
  // { path: 'order', component: OrderComponent, title: 'Ordina Online - Triskele' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
