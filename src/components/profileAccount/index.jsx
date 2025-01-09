import {
  Box,
  Button,
  Container,
  Divider,
  Grid2,
  IconButton,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { useUser } from '../../context/authContext';
import { useAlert } from '../../hooks/ShowAlert';
import {
  createAddress,
  deleteAddress,
  getByUsuario,
  patchAddress,
  patchUsuarios,
} from '../../service/api';
import { AlertNotification } from '../AlertNotification';
import { TabelaCompras } from './components/TabelaCompras';
import { TabelaEndereco } from './components/TabelaEndereco';
import { UploadAvatar } from './components/UploadAvatar';

export const ProfileAccount = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [page, setPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPass, setIsEditingPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [passwordData, setPasswordData] = useState({});

  const { user } = useUser();
  const { alert, closeAlert, showAlert } = useAlert();
  const client = useQueryClient();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleEditClick = () => {
    setIsEditingPass(false);
    setPasswordData({});
  };

  const { data: userData } = useQuery({
    queryKey: ['usuarios', user?.id],
    queryFn: () => getByUsuario(user?.id),
    enabled: !!user?.id,
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const { mutate: updateAvatarUserMutation, isPending } = useMutation({
    mutationFn: (data) => patchUsuarios(data.id, data.dataUser),
    onSuccess: () => {
      client.invalidateQueries(['usuarios']);
      showAlert('Avatar atualizado com sucesso!', 'success');
    },
    onError: () => {
      showAlert('Erro ao atualizar Avatar.', 'error');
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (updatedData) => patchUsuarios(updatedData.id, updatedData.data),
    onSuccess: () => {
      client.invalidateQueries(['usuarios']);
      showAlert('Informações pessoais atualizadas com sucesso!', 'success');
      setIsEditing(false);
    },
    onError: () => {
      showAlert('Erro ao atualizar as informações pessoais.', 'error');
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (data) => patchUsuarios(data.id, data.dataUser),
    onSuccess: () => {
      client.invalidateQueries(['usuarios']);
      showAlert('Senha atualizada com sucesso!', 'success');
      setIsEditingPass(false);
      setPasswordData({});
    },
    onError: () => {
      showAlert('Erro ao atualizar a senha.', 'error');
    },
  });

  const updateAddressMutation = useMutation({
    mutationFn: (addressData) => patchAddress(addressData.id, addressData.data),
    onSuccess: () => {
      client.invalidateQueries(['enderecos']);
      showAlert('Endereço atualizadas com sucesso!', 'success');
    },
    onError: () => {
      showAlert('Erro ao atualizar Endereço.', 'error');
    },
  });

  const createAddressMutation = useMutation({
    mutationFn: (addressData) => createAddress(addressData.data),
    onSuccess: () => {
      client.invalidateQueries(['enderecos']);
      showAlert('Endereço cadastrado com sucesso!', 'success');
    },
    onError: () => {
      showAlert('Erro ao cadastrar Endereço.', 'error');
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: (id) => deleteAddress(id),
    onSuccess: () => {
      client.invalidateQueries(['produtos']);
      showAlert('Endereço deletado com sucesso!', 'success');
    },
    onError: (error) => {
      console.error('Erro ao deletar produto:', error);
      showAlert('Erro ao deletar Endereço.', 'error');
    },
  });

  const handleSaveEdit = (updatedUsuarioAvatar) => {
    const formData = new FormData();
    const { id, file, password, ...rest } = updatedUsuarioAvatar;

    if (file) {
      formData.append('file', file);
    }

    Object.entries(rest).forEach(([key, value]) => {
      formData.append(key, value);
    });

    updateAvatarUserMutation({ id, dataUser: formData });
  };

  const handleSaveEditPessoa = () => {
    updateUserMutation.mutate({ id: userData?.user.id, data: formData });
  };

  const handleSaveEditPass = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showAlert('As senhas não coincidem. Tente novamente.', 'error');
      return;
    }
    if (passwordData.newPassword.length === 0 && passwordData.confirmPassword.length === 0) {
      showAlert('Por favor, preencha os campos de senha.', 'info');
      return;
    }
    updatePasswordMutation.mutate({
      id: userData?.user.id,
      dataUser: { password: passwordData.newPassword },
    });
  };

  const handleSaveAddress = (updatedAddress) => {
    updateAddressMutation.mutate({ id: updatedAddress?.id, data: updatedAddress });
  };

  const handleSaveCreateAddress = (createAddress) => {
    createAddressMutation.mutate({ data: createAddress });
  };

  const handleDeleteProduto = (id) => {
    deleteAddressMutation.mutate(id);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

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
        isPending={isPending}
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
      <Grid2
        container
        spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Box
            component={'form'}
            autoComplete="off"
            sx={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Nome"
              variant="outlined"
              value={formData.name || userData?.user.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={!isEditing}
            />
          </Box>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Box
            component={'form'}
            autoComplete="off"
            sx={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={formData.email || userData?.user.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={!isEditing}
            />
          </Box>
        </Grid2>
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
                onClick={handleSaveEditPessoa}
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
              onClick={() => setIsEditing(true)}
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
              fullWidth>
              Editar Perfil
            </Button>
          )}
        </Box>
      </Grid2>
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
      <Grid2
        container
        spacing={3}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Box
            component={'form'}
            autoComplete="off"
            sx={{ width: '100%' }}>
            <Box
              component={'input'}
              type="text"
              name="username"
              style={{ display: 'none' }}
              autoComplete="off"
            />
            <TextField
              fullWidth
              label="Nova Senha"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={passwordData.newPassword || ''}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              disabled={!isEditingPass}
              InputProps={{
                autoComplete: 'new-password',
                sx: { fontSize: '1rem' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: 'text.secondary' }}>
                      {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Box
            component={'form'}
            autoComplete="off"
            sx={{ width: '100%' }}>
            <Box
              component={'input'}
              type="text"
              name="username"
              style={{ display: 'none' }}
              autoComplete="off"
            />
            <TextField
              fullWidth
              label="Confirmar Senha"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={passwordData.confirmPassword || ''}
              onChange={(e) =>
                setPasswordData({ ...passwordData, confirmPassword: e.target.value })
              }
              disabled={!isEditingPass}
              inputProps={{ autoComplete: 'new-password' }}
            />
          </Box>
        </Grid2>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          {isEditingPass ? (
            <Box sx={{ display: 'flex', gap: 1, mt: 5 }}>
              <Button
                variant="contained"
                onClick={() => handleEditClick()}
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
                onClick={handleSaveEditPass}
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
              onClick={() => setIsEditingPass(true)}
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
              fullWidth>
              Editar Perfil
            </Button>
          )}
        </Box>
      </Grid2>
      <Divider sx={{ my: 4 }} />

      <TabelaEndereco
        userData={userData}
        onSave={handleSaveCreateAddress}
        onEdit={handleSaveAddress}
        onDelete={handleDeleteProduto}
      />

      <TabelaCompras userData={userData} />

      <Box
        display="flex"
        justifyContent="flex-end"
        mt={3}>
        {userData?.length === 0 && userData?.totalPages !== 1 && (
          <Pagination
            count={userData?.totalPages || 1}
            page={page}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            showFirstButton
            showLastButton
          />
        )}
      </Box>
    </Container>
  );
};
