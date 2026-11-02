import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './services/language-service';
import { SiteFooter } from './layout/site-footer/site-footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteFooter],
  template: `<router-outlet /><app-site-footer />`,
  styles: [],
})
export class App {
  private langService = inject(LanguageService);
}
