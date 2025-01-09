import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { fetchAddressByCep } from '../../../../../service/api';

export const ModalAddress = ({ open, onClose, onSave, address, isEditMode }) => {
  const [formData, setFormData] = useState(address);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setFormData(address);
  }, [address]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'zipCode' && value.length === 8) {
      const address = await fetchAddressByCep(value);
      setFormData((prev) => ({
        ...prev,
        street: address.logradouro || '',
        neighbourhood: address.bairro || '',
        city: address.localidade || '',
        publicPlace: address.estado || '',
      }));
    }
  };

  const handleSave = () => {
    if (onSave && formData) {
      onSave(formData);
    }
    if (!isEditMode) {
      setFormData({});
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: '7px',
        },
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: isMobile ? '1.2rem' : '1.5rem' }}>
          {isEditMode ? 'Editar Endereço' : 'Adicionar Endereço'}
        </DialogTitle>
        <IconButton onClick={onClose}>
          <MdClose size={24} />
        </IconButton>
      </Box>
      <Divider />
      <DialogContent sx={{ mt: isMobile ? 1 : 2 }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
            <TextField
              sx={{ width: isMobile ? '100%' : '270px' }}
              label="CEP"
              variant="outlined"
              name="zipCode"
              value={formData?.zipCode || ''}
              onChange={handleChange}
            />
            <TextField
              sx={{ width: isMobile ? '100%' : '270px' }}
              label="Bairro"
              variant="outlined"
              name="neighbourhood"
              value={formData?.neighbourhood || ''}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
            <TextField
              sx={{ width: isMobile ? '100%' : '850px' }}
              label="Rua"
              variant="outlined"
              name="street"
              value={formData?.street || ''}
              onChange={handleChange}
            />
            <TextField
              sx={{ width: isMobile ? '100%' : '200px' }}
              label="Nº Casa"
              variant="outlined"
              name="streetNumber"
              value={formData?.streetNumber || ''}
              onChange={handleChange}
            />
          </Box>

          <TextField
            label="Cidade"
            variant="outlined"
            fullWidth
            name="city"
            value={formData?.city || ''}
            onChange={handleChange}
          />
          <TextField
            label="Estado"
            variant="outlined"
            fullWidth
            name="publicPlace"
            value={formData?.publicPlace || ''}
            onChange={handleChange}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between', mb: 1, px: 3 }}>
        <Button
          onClick={onClose}
          sx={{
            boxShadow: 'none',
            color: 'white',
            background: '#bf2a1f',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
            width: isMobile ? '100%' : '8rem',
            '&:hover': {
              backgroundColor: '#a11f15',
              boxShadow: 'none',
            },
          }}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          sx={{
            boxShadow: 'none',
            color: 'white',
            background: 'black',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
            width: isMobile ? '100%' : '8rem',
            '&:hover': {
              backgroundColor: '#282828',
              boxShadow: 'none',
            },
          }}
          onClick={handleSave}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
