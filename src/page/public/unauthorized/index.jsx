import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { FaLock } from 'react-icons/fa';

export const Unauthorized = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}>
        <FaLock style={{ fontSize: 64, color: 'red', marginBottom: 20 }} />

        <Typography
          variant="h4"
          component="h1"
          gutterBottom>
          Acesso Não Autorizado
        </Typography>
        <Typography variant="body1">
          Desculpe, você não tem permissão para acessar esta página. Por favor, verifique suas
          credenciais ou entre em contato com o administrador.
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#000000', mt: 3 }}
          href="/">
          Voltar para a Página Inicial
        </Button>
      </Box>
    </Container>
  );
};
