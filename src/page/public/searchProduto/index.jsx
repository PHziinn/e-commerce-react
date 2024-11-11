import { Footer } from '../../../components/footer';
import { PrimarySearchBar } from '../../../components/navBarHeader';
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import { ProductsList } from '../../../components/ProductsList';

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

      <Box component={'div'}>
        <Footer />
      </Box>
    </>
  );
};
