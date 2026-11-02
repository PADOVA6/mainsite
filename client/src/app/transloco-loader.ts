import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { of, throwError } from 'rxjs';

import en from '../../public/i18n/en.json';
import it from '../../public/i18n/it.json';

// Le traduzioni sono incluse nel bundle invece di essere scaricate via HTTP:
// durante la pre-renderizzazione non esiste un server da cui chiedere /i18n/*.json,
// e caricandole in modo sincrono la pagina generata e quella idratata nel browser coincidono.
const translations: Record<string, Translation> = { it, en };

@Injectable({ providedIn: 'root' })
export class TranslocoJsonLoader implements TranslocoLoader {
  getTranslation(lang: string) {
    const translation = translations[lang];
    return translation
      ? of(translation)
      : throwError(() => new Error(`Lingua non disponibile: ${lang}`));
  }
}
