import { afterNextRender, DestroyRef, Directive, ElementRef, inject, signal } from '@angular/core';

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
        { threshold: 0.35 },
      );

      this.ready.set(true);
      observer.observe(this.element.nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
