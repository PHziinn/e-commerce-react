import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { CardProducts } from '../../../components/cardProducts';
import { CarouselList } from '../../../components/carousel';
import { Footer } from '../../../components/footer';
import { PrimarySearchBar } from '../../../components/navBarHeader';
import { getAllProdutos } from '../../../service/api';

const StyledContainer = styled('div')({
  marginTop: '6rem',
  marginBottom: '1rem',
});

export const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['produtos', page],
    queryFn: () => getAllProdutos(null, page),
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data...</p>;

  const dataByCategory = data?.dataByCategory;

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
            hasBorder={true}
            products={dataByCategory?.['MAIS_VENDIDOS']}
          />

          <CardProducts
            title="Mais Procurados"
            hasBorder={false}
            products={dataByCategory?.['MAIS_PROCURADOS']}
          />
          <CardProducts
            title="Itens recomendados"
            hasBorder={false}
            products={dataByCategory?.['RECOMENDADOS']}
          />
        </Box>
      </Container>
      <Footer />
    </>
  );
};
