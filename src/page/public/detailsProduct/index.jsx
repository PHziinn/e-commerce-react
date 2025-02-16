import { ProductDetails } from '../../../components/DetailsProducts';
import { Footer } from '../../../components/layout/Footer';

import { PrimarySearchBar } from '../../../components/navBarHeader';

import { Box, Container, useMediaQuery, useTheme } from '@mui/material';

export const DetailsProducts = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: isMobile ? '95vw' : '80vw',
          paddingX: isMobile ? 0 : null,
        }}>
        <PrimarySearchBar />

        <Box sx={{ marginTop: isMobile ? 25 : '8rem' }}>
          <ProductDetails />
        </Box>
      </Container>

      <Footer />
    </>
  );
};
