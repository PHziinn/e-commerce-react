import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FaLock } from 'react-icons/fa';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import {
  Box,
  Grid,
  Link,
  TextField,
  Button,
  Avatar,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Divider,
  CssBaseline,
} from '@mui/material';

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container
        component="main"
        maxWidth="xs">
        <CssBaseline />
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
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
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
              <Grid
                container
                spacing={1}>
                <Grid
                  item
                  xs={12}>
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
                </Grid>
                <Grid
                  item
                  xs={12}>
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
                </Grid>
                <Grid
                  item
                  xs={12}>
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
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  marginTop: 5,
                  bgcolor: 'black',
                  transition: 'background-color 0.3s',
                  ':hover': { bgcolor: '#a9a9a9', color: 'black' },
                }}>
                Cadastrar
              </Button>
              <Divider>
                <Typography sx={{ color: 'text.secondary' }}>ou</Typography>
              </Divider>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => alert('Inscreva-se no Google')}
                  startIcon={<FcGoogle />}>
                  Inscreva-se no Google
                </Button>

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
        </Box>
      </Container>
    </ThemeProvider>
  );
};
