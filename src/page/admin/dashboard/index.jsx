import { Box, Toolbar, Typography } from '@mui/material';
import { PainelAdministrativo } from '../../../components/layout/painelAdministrativo';
import { DashBoard } from '../../../components/Dashboard';

export const AdminDashBoard = () => {
  return (
    <PainelAdministrativo>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
        <Toolbar />
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold' }}>
          Dashboard
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <DashBoard />
        </Box>
      </Box>
    </PainelAdministrativo>
  );
};
