import { Injectable } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  constructor(private router: Router) {
    // Sottoscrivi agli eventi di navigazione con approccio più aggressivo
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // Usa setTimeout per assicurarsi che lo scroll avvenga dopo il rendering della vista
        setTimeout(() => {
          console.log('Esecuzione scroll to top');
          this.executeScroll();
        }, 100);
      }
    });
  }

  // Metodo per scrollare manualmente in alto
  scrollToTop(): void {
    console.log('Scroll to top manuale chiamato');
    this.executeScroll();
  }

  // Metodo che esegue lo scroll usando diversi approcci per massimizzare la compatibilità
  private executeScroll(): void {
    // Prova prima l'approccio moderno
    if (typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }

    // Backup per browser più vecchi
    if (typeof document !== 'undefined') {
      document.body.scrollTop = 0; // Per Safari
      document.documentElement.scrollTop = 0; // Per Chrome, Firefox, IE e Opera
    }
  }
}
