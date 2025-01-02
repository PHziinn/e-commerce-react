import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { MdClose, MdDelete } from 'react-icons/md';

export const EditUsuarioModal = ({ open, onClose, usuario, onSave }) => {
  const [formData, setFormData] = useState(usuario);

  const isBlocked = ['false', 'true'];

  useEffect(() => {
    setFormData(usuario);
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (onSave && formData) {
      onSave(formData);
    }
    onClose();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      avatar: imageUrl,
      file: file,
    }));
  };

  const handleImageRemove = () => {
    if (formData.avatar) {
      URL.revokeObjectURL(formData.avatar);
    }

    setFormData((prev) => ({
      ...prev,
      avatar: null,
      file: null,
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: '16px',
          p: 1,
        },
      }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center">
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Editar Usuário</DialogTitle>
        <IconButton onClick={onClose}>
          <MdClose size={24} />
        </IconButton>
      </Box>
      <Divider />
      <DialogContent>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            gutterBottom>
            Imagem do Usuário
          </Typography>
          {!formData?.avatar ? (
            <Button
              variant="contained"
              component="label"
              sx={{
                mb: 2,
                backgroundColor: 'black',
                '&:hover': { backgroundColor: '#282828' },
              }}>
              Upload Imagem
              <Box
                component={'input'}
                hidden
                accept="image/*"
                type="file"
                onChange={handleImageUpload}
              />
            </Button>
          ) : (
            <Card>
              <CardMedia
                component="img"
                sx={{
                  borderRadius: '50%',
                  width: '240px',
                  height: '240px',
                }}
                image={formData.avatar}
                alt="Imagem do Usuário"
              />
              <CardActions>
                <Button
                  sx={{
                    justifyContent: 'flex-start',
                    color: 'red',
                    fontSize: '25px',
                  }}
                  onClick={handleImageRemove}>
                  <MdDelete />
                </Button>
              </CardActions>
            </Card>
          )}
        </Box>
        <Stack
          spacing={3}
          sx={{ mt: 2 }}>
          <TextField
            label="ID do Usuário"
            variant="outlined"
            fullWidth
            disabled
            value={formData?.id || ''}
          />
          <TextField
            label="Nome do Usuário"
            variant="outlined"
            fullWidth
            name="name"
            value={formData?.name || ''}
            onChange={handleChange}
          />
          <TextField
            label="E-mail"
            variant="outlined"
            fullWidth
            name="email"
            value={formData?.email || ''}
            onChange={handleChange}
          />
          <TextField
            label="Banimento"
            variant="outlined"
            fullWidth
            name="isBanned"
            value={formData?.isBanned || ''}
            onChange={handleChange}
            select>
            {isBlocked.map((block) => (
              <MenuItem
                key={block}
                value={block}>
                {block}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ justifyContent: 'space-between', px: 3 }}>
        <Button
          onClick={onClose}
          sx={{
            boxShadow: 'none',
            color: 'white',
            background: '#bf2a1f',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
            width: '8rem',
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
            width: '8rem',
            '&:hover': {
              backgroundColor: '#282828',
              color: 'white',
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
