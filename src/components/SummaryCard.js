import React from 'react';
import { Card, CardContent, Box, Typography, useTheme } from '@mui/material';

/**
 * Summary metric card used in the list page footer.
 */
const SummaryCard = ({ title, amount, color = '#5CB85C', icon }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Card
      sx={{
        flex: 1,
        background: isDark
          ? 'linear-gradient(145deg, #1E1E1E 0%, #252525 100%)'
          : 'linear-gradient(145deg, #FFFFFF 0%, #F9F9F9 100%)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.5)' : '0 8px 32px rgba(0,0,0,0.12)',
        },
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          {icon}
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            {title}
          </Typography>
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color,
            letterSpacing: '-0.01em',
          }}
        >
          ₪{amount.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;

