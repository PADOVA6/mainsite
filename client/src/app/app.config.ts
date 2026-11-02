import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled' })),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['it', 'en'],
        defaultLang: 'it',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    providePrimeNG({
      theme: {
        preset: definePreset(Aura, {
          semantic: {
            primary: {
              50: '#f3f0fa',
              100: '#e5ddf3',
              200: '#cbbbe7',
              300: '#ad93d8',
              400: '#8863c0',
              500: '#67429e',
              600: '#52338a',
              700: '#3f2177',
              800: '#351c64',
              900: '#2b1656',
              950: '#1e1636',
            },
            colorScheme: {
              light: {
                primary: {
                  color: '{primary.700}',
                  inverseColor: '#ffffff',
                  hoverColor: '{primary.900}',
                  activeColor: '{primary.950}',
                },
              },
              dark: {
                primary: {
                  color: '{primary.300}',
                  inverseColor: '#1e1636',
                  hoverColor: '{primary.200}',
                  activeColor: '{primary.100}',
                },
              },
            },
          },
        }),
        options: {
          darkModeSelector: '.my-app-dark',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng ',
          },
        },
      },
    }),
  ],
};
