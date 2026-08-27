import React, { useMemo, useEffect, useRef, useCallback } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import createAppTheme from './styles/theme';
import useAppState from './hooks/useAppState';
import BottomNav from './components/BottomNav';
import CalendarPage from './pages/CalendarPage';
import ListPage from './pages/ListPage';
import SettingsPage from './pages/SettingsPage';
import { calculateMonthStats, getMonthDays } from './utils/calculations';
import { trackEvent } from './services/analyticsService';
import {
  requestNotificationPermission,
  shouldNotifyOnBalanceThresholdCrossing,
  showBalanceNotification,
} from './services/notificationService';

/**
 * Root application component.
 * Wires together routing, theme, and shared state.
 */
function App() {
  const {
    days,
    settings,
    currentMonth,
    setWorkType,
    recordWithdrawal,
    updateDailyAmount,
    toggleDarkMode,
    setBalanceNotificationsEnabled,
    setBalanceNotificationThreshold,
    goToPrevMonth,
    goToNextMonth,
  } = useAppState();

  const theme = useMemo(
    () => createAppTheme(settings.darkMode !== false ? 'dark' : 'light'),
    [settings.darkMode]
  );

  // Keep body background in sync with theme
  React.useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme]);

  const monthDays = useMemo(
    () => getMonthDays(currentMonth.year, currentMonth.month),
    [currentMonth.year, currentMonth.month]
  );

  const { balance } = useMemo(
    () => calculateMonthStats(monthDays, days, settings.dailyOfficeAmount),
    [monthDays, days, settings.dailyOfficeAmount]
  );

  const previousBalanceRef = useRef(balance);

  useEffect(() => {
    const shouldNotify =
      settings.balanceNotificationsEnabled &&
      shouldNotifyOnBalanceThresholdCrossing(
        previousBalanceRef.current,
        balance,
        settings.balanceNotificationThreshold
      );

    if (shouldNotify) {
      showBalanceNotification(balance, settings.balanceNotificationThreshold);
    }

    previousBalanceRef.current = balance;
  }, [balance, settings.balanceNotificationsEnabled, settings.balanceNotificationThreshold]);

  const handleToggleBalanceNotifications = useCallback(
    async (enabled) => {
      if (!enabled) {
        setBalanceNotificationsEnabled(false);
        return;
      }

      const permission = await requestNotificationPermission();
      if (permission === 'granted') {
        setBalanceNotificationsEnabled(true);
        trackEvent('balance_notifications_enabled', {
          page: 'settings',
        });
      } else {
        setBalanceNotificationsEnabled(false);
      }
    },
    [setBalanceNotificationsEnabled]
  );

  const sharedProps = { days, settings, currentMonth };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Box
          sx={{
            maxWidth: 430,
            mx: 'auto',
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'background.default',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              pb: '64px',
              overflowY: 'hidden',
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <CalendarPage
                    {...sharedProps}
                    onPrevMonth={goToPrevMonth}
                    onNextMonth={goToNextMonth}
                    onSetWorkType={setWorkType}
                    onWithdraw={recordWithdrawal}
                  />
                }
              />
              <Route
                path="/list"
                element={
                  <ListPage
                    {...sharedProps}
                    onPrevMonth={goToPrevMonth}
                    onNextMonth={goToNextMonth}
                  />
                }
              />
              <Route
                path="/settings"
                element={
                  <SettingsPage
                    {...sharedProps}
                    onUpdateDailyAmount={updateDailyAmount}
                    onToggleDarkMode={toggleDarkMode}
                    onToggleBalanceNotifications={handleToggleBalanceNotifications}
                    onUpdateBalanceNotificationThreshold={setBalanceNotificationThreshold}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
          <BottomNav />
        </Box>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
