import { Box, Button, Typography } from '@mui/material';

import { MdOutlineMobileOff } from 'react-icons/md';

export const PaginaRestritaMobiles = () => {
  return (
    <Box component="main">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100dvh',
          textAlign: 'center',
          fontFamily: 'Arial',
          color: '#b71c1c',
        }}>
        <MdOutlineMobileOff size={150} />
        <Typography sx={{ mt: 2, mb: 2, fontSize: '42px', fontWeight: 'bold' }}>
          Acesso Restrito
        </Typography>

        <Box sx={{ padding: 1 }}>
          <Typography
            sx={{
              color: '#555555',
              fontWeight: 400,
              lineHeight: 1.6,
              mb: 1,
            }}>
            Infelizmente, este conteúdo não está disponível para dispositivos móveis.
          </Typography>
          <Typography
            sx={{
              color: '#555555',
              fontWeight: 400,
              lineHeight: 1.6,
            }}>
            Por favor, para uma melhor experiência, acesse esta página através de um desktop.
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#000000', mt: 5 }}
            href="/">
            Voltar para a Página Inicial
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
