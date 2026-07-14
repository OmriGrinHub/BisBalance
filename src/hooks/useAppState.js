import { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import { loadState, saveState } from '../services/storageService';
import { MAX_WITHDRAWAL, MIN_WITHDRAWAL } from '../models/types';
/**
 * Central state management hook for the Bis Balance app.
 * Handles all business logic and localStorage persistence.
 */
const useAppState = () => {
  const [state, setState] = useState(() => loadState());

  const [currentMonth, setCurrentMonth] = useState(() => ({
    year: dayjs().year(),
    month: dayjs().month(),
  }));

  // Persist state changes to localStorage
  useEffect(() => {
    saveState(state);
  }, [state]);

  /**
   * Set or toggle the work type for a given date.
   * Clicking the same type again clears it.
   */
  const setWorkType = useCallback((dateKey, workType) => {
    setState((prev) => {
      const existing = prev.days[dateKey] || { date: dateKey, withdrawal: 0 };
      const newWorkType = existing.workType === workType ? null : workType;
      return {
        ...prev,
        days: {
          ...prev.days,
          [dateKey]: { ...existing, workType: newWorkType },
        },
      };
    });
  }, []);

  /**
   * Record a withdrawal on a specific day.
   * Returns an error message string if validation fails, else null.
   */
  const recordWithdrawal = useCallback((dateKey, amount) => {
    const numAmount = parseFloat(amount);
    if (amount === '' || isNaN(numAmount)) return 'יש להזין סכום';
    if (numAmount !== 0 && numAmount < MIN_WITHDRAWAL) return `סכום מינימלי: ₪${MIN_WITHDRAWAL}`;
    if (numAmount > MAX_WITHDRAWAL) return `לא ניתן למשוך יותר מ-₪${MAX_WITHDRAWAL} בפעולה אחת`;

    setState((prev) => {
      const existing = prev.days[dateKey] || { date: dateKey, workType: null, withdrawal: 0 };
      return {
        ...prev,
        days: {
          ...prev.days,
          [dateKey]: { ...existing, withdrawal: numAmount },
        },
      };
    });
    return null;
  }, []);

  /**
   * Update the daily office amount in settings.
   */
  const updateDailyAmount = useCallback((amount) => {
    const num = parseFloat(amount);
    if (!isNaN(num) && num >= 0) {
      setState((prev) => ({
        ...prev,
        settings: { ...prev.settings, dailyOfficeAmount: num },
      }));
    }
  }, []);

  /**
   * Navigate to previous month.
   */
  const goToPrevMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      const d = dayjs().year(prev.year).month(prev.month).subtract(1, 'month');
      return { year: d.year(), month: d.month() };
    });
  }, []);

  /**
   * Navigate to next month.
   */
  const goToNextMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      const d = dayjs().year(prev.year).month(prev.month).add(1, 'month');
      return { year: d.year(), month: d.month() };
    });
  }, []);

  /**
   * Toggle dark/light mode.
   */
  const toggleDarkMode = useCallback(() => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, darkMode: !prev.settings.darkMode },
    }));
  }, []);

  return {
    days: state.days,
    settings: state.settings,
    currentMonth,
    setWorkType,
    recordWithdrawal,
    updateDailyAmount,
    toggleDarkMode,
    goToPrevMonth,
    goToNextMonth,
  };
};

export default useAppState;




