import { ProductDetails } from '../../../components/DetailsProducts';
import { Footer } from '../../../components/footer';
import { PrimarySearchBar } from '../../../components/navBarHeader';
import { ProductsInfo } from '../../../components/InfoProducts';
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

        <ProductsInfo />
      </Container>

      <Box component={'div'}>
        <Footer />
      </Box>
    </>
  );
};
