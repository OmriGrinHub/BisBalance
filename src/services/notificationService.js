import { DEFAULT_BALANCE_NOTIFICATION_THRESHOLD } from '../models/types';

export function isNotificationSupported() {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function shouldNotifyOnBalanceThresholdCrossing(
  previousBalance,
  currentBalance,
  threshold = DEFAULT_BALANCE_NOTIFICATION_THRESHOLD
) {
  return previousBalance < threshold && currentBalance >= threshold;
}

export function buildBalanceNotificationOptions(balance, threshold) {
  return {
    title: 'BisBalance',
    body: `היתרה שלך הגיעה ל-₪${balance} ועברה את סף ההתראה של ₪${threshold}`,
    icon: `${process.env.PUBLIC_URL || ''}/bisbalance_logo_v2.png`,
  };
}

export async function requestNotificationPermission() {
  if (!isNotificationSupported()) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';
  return Notification.requestPermission();
}

export function showBalanceNotification(balance, threshold) {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return false;
  }

  const options = buildBalanceNotificationOptions(balance, threshold);
  new Notification(options.title, {
    body: options.body,
    icon: options.icon,
  });
  return true;
}

