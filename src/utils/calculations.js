import dayjs from 'dayjs';
import { WORK_TYPES } from '../models/types';

/**
 * Export all stored day entries to a CSV file and trigger a browser download.
 * Columns: Date, Work Type, Accumulation (₪), Withdrawal (₪), Running Balance (₪)
 */
export const exportToCsv = (days, dailyOfficeAmount) => {
  const sortedKeys = Object.keys(days).sort();

  const headers = ['Date', 'Work Type', 'Accumulation (ILS)', 'Withdrawal (ILS)', 'Running Balance (ILS)'];

  let runningBalance = 0;
  const dataRows = sortedKeys.map((dateKey) => {
    const entry = days[dateKey] || {};
    const accumulation = getDayAccumulation(entry, dailyOfficeAmount);
    const withdrawal = entry.withdrawal || 0;
    runningBalance += accumulation - withdrawal;
    const workType = entry.workType === WORK_TYPES.OFFICE
      ? 'Office'
      : entry.workType === WORK_TYPES.HOME
        ? 'Home'
        : '';
    return [dateKey, workType, accumulation, withdrawal, runningBalance].join(',');
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...dataRows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const fileName = `bisbalance_export_${dayjs().format('YYYY-MM-DD')}.csv`;
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
/**
 * Get all days for a given month as an array of 'YYYY-MM-DD' strings.
 */
export const getMonthDays = (year, month) => {
  const start = dayjs().year(year).month(month).startOf('month');
  const daysInMonth = start.daysInMonth();
  return Array.from({ length: daysInMonth }, (_, i) =>
    start.date(i + 1).format('YYYY-MM-DD')
  );
};
/**
 * Calculate the daily accumulation for a single day entry.
 */
export const getDayAccumulation = (dayEntry, dailyOfficeAmount) => {
  if (!dayEntry || !dayEntry.workType) return 0;
  return dayEntry.workType === WORK_TYPES.OFFICE ? dailyOfficeAmount : 0;
};
/**
 * Calculate running balance and totals for a list of day keys.
 * Returns: { totalAccumulated, totalWithdrawn, balance, rows }
 */
export const calculateMonthStats = (dayKeys, days, dailyOfficeAmount) => {
  let runningBalance = 0;
  let totalAccumulated = 0;
  let totalWithdrawn = 0;
  const rows = dayKeys.map((dateKey) => {
    const entry = days[dateKey] || {};
    const accumulation = getDayAccumulation(entry, dailyOfficeAmount);
    const withdrawal = entry.withdrawal || 0;
    totalAccumulated += accumulation;
    totalWithdrawn += withdrawal;
    runningBalance += accumulation - withdrawal;
    return {
      date: dateKey,
      workType: entry.workType || null,
      accumulation,
      withdrawal,
      runningBalance,
    };
  });
  return { totalAccumulated, totalWithdrawn, balance: runningBalance, rows };
};
/**
 * Generate sample data for the current month to make the app look populated on first launch.
 */
export const generateSampleData = (year, month) => {
  const days = {};
  const today = dayjs();
  const startOfMonth = dayjs().year(year).month(month).startOf('month');
  const isCurrentMonth = today.year() === year && today.month() === month;
  const lastDay = isCurrentMonth ? today.date() : startOfMonth.daysInMonth();
  const workPattern = [
    WORK_TYPES.OFFICE,
    WORK_TYPES.HOME,
    WORK_TYPES.OFFICE,
    WORK_TYPES.OFFICE,
    WORK_TYPES.HOME,
    null,
    null,
  ];
  for (let d = 1; d <= lastDay; d++) {
    const date = startOfMonth.date(d);
    const dayOfWeek = date.day();
    const dateKey = date.format('YYYY-MM-DD');
    if (dayOfWeek === 5 || dayOfWeek === 6) continue;
    const workType = workPattern[(d - 1) % workPattern.length];
    if (!workType) continue;
    days[dateKey] = { date: dateKey, workType, withdrawal: 0 };
  }
  const workDays = Object.keys(days).filter((k) => days[k].workType).sort();
  if (workDays.length >= 4) {
    days[workDays[2]] = { ...days[workDays[2]], withdrawal: 120 };
    const idx2 = workDays.length > 8 ? 8 : workDays.length - 1;
    days[workDays[idx2]] = { ...days[workDays[idx2]], withdrawal: 60 };
  }
  return days;
};
