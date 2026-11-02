import { Component } from '@angular/core';
import { SiteHero } from './site-hero/site-hero';
import { ContactSection } from './contact-section/contact-section';
import { AboutSection } from './about-section/about-section';
import { ScoutPath } from './scout-path/scout-path';

@Component({
  selector: 'app-home',
  imports: [SiteHero, ContactSection, AboutSection, ScoutPath],
  templateUrl: './home.html',
})
export class Home {}
