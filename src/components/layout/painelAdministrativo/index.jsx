import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import {
  MdAttachMoney,
  MdFormatListBulletedAdd,
  MdGridView,
  MdMenu,
  MdPeople,
  MdSettings,
} from 'react-icons/md';

export const PainelAdministrativo = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <MdGridView style={{ fontSize: 20 }} />, href: '#' },
    { text: 'Usuarios', icon: <MdPeople style={{ fontSize: 20 }} />, href: '#' },
    {
      text: 'Adicionar Produtos',
      icon: <MdFormatListBulletedAdd style={{ fontSize: 20 }} />,
      href: '#',
    },
    { text: 'Transações', icon: <MdAttachMoney style={{ fontSize: 20 }} />, href: '#' },
    { text: 'Configurações', icon: <MdSettings style={{ fontSize: 20 }} />, href: '#' },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{ boxShadow: 'none', background: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2 }}>
            <MdMenu />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}>
            Administração
          </Typography>

          <IconButton
            onClick={handleMenuClick}
            sx={{ ml: 2 }}>
            <Avatar
              alt="User Avatar"
              src="/placeholder.svg"
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Minha Conta</MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose}>Sair</MenuItem>
          </Menu>
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
        <List>
          {menuItems.map(({ text, icon, href }) => (
            <ListItem
              button
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
      </Drawer>

      {children}
    </Box>
  );
};
