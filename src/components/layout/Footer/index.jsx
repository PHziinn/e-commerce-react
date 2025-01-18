import { Box, IconButton, Divider, Typography } from '@mui/material';
import { IoLogoGithub, IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io';
import LogoTechPlay from '../../../../public/logo-white.svg';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '13px 20px',
          backgroundColor: '#000000',
          color: 'white',
          marginTop: 10,
          bottom: 0,
          left: 0,
        }}>
        <Box
          component="img"
          onClick={() => navigate(`/`)}
          src={LogoTechPlay}
          alt="Logo Tech Play"
          sx={{ width: '130px' }}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton
            href="https://www.linkedin.com/in/wesley-santos-developer"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: 'white' }}
            aria-label="LinkedIn">
            <IoLogoLinkedin size={24} />
          </IconButton>
          <IconButton
            href="https://www.instagram.com/_wesley.dev"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: 'white' }}
            aria-label="Instagram">
            <IoLogoInstagram size={24} />
          </IconButton>
          <IconButton
            href="https://github.com/PHziinn"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: 'white' }}
            aria-label="GitHub">
            <IoLogoGithub size={24} />
          </IconButton>
        </Box>
      </Box>
      <Divider sx={{ backgroundColor: '#2a2a2a' }} />
      <Typography
        sx={{ backgroundColor: '#000000', color: 'white', padding: '2px' }}
        variant="body2"
        align="center">
        &copy; {new Date().getFullYear()} Author: Wesley Santos | E-commerce Tech Play.
      </Typography>
    </>
  );
};
