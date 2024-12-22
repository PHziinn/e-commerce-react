import { Box, Toolbar, Typography } from '@mui/material';
import { PainelAdministrativo } from '../../../components/layout/painelAdministrativo';
import { GerenciadorDeUsuarios } from '../../../components/GerenciadorDeUsuarios';

export const AdminUsuarios = () => {
  return (
    <PainelAdministrativo>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
        <Toolbar />
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold' }}>
          Lista de Clientes
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <GerenciadorDeUsuarios />
        </Box>
      </Box>
    </PainelAdministrativo>
  );
};
