import { Component } from '@angular/core';
import { SiteHero } from './site-hero/site-hero';
import { HomeIntro } from './home-intro/home-intro';

@Component({
  selector: 'app-home',
  imports: [SiteHero, HomeIntro],
  templateUrl: './home.html',
})
export class Home {}
