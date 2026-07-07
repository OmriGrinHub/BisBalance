import React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'לוח שנה', icon: <CalendarMonthIcon />, path: '/' },
  { label: 'רשימה', icon: <ListAltIcon />, path: '/list' },
  { label: 'הגדרות', icon: <SettingsIcon />, path: '/settings' },
];

/**
 * Sticky bottom navigation bar.
 * Highlights the active route and navigates on tap.
 */
const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentValue = NAV_ITEMS.findIndex(
    (item) => item.path === location.pathname
  );

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderRadius: 0,
      }}
    >
      <BottomNavigation
        value={currentValue === -1 ? 0 : currentValue}
        onChange={(_, newValue) => navigate(NAV_ITEMS[newValue].path)}
        showLabels
      >
        {NAV_ITEMS.map((item) => (
          <BottomNavigationAction
            key={item.path}
            label={item.label}
            icon={item.icon}
            sx={{
              transition: 'all 0.2s ease',
              '&.Mui-selected': {
                '& .MuiSvgIcon-root': {
                  transform: 'scale(1.15)',
                  transition: 'transform 0.2s ease',
                },
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;

