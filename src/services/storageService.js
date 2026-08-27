import { STORAGE_KEY, DEFAULT_DAILY_OFFICE_AMOUNT, DEFAULT_BALANCE_NOTIFICATION_THRESHOLD } from '../models/types';

const getDefaultSettings = () => ({
  dailyOfficeAmount: DEFAULT_DAILY_OFFICE_AMOUNT,
  darkMode: true,
  balanceNotificationsEnabled: false,
  balanceNotificationThreshold: DEFAULT_BALANCE_NOTIFICATION_THRESHOLD,
});

const normalizeState = (state) => ({
  days: state && typeof state.days === 'object' ? state.days : {},
  settings: {
    ...getDefaultSettings(),
    ...(state && typeof state.settings === 'object' ? state.settings : {}),
  },
});

/**
 * Load persisted app state from localStorage.
 * Returns default state if nothing is stored.
 */
export const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    return normalizeState(JSON.parse(raw));
  } catch {
    return getDefaultState();
  }
};

/**
 * Persist app state to localStorage.
 */
export const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state', e);
  }
};

/**
 * Default (empty) state for first launch.
 */
export const getDefaultState = () => ({
  days: {},
  settings: getDefaultSettings(),
});

