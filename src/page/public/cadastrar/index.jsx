import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertNotification } from '../../../components/AlertNotification';
import { createUsuario } from '../../../service/api';
import { useAlert } from '../../../hooks/useShowAlert';
import { PrimarySearchBar } from '../../../components/navBarHeader';

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const client = useQueryClient();
  const { alert, closeAlert, showAlert } = useAlert();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const addCreateUsuario = useMutation({
    mutationFn: createUsuario,
    onSuccess: () => {
      client.invalidateQueries(['usuarios']);
      showAlert('Conta cria com sucesso!', 'success', 20, 10000);
    },
    onError: () => {
      showAlert('Email já está sendo usado.', 'error', 20);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');

    if (!email || !password || !confirmPassword) {
      showAlert('Todos os campos são obrigatórios.', 'warning', 20);
      return;
    }

    if (password !== confirmPassword) {
      showAlert('As senhas não coincidem.', 'error', 20);
      return;
    }

    addCreateUsuario.mutate({
      email,
      password,
    });
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container
        component="main"
        maxWidth="xs">
        <PrimarySearchBar />
        <CssBaseline />
        <AlertNotification
          closeAlert={closeAlert}
          alert={alert}
        />
        <Box
          sx={{
            minHeight: '100dvh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 3,
              p: 3,
              borderRadius: 2,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
              backgroundColor: 'background.paper',
            }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                mb: 5,
              }}>
              <Avatar sx={{ m: 1, bgcolor: 'black', width: 60, height: 60, fontSize: 35 }}>
                <FaLock />
              </Avatar>
              <Typography
                sx={{ textTransform: 'uppercase', fontWeight: '600' }}
                component="h1"
                variant="h5">
                Criar uma conta
              </Typography>
            </Box>

            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
                },
              }}
            />

            <TextField
              required
              fullWidth
              label="Sua senha"
              id="password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              name="password"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
                },
              }}
              InputProps={{
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

            <TextField
              required
              fullWidth
              label="Confirme sua senha"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              name="confirmPassword"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={addCreateUsuario.isPending}
              sx={{
                mt: 3,
                mb: 2,
                marginTop: 3,
                background: '#000000',
                transition: 'background-color 0.3s',
                ':hover': { backgroundColor: '#282828', color: '#fff', boxShadow: 'none' },
              }}>
              {addCreateUsuario.isPending ? (
                <CircularProgress
                  sx={{
                    color: '#000000',
                  }}
                  size={24}
                />
              ) : (
                'Cadastrar'
              )}
            </Button>
            <Divider />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Typography sx={{ textAlign: 'center' }}>
                Já tem uma conta?
                <Link
                  href="/login"
                  variant="body2"
                  sx={{
                    marginLeft: '7px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                  }}>
                  Faça Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
