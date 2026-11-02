import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';

// Aggiunge reveal-ready quando l'animazione è possibile e visto quando l'elemento entra nello schermo.
// Senza JavaScript o con il movimento ridotto il contenuto resta visibile com'è.

@Directive({
  selector: '[appRevealOnScroll]',
  host: {
    '[class.reveal-ready]': 'ready()',
    '[class.visto]': 'visible()',
  },
})
export class RevealOnScroll {
  protected readonly ready = signal(false);
  protected readonly visible = signal(false);
  // quota dell'elemento che deve essere visibile; più bassa per gli elementi molto alti
  readonly revealThreshold = input(0.35);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (
        !('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            this.visible.set(true);
            observer.disconnect();
          }
        },
        { threshold: this.revealThreshold() },
      );

      this.ready.set(true);
      observer.observe(this.element.nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
