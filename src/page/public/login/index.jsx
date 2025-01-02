import { useContext, useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { MdOutlineVisibility, MdOutlineVisibilityOff, MdAccountCircle } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  CircularProgress,
  Divider,
  Alert,
} from '@mui/material';
import { useAlert } from '../../../hooks/ShowAlert';
import { AlertNotification } from '../../../components/AlertNotification';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, user } = useContext(AuthContext);
  const { alert } = useAlert();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      email,
      password,
    };

    try {
      await signIn(data);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <ThemeProvider theme={createTheme()}>
      <Container
        component="main"
        maxWidth="xs">
        <CssBaseline />
        <AlertNotification alert={alert} />
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'background.default',
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'black', width: 60, height: 60, fontSize: 50 }}>
              <MdAccountCircle />
            </Avatar>
            <Typography
              sx={{ textTransform: 'uppercase', fontWeight: '600' }}
              component="h1"
              variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                mt: 3,
                p: 3,
                borderRadius: 2,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
                backgroundColor: 'background.paper',
              }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end">
                        {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                    />
                  }
                  label="Lembre de mim"
                />

                <Link
                  sx={{
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                  }}
                  href="#"
                  variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: '#000',
                  transition: 'background-color 0.3s',
                  ':hover': { bgcolor: '#a9a9a9', color: 'black' },
                }}>
                {loading ? (
                  <CircularProgress
                    sx={{
                      color: 'white',
                    }}
                    size={24}
                  />
                ) : (
                  'Entrar'
                )}
              </Button>
              <Divider />
              <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                <Typography sx={{ textAlign: 'center' }}>
                  Não tem uma conta?
                  <Link
                    href="/cadastrar"
                    variant="body2"
                    sx={{
                      marginLeft: '7px',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                    }}>
                    Inscrever-se
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
