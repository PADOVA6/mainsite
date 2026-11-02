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
    <div class="pagina"><router-outlet /></div>
    <app-site-footer />
  `,
  styles: `
    /* il footer resta in fondo anche nelle pagine con poco contenuto */
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      min-height: 100dvh;
    }
    .pagina {
      flex: 1 0 auto;
    }
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
