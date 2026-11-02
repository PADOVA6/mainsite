import { Component } from '@angular/core';
import { AboutSection } from '../home/about-section/about-section';
import { ScoutPath } from '../home/scout-path/scout-path';
import { ContactSection } from '../home/contact-section/contact-section';

// Pagine singole (/chi-siamo, /cammino, /contatti) con le stesse sezioni della home

@Component({
  selector: 'app-about-page',
  imports: [AboutSection],
  template: `<div class="corda" aria-hidden="true"></div>
    <main id="contenuto" tabindex="-1"><app-about-section /></main>`,
})
export class AboutPage {}

@Component({
  selector: 'app-path-page',
  imports: [ScoutPath],
  template: `<div class="corda" aria-hidden="true"></div>
    <main id="contenuto" tabindex="-1"><app-scout-path /></main>`,
})
export class PathPage {}

@Component({
  selector: 'app-contact-page',
  imports: [ContactSection],
  template: `<div class="corda" aria-hidden="true"></div>
    <main id="contenuto" tabindex="-1"><app-contact-section /></main>`,
})
export class ContactPage {}
