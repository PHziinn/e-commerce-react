import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { CarouselTamplate } from '../../../components/CarouselTamplate';
import { CardProducts } from '../../../components/cardProducts';

import { PrimarySearchBar } from '../../../components/navBarHeader';
import { getAllProdutos } from '../../../service/api';
import { Footer } from '../../../components/layout/Footer';

export const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { data, isLoading } = useQuery({
    queryKey: ['produtos', 1],
    queryFn: () => getAllProdutos(1),
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const dataByCategory = data?.dataByCategory;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: isMobile ? '95vw' : '80vw',
          paddingX: isMobile ? 0 : null,
          flex: 1,
        }}>
        <PrimarySearchBar />

        <Box sx={{ marginTop: isMobile ? 25 : '10rem' }}>
          <CarouselTamplate />

          <CardProducts
            title="Mais Vendidos"
            hasBorder={true}
            isLoading={isLoading}
            products={dataByCategory?.['MAIS_VENDIDOS']}
          />

          <CardProducts
            title="Mais Procurados"
            hasBorder={false}
            isLoading={isLoading}
            products={dataByCategory?.['MAIS_PROCURADOS']}
          />
          <CardProducts
            title="Itens recomendados"
            hasBorder={false}
            isLoading={isLoading}
            products={dataByCategory?.['RECOMENDADOS']}
          />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};
