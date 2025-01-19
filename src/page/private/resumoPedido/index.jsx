import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import { ResumoDePedidos } from '../../../components/ResumoDeProdutos';
import { PrimarySearchBar } from '../../../components/navBarHeader';
import { Footer } from '../../../components/layout/Footer';

export const ResumoPedido = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
          flex: '1',
        }}>
        <PrimarySearchBar />

        <Box sx={{ marginTop: isMobile ? 22 : '8rem' }}>
          <ResumoDePedidos />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};
