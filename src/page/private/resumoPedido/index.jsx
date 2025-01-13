import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import { ResumoDePedidos } from '../../../components/ResumoDeProdutos';
import { PrimarySearchBar } from '../../../components/navBarHeader';

export const ResumoPedido = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: isMobile ? '95vw' : '80vw',
        paddingX: isMobile ? 0 : null,
      }}>
      <PrimarySearchBar />

      <Box sx={{ marginTop: isMobile ? 22 : '8rem' }}>
        <ResumoDePedidos />
      </Box>
    </Container>
  );
};
