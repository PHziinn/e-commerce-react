import { Box, Button, Grid2, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { MdOutlineAddShoppingCart, MdOutlineShoppingCart } from 'react-icons/md';
import { useConvertValues } from '../../../utils/ConvertValues';

export const CardProdutoGrid = ({ isLoading, data, navigate, handleProductClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { convertValues } = useConvertValues();

  return (
    <Grid2
      container
      spacing={1}>
      {isLoading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <Grid2
            size={{ xs: 6, sm: 6, md: 4, lg: 4, xl: 3 }}
            key={index}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '300px',
                  maxWidth: 285,
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '0.7rem',
                  height: '440px',
                }}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  height={220}
                  sx={{ marginBottom: 2 }}
                />
                <Skeleton
                  animation="wave"
                  width="80%"
                  height={20}
                  sx={{ marginBottom: 2 }}
                />
                <Skeleton
                  animation="wave"
                  width="60%"
                  height={20}
                  sx={{ marginBottom: 2 }}
                />
                <Skeleton
                  animation="wave"
                  width="40%"
                  height={20}
                  sx={{ marginBottom: 2 }}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width="80%"
                    height={36}
                  />
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width="20%"
                    height={36}
                  />
                </Box>
              </Box>
            </Box>
          </Grid2>
        ))
      ) : data?.data?.length > 0 ? (
        data?.data.map((products) => (
          <Grid2
            size={{ xs: 6, sm: 6, md: 4, lg: 4, xl: 3 }}
            key={products.id}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Box
                onClick={() => navigate(`/produto/${products.id}`)}
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
                  height: '440px',
                }}>
                <Box
                  component="img"
                  src={products.imagens[0]?.url}
                  alt={products.name}
                  sx={{
                    width: '100%',
                    marginBottom: '16px',
                    height: '220px',
                    objectFit: 'contain',
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    mb: 3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    marginBottom: 2,
                    flexGrow: 1,
                    lineHeight: isMobile ? '1rem' : '1.4em',
                    maxHeight: isMobile ? '2.1rem' : '3em',
                  }}>
                  {products.name}
                </Typography>

                {products.originalPrice && (
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: 'line-through', color: 'gray' }}>
                    {convertValues(products.originalPrice)}
                  </Typography>
                )}
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', mb: 1 }}>
                  {convertValues(products.price)}
                  <Typography
                    component={'p'}
                    sx={{ fontSize: 13, fontWeight: 'lighter', mb: 1 }}>
                    À vista no PIX
                  </Typography>
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/produto/${products.id}`)}
                    sx={{
                      boxShadow: 'none',
                      background: 'black',
                      borderRadius: '4px 0 0 4px',
                      transition: 'background-color 0.3s',
                      width: '90%',
                      '&:hover': {
                        backgroundColor: '#282828',
                        color: '#fff',
                        boxShadow: 'none',
                      },
                      '&:active': {
                        backgroundColor: '#282828',
                        color: '#fff',
                        boxShadow: 'none',
                      },
                    }}>
                    <MdOutlineShoppingCart
                      style={{ fontSize: '1.4rem', display: isMobile ? 'none' : 'block' }}
                    />
                    Comprar
                  </Button>
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(products);
                    }}
                    sx={{
                      boxShadow: 'none',
                      backgroundColor: 'black',
                      height: '2.28rem',
                      borderRadius: '0 4px 4px 0',
                      transition: 'background-color 0.3s',
                      '&:hover': {
                        backgroundColor: '#282828',
                        color: '#fff',
                        boxShadow: 'none',
                      },
                      '&:active': {
                        backgroundColor: '#282828',
                        color: '#fff',
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
            </Box>
          </Grid2>
        ))
      ) : (
        <p>Nenhum produto encontrado.</p>
      )}
    </Grid2>
  );
};
