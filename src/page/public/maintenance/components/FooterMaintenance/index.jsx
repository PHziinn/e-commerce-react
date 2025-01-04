import { Box, IconButton } from '@mui/material';
import { IoLogoGithub, IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io';
import LogoWhite from '../../../../../../public/logoWhite.svg';

export const FooterMaintenance = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
        padding: '13px 0',
        backgroundColor: '#000',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '20px',
      }}>
      <Box
        component="img"
        src={LogoWhite}
        alt="Logo Tech Dev"
        sx={{ width: '200px' }}
      />

      <Box sx={{ display: 'flex', gap: 2, mr: 5 }}>
        <IconButton
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'white' }}>
          <IoLogoLinkedin size={24} />
        </IconButton>
        <IconButton
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'white' }}>
          <IoLogoInstagram size={24} />
        </IconButton>
        <IconButton
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'white' }}>
          <IoLogoGithub size={24} />
        </IconButton>
      </Box>
    </Box>
  );
};
