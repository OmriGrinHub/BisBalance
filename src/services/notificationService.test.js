import {
  shouldNotifyOnBalanceThresholdCrossing,
  buildBalanceNotificationOptions,
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
  });
});
