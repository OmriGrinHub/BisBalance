import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SummaryCard from '../components/SummaryCard';
import { getMonthDays, calculateMonthStats } from '../utils/calculations';
import { WORK_TYPES } from '../models/types';
import dayjs from 'dayjs';

const MONTH_NAMES_HE = [
  'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר',
];

/**
 * List page — shows all days of the current month in a tabular format
 * with running balance and summary cards.
 */
const ListPage = ({ days, settings, currentMonth }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { year, month } = currentMonth;
  const monthDays = getMonthDays(year, month);
  const { totalAccumulated, totalWithdrawn, rows } = calculateMonthStats(
    monthDays,
    days,
    settings.dailyOfficeAmount
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* App Bar */}
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ minHeight: 56 }}>
          <Typography variant="h6" sx={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '1.1rem' }}>
            תצוגת רשימה
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Month label */}
      <Box sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          {MONTH_NAMES_HE[month]} {year}
        </Typography>
      </Box>

      {/* Scrollable table */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 1 }}>
        <TableContainer
          sx={{
            borderRadius: 3,
            backgroundColor: 'background.paper',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            mb: 2,
          }}
        >
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                {['תאריך', 'סוג', 'צבירה', 'משיכה', 'יתרה'].map((h) => (
                  <TableCell
                    key={h}
                    align="center"
                    sx={{
                      backgroundColor: isDark ? '#252525' : '#F0F0F0',
                      color: 'text.secondary',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      py: 1,
                      px: 0.5,
                      borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.10)'}`,
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => {
                const d = dayjs(row.date);
                const isToday = row.date === dayjs().format('YYYY-MM-DD');

                return (
                  <TableRow
                    key={row.date}
                    sx={{
                      backgroundColor: isToday
                        ? 'rgba(92,184,92,0.06)'
                        : idx % 2 === 0
                        ? 'transparent'
                        : isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                      '&:hover': {
                        backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                      },
                    }}
                  >
                    {/* Date */}
                    <TableCell
                      align="center"
                      sx={{ fontSize: '0.75rem', fontWeight: isToday ? 700 : 400, py: 1, px: 0.5, color: isToday ? 'primary.main' : 'text.primary' }}
                    >
                      {d.date()} {MONTH_NAMES_HE[d.month()].slice(0, 3)}
                    </TableCell>

                    {/* Work type */}
                    <TableCell align="center" sx={{ py: 1, px: 0.5 }}>
                      {row.workType === WORK_TYPES.OFFICE ? (
                        <BusinessIcon sx={{ fontSize: 16, color: '#2196F3' }} />
                      ) : row.workType === WORK_TYPES.HOME ? (
                        <HomeIcon sx={{ fontSize: 16, color: '#5CB85C' }} />
                      ) : (
                        <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>—</Typography>
                      )}
                    </TableCell>

                    {/* Accumulation */}
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: row.accumulation > 0 ? '#5CB85C' : 'text.secondary',
                        py: 1,
                        px: 0.5,
                      }}
                    >
                      {row.accumulation > 0 ? `${row.accumulation}` : '—'}
                    </TableCell>

                    {/* Withdrawal */}
                    <TableCell
                      align="center"
                      sx={{ py: 1, px: 0.5 }}
                    >
                      {row.withdrawal > 0 ? (
                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#FF9800' }}>
                          {row.withdrawal}
                        </Typography>
                      ) : (
                        <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>—</Typography>
                      )}
                    </TableCell>

                    {/* Running balance */}
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: row.runningBalance < 0 ? '#f44336' : '#5CB85C',
                        py: 1,
                        px: 0.5,
                      }}
                    >
                      {row.runningBalance < 0 ? `-₪${Math.abs(row.runningBalance)}` : `₪${row.runningBalance}`}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Summary cards */}
        <Box sx={{ display: 'flex', gap: 1.5, px: 1, pb: 2 }}>
          <SummaryCard
            title="סה״כ צבירה"
            amount={totalAccumulated}
            color="#5CB85C"
            icon={<TrendingUpIcon sx={{ fontSize: 16, color: '#5CB85C' }} />}
          />
          <SummaryCard
            title="סה״כ משיכות"
            amount={totalWithdrawn}
            color="#FF9800"
            icon={<LocalAtmIcon sx={{ fontSize: 16, color: '#FF9800' }} />}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ListPage;


