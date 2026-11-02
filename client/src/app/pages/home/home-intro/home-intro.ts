import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-home-intro',
  imports: [TranslocoDirective, RouterLink],
  templateUrl: './home-intro.html',
  styleUrl: './home-intro.css',
})
export class HomeIntro {
  protected readonly facts = ['ages', 'units', 'sunday', 'monthly'];
  // Anteprime delle pagine interne: la home non ne ripete il contenuto
  protected readonly cards = [
    { key: 'about', link: '/chi-siamo' },
    { key: 'path', link: '/cammino' },
    { key: 'contacts', link: '/contatti' },
  ];
}
