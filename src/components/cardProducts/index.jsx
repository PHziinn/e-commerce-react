import { Button, Grid, Chip, Typography, Box } from '@mui/material';
import { MdOutlineAddShoppingCart, MdOutlineShoppingCart } from 'react-icons/md';
import { MdOutlineBolt } from 'react-icons/md';
import { SwiperSlide } from 'swiper/react';
import { SliderCard } from './../Slide/index';

const settings = {
  spaceBetween: 10,
  slidesPerView: 'auto',
  breakpoints: {
    1440: {
      slidesPerView: 5,
    },
    1024: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 3,
    },
    480: {
      slidesPerView: 1.5,
    },
    0: {
      slidesPerView: 1.5,
      spaceBetween: 10,
    },
  },
};

export const CardProducts = ({ title, hasBorder, products }) => {
  return (
    <Box sx={{ padding: 0 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', mb: 3, mt: 3 }}>
        {title}
      </Typography>

      <SliderCard
        settings={settings}
        style={{ width: 'auto' }}>
        {products?.map((product) => (
          <SwiperSlide key={product.id}>
            <Grid
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center',
              }}>
              <Box
                key={product.id}
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
                  height: '450px',
                }}>
                {hasBorder && (
                  <Chip
                    label={product.discount}
                    sx={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: 'linear-gradient(45deg, #FF3D00, #FF8A00)',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      fontSize: '0.875rem',
                      padding: '0 4px',
                      height: '24px',
                      borderRadius: '6px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                  />
                )}

                <Box
                  component={'img'}
                  src={product.imagemUrl}
                  alt={product.name}
                  sx={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'contain',
                    marginBottom: '16px',
                  }}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 'semibold' }}>
                    {product.brand}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    mb: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    marginBottom: 2,
                    flexGrow: 1,
                    lineHeight: '1.4em',
                    maxHeight: '3.4em',
                  }}>
                  {product.name}
                </Typography>

                {hasBorder && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 2,
                      width: '100%',
                    }}>
                    <Chip
                      icon={<MdOutlineBolt style={{ fontSize: '1.2rem', color: 'white' }} />}
                      label="Ainda mais baixo"
                      sx={{
                        background: 'linear-gradient(45deg, #FF3D00, #FF8A00)',
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                        fontSize: '0.875rem',
                        padding: '0 4px',
                        height: '24px',
                        borderRadius: '6px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      }}
                    />
                  </Box>
                )}

                {product.oldPrice && (
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: 'line-through', color: 'gray' }}>
                    R${product.oldPrice.toFixed(2)}
                  </Typography>
                )}
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', mb: 1 }}>
                  R$ {product.price.toFixed(2)}
                  <Typography
                    component={'p'}
                    sx={{ fontSize: 13, fontWeight: 'lighter', mb: 1 }}>
                    À vista no PIX
                  </Typography>
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    href="#"
                    variant="contained"
                    sx={{
                      boxShadow: 'none',
                      background: 'black',
                      borderRadius: '4px 0 0 4px',
                      transition: 'background-color 0.3s',
                      width: '90%',
                      '&:hover': {
                        backgroundColor: '#D3D3D3',
                        color: 'black',
                        boxShadow: 'none',
                      },
                    }}>
                    <MdOutlineShoppingCart style={{ fontSize: '1.4rem' }} />
                    Comprar
                  </Button>
                  <Button
                    href="#"
                    variant="contained"
                    sx={{
                      boxShadow: 'none',
                      backgroundColor: 'black',
                      height: '2.28rem',
                      borderRadius: '0 4px 4px 0',
                      transition: 'background-color 0.3s',
                      '&:hover': {
                        backgroundColor: '#D3D3D3',
                        color: 'black',
                        boxShadow: 'none',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 2,
                        bottom: 2,
                        left: 0,
                        width: 4,
                        backgroundColor: '#ccc',
                        borderRadius: 1,
                      },
                    }}>
                    <MdOutlineAddShoppingCart style={{ fontSize: '1.5rem' }} />
                  </Button>
                </Box>
              </Box>
            </Grid>
          </SwiperSlide>
        ))}
      </SliderCard>
    </Box>
  );
};
