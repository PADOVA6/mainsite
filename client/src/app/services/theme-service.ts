import { DOCUMENT } from '@angular/common';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { readPreference, writePreference } from './preference-storage';

type ThemePreference = 'system' | 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly systemTheme = this.document.defaultView?.matchMedia(
    '(prefers-color-scheme: dark)',
  );
  private readonly preference = signal<ThemePreference>('system');
  private readonly dark = signal(false);
  readonly isDark = this.dark.asReadonly();

  constructor() {
    const savedTheme = readPreference('user-theme');
    this.preference.set(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'system');
    this.applyTheme();
    const onSystemChange = () => this.applyTheme();
    this.systemTheme?.addEventListener('change', onSystemChange);
    this.destroyRef.onDestroy(() =>
      this.systemTheme?.removeEventListener('change', onSystemChange),
    );
  }

  toggle(): void {
    const value = this.dark() ? 'light' : 'dark';
    this.preference.set(value);
    this.applyTheme();
    writePreference('user-theme', value);
  }

  private applyTheme(): void {
    const isDark =
      this.preference() === 'dark' ||
      (this.preference() === 'system' && (this.systemTheme?.matches ?? false));
    this.dark.set(isDark);
    this.document.documentElement.classList.toggle('my-app-dark', isDark);
  }
}
