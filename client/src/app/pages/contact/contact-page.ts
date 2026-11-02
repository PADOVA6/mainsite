import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { RevealOnScroll } from '../../shared/reveal-on-scroll';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-contact-page',
  imports: [TranslocoDirective, ButtonModule, RevealOnScroll],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
})
export class ContactPage {
  // Profili social del gruppo: per aggiungerne uno basta una riga (icone di PrimeIcons)
  protected readonly socials = [
    { name: 'Instagram', url: 'https://www.instagram.com/agescipadova6/', icon: 'pi pi-instagram' },
  ];
}
