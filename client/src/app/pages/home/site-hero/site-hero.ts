import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-site-hero',
  imports: [TranslocoDirective, ButtonModule],
  templateUrl: './site-hero.html',
  styleUrl: './site-hero.css',
})
export class SiteHero {}
