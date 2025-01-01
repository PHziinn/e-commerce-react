import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import {
  MdFormatListBulletedAdd,
  MdGridView,
  MdLogout,
  MdPeople,
  MdSettings,
} from 'react-icons/md';
import { useUser } from '../../../context/authContext';
import { getByUsuario } from '../../../service/api';

const menuItems = [
  { text: 'Dashboard', icon: <MdGridView style={{ fontSize: 20 }} />, href: '/admin/dashboard' },
  { text: 'Usuarios', icon: <MdPeople style={{ fontSize: 20 }} />, href: '/admin/usuarios' },
  {
    text: 'Adicionar Produtos',
    icon: <MdFormatListBulletedAdd style={{ fontSize: 20 }} />,
    href: '/admin/produtos',
  },

  {
    text: 'Configurações',
    icon: <MdSettings style={{ fontSize: 20 }} />,
    href: '/admin/settings',
  },
];

export const PainelAdministrativo = ({ children }) => {
  const { user, signOut } = useUser();

  const { data, isLoading } = useQuery({
    queryKey: ['usuarios', user.id],
    queryFn: () => getByUsuario(user.id),
    enabled: !!user.id,
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const handleLogout = () => {
    signOut();
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{ boxShadow: 'none', background: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography
            variant="p"
            sx={{ flexGrow: 1, fontSize: '16pt', fontWeight: 700 }}>
            Administração
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="p">{data?.user?.name}</Typography>

            {isLoading ? (
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  backgroundColor: '#ccc',
                }}
              />
            ) : (
              <Avatar
                alt={data?.user?.name || 'Avatar'}
                src={data?.user?.avatar || '/placeholder.svg'}
                sx={{
                  border: '2px solid rgba(204, 204, 204, 0.3)',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                  width: 50,
                  height: 50,
                }}
              />
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        open
        sx={{
          width: 280,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
          },
        }}>
        <Toolbar />

        <List sx={{ flex: 1 }}>
          {menuItems.map(({ text, icon, href }) => (
            <ListItem
              key={text}
              component="a"
              href={href}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  sx: {
                    color: '#000000',
                    fontSize: '17px',
                  },
                }}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ mb: 1 }} />
        <Box sx={{ ml: 1 }}>
          <Button
            onClick={handleLogout}
            startIcon={<MdLogout style={{ fontSize: 20 }} />}
            sx={{
              color: '#000000',
              fontSize: '15px',
              '&:hover': { color: '#5b5b5b' },
              fontWeight: 'bold',
            }}>
            Sair
          </Button>
        </Box>
      </Drawer>

      {children}
    </Box>
  );
};
