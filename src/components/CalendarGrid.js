import React, { useCallback, useRef } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import dayjs from 'dayjs';
import { WORK_TYPES } from '../models/types';

const DAY_LABELS = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'];

/**
 * Monthly calendar grid component.
 * Renders all days of the month with work type indicators and withdrawal dots.
 * Days are clickable for the popup.
 */
const LONG_PRESS_MS = 500;

const CalendarGrid = ({
  year,
  month,
  days,
  onDayClick,
  onDayLongPress,
  selectedDateKey,
}) => {
  const theme = useTheme();
  const longPressTimerRef = useRef(null);
  const longPressTriggeredRef = useRef(false);

  const startOfMonth = dayjs().year(year).month(month).startOf('month');
  const daysInMonth = startOfMonth.daysInMonth();
  // dayjs: 0=Sun, so we rotate to get Sun as last column (Israeli calendar: Sun=first)
  const firstDayOfWeek = startOfMonth.day(); // 0=Sun

  const today = dayjs().format('YYYY-MM-DD');

  const clearLongPressTimer = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const startLongPress = useCallback((dateKey) => {
    longPressTriggeredRef.current = false;
    clearLongPressTimer();

    longPressTimerRef.current = setTimeout(() => {
      longPressTriggeredRef.current = true;
      onDayLongPress?.(dateKey);
    }, LONG_PRESS_MS);
  }, [clearLongPressTimer, onDayLongPress]);

  const endLongPress = useCallback(() => {
    clearLongPressTimer();
  }, [clearLongPressTimer]);

  // Build the grid cells (empty prefix + day cells)
  const cells = Array.from({ length: firstDayOfWeek }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  const renderDayCell = useCallback(
    (dayNum) => {
      const dateKey = startOfMonth.date(dayNum).format('YYYY-MM-DD');
      const entry = days[dateKey];
      const isToday = dateKey === today;
      const isSelected = selectedDateKey === dateKey;
      const hasWithdrawal = entry && entry.withdrawal > 0;
      const workType = entry?.workType || null;

      return (
        <Box
          key={dateKey}
          onClick={() => {
            if (longPressTriggeredRef.current) {
              longPressTriggeredRef.current = false;
              return;
            }
            onDayClick(dateKey);
          }}
          onMouseDown={() => startLongPress(dateKey)}
          onMouseUp={endLongPress}
          onMouseLeave={endLongPress}
          onTouchStart={() => startLongPress(dateKey)}
          onTouchEnd={endLongPress}
          onTouchCancel={endLongPress}
          onContextMenu={(e) => e.preventDefault()}
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            aspectRatio: '1',
            borderRadius: '50%',
            cursor: 'pointer',
            userSelect: 'none',
            border: isSelected
              ? '2px solid #FF9800'
              : isToday
              ? `2px solid ${theme.palette.primary.main}`
              : '2px solid transparent',
            backgroundColor: workType
              ? workType === WORK_TYPES.OFFICE
                ? 'rgba(33, 150, 243, 0.15)'
                : 'rgba(92, 184, 92, 0.12)'
              : 'transparent',
            transition: 'all 0.18s ease',
            '&:hover': {
              backgroundColor: workType
                ? workType === WORK_TYPES.OFFICE
                  ? 'rgba(33, 150, 243, 0.28)'
                  : 'rgba(92, 184, 92, 0.25)'
                : theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.07)'
                : 'rgba(0,0,0,0.06)',
              transform: 'scale(1.08)',
            },
            '&:active': {
              transform: 'scale(0.95)',
            },
          }}
        >
          {/* Work type icon */}
          {workType === WORK_TYPES.OFFICE && (
            <BusinessIcon
              sx={{ fontSize: 11, color: '#2196F3', mb: '1px', mt: '-2px' }}
            />
          )}
          {workType === WORK_TYPES.HOME && (
            <HomeIcon
              sx={{ fontSize: 11, color: '#5CB85C', mb: '1px', mt: '-2px' }}
            />
          )}

          {/* Day number */}
          <Typography
            sx={{
              fontSize: '0.78rem',
              fontWeight: isToday ? 700 : workType ? 600 : 400,
              color: workType
                ? workType === WORK_TYPES.OFFICE
                  ? '#90CAF9'
                  : '#81C784'
                : isToday
                ? theme.palette.primary.main
                : 'text.primary',
              lineHeight: 1,
            }}
          >
            {dayNum}
          </Typography>

          {/* Withdrawal orange dot */}
          {hasWithdrawal && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 3,
                right: 3,
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#FF9800',
              }}
            />
          )}
        </Box>
      );
    },
    [days, today, startOfMonth, theme, onDayClick, startLongPress, endLongPress, selectedDateKey]
  );

  return (
    <Box sx={{ px: 1 }}>
      {/* Day-of-week headers */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          mb: 0.5,
        }}
      >
        {DAY_LABELS.map((label) => (
          <Typography
            key={label}
            sx={{
              textAlign: 'center',
              fontSize: '0.72rem',
              color: 'text.secondary',
              fontWeight: 500,
              py: 0.5,
            }}
          >
            {label}
          </Typography>
        ))}
      </Box>

      {/* Calendar cells */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
        }}
      >
        {cells.map((dayNum, idx) =>
          dayNum === null ? (
            <Box key={`empty-${idx}`} />
          ) : (
            renderDayCell(dayNum)
          )
        )}
      </Box>
    </Box>
  );
};

export default CalendarGrid;


