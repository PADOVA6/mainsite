import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { SiteFooter } from './layout/site-footer/site-footer';
import { SiteNavbar } from './layout/site-navbar/site-navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslocoDirective, SiteNavbar, SiteFooter],
  template: `
    <a class="skip" href="#contenuto" *transloco="let t">{{ t('home.skip') }}</a>
    <app-site-navbar />
    <router-outlet />
    <app-site-footer />
  `,
  styles: `
    .skip {
      position: absolute;
      left: -999px;
      top: 0;
      background: var(--viola);
      color: var(--su-primario);
      padding: 0.5rem 1rem;
      z-index: 10;
    }
    .skip:focus {
      left: 1rem;
      top: 1rem;
    }
  `,
})
export class App {}
