import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@mui/material';

/**
 * Instructions popup component.
 * Displays a user guide for how to use the app.
 */
const InstructionsPopup = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          backgroundColor: 'background.paper',
          maxHeight: '90vh',
          margin: 1,
        },
      }}
      sx={{
        '& .MuiDialog-paper': {
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: '1.2rem',
          textAlign: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        🎓 מדריך קצר
      </DialogTitle>

      <DialogContent sx={{ pt: 2, pb: 2, maxHeight: 'calc(90vh - 140px)', overflowY: 'auto' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Section 1 */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
              1️⃣ בחירת יום לעריכה
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
              לוחצים על יום בלוח השנה — יפתח חלון לבחירת סוג עבודה
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              בחירת סוג עבודה בחלון גם מעדכנת את תאריך המשיכה למטה ל<strong>אותו יום</strong> (טבעת 🟠 כתומה)
            </Typography>
          </Box>

          {/* Section 1b */}
          <Box sx={{ backgroundColor: 'rgba(255,152,0,0.08)', p: 1.5, borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
              👆 לחיצה ארוכה — בחירת יום למשיכה
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              לחיצה ארוכה (חצי שנייה) על יום <strong>מגדירה אותו כיום המשיכה</strong> מבלי לפתוח חלון עריכה — מסומן בטבעת כתומה 🟠
            </Typography>
          </Box>

          {/* Section 2 */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
              2️⃣ סימון סוג עבודה
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              <strong>בית 🏠</strong> - לא מוסיף ליתרה
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              <strong>משרד 💼</strong> - מוסיף 60 ליתרה (חשוב: רק אם עברתם את השעות הנדרשות)
            </Typography>
          </Box>

          {/* Section 3 */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
              3️⃣ רישום יום בטבלה
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              לאחר בחירת יום וסוג עבודה, היום מתעדכן בטבלה למטה עם הסימון שלכם
            </Typography>
          </Box>

          {/* Section 4 */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
              4️⃣ משיכת יתרה
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              בחרו יום (לחיצה רגילה או ארוכה) ורשמו כמה משכתם. היתרה תתעדכן בהתאם.
            </Typography>
            <Typography variant="caption" sx={{ color: 'error.main' }}>
              ⚠️ אם משכתם יותר מהיתרה, היתרה תהיה שלילית
            </Typography>
          </Box>

          {/* Section 5 */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
              5️⃣ תיקון טעויות
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              אם רשמתם בטעות - רשמו 0 בשדה המשיכה כדי לתקן
            </Typography>
          </Box>

          {/* Section 6 */}
          <Box sx={{ backgroundColor: 'info.lighter', p: 1.5, borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
              💾 אחסון מידע
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              כל המידע נשמר באופן מקומי על ההתקן בלבד. אם תכנסו מהמחשב או טלפון אחר, תראו נתונים שונים.
            </Typography>
          </Box>

          {/* Section 7 */}
          <Box sx={{ backgroundColor: 'success.lighter', p: 1.5, borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
              📱 טיפ: לשימוש כאפליקציה
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              באנדרואיד: לוחצים על "הורידו לעמוד הבית" כדי להפוך את האתר לאפליקציה במכשיר
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{ minWidth: 120 }}
        >
          הבנתי ✓
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InstructionsPopup;



