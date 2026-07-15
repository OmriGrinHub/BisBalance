import { createTheme } from '@mui/material/styles';

/**
 * Creates a Material UI theme for Bis Balance app.
 * @param {'dark'|'light'} mode
 */
const createAppTheme = (mode = 'dark') => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#5CB85C',
        light: '#7DCF7D',
        dark: '#3D8C3D',
        contrastText: '#fff',
        lighter: isDark ? 'rgba(92, 184, 92, 0.15)' : 'rgba(92, 184, 92, 0.08)',
      },
      secondary: {
        main: '#2196F3',
        contrastText: '#fff',
      },
      info: {
        main: '#2196F3',
        lighter: isDark ? 'rgba(33, 150, 243, 0.15)' : 'rgba(33, 150, 243, 0.08)',
      },
      success: {
        main: '#4CAF50',
        lighter: isDark ? 'rgba(76, 175, 80, 0.15)' : 'rgba(76, 175, 80, 0.08)',
      },
      error: {
        main: '#F44336',
        lighter: isDark ? 'rgba(244, 67, 54, 0.15)' : 'rgba(244, 67, 54, 0.08)',
      },
      warning: {
        main: '#FF9800',
        lighter: isDark ? 'rgba(255, 152, 0, 0.15)' : 'rgba(255, 152, 0, 0.08)',
      },
      background: {
        default: isDark ? '#121212' : '#F5F5F5',
        paper: isDark ? '#1E1E1E' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#FFFFFF' : '#1A1A1A',
        secondary: isDark ? '#B0B0B0' : '#616161',
      },
      divider: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)',
    },
    typography: {
      fontFamily: '"Roboto", "Heebo", "Arial", sans-serif',
      h4: { fontWeight: 700 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
            borderRadius: 20,
            boxShadow: isDark
              ? '0 4px 24px rgba(0,0,0,0.4)'
              : '0 4px 24px rgba(0,0,0,0.08)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            minHeight: 48,
          },
          containedPrimary: {
            background: 'linear-gradient(135deg, #5CB85C 0%, #3D8C3D 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #7DCF7D 0%, #5CB85C 100%)',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
            },
          },
        },
      },
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
            borderTop: isDark
              ? '1px solid rgba(255,255,255,0.08)'
              : '1px solid rgba(0,0,0,0.10)',
            height: 64,
          },
        },
      },
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            color: isDark ? '#666' : '#9E9E9E',
            minWidth: 60,
            '&.Mui-selected': {
              color: '#5CB85C',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
            backgroundImage: 'none',
            color: isDark ? '#FFFFFF' : '#1A1A1A',
            boxShadow: isDark
              ? '0 2px 8px rgba(0,0,0,0.4)'
              : '0 2px 8px rgba(0,0,0,0.08)',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            minWidth: 44,
            minHeight: 44,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });
};

export default createAppTheme;

