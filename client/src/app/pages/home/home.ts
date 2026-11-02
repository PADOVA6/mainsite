import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { SiteHero } from './site-hero/site-hero';
import { ContactSection } from './contact-section/contact-section';
import { AboutSection } from './about-section/about-section';
import { ScoutPath } from './scout-path/scout-path';

@Component({
  selector: 'app-home',
  imports: [TranslocoDirective, SiteHero, ContactSection, AboutSection, ScoutPath],
  templateUrl: './home.html',
  styles: `
    .skip {
      position: absolute;
      left: -999px;
      top: 0;
      background: var(--viola);
      color: #fff;
      padding: 0.5rem 1rem;
      z-index: 10;
    }
    .skip:focus {
      left: 1rem;
      top: 1rem;
    }
  `,
})
export class Home {}
