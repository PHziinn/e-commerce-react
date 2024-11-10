import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

import ImageOne from '../../../public/imageCarousel/1.png';
import ImageTwo from '../../../public/imageCarousel/2.png';
import ImageThee from '../../../public/imageCarousel/3.png';
import ImageFour from '../../../public/imageCarousel/4.png';
import ImageFive from '../../../public/imageCarousel/5.png';
import ImageSix from '../../../public/imageCarousel/6.png';

export const CarouselList = () => {
  const [activeStep, setActiveStep] = useState(0);

  const items = [
    {
      img: ImageOne,
      title: 'Título da Imagem 1',
    },
    {
      img: ImageTwo,
      title: 'Título da Imagem 2',
    },
    {
      img: ImageThee,
      title: 'Título da Imagem 3',
    },
    {
      img: ImageFour,
      title: 'Título da Imagem 4',
    },
    {
      img: ImageFive,
      title: 'Título da Imagem 5',
    },
    {
      img: ImageSix,
      title: 'Título da Imagem 6',
    },
  ];

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Carousel
      index={activeStep}
      onChange={handleStepChange}
      animation="slide"
      navButtonsAlwaysVisible={false}
      fullHeightHover={false}
      sx={{
        maxWidth: '100%',
        height: 500,
        [theme.breakpoints.down('sm')]: {
          height: 250,
        },
        [theme.breakpoints.down('md')]: {
          height: 350,
        },
        [theme.breakpoints.up('xl')]: {
          height: 600,
          '.CarouselItem': {
            width: '25%',
          },
        },
        '.CarouselItem': {
          width: '100%',
          [theme.breakpoints.up('lg')]: {
            width: '33.33%',
          },
          [theme.breakpoints.down('md')]: {
            width: '50%',
          },
        },
      }}>
      {items.map((item, i) => (
        <Box
          key={i}
          sx={{ position: 'relative' }}>
          <Box
            component={'img'}
            src={item.img}
            alt={item.title}
            style={{
              width: '100%',
              height: isSmallScreen ? 195 : 550,
              objectFit: 'cover',
            }}
          />
        </Box>
      ))}
    </Carousel>
  );
};
