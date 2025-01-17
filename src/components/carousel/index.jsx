import { Box, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import Carousel from 'react-material-ui-carousel';

import { useQuery } from '@tanstack/react-query';
import { getAllSettings } from '../../service/api';

export const CarouselList = () => {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { data, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: getAllSettings,
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const skeletonArray = Array.from({ length: 2 }, (_, index) => index);

  return (
    <Carousel
      index={activeStep}
      onChange={handleStepChange}
      navButtonsAlwaysVisible={false}
      fullHeightHover={false}
      indicators={true}
      indicatorIconButtonProps={{
        style: {
          padding: isSmallScreen ? 6 : 10,
          color: 'rgba(0, 0, 0, 0.5)',
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: '#000000',
        },
      }}
      sx={{
        maxWidth: '100%',
        '.CarouselItem': {
          width: '100%',
        },
        '.MuiPaper-root': {
          backgroundColor: 'transparent',
        },
      }}>
      {isLoading
        ? skeletonArray.map((_, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: isSmallScreen ? '200px' : '550px',
              }}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{
                  borderRadius: 2,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              />
            </Box>
          ))
        : data?.[0]?.imagens?.map((item, index) => {
            const imageUrl = isSmallScreen
              ? item.url.replace('/upload/', '/upload/w_640,h_360/')
              : item.url;

            return (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                }}>
                <Box
                  component={'img'}
                  src={imageUrl}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    marginBottom: '10px',
                    borderRadius: isSmallScreen ? 8 : 12,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </Box>
            );
          })}
    </Carousel>
  );
};
