import { Box, Grid, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';

export const Countdown = ({ targetDate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [timeLeft, setTimeLeft] = useState({ dia: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = new Date(targetDate) - now;

      if (difference > 0) {
        setTimeLeft({
          dia: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutos: Math.floor((difference / 1000 / 60) % 60),
          segundos: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ dia: 0, horas: 0, minutos: 0, segundos: 0 });
      }
    };

    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
    <Box sx={{ textAlign: 'center', padding: 3 }}>
      <Grid
        sx={{ alignItems: 'center', justifyContent: 'center' }}
        container
        spacing={isMobile ? 1 : 2}>
        <Grid
          item
          xs={12}>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: isMobile ? '1.785rem' : '2.125rem',
              mb: isMobile ? 1 : 3,
              mt: isMobile ? 3 : 5,
            }}
            gutterBottom>
            Oferta termina em:
          </Typography>
        </Grid>
        {Object.entries(timeLeft).map(([label, value]) => (
          <Grid
            item
            key={label}>
            <Paper
              elevation={3}
              sx={{
                padding: isMobile ? 0 : 2,
                textAlign: 'center',
                width: isMobile ? 70 : 150,
                backgroundColor: '#111',
                color: '#fff',
              }}>
              <Typography
                sx={{ fontSize: isMobile ? '1.3rem' : '1.8rem' }}
                fontWeight="bold">
                {value}
              </Typography>
              <Typography
                sx={{ fontSize: isMobile ? '0.875rem' : '1.4rem' }}
                color="#FFF">
                {label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
