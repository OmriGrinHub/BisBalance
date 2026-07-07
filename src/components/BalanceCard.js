import React from 'react';
import { Card, CardContent, Box, Typography, useTheme } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

/**
 * Large balance display card.
 * Shows the current balance in green (positive) or red (negative).
 */
const BalanceCard = ({ balance }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isNegative = balance < 0;
  const displayAmount = Math.abs(balance);
  const color = isNegative ? '#f44336' : '#5CB85C';
  const label = isNegative ? `-₪${displayAmount}` : `₪${displayAmount}`;

  return (
    <Card
      sx={{
        background: isDark
          ? 'linear-gradient(145deg, #1E1E1E 0%, #252525 100%)'
          : 'linear-gradient(145deg, #FFFFFF 0%, #F9F9F9 100%)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
      }}
    >
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <AccountBalanceWalletIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            יתרה
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: '3rem',
            fontWeight: 800,
            color,
            lineHeight: 1,
            mb: 0.5,
            letterSpacing: '-0.02em',
            transition: 'color 0.3s ease',
          }}
        >
          {label}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          יתרה זמינה עדכנית
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;

