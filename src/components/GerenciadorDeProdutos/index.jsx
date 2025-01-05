import { Box, Fab, Pagination } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { MdAddShoppingCart, MdOutlineManageSearch } from 'react-icons/md';
import { useAlert } from '../../hooks/ShowAlert';
import { deleteProdutos, getAllProdutos, patchProdutos, postProdutos } from '../../service/api';
import { AlertNotification } from '../AlertNotification';
import { AddProdutosModal } from './components/AdicionarProdutos';
import { TabelaDeProdutos } from './components/TabelaDeProdutos';

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

export const GerenciadorDeProdutos = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { alert, closeAlert, showAlert } = useAlert();
  const client = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['produtos', page],
    queryFn: () => getAllProdutos(null, page),
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const addProdutoMutation = useMutation({
    mutationFn: postProdutos,
    onSuccess: () => {
      client.invalidateQueries(['produtos']);
      showAlert('Produto adicionado com sucesso!', 'success');
    },
    onError: () => {
      showAlert('Erro ao adicionar produto.', 'error');
    },
  });

  const editProdutoMutation = useMutation({
    mutationFn: (data) => patchProdutos(data.id, data.dataProduto),
    onSuccess: () => {
      client.invalidateQueries(['produtos']);
      showAlert('Produto atualizado com sucesso!', 'success');
    },
    onError: (error) => {
      console.error('Erro ao atualizar produto:', error);
      showAlert('Erro ao atualizar produto.', 'error');
    },
  });

  const deleteProdutoMutation = useMutation({
    mutationFn: (id) => deleteProdutos(id),
    onSuccess: () => {
      client.invalidateQueries(['produtos']);
      showAlert('Produto deletado com sucesso!', 'success');
    },
    onError: (error) => {
      console.error('Erro ao deletar produto:', error);
      showAlert('Erro ao deletar produto.', 'error');
    },
  });

  const handleAddProduto = (dataProduto) => {
    const formData = new FormData();

    Object.entries(dataProduto).forEach(([key, value]) => {
      if (key === 'files' && Array.isArray(value)) {
        value.forEach((file) => formData.append('files', file));
      } else {
        formData.append(key, value);
      }
    });

    addProdutoMutation.mutate(formData);
  };

  const handleEditProduto = (updatedProduto) => {
    const formData = new FormData();
    const { id, ...rest } = updatedProduto;

    Object.entries(rest).forEach(([key, value]) => {
      if (key === 'files' && Array.isArray(value)) {
        value.forEach((file) => formData.append('files', file));
      } else {
        formData.append(key, value);
      }
    });

    editProdutoMutation.mutate({ id, dataProduto: formData });
  };

  const handleDeleteProduto = (id) => {
    deleteProdutoMutation.mutate(id);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ p: 3, width: '100%' }}>
      <AlertNotification
        closeAlert={closeAlert}
        alert={alert}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}>
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
              backgroundColor: '#282828',
              color: 'white',
              boxShadow: 'none',
            },
          }}>
          <MdAddShoppingCart style={{ fontSize: '26px' }} />
        </Fab>
        <AddProdutosModal
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          onAddProduct={handleAddProduto}
          showAlert={showAlert}
        />
      </Box>

      <TabelaDeProdutos
        data={data}
        isLoading={isLoading}
        isError={isError}
        onEdit={handleEditProduto}
        onDelete={handleDeleteProduto}
      />

      <Box
        display="flex"
        justifyContent="flex-end"
        mt={3}>
        <Pagination
          count={data?.totalPages || 1}
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
