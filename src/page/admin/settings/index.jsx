import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { AlertNotification } from '../../../components/AlertNotification';
import { PainelAdministrativo } from '../../../components/layout/painelAdministrativo';
import { useAlert } from '../../../hooks/ShowAlert';
import { getAllSettings, patchSettings } from '../../../service/api';

export const AdminSettings = () => {
  const [feedMessage, setFeedMessage] = useState();
  const { alert, showAlert } = useAlert();
  const client = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: getAllSettings,
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const editSettingsMutation = useMutation({
    mutationFn: ({ id, dataSettings }) => patchSettings(id, dataSettings),
    onSuccess: () => {
      client.invalidateQueries(['settings']);
      showAlert('Configurações atualizada com Sucesso!', 'success');
    },
    onError: () => {
      showAlert('Erro ao atualizar configurações.', 'error');
    },
  });

  const handleSwitchChange = (key, value) => {
    const id = data?.[0]?.id;
    if (id) {
      editSettingsMutation.mutate({ id, dataSettings: { [key]: value } });
    }
  };

  const handleFeedMessageSave = () => {
    const id = data?.[0]?.id;
    if (id) {
      editSettingsMutation.mutate({ id, dataSettings: { message: feedMessage } });
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <PainelAdministrativo>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
        <AlertNotification alert={alert} />
        <Toolbar />
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold' }}>
          Configurações
        </Typography>

        <Box>
          <Box sx={{ mt: 5 }}>
            <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
              Manutenção do E-commerce
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={data?.[0]?.isManutencion || false}
                  onChange={(e) => handleSwitchChange('isManutencion', e.target.checked)}
                  color="primary"
                />
              }
              label="Ativar Manutenção do Site"
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 5 }}>
            <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>Feed de Anúncio</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={data?.[0]?.isFeedDesconto || false}
                  onChange={(e) => handleSwitchChange('isFeedDesconto', e.target.checked)}
                  color="primary"
                />
              }
              label="Ativar Feed de Anúncio"
            />

            <Box>
              <TextField
                margin="normal"
                label="Mensagem"
                name="message"
                value={feedMessage || data?.[0].message}
                onChange={(e) => setFeedMessage(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    width: '450px',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
                  },
                }}
              />
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    boxShadow: 'none',
                    color: 'white',
                    background: 'black',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s',
                    width: '8rem',
                    '&:hover': {
                      backgroundColor: '#282828',
                      color: 'white',
                      boxShadow: 'none',
                    },
                  }}
                  onClick={handleFeedMessageSave}>
                  Salvar
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </PainelAdministrativo>
  );
};
