import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import { CardProducts } from '../../components/cardProducts';
import { CarouselList } from '../../components/carousel';
import { Footer } from '../../components/footer';
import { PrimarySearchBar } from '../../components/navBarHeader';
import { styled } from '@mui/material/styles';

const StyledContainer = styled('div')({
  marginTop: '6rem',
  marginBottom: '1rem',
});

export const Home = () => {
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

        <Box sx={{ marginTop: isMobile ? 25 : '10rem' }}>
          <StyledContainer>
            <CarouselList />
          </StyledContainer>

          <CardProducts
            title="Mais Vendidos"
            hasBorder={false}
          />

          <CardProducts
            title="Mais Procurados"
            hasBorder={false}
          />
          <CardProducts
            title="Itens recomendados"
            hasBorder={false}
          />
        </Box>
      </Container>
      <Footer />
    </>
  );
};
