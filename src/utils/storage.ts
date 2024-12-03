import { STORAGE_PREFIX } from '../config/constants';

export const STORAGE_KEYS = {
  PATIENTS: `${STORAGE_PREFIX}_patients`,
  MEDICAL_RECORDS: `${STORAGE_PREFIX}_medical_records`,
  SAFETY_INCIDENTS: `${STORAGE_PREFIX}_safety_incidents`,
  PHARMACY_INVENTORY: `${STORAGE_PREFIX}_pharmacy_inventory`,
  LAB_TESTS: `${STORAGE_PREFIX}_lab_tests`,
  RADIOLOGY_EXAMS: `${STORAGE_PREFIX}_radiology_exams`,
  INSURANCE_POLICIES: `${STORAGE_PREFIX}_insurance_policies`,
  USER_PREFERENCES: `${STORAGE_PREFIX}_user_preferences`,
  LANGUAGE: `${STORAGE_PREFIX}_language`
} as const;

export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}

export function exportData(): void {
  try {
    const data = Object.entries(STORAGE_KEYS).reduce((acc, [key, storageKey]) => {
      const value = localStorage.getItem(storageKey);
      if (value) {
        acc[key] = JSON.parse(value);
      }
      return acc;
    }, {} as Record<string, any>);

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `clinic_data_${timestamp}.json`;
    
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting data:', error);
    throw new Error('Failed to export data');
  }
}

export function importData(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData);
    Object.entries(data).forEach(([key, value]) => {
      const storageKey = STORAGE_KEYS[key as keyof typeof STORAGE_KEYS];
      if (storageKey) {
        localStorage.setItem(storageKey, JSON.stringify(value));
      }
    });
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
}

export function getStoredData<T>(key: keyof typeof STORAGE_KEYS, defaultValue: T): T {
  try {
    const item = localStorage.getItem(STORAGE_KEYS[key]);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setStoredData<T>(key: keyof typeof STORAGE_KEYS, value: T): void {
  try {
    localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
  } catch (error) {
    console.error(`Error storing data for key ${key}:`, error);
    throw new Error('Failed to store data');
  }
}