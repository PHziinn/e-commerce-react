import { Box, Toolbar, Typography } from '@mui/material';
import { PainelAdministrativo } from '../../../components/layout/painelAdministrativo';
import { Switch, FormControlLabel } from '@mui/material';
import { useContext } from 'react';
import { MaintenanceContext } from '../../../context/maintenanceContext';

export const AdminSettings = () => {
  const { isMaintenanceMode, toggleMaintenanceMode } = useContext(MaintenanceContext);
  return (
    <PainelAdministrativo>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
        <Toolbar />
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold' }}>
          Configurações
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ mt: 5 }}>
            <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
              Manutenção do E-commerce
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={isMaintenanceMode}
                  onChange={toggleMaintenanceMode}
                  color="primary"
                />
              }
              label="Modo de Manutenção"
            />
          </Box>
        </Box>
      </Box>
    </PainelAdministrativo>
  );
};
