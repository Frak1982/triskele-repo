import { Directive, HostListener } from '@angular/core';
import { ScrollService } from '../services/scroll.service';

@Directive({
  selector: '[scrollToTop]',
  standalone: true
})
export class ScrollToTopDirective {
  constructor(private scrollService: ScrollService) {}

  @HostListener('click')
  onClick(): void {
    console.log('Direttiva ScrollToTop attivata');
    this.scrollService.scrollToTop();
  }
}
