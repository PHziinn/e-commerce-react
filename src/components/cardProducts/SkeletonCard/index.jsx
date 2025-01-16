import { Box, Skeleton } from '@mui/material';
import React from 'react';

export const SkeletonCard = ({ hasBorder }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 285,
        flex: '0 0 auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '0.7rem',
        height: hasBorder ? '450px' : '400px',
      }}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={200}
        sx={{ borderRadius: '8px', marginBottom: '16px' }}
      />
      <Skeleton
        animation="wave"
        variant="text"
        width="100%"
        height={20}
        sx={{ marginBottom: '8px' }}
      />
      <Skeleton
        animation="wave"
        variant="text"
        width="60%"
        height={20}
        sx={{ marginBottom: hasBorder ? '14px' : '32px' }}
      />
      {hasBorder && (
        <Skeleton
          animation="wave"
          variant="text"
          width="80%"
          height={60}
          sx={{ marginBottom: '24px' }}
        />
      )}

      <Skeleton
        animation="wave"
        variant="rectangular"
        width="45%"
        height={30}
        sx={{ borderRadius: '4px', marginBottom: '8px' }}
      />

      <Skeleton
        animation="wave"
        variant="text"
        width="40%"
        height={20}
        sx={{ marginBottom: '16px' }}
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="95%"
        height={36}
        sx={{
          margin: '0 auto',
          borderRadius: '4px',
        }}
      />
    </Box>
  );
};
