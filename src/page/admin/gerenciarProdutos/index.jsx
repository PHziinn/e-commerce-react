import { Box, Toolbar, Typography } from '@mui/material';
import { PainelAdministrativo } from '../../../components/layout/painelAdministrativo';
import { GerenciadorDeProdutos } from '../../../components/GerenciadorDeProdutos';

export const AdminGerenciadorDeProdutos = () => {
  return (
    <PainelAdministrativo>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
        <Toolbar />
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold' }}>
          Gerenciamentos de Produtos
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <GerenciadorDeProdutos />
        </Box>
      </Box>
    </PainelAdministrativo>
  );
};
