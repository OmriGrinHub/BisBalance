/**
 * Application data models / type documentation.
 * Since we're in JS (not TS), these serve as documentation for the data shapes.
 *
 * DayEntry:
 * {
 *   date: string,          // ISO date string 'YYYY-MM-DD'
 *   workType: 'home' | 'office' | null,
 *   withdrawal: number,    // amount withdrawn on this day, 0 if none
 * }
 *
 * AppSettings:
 * {
 *   dailyOfficeAmount: number,  // default 60
 * }
 *
 * AppState (persisted to localStorage):
 * {
 *   days: Record<string, DayEntry>,  // keyed by 'YYYY-MM-DD'
 *   settings: AppSettings,
 * }
 */

export const WORK_TYPES = {
  HOME: 'home',
  OFFICE: 'office',
};

export const DEFAULT_DAILY_OFFICE_AMOUNT = 60;
export const MAX_WITHDRAWAL = 150;
export const MIN_WITHDRAWAL = 1;

export const STORAGE_KEY = 'ten_balance_data';

