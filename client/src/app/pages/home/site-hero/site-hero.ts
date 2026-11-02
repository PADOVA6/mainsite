import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-site-hero',
  imports: [TranslocoDirective, ButtonModule, RouterLink],
  templateUrl: './site-hero.html',
  styleUrl: './site-hero.css',
})
export class SiteHero {}
