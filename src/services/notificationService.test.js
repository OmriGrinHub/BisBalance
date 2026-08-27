import {
  shouldNotifyOnBalanceThresholdCrossing,
  buildBalanceNotificationOptions,
  showBalanceNotification,
} from './notificationService';

describe('notificationService', () => {
  test('notifies only when balance crosses the threshold from below', () => {
    expect(shouldNotifyOnBalanceThresholdCrossing(149, 150, 150)).toBe(true);
    expect(shouldNotifyOnBalanceThresholdCrossing(100, 151, 150)).toBe(true);
    expect(shouldNotifyOnBalanceThresholdCrossing(150, 160, 150)).toBe(false);
    expect(shouldNotifyOnBalanceThresholdCrossing(170, 160, 150)).toBe(false);
    expect(shouldNotifyOnBalanceThresholdCrossing(140, 149, 150)).toBe(false);
  });

  test('builds a readable notification message', () => {
    const options = buildBalanceNotificationOptions(175, 150);

    expect(options.title).toBe('BisBalance');
    expect(options.body).toContain('₪175');
    expect(options.body).toContain('₪150');
    expect(options.requireInteraction).toBe(true);
    expect(options.data.url).toContain(window.location.href);
  });

  test('falls back to direct notification when service worker is unavailable', async () => {
    const originalServiceWorker = navigator.serviceWorker;
    const originalNotification = window.Notification;
    const showNotification = jest.fn().mockResolvedValue(undefined);
    const directNotification = jest.fn();

    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: undefined,
    });

    window.Notification = Object.assign(jest.fn(), { permission: 'granted' });
    window.Notification = directNotification;
    window.Notification.permission = 'granted';

    const result = await showBalanceNotification(175, 150);

    expect(result).toBe(true);
    expect(directNotification).toHaveBeenCalled();

    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: originalServiceWorker,
    });
    window.Notification = originalNotification;
    void showNotification;
  });
});
