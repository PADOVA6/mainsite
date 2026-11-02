import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { LanguageService } from '../../services/language-service';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-site-navbar',
  imports: [RouterLink, TranslocoDirective],
  templateUrl: './site-navbar.html',
  styleUrl: './site-navbar.css',
})
export class SiteNavbar {
  readonly language = inject(LanguageService);
  readonly theme = inject(ThemeService);
  readonly menuOpen = signal(false);
  private readonly menuToggle = viewChild.required<ElementRef<HTMLButtonElement>>('menuToggle');

  closeMenu(restoreFocus = false): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    if (restoreFocus) this.menuToggle().nativeElement.focus();
  }
}
