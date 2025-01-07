import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useUser } from '../../context/authContext';
import { useAlert } from '../../hooks/ShowAlert';
import { getByUsuario, patchUsuarios } from '../../service/api';
import { AlertNotification } from '../AlertNotification';
import { UploadAvatar } from './components/UploadAvatar';

const roleColors = {
  PAGO: '#6aa84f',
  PENDENTE: '#f1c232',
  CANCELADO: '#d32f2f',
};

export const ProfileAccount = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPass, setIsEditingPass] = useState(false);
  const { user } = useUser();
  const { alert, closeAlert, showAlert } = useAlert();
  const client = useQueryClient();

  const { data: userData } = useQuery({
    queryKey: ['usuarios', user?.id],
    queryFn: () => getByUsuario(user?.id),
    enabled: !!user?.id,
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const editUsuarioAvatarMutation = useMutation({
    mutationFn: (data) => patchUsuarios(data.id, data.dataUser),
    onSuccess: () => {
      client.invalidateQueries(['usuarios']);
      showAlert('Avatar atualizado com sucesso!', 'success');
    },
    onError: () => {
      showAlert('Erro ao atualizar Avatar.', 'error');
    },
  });

  const handleSaveEdit = (updatedUsuarioAvatar) => {
    const formData = new FormData();
    const { id, file, ...rest } = updatedUsuarioAvatar;

    if (file) {
      formData.append('file', file);
    }

    Object.entries(rest).forEach(([key, value]) => {
      formData.append(key, value);
    });

    editUsuarioAvatarMutation.mutate({ id, dataUser: formData });
  };

  const handleEditAddress = () => {};

  const handleDeleteAddress = () => {};

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: isMobile ? '95vw' : '80vw',
        paddingX: isMobile ? 0 : null,
      }}>
      <AlertNotification
        closeAlert={closeAlert}
        alert={alert}
      />
      <UploadAvatar
        onSave={handleSaveEdit}
        userData={userData}
      />

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight="bold">
          Informações Pessoais
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}>
          Atualize suas informações pessoais.
        </Typography>
      </Box>

      <Grid
        container
        spacing={2}>
        <Grid
          item
          xs={12}
          sm={6}>
          <TextField
            fullWidth
            label="Nome"
            variant="outlined"
            value={userData?.user.name || ''}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={userData?.user.email || ''}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditing}
          />
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          {isEditing ? (
            <Box sx={{ display: 'flex', gap: 1, mt: 5 }}>
              <Button
                variant="contained"
                onClick={() => setIsEditing(false)}
                sx={{
                  boxShadow: 'none',
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
                  background: '#000000',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s',
                  width: '8rem',
                  '&:hover': {
                    backgroundColor: '#282828',
                    color: 'white',
                    boxShadow: 'none',
                  },
                }}>
                Salvar
              </Button>
            </Box>
          ) : (
            <Button
              type="button"
              variant="contained"
              sx={{
                mt: 5,
                boxShadow: 'none',
                background: '#000000',
                fontWeight: 'bold',
                transition: 'background-color 0.3s',
                width: '10rem',
                '&:hover': {
                  backgroundColor: '#282828',
                  color: 'white',
                  boxShadow: 'none',
                },
              }}
              onClick={() => setIsEditing(true)}
              fullWidth>
              Editar Perfil
            </Button>
          )}
        </Box>
      </Grid>
      <Divider sx={{ my: 4 }} />

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          fontWeight="bold">
          Atualizar Senha
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}>
          Certifique-se de que sua senha seja segura e exclusiva.
        </Typography>
      </Box>
      <Grid
        container
        spacing={3}>
        <Grid
          item
          xs={12}
          sm={6}>
          <TextField
            fullWidth
            label="Sua senha"
            type="password"
            variant="outlined"
            disabled={!isEditingPass}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}>
          <TextField
            fullWidth
            label="Nova Senha"
            type="password"
            variant="outlined"
            disabled={!isEditingPass}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}>
          <TextField
            fullWidth
            label="Confirmar Senha"
            type="password"
            variant="outlined"
            disabled={!isEditingPass}
          />
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          {isEditingPass ? (
            <Box sx={{ display: 'flex', gap: 1, mt: 5 }}>
              <Button
                variant="contained"
                onClick={() => setIsEditingPass(false)}
                sx={{
                  boxShadow: 'none',
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
                  background: '#000000',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s',
                  width: '8rem',
                  '&:hover': {
                    backgroundColor: '#282828',
                    color: 'white',
                    boxShadow: 'none',
                  },
                }}>
                Salvar
              </Button>
            </Box>
          ) : (
            <Button
              type="button"
              variant="contained"
              sx={{
                mt: 5,
                boxShadow: 'none',
                background: '#000000',
                fontWeight: 'bold',
                transition: 'background-color 0.3s',
                width: '10rem',
                '&:hover': {
                  backgroundColor: '#282828',
                  color: 'white',
                  boxShadow: 'none',
                },
              }}
              onClick={() => setIsEditingPass(true)}
              fullWidth>
              Editar Perfil
            </Button>
          )}
        </Box>
      </Grid>

      <Divider sx={{ my: 4 }} />
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          fontWeight="bold">
          Endereços cadastrados
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}>
          Veja e edite seus endereços de entrega cadastrados.
        </Typography>
      </Box>
      <List>
        {userData?.user.Address.map((address) => (
          <ListItem
            key={address.id}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <ListItemText
              primary={`${address.street} - ${address.streetNumber}`}
              secondary={`${address.city} - ${address.neighbourhood}, CEP: ${address.zipCode}`}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                color="primary"
                onClick={() => handleEditAddress(address.id)}>
                <MdEdit />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleDeleteAddress(address.id)}>
                <MdDelete />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>

      <TableContainer
        component={Paper}
        elevation={37}
        sx={{ boxShadow: 'none', mt: 10 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#000000' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>

              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Preço
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userData?.user.Carts.map((cart) => (
              <TableRow key={cart.id}>
                <TableCell>{cart.id}</TableCell>

                <TableCell sx={{ textAlign: 'center' }}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    cart.total
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Chip
                    label={cart.status}
                    sx={{
                      width: '6.8rem',
                      height: '1.5rem',
                      backgroundColor: roleColors[cart.status],
                      color: '#fff',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}

            {userData?.user.Carts.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center">
                  <Typography
                    variant="body1"
                    sx={{ color: '#757575', py: 2 }}>
                    Nenhum produto encontrado.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        display="flex"
        justifyContent="flex-end"
        mt={3}>
        <Pagination
          count={3}
          color="primary"
          variant="outlined"
          showFirstButton
          showLastButton
        />
      </Box>
    </Container>
  );
};
