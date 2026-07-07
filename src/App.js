import React, { useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import createAppTheme from './styles/theme';
import useAppState from './hooks/useAppState';
import BottomNav from './components/BottomNav';
import CalendarPage from './pages/CalendarPage';
import ListPage from './pages/ListPage';
import SettingsPage from './pages/SettingsPage';

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
              <Route path="/list" element={<ListPage {...sharedProps} />} />
              <Route
                path="/settings"
                element={
                  <SettingsPage
                    {...sharedProps}
                    onUpdateDailyAmount={updateDailyAmount}
                    onToggleDarkMode={toggleDarkMode}
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
