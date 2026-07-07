import React from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Chip,
  IconButton,
  useTheme,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import CloseIcon from '@mui/icons-material/Close';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import dayjs from 'dayjs';
import { WORK_TYPES } from '../models/types';
import { getDayAccumulation } from '../utils/calculations';

const MONTH_NAMES_HE = [
  'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר',
];

/**
 * Popup dialog shown when a calendar day is clicked.
 * Displays date info, work type selector, accumulation, and withdrawal status.
 */
const DayPopup = ({ open, dateKey, dayEntry, dailyOfficeAmount, onClose, onWorkTypeChange }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  if (!dateKey) return null;

  const date = dayjs(dateKey);
  const workType = dayEntry?.workType || null;
  const withdrawal = dayEntry?.withdrawal || 0;
  const accumulation = getDayAccumulation(dayEntry, dailyOfficeAmount);

  const formattedDate = `${date.date()} ${MONTH_NAMES_HE[date.month()]} ${date.year()}`;

  const workLabel = workType === WORK_TYPES.OFFICE
    ? 'משרד'
    : workType === WORK_TYPES.HOME
    ? 'בית'
    : 'לא נבחר';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: isDark ? '#252525' : '#FFFFFF',
          minWidth: 280,
          maxWidth: 340,
          mx: 2,
        },
      }}
      TransitionProps={{
        style: { animation: 'fadeIn 0.2s ease' },
      }}
    >
      <DialogContent sx={{ p: 2.5 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={700} color="text.primary">
            {formattedDate}
          </Typography>
          <IconButton size="small" onClick={onClose} sx={{ color: 'text.secondary' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Work type toggle */}
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          סוג עבודה
        </Typography>
        <ToggleButtonGroup
          value={workType}
          exclusive
          onChange={(_, val) => {
            if (val !== undefined) onWorkTypeChange(dateKey, val);
          }}
          fullWidth
          sx={{ mb: 2 }}
        >
          <ToggleButton
            value={WORK_TYPES.HOME}
            sx={{
              borderRadius: '10px !important',
              gap: 0.5,
              '&.Mui-selected': {
                backgroundColor: 'rgba(92,184,92,0.2)',
                color: '#5CB85C',
                borderColor: '#5CB85C',
              },
            }}
          >
            <HomeIcon fontSize="small" />
            <Typography variant="body2" fontWeight={600}>בית</Typography>
          </ToggleButton>
          <ToggleButton
            value={WORK_TYPES.OFFICE}
            sx={{
              borderRadius: '10px !important',
              gap: 0.5,
              mx: 0.5,
              '&.Mui-selected': {
                backgroundColor: 'rgba(33,150,243,0.2)',
                color: '#2196F3',
                borderColor: '#2196F3',
              },
            }}
          >
            <BusinessIcon fontSize="small" />
            <Typography variant="body2" fontWeight={600}>משרד</Typography>
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Stats rows */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">עבד מ</Typography>
            <Typography variant="body2" fontWeight={600} color="text.primary">
              {workLabel}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">צבירה יומית</Typography>
            <Typography variant="body2" fontWeight={600} color="primary.main">
              ₪{accumulation}
            </Typography>
          </Box>

          <Divider sx={{ my: 0.5 }} />

          {/* Withdrawal */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">משיכה</Typography>
            {withdrawal > 0 ? (
              <Chip
                icon={<MonetizationOnIcon sx={{ fontSize: '14px !important' }} />}
                label={`₪${withdrawal} נמשך`}
                size="small"
                sx={{
                  backgroundColor: 'rgba(255,152,0,0.18)',
                  color: '#FF9800',
                  fontWeight: 600,
                  '& .MuiChip-icon': { color: '#FF9800' },
                }}
              />
            ) : (
              <Typography variant="body2" color="text.secondary">
                אין משיכה
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DayPopup;

