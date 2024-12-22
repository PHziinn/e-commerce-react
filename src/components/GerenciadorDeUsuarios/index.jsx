import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { PiUserList } from 'react-icons/pi';

import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#F8F8FF',
  marginRight: theme.spacing(2),
  width: '100%',
  border: '1px solid rgba(0, 0, 0, 0.2)',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
    height: '40px',
    top: '1px',
    color: '#4B5563',
    borderRadius: '8px',
  },
  [theme.breakpoints.down('sm')]: {
    backgroundColor: '#F8F8FF',
    color: '#4B5563',
    width: '100%',
    height: '35px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    borderRadius: '5px solid',
    [theme.breakpoints.up('md')]: {
      width: '43ch',
    },
  },
}));

const initialProducts = [
  {
    id: 1,
    avatar:
      'https://res.cloudinary.com/dtk98bty4/image/upload/v1728862716/produtos/wwoedlsoaizy3leknzqg.jpg',
    name: 'Nome de Usuarios',
    email: 'cliente@exemple.com',
    role: 'ADMIN',
  },
  {
    id: 2,
    avatar:
      'https://res.cloudinary.com/dtk98bty4/image/upload/v1728862716/produtos/wwoedlsoaizy3leknzqg.jpg',
    name: 'Nome de Usuarios',
    email: 'cliente@exemple.com',
    role: 'ADMIN',
  },
  {
    id: 3,
    avatar:
      'https://res.cloudinary.com/dtk98bty4/image/upload/v1728862716/produtos/wwoedlsoaizy3leknzqg.jpg',
    name: 'Nome de Usuarios',
    email: 'cliente@exemple.com',
    role: 'ADMIN',
  },
  {
    id: 4,
    avatar:
      'https://res.cloudinary.com/dtk98bty4/image/upload/v1728862716/produtos/wwoedlsoaizy3leknzqg.jpg',
    name: 'Nome de Usuarios',
    email: 'cliente@exemple.com',
    role: 'USER',
  },
  {
    id: 5,
    avatar:
      'https://res.cloudinary.com/dtk98bty4/image/upload/v1728862716/produtos/wwoedlsoaizy3leknzqg.jpg',
    name: 'Nome de Usuarios',
    email: 'cliente@exemple.com',
    role: 'USER',
  },
  {
    id: 6,
    avatar:
      'https://res.cloudinary.com/dtk98bty4/image/upload/v1728862716/produtos/wwoedlsoaizy3leknzqg.jpg',
    name: 'Nome de Usuarios',
    email: 'cliente@exemple.com',
    role: 'USER',
  },
  {
    id: 7,
    avatar:
      'https://res.cloudinary.com/dtk98bty4/image/upload/v1728862716/produtos/wwoedlsoaizy3leknzqg.jpg',
    name: 'Nome de Usuarios',
    email: 'cliente@exemple.com',
    role: 'USER',
  },
  {
    id: 8,
    avatar:
      'https://res.cloudinary.com/dtk98bty4/image/upload/v1728862716/produtos/wwoedlsoaizy3leknzqg.jpg',
    name: 'Nome de Usuarios',
    email: 'cliente@exemple.com',
    role: 'USER',
  },
  {
    id: 9,
    avatar:
      'https://res.cloudinary.com/dtk98bty4/image/upload/v1728862716/produtos/wwoedlsoaizy3leknzqg.jpg',
    name: 'Nome de Usuarios',
    email: 'cliente@exemple.com',
    role: 'USER',
  },
  {
    id: 10,
    avatar:
      'https://res.cloudinary.com/dtk98bty4/image/upload/v1728862716/produtos/wwoedlsoaizy3leknzqg.jpg',
    name: 'Nome de Usuarios',
    email: 'cliente@exemple.com',
    role: 'USER',
  },
];

const roleColors = {
  ADMIN: '#d32f2f',
  USER: '#1976d2',
};

export const GerenciadorDeUsuarios = () => {
  const [usuarios, setUsuarios] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // Filtra os produtos pelo termo de pesquisa
  const filteredUsuarios = usuarios.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginação dos produtos
  const paginatedUsuarios = filteredUsuarios.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleAddProduct = () => {
    console.log('Adicionar novo produto');
  };

  const handleEditProduct = (id) => {
    console.log(`Editar produto com ID ${id}`);
  };

  const handleDeleteProduct = (id) => {
    setUsuarios(usuarios.filter((product) => product.id !== id));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  console.log(usuarios);

  return (
    <Box sx={{ p: 3, width: '100%' }}>
      {/* Cabeçalho */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}>
        {/* Campo de Pesquisa */}

        <Search sx={{ display: 'flex' }}>
          <SearchIconWrapper>
            <PiUserList style={{ fontSize: '1.6rem' }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Pesquisar produtos..."
            inputProps={{ 'aria-label': 'search' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Search>
      </Box>

      {/* Tabela de Produtos */}

      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#000000' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Avatar</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Nome
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Email
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Cargo
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedUsuarios.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Avatar
                    src={product.avatar}
                    alt={product.name}
                    sx={{ width: 40, height: 40, border: '1px solid rgb 0.0.0.0.1' }}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{product.name}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{product.email}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Chip
                    label={product.role}
                    sx={{
                      width: '5rem',
                      height: '1.5rem',
                      backgroundColor: roleColors[product.role],
                      color: '#fff',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleEditProduct(product.id)}
                    sx={{
                      mx: 0.5,
                      backgroundColor: '#e3f2fd',
                      '&:hover': { backgroundColor: '#bbdefb' },
                    }}>
                    <MdModeEdit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteProduct(product.id)}
                    sx={{
                      mx: 0.5,
                      backgroundColor: '#ffebee',
                      '&:hover': { backgroundColor: '#ffcdd2' },
                    }}>
                    <MdDelete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {paginatedUsuarios.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center">
                  <Typography
                    variant="body1"
                    sx={{ color: '#757575', py: 2 }}>
                    Nenhum produto encontrado.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginação */}
      <Box
        display="flex"
        justifyContent="flex-end"
        mt={3}>
        <Pagination
          count={Math.ceil(filteredUsuarios.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
};
