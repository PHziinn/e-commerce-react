import {
  Chip,
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
import { Box } from '@mui/system';

const roleColors = {
  PAGO: '#6aa84f',
  PENDENTE: '#f1c232',
  CANCELADO: '#d32f2f',
};

export const TabelaCompras = ({ userData }) => {
  const usuarios = userData?.user;
  return (
    <>
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ boxShadow: 'none', mt: 10 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#000000' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>

              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Preço
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {usuarios?.Carts.map((cart) => (
              <TableRow key={cart.id}>
                <TableCell>{cart.id}</TableCell>

                <TableCell sx={{ textAlign: 'center' }}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    cart.total
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Chip
                    label={cart.status}
                    sx={{
                      width: '6.8rem',
                      height: '1.5rem',
                      backgroundColor: roleColors[cart.status],
                      color: '#fff',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}

            {usuarios?.Carts.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center">
                  <Typography
                    variant="body1"
                    sx={{ color: '#757575', py: 2 }}>
                    Nenhuma compra efetuada.
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
    </>
  );
};
