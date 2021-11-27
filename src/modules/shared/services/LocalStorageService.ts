interface LocalStorageItems {
  auth: { token: string; tokenInitDate: string };
  lastView: 'month' | 'week' | 'work_week' | 'day' | 'agenda';
}

export class LocalStorageService {
  static get<Key extends keyof LocalStorageItems>(
    key: Key
  ): LocalStorageItems[Key] | void {
    const value = window.localStorage.getItem(key);

    if (value) return JSON.parse(value);
  }

  static save(
    key: keyof LocalStorageItems,
    value: LocalStorageItems[keyof LocalStorageItems]
  ): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
