import { DOCUMENT, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { getBrowserLang, TranslocoService } from '@jsverse/transloco';
import { PrimeNG } from 'primeng/config';
import { take } from 'rxjs';
import { readPreference, writePreference } from './preference-storage';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translocoService = inject(TranslocoService);
  private primeng = inject(PrimeNG);
  private document = inject(DOCUMENT);
  // Durante la pre-renderizzazione non esistono localStorage né la lingua del browser
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly availableLangs = ['it', 'en'];
  private readonly fallbackLang = 'it';

  constructor() {
    this.init();
  }

  private init() {
    const lang = this.determineLanguage();
    this.setLanguage(lang);
  }

  private determineLanguage(): string {
    // In pre-renderizzazione la pagina viene generata nella lingua predefinita
    if (!this.isBrowser) {
      return this.fallbackLang;
    }

    // 1. Priorità al localStorage
    const savedLang = readPreference('user-lang');
    if (savedLang && this.availableLangs.includes(savedLang)) {
      return savedLang;
    }

    // 2. Browser Lang
    const browserLang = getBrowserLang() || '';
    if (this.availableLangs.includes(browserLang)) {
      return browserLang;
    }

    // 3. Fallback
    return this.fallbackLang;
  }

  setLanguage(lang: string) {
    if (!this.availableLangs.includes(lang)) {
      throw new Error(`Unsupported language: ${lang}`);
    }

    // Persistenza e stato Transloco
    if (this.isBrowser) {
      writePreference('user-lang', lang);
    }
    this.translocoService.setActiveLang(lang);

    // Aggiornamento DOM e PrimeNG
    this.document.documentElement.lang = lang;
    this.syncPrimeNG(lang);
  }

  private syncPrimeNG(lang: string) {
    this.translocoService
      .selectTranslation(lang)
      .pipe(take(1))
      .subscribe((labels) => {
        if (labels['primeng']) {
          this.primeng.setTranslation(labels['primeng']);
        }
      });
  }

  get currentLang() {
    return this.translocoService.getActiveLang();
  }
}
