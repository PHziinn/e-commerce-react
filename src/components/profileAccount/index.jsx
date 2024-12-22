import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { MdCloudUpload, MdDelete, MdEdit } from 'react-icons/md';

export const ProfileAccount = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPass, setIsEditingPass] = useState(false);
  const [name, setName] = useState('João Silva');
  const [email, setEmail] = useState('joao.silva@example.com');

  const roleColors = {
    PAGO: '#6aa84f',
    PENDENTE: '#f1c232',
    CANCELADO: '#d32f2f',
  };

  const addresses = [
    { id: 1, street: 'Rua das Flores, 123', city: 'São Paulo', state: 'SP', zip: '01000-000' },
    { id: 2, street: 'Avenida Paulista, 456', city: 'São Paulo', state: 'SP', zip: '01310-000' },
    { id: 3, street: 'Rua dos Bobos, 0', city: 'Belo Horizonte', state: 'MG', zip: '30100-000' },
  ];

  const initialProducts = [
    {
      id: '8588c07c-e16d-407a-bf1b-e3039e7b70c2',
      status: 'PAGO',
      name: 'Smartphone XYZ',
      total: 999.99,
      paymentId: 'pi_3QRFSrEzYsL2D5fA0SjIsjsB',
      CartItems: [
        {
          id: '8588c07c-e16d-407a-bf1',
          quantity: 10,
          cartId: '8588c07c-e16d-407a-bf1b-e3039e7b70c2',
          productId: '1568ad5d-c3e5-4be8-822e-bac27ac53221',
        },
      ],
    },
    {
      id: '8588c07c-e16d-407a-bf1b-e3039e7b70c2',
      status: 'PENDENTE',
      name: 'Smartphone XYZ',
      total: 999.99,
      paymentId: 'pi_3QRFSrEzYsL2D5fA0SjIsjsB',
      CartItems: [
        {
          id: '8588c07c-e16d-407a-bf1',
          quantity: 10,
          cartId: '8588c07c-e16d-407a-bf1b-e3039e7b70c2',
          productId: '1568ad5d-c3e5-4be8-822e-bac27ac53221',
        },
      ],
    },
    {
      id: '8588c07c-e16d-407a-bf1b-e3039e7b70c2',
      status: 'PENDENTE',
      name: 'Smartphone XYZ',
      total: 999.99,
      paymentId: 'pi_3QRFSrEzYsL2D5fA0SjIsjsB',
      CartItems: [
        {
          id: '8588c07c-e16d-407a-bf1',
          quantity: 10,
          cartId: '8588c07c-e16d-407a-bf1b-e3039e7b70c2',
          productId: '1568ad5d-c3e5-4be8-822e-bac27ac53221',
        },
      ],
    },
    {
      id: '8588c07c-e16d-407a-bf1b-e3039e7b70c2',
      status: 'CANCELADO',
      name: 'Smartphone XYZ',
      total: 999.99,
      paymentId: 'pi_3QRFSrEzYsL2D5fA0SjIsjsB',
      CartItems: [
        {
          id: '8588c07c-e16d-407a-bf1',
          quantity: 10,
          cartId: '8588c07c-e16d-407a-bf1b-e3039e7b70c2',
          productId: '1568ad5d-c3e5-4be8-822e-bac27ac53221',
        },
      ],
    },
  ];

  const handleEditAddress = (id) => {
    console.log('Editando endereço com ID:', id);
  };

  const handleDeleteAddress = (id) => {
    console.log('Deletando endereço com ID:', id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setIsEditingPass(false);
  };
  return (
    <Container
      maxWidth={false}
      sx={{ py: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          fontWeight="bold">
          Foto do perfil
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mt: 2 }}>
          <Avatar
            src="https://res.cloudinary.com/dtk98bty4/image/upload/v1728862716/produtos/wwoedlsoaizy3leknzqg.jpg"
            alt="Wohn Doe"
            sx={{ width: 70, height: 70 }}
          />
          <Button
            variant="contained"
            sx={{
              boxShadow: 'none',
              background: '#000000',
              fontWeight: 'bold',
              transition: 'background-color 0.3s',
              width: '11rem',
              '&:hover': {
                backgroundColor: '#999999',
                color: '#000000',
                fontWeight: 'bold',
                boxShadow: 'none',
              },
            }}
            startIcon={<MdCloudUpload />}>
            Alterar Foto
          </Button>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight="bold">
          Informações Pessoais
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}>
          Atualize suas informações pessoais.
        </Typography>
      </Box>

      <Grid
        container
        spacing={2}>
        <Grid
          item
          xs={12}
          sm={6}>
          <TextField
            fullWidth
            label="Nome"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditing}
          />
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          {isEditing ? (
            <Box sx={{ display: 'flex', gap: 1, mt: 5 }}>
              <Button
                variant="contained"
                onClick={() => setIsEditing(false)}
                sx={{
                  boxShadow: 'none',
                  background: '#bf2a1f',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s',
                  width: '8rem',
                  '&:hover': {
                    backgroundColor: '#a11f15',
                    fontWeight: 'bold',
                    boxShadow: 'none',
                  },
                }}>
                Cancelar
              </Button>
              <Button
                variant="contained"
                sx={{
                  boxShadow: 'none',
                  background: '#000000',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s',
                  width: '8rem',
                  '&:hover': {
                    backgroundColor: '#999999',
                    color: '#000000',
                    fontWeight: 'bold',
                    boxShadow: 'none',
                  },
                }}>
                Salvar
              </Button>
            </Box>
          ) : (
            <Button
              type="button"
              variant="contained"
              sx={{
                mt: 5,
                boxShadow: 'none',
                background: '#000000',
                fontWeight: 'bold',
                transition: 'background-color 0.3s',
                width: '10rem',
                '&:hover': {
                  backgroundColor: '#999999',
                  color: '#000000',
                  fontWeight: 'bold',
                  boxShadow: 'none',
                },
              }}
              onClick={() => setIsEditing(true)}
              fullWidth>
              Editar Perfil
            </Button>
          )}
        </Box>
      </Grid>
      <Divider sx={{ my: 4 }} />

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          fontWeight="bold">
          Atualizar Senha
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}>
          Certifique-se de que sua senha seja segura e exclusiva.
        </Typography>
      </Box>
      <Grid
        container
        spacing={3}>
        <Grid
          item
          xs={12}
          sm={6}>
          <TextField
            fullWidth
            label="Sua senha"
            type="password"
            variant="outlined"
            placeholder="********"
            disabled={!isEditingPass}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}>
          <TextField
            fullWidth
            label="Nova Senha"
            type="password"
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}>
          <TextField
            fullWidth
            label="Confirmar Senha"
            type="password"
            variant="outlined"
          />
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          {isEditingPass ? (
            <Box sx={{ display: 'flex', gap: 1, mt: 5 }}>
              <Button
                variant="contained"
                onClick={() => setIsEditingPass(false)}
                sx={{
                  boxShadow: 'none',
                  background: '#bf2a1f',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s',
                  width: '8rem',
                  '&:hover': {
                    backgroundColor: '#a11f15',
                    fontWeight: 'bold',
                    boxShadow: 'none',
                  },
                }}>
                Cancelar
              </Button>
              <Button
                variant="contained"
                sx={{
                  boxShadow: 'none',
                  background: '#000000',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s',
                  width: '8rem',
                  '&:hover': {
                    backgroundColor: '#999999',
                    color: '#000000',
                    fontWeight: 'bold',
                    boxShadow: 'none',
                  },
                }}>
                Salvar
              </Button>
            </Box>
          ) : (
            <Button
              type="button"
              variant="contained"
              sx={{
                mt: 5,
                boxShadow: 'none',
                background: '#000000',
                fontWeight: 'bold',
                transition: 'background-color 0.3s',
                width: '10rem',
                '&:hover': {
                  backgroundColor: '#999999',
                  color: '#000000',
                  fontWeight: 'bold',
                  boxShadow: 'none',
                },
              }}
              onClick={() => setIsEditingPass(true)}
              fullWidth>
              Editar Perfil
            </Button>
          )}
        </Box>
      </Grid>

      <Divider sx={{ my: 4 }} />
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          fontWeight="bold">
          Endereços cadastrados
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}>
          Veja e edite seus endereços de entrega cadastrados.
        </Typography>
      </Box>
      <List>
        {addresses.map((address) => (
          <ListItem
            key={address.id}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <ListItemText
              primary={address.street}
              secondary={`${address.city} - ${address.state}, CEP: ${address.zip}`}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                color="primary"
                onClick={() => handleEditAddress(address.id)}>
                <MdEdit />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleDeleteAddress(address.id)}>
                <MdDelete />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>

      <TableContainer
        component={Paper}
        elevation={37}
        sx={{ boxShadow: 'none', mt: 10 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#000000' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Nome
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Preço
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {initialProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.paymentId}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{product.name}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    product.total
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Chip
                    label={product.status}
                    sx={{
                      width: '6.8rem',
                      height: '1.5rem',
                      backgroundColor: roleColors[product.status],
                      color: '#fff',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}

            {initialProducts.length === 0 && (
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

      <Box
        display="flex"
        justifyContent="flex-end"
        mt={3}>
        <Pagination
          count={3}
          color="primary"
          variant="outlined"
          showFirstButton
          showLastButton
        />
      </Box>
    </Container>
  );
};
