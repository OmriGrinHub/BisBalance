import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import InfoIcon from '@mui/icons-material/Info';
import MonthSelector from '../components/MonthSelector';
import CalendarGrid from '../components/CalendarGrid';
import BalanceCard from '../components/BalanceCard';
import WithdrawCard from '../components/WithdrawCard';
import DayPopup from '../components/DayPopup';
import InstructionsPopup from '../components/InstructionsPopup';
import { getMonthDays, calculateMonthStats } from '../utils/calculations';
import dayjs from 'dayjs';

/**
 * Calendar page - main page of the application.
 * Shows monthly calendar, balance, and withdrawal controls.
 */
const CalendarPage = ({
  days,
  settings,
  currentMonth,
  onPrevMonth,
  onNextMonth,
  onSetWorkType,
  onWithdraw,
}) => {
  const [selectedDateKey, setSelectedDateKey] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  const { year, month } = currentMonth;
  const monthDays = getMonthDays(year, month);
  const { balance } = calculateMonthStats(monthDays, days, settings.dailyOfficeAmount);

  // Default selected day for withdrawal = today if in current month, else first day
  const todayKey = dayjs().format('YYYY-MM-DD');
  const isCurrentMonth = dayjs().year() === year && dayjs().month() === month;
  const withdrawDay = selectedDateKey ||
    (isCurrentMonth ? todayKey : monthDays[0]);

  const handleDayClick = (dateKey) => {
    setSelectedDateKey(dateKey);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleOpenInstructions = () => {
    setInstructionsOpen(true);
  };

  const handleCloseInstructions = () => {
    setInstructionsOpen(false);
  };

  const handleWorkTypeChange = (dateKey, workType) => {
    onSetWorkType(dateKey, workType);
    setPopupOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* App Bar */}
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ minHeight: 56, gap: 1 }}>
          <IconButton
            edge="start"
            color="inherit"
            size="medium"
            onClick={handleOpenInstructions}
            title="הוראות שימוש"
          >
            <InfoIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '1.1rem' }}>
            לוח שנה
          </Typography>

          <IconButton edge="end" color="inherit" size="medium">
            <BarChartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Scrollable content */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2,
          pt: 1,
          pb: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* Month selector */}
        <MonthSelector
          year={year}
          month={month}
          onPrev={onPrevMonth}
          onNext={onNextMonth}
        />

        {/* Calendar */}
        <Box
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 4,
            py: 1.5,
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          }}
        >
          <CalendarGrid
            year={year}
            month={month}
            days={days}
            onDayClick={handleDayClick}
          />
        </Box>

        {/* Balance card */}
        <BalanceCard balance={balance} />

        {/* Withdrawal card */}
        <WithdrawCard
          selectedDate={withdrawDay}
          onWithdraw={onWithdraw}
        />
      </Box>

      {/* Day popup */}
      <DayPopup
        open={popupOpen}
        dateKey={selectedDateKey}
        dayEntry={selectedDateKey ? days[selectedDateKey] : null}
        dailyOfficeAmount={settings.dailyOfficeAmount}
        onClose={handleClosePopup}
        onWorkTypeChange={handleWorkTypeChange}
      />

      {/* Instructions popup */}
      <InstructionsPopup
        open={instructionsOpen}
        onClose={handleCloseInstructions}
      />
    </Box>
  );
};

export default CalendarPage;

