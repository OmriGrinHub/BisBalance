import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  InputAdornment,
  Alert,
  Button,
  useTheme,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import tenBisLogo from '../assets/tenbis-logo.png';
import cibusLogo from '../assets/cibus-logo.webp';

/**
 * Settings page — user can configure the daily office accumulation amount
 * and toggle between dark and light mode.
 */
const SettingsPage = ({ settings, onToggleDarkMode }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [showProMessage, setShowProMessage] = useState(false);

  const handleProOnlyAttempt = () => {
    setShowProMessage(true);
  };

  const cardSx = {
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
    background: isDark
      ? 'linear-gradient(145deg, #1E1E1E 0%, #252525 100%)'
      : 'linear-gradient(145deg, #FFFFFF 0%, #F9F9F9 100%)',
  };

  const buttonLabelColor = isDark ? '#FFFFFF' : 'rgba(0,0,0,0.8)';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* App Bar */}
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ minHeight: 56 }}>
          <Typography variant="h6" sx={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '1.1rem' }}>
            אזור אישי
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, overflowY: 'auto', px: 2, pt: 2, pb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>

        {/* Daily amount card */}
        <Card sx={cardSx}>
          <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <BusinessCenterIcon sx={{ color: 'primary.main', fontSize: 22 }} />
              <Typography variant="subtitle1" fontWeight={700}>
                הגדרות עבודה
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                סכום צבירה יומי מהמשרד
              </Typography>
              <TextField
                value={settings.dailyOfficeAmount}
                onClick={handleProOnlyAttempt}
                onFocus={handleProOnlyAttempt}
                type="number"
                inputProps={{
                  min: 0,
                  step: 5,
                  readOnly: true,
                  style: { fontWeight: 700, fontSize: '1.1rem' },
                }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₪</InputAdornment>,
                }}
                size="small"
                variant="outlined"
                sx={{ maxWidth: 160 }}
              />
              <Typography variant="caption" color="text.secondary">
                שינוי ישפיע על כל החישובים אוטומטית
              </Typography>

              <Box sx={{ mt: 1.5, display: 'flex', gap: 1 }}>
                <Box sx={{ flex: 1 }} onClick={handleProOnlyAttempt}>
                  <Button
                    fullWidth
                    variant="contained"
                    disabled
                    sx={{
                      backgroundColor: '#008cff',
                      color: buttonLabelColor,
                      opacity: 0.6,
                      fontWeight: 700,
                      letterSpacing: '0.01em',
                      '& .MuiButton-startIcon': {
                        margin: 0,
                        marginInlineEnd: '10px',
                      },
                      '&.Mui-disabled': {
                        backgroundColor: 'rgba(255,152,0,0.5)',
                        color: buttonLabelColor,
                      },
                    }}
                    startIcon={<Box component="img" src={tenBisLogo} alt="Ten Bis" sx={{ width: 18, height: 18, borderRadius: '50%' }} />}
                  >
                    חיבור לתן ביס
                  </Button>
                </Box>

                <Box sx={{ flex: 1 }} onClick={handleProOnlyAttempt}>
                  <Button
                    fullWidth
                    variant="contained"
                    disabled
                    sx={{
                      backgroundColor: '#B347A9',
                      color: buttonLabelColor,
                      opacity: 0.6,
                      fontWeight: 700,
                      letterSpacing: '0.01em',
                      '& .MuiButton-startIcon': {
                        margin: 0,
                        marginInlineEnd: '10px',
                      },
                      '&.Mui-disabled': {
                        backgroundColor: 'rgba(179,71,169,0.5)',
                        color: buttonLabelColor,
                      },
                    }}
                    startIcon={<Box component="img" src={cibusLogo} alt="Cibus" sx={{ width: 18, height: 18, borderRadius: '50%' }} />}
                  >
                    חיבור לסיבוס
                  </Button>
                </Box>
              </Box>

              {showProMessage && (
                <Alert severity="info" sx={{ mt: 1, borderRadius: 2 }}>
                  פעולה זו זמינה למשתמשי Pro בלבד.
                </Alert>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Appearance card */}
        <Card sx={cardSx}>
          <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
              מראה
            </Typography>

            <List disablePadding>
              <ListItem disablePadding sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {isDark
                    ? <DarkModeIcon sx={{ color: '#B0BEC5', fontSize: 22 }} />
                    : <LightModeIcon sx={{ color: '#FFA726', fontSize: 22 }} />
                  }
                </ListItemIcon>
                <ListItemText
                  primary={isDark ? 'מצב כהה' : 'מצב בהיר'}
                  secondary={isDark ? 'לחץ לעבור למצב בהיר' : 'לחץ לעבור למצב כהה'}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                  secondaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
                />
                <Switch
                  checked={isDark}
                  onChange={onToggleDarkMode}
                  size="small"
                  color="primary"
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* Info card */}
        <Card sx={cardSx}>
          <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <InfoOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
              <Typography variant="subtitle1" fontWeight={700}>
                אודות
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
              אפליקציית Bis Balance מאפשרת מעקב אחר צבירת הטבות כרטיס תן ביס / סיבוס ומשיכות יתרה. <br/>
              פותח על ידי עמרי ג.
              כל הזכויות שמורות ©
            </Typography>
            <Divider sx={{ my: 1.5 }} />
            <Typography variant="caption" color="text.secondary">
              גרסה  0.1.3  כל הנתונים שמורים מקומית
            </Typography>
          </CardContent>
        </Card>

      </Box>
    </Box>
  );
};

export default SettingsPage;

