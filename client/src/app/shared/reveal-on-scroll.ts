import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';

// Anima un elemento quando entra nello schermo. La classe reveal-ready è già nell'HTML
// pre-renderizzato; lo stato nascosto vale solo con la classe "anim" su <html>, che lo script in
// index.html aggiunge prima del primo disegno (non c'è senza JavaScript o con il movimento ridotto).
// Quando l'elemento entra nello schermo riceve "visto" e parte la transizione.
@Directive({
  selector: '[appRevealOnScroll]',
  host: {
    class: 'reveal-ready',
    '[class.visto]': 'visible()',
  },
})
export class RevealOnScroll {
  protected readonly visible = signal(false);
  // quota dell'elemento che deve essere visibile; più bassa per gli elementi molto alti
  readonly revealThreshold = input(0.35);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) {
        this.visible.set(true);
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

      observer.observe(this.element.nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
