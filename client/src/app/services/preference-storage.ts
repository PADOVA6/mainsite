// Durante la pre-renderizzazione (Node) localStorage non esiste: niente preferenze, niente avvisi.
const hasStorage = () => typeof localStorage !== 'undefined';

export function readPreference(key: string): string | null {
  if (!hasStorage()) {
    return null;
  }
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn(`Unable to read preference "${key}" from localStorage.`, error);
    return null;
  }
}

export function writePreference(key: string, value: string): void {
  if (!hasStorage()) {
    return;
  }
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Unable to save preference "${key}" to localStorage.`, error);
  }
}
