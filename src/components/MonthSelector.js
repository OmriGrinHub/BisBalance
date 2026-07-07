import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import dayjs from 'dayjs';
import 'dayjs/locale/he';

dayjs.locale('he');

const MONTH_NAMES_HE = [
  'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר',
];

/**
 * Month selector component with previous/next navigation.
 */
const MonthSelector = ({ year, month, onPrev, onNext }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        py: 1,
      }}
    >
      <IconButton
        onClick={onPrev}
        size="small"
        sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
      >
        <ChevronRightIcon />
      </IconButton>

      <Typography
        variant="subtitle1"
        fontWeight={600}
        sx={{ minWidth: 140, textAlign: 'center', color: 'text.primary' }}
      >
        {MONTH_NAMES_HE[month]} {year}
      </Typography>

      <IconButton
        onClick={onNext}
        size="small"
        sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
      >
        <ChevronLeftIcon />
      </IconButton>
    </Box>
  );
};

export default MonthSelector;

