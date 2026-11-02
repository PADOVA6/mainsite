import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { RevealOnScroll } from '../../shared/reveal-on-scroll';
import { ButtonModule } from 'primeng/button';
import { ScoutPath } from './scout-path/scout-path';

@Component({
  selector: 'app-path-page',
  imports: [TranslocoDirective, RouterLink, ButtonModule, ScoutPath, RevealOnScroll],
  templateUrl: './path-page.html',
  styleUrl: './path-page.css',
})
export class PathPage {
  // groups/when: quali righe di dettaglio ha ogni unità (il Noviziato non ne ha)
  protected readonly units = [
    { key: 'pack', groups: true, when: true },
    { key: 'troops', groups: true, when: true },
    { key: 'novitiate', groups: false, when: false },
    { key: 'clan', groups: false, when: true },
  ];
  protected readonly schedule = ['sunday', 'weekly', 'monthly'];
}
