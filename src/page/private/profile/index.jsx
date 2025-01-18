import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import { PrimarySearchBar } from '../../../components/navBarHeader';
import { ProfileAccount } from '../../../components/profileAccount';
import { Footer } from '../../../components/layout/Footer';

export const Profile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: isMobile ? '95vw' : '80vw',
          paddingX: isMobile ? 0 : null,
        }}>
        <PrimarySearchBar showAppBar={false} />

        <Box sx={{ marginTop: isMobile ? 15 : '3rem' }}>
          <ProfileAccount />
        </Box>
      </Container>
      <Footer />
    </>
  );
};
