import {
  List,
  ListItemButton,
  Typography,
  IconButton,
  Stack,
  Box,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoLinkedin,
  IoLogoInstagram,
  IoLogoYoutube,
} from 'react-icons/io';
import LogoWhite from '../../../public/logoWhite.svg';

export const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const footerSections = [
    {
      description: 'As melhores informações estão aqui',
      socialIcons: [IoLogoFacebook, IoLogoTwitter, IoLogoLinkedin, IoLogoInstagram, IoLogoYoutube],
      showLogo: true,
    },
    {
      Divider: true,
    },
    {
      title: 'Sobre Nós',
      links: ['Sobre'],
    },
    {
      title: 'Informação',
      links: ['Contate-nos'],
    },
    {
      title: 'Para Usuários',
      links: ['Login', 'Register', 'Configurações'],
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: '#000000',
        color: 'white',
        marginTop: 10,
        bottom: 0,
        left: 0,
      }}>
      <List
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          flexWrap: 'wrap',
          padding: '20px',
          justifyContent: 'space-around',
        }}>
        {footerSections.map((section, index) => (
          <Box
            key={index}
            sx={{ textAlign: 'center' }}>
            <Typography
              variant="h6"
              gutterBottom>
              {section.title}
            </Typography>

            {section.showLogo && (
              <Box
                component={'img'}
                src={LogoWhite}
                alt={LogoWhite}
                sx={{ width: '70%', marginBottom: 5 }}
              />
            )}

            {section.Divider && (
              <Typography
                sx={{
                  margin: isMobile ? '2.5rem 0 2.5rem' : undefined,
                  height: '95%',
                  background: '#fff',
                  border: '1px solid #fff',
                }}></Typography>
            )}

            {section.description && <Typography>{section.description}</Typography>}
            {section.links && (
              <List
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                {section.links.map((link) => (
                  <ListItemButton
                    sx={{
                      margin: 1,
                    }}
                    key={link}>
                    <Typography>{link}</Typography>
                  </ListItemButton>
                ))}
              </List>
            )}

            {section.socialIcons && (
              <Stack
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                direction="row"
                spacing={2}>
                {section.socialIcons.map((Icon) => (
                  <IconButton
                    key={Icon}
                    aria-label={Icon}>
                    <Icon style={{ fontSize: 32, color: '#9e9e9e' }} />
                  </IconButton>
                ))}
              </Stack>
            )}
          </Box>
        ))}
      </List>

      <Divider sx={{ bgcolor: '#D3D3D3' }} />
      <Typography
        variant="body2"
        align="center"
        sx={{ padding: '10px 0' }}>
        &copy; 2024 E-commerce Tech Dev.
      </Typography>
    </Box>
  );
};
