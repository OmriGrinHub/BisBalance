import { DEFAULT_BALANCE_NOTIFICATION_THRESHOLD } from '../models/types';

export function isNotificationSupported() {
  return typeof window !== 'undefined' && 'Notification' in window;
}

function getDefaultNotificationUrl() {
  if (typeof window === 'undefined') {
    return undefined;
  }

  return window.location.href;
}

export function shouldNotifyOnBalanceThresholdCrossing(
  previousBalance,
  currentBalance,
  threshold = DEFAULT_BALANCE_NOTIFICATION_THRESHOLD
) {
  return previousBalance < threshold && currentBalance >= threshold;
}

export function buildBalanceNotificationOptions(balance, threshold, targetUrl) {
  return {
    title: 'BisBalance',
    body: `היתרה שלך הגיעה ל-₪${balance} ועברה את סף ההתראה של ₪${threshold}`,
    icon: `${process.env.PUBLIC_URL || ''}/bisbalance_logo_v2.png`,
    badge: `${process.env.PUBLIC_URL || ''}/bisbalance_logo_v2.png`,
    tag: 'balance-threshold-alert',
    renotify: true,
    requireInteraction: true,
    data: {
      url: targetUrl || getDefaultNotificationUrl(),
    },
  };
}

export async function requestNotificationPermission() {
  if (!isNotificationSupported()) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';
  return Notification.requestPermission();
}

export async function showBalanceNotification(balance, threshold) {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return false;
  }

  const options = buildBalanceNotificationOptions(balance, threshold);

  try {
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration && typeof registration.showNotification === 'function') {
        await registration.showNotification(options.title, options);
        return true;
      }
    }

    new Notification(options.title, {
      body: options.body,
      icon: options.icon,
      badge: options.badge,
      tag: options.tag,
      renotify: options.renotify,
      requireInteraction: options.requireInteraction,
      data: options.data,
    });
    return true;
  } catch (error) {
    console.warn('Falling back to direct notification display:', error);

    try {
      new Notification(options.title, {
        body: options.body,
        icon: options.icon,
        badge: options.badge,
        tag: options.tag,
        renotify: options.renotify,
        requireInteraction: options.requireInteraction,
        data: options.data,
      });
      return true;
    } catch (fallbackError) {
      console.warn('Unable to show notification:', fallbackError);
      return false;
    }
  }
}

