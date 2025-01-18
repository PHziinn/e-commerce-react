import { PrimarySearchBar } from '../../../components/navBarHeader';
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import { ProductsList } from '../../../components/ProductsList';
import { Footer } from '../../../components/layout/Footer';

export const SearchProducts = () => {
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
        <ProductsList />
      </Container>

      <Footer />
    </>
  );
};
