import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Collapse,
  useTheme,
} from '@mui/material';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import dayjs from 'dayjs';

/**
 * Withdrawal card — lets the user enter an amount and withdraw it
 * on the currently selected day (defaults to today).
 * Shows validation messages and handles ATM-style withdrawal UX.
 */
const WithdrawCard = ({ selectedDate, onWithdraw }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const displayDate = selectedDate
    ? dayjs(selectedDate).format('DD/MM/YYYY')
    : dayjs().format('DD/MM/YYYY');

  const handleWithdraw = () => {
    setError('');
    setSuccess('');

    const errMsg = onWithdraw(
      selectedDate || dayjs().format('YYYY-MM-DD'),
      amount
    );

    if (errMsg) {
      setError(errMsg);
    } else {
      setSuccess(`₪${amount} נמשכו בהצלחה`);
      setAmount('');
      // Auto-clear success after 3s
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleAmountChange = (e) => {
    const val = e.target.value;
    // Only allow numeric input (integers or decimals)
    if (/^\d*\.?\d*$/.test(val)) {
      setAmount(val);
      setError('');
    }
  };

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
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocalAtmIcon sx={{ color: '#FF9800', fontSize: 22 }} />
            <Typography variant="subtitle1" fontWeight={700}>
              משיכת יתרה
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            {displayDate}
          </Typography>
        </Box>

        {/* Amount field + button */}
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
          <TextField
            value={amount}
            onChange={handleAmountChange}
            placeholder="סכום"
            type="tel"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', style: { textAlign: 'center', fontSize: '1.1rem', fontWeight: 600 } }}
            sx={{ flex: 1 }}
            size="small"
            variant="outlined"
            onKeyDown={(e) => e.key === 'Enter' && handleWithdraw()}
          />
          <Button
            variant="contained"
            color="warning"
            onClick={handleWithdraw}
            sx={{
              minWidth: 56,
              height: 40,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #FFB74D 0%, #FF9800 100%)',
              },
            }}
          >
            <LocalAtmIcon />
          </Button>
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
          מקסימום ₪150 בפעולה אחת
        </Typography>

        {/* Validation messages */}
        <Collapse in={!!error}>
          <Alert severity="error" sx={{ mt: 1.5, borderRadius: 2 }}>
            {error}
          </Alert>
        </Collapse>

        <Collapse in={!!success}>
          <Alert severity="success" sx={{ mt: 1.5, borderRadius: 2 }}>
            {success}
          </Alert>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default WithdrawCard;

