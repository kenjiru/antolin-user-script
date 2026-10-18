import { parsePageData, StorageData } from './parser';

const STORAGE_KEY = 'antolin_user_stats';
const LAST_ACTIVE_USER_KEY = 'antolin_last_active_user';

export function getStorageData(): StorageData {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('[Antolin Script] Failed to load statistics from storage', e);
    return {};
  }
}

export function saveStorageData(data: StorageData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('[Antolin Script] Failed to save statistics to storage', e);
  }
}

export function getLastActiveUser(): string | null {
  return localStorage.getItem(LAST_ACTIVE_USER_KEY);
}

export function setLastActiveUser(name: string): void {
  localStorage.setItem(LAST_ACTIVE_USER_KEY, name);
}

/**
 * Parses the current page and updates localStorage with the latest information.
 * Returns the name of the user whose data was updated/found.
 */
export function updateStorageWithPageData(): string | null {
  const parsed = parsePageData();
  if (!parsed) {
    return getLastActiveUser();
  }

  const { name, year, yearData } = parsed;
  const storage = getStorageData();

  if (!storage[name]) {
    storage[name] = {
      name,
      years: {},
    };
  }

  // Update/overwrite only the specific school year visited
  storage[name].years[year] = yearData;

  saveStorageData(storage);
  setLastActiveUser(name);

  return name;
}

/**
 * Fully resets statistics for a given user.
 */
export function resetUserStats(name: string): void {
  const storage = getStorageData();
  if (storage[name]) {
    delete storage[name];
    saveStorageData(storage);
  }
}

/**
 * Completely clears all stored statistics.
 */
export function clearAllStats(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LAST_ACTIVE_USER_KEY);
}
