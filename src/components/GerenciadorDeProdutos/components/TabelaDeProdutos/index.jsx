import {
  Avatar,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { useConvertValues, useFormatNumber } from '../../../../hooks/ConvertValues';
import { ConfirmDelete } from '../../../ConfirmDelete';
import { EditProdutosModal } from '../EditalProdutosModal';

const statusColors = {
  DISPONIVEL: '#56a733',
  ESGOTADO: '#d32f2f',
};
export const TabelaDeProdutos = ({ data, isLoading, isError, onDelete, onEdit }) => {
  const produtos = data?.data;
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedProdutos, setSelectedProdutos] = useState(null);
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [produtoToDelete, setProdutoToDelete] = useState(null);

  const { convertValues } = useConvertValues();
  const { formatNumber } = useFormatNumber();

  const handleEditProdutos = (id) => {
    const produto = produtos.find((produtos) => produtos.id === id);
    setSelectedProdutos(produto);
    setEditModalOpen(true);
  };

  const handleSaveEditProduto = (updatedProduto) => {
    onEdit(updatedProduto);
    setConfirmDeleteOpen(false);
  };

  const handleDeleteUsuario = (id) => {
    setProdutoToDelete(id);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (produtoToDelete) {
      onDelete(produtoToDelete);
      setConfirmDeleteOpen(false);
    }
  };

  const deleteMessage = () => {
    return `Você tem certeza de que deseja excluir esse produto`;
  };

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#000000' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Imagem</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                SKU
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Nome
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Preço
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Status
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
            {produtos?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Avatar
                    src={product.imagemUrl?.split(',')[0]?.trim()}
                    alt={product.name}
                    sx={{ width: 60, height: 60, borderRadius: '5px' }}
                  />
                </TableCell>
                <TableCell align="center">{product.sku}</TableCell>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">{convertValues(product.price)}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={product.statusEstoque}
                    sx={{
                      width: '7rem',
                      height: '1.3rem',
                      backgroundColor: statusColors[product.statusEstoque],
                      color: '#fff',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}
                  />
                </TableCell>
                <TableCell align="center">{formatNumber(product.stock)}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleEditProdutos(product.id)}
                    sx={{
                      mx: 0.5,
                      backgroundColor: '#e3f2fd',
                      '&:hover': { backgroundColor: '#bbdefb' },
                    }}>
                    <MdModeEdit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteUsuario(product.id)}
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

            {isLoading && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  align="center">
                  <Typography
                    variant="body1"
                    sx={{ color: '#757575', py: 2 }}>
                    <CircularProgress />
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {isError && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  align="center">
                  <Typography
                    variant="body1"
                    sx={{ color: '#757575', py: 2 }}>
                    Erro ao carregar produtos.
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {produtos?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
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
      <EditProdutosModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        produtos={selectedProdutos}
        onSave={handleSaveEditProduto}
      />

      <ConfirmDelete
        open={isConfirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={confirmDelete}
        message={deleteMessage()}
        name={produtos?.find((produto) => produto.id === produtoToDelete)?.name}
      />
    </>
  );
};
