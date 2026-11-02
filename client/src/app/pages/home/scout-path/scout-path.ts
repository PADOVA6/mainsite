import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { RevealOnScroll } from './reveal-on-scroll';

@Component({
  selector: 'app-scout-path',
  imports: [TranslocoDirective, RevealOnScroll],
  templateUrl: './scout-path.html',
  styleUrl: './scout-path.css',
})
export class ScoutPath {
  protected readonly stages = [
    { key: 'pack', ages: '8–11' },
    { key: 'troop', ages: '12–16' },
    { key: 'clan', ages: '16–21' },
  ];
}
