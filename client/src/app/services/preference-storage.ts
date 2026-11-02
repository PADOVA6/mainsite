export function readPreference(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn(`Unable to read preference "${key}" from localStorage.`, error);
    return null;
  }
}

export function writePreference(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Unable to save preference "${key}" to localStorage.`, error);
  }
}
