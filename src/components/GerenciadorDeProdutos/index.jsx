import {
  Box,
  Fab,
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
import { MdAddShoppingCart, MdDelete, MdModeEdit, MdOutlineManageSearch } from 'react-icons/md';

import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { AddProductModal } from './components/produtsModal';

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
  { id: 1, sku: 'SRP-001', name: 'Smartphone XYZ', price: 999.99, stock: 50 },
  { id: 2, sku: 'SRP-001', name: 'Laptop ABC', price: 1299.99, stock: 30 },
  { id: 3, sku: 'SRP-001', name: 'Headphones 123', price: 149.99, stock: 100 },
  { id: 4, sku: 'SRP-001', name: 'Smartwatch QWE', price: 249.99, stock: 75 },
  { id: 5, sku: 'SRP-001', name: 'Tablet RST', price: 399.99, stock: 40 },
  { id: 6, sku: 'SRP-001', name: 'Monitor Ultra', price: 499.99, stock: 15 },
  { id: 7, sku: 'SRP-001', name: 'Teclado Gamer', price: 199.99, stock: 120 },
  { id: 8, sku: 'SRP-001', name: 'Mouse Gamer', price: 99.99, stock: 80 },
  { id: 9, sku: 'SRP-001', name: 'Cadeira Gamer', price: 899.99, stock: 25 },
  { id: 10, sku: 'SRP-001', name: 'Controle Bluetooth', price: 59.99, stock: 90 },
];

export const GerenciadorDeProdutos = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8; // Quantidade de produtos por página

  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddProduct = (product) => {
    console.log('Produto adicionado:', product);
    // Adicione a lógica para salvar o produto no backend ou atualizar a lista
  };

  // Filtra os produtos pelo termo de pesquisa
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginação dos produtos
  const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleEditProduct = (id) => {
    console.log(`Editar produto com ID ${id}`);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

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
            <MdOutlineManageSearch style={{ fontSize: '1.6rem' }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Pesquisar produtos..."
            inputProps={{ 'aria-label': 'search' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Search>

        <Fab
          onClick={() => setModalOpen(true)}
          sx={{
            background: '#000000',
            color: '#fff',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: '#D3D3D3',
              color: 'black',
              boxShadow: 'none',
            },
          }}>
          <MdAddShoppingCart style={{ fontSize: '26px' }} />
        </Fab>
        <AddProductModal
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          onAddProduct={handleAddProduct}
        />
      </Box>

      {/* Tabela de Produtos */}

      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#000000' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SKU</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Nome
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Preço
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Estoque
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.sku}</TableCell>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    product.price
                  )}
                </TableCell>
                <TableCell align="center">{product.stock}</TableCell>
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

            {paginatedProducts.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
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
          count={Math.ceil(filteredProducts.length / itemsPerPage)}
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
