import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { RevealOnScroll } from '../../shared/reveal-on-scroll';

@Component({
  selector: 'app-about-page',
  imports: [TranslocoDirective, RevealOnScroll],
  templateUrl: './about-page.html',
  styleUrl: './about-page.css',
})
export class AboutPage {
  // Date dalla pagina del gruppo su ScoutWiki; il 2022 è l'iscrizione al RUNTS
  protected readonly history = [
    { year: '1968', key: 'y1968' },
    { year: '1981', key: 'y1981' },
    { year: '2002', key: 'y2002' },
    { year: '2022', key: 'y2022' },
  ];
  protected readonly method = ['doing', 'outdoors', 'groups', 'growth', 'service', 'faith'];
}
