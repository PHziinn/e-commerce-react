import { Alert, Box, Pagination } from '@mui/material';
import { useState } from 'react';
import { PiUserList } from 'react-icons/pi';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { useAlert } from '../../hooks/ShowAlert';
import { deleteUsuarios, getAllUsuarios, patchUsuarios } from '../../service/api';
import { TabelaDeUsuarios } from './components/TabelaDeUsuarios';

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

export const GerenciadorDeUsuarios = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { alert, showAlert, setAlert } = useAlert();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['usuarios', page],
    queryFn: () => getAllUsuarios(null, page),
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const handleEditUsuario = async (updatedUsuario) => {
    try {
      const { id, file, name, email } = updatedUsuario;
      const formData = new FormData();

      if (name) formData.append('name', name);
      if (email) formData.append('email', email);

      console.log(file);

      if (file) {
        formData.append('file', file);
      }

      const updatedUser = await patchUsuarios(id, formData);
      if (updatedUser) {
        showAlert('Usuário atualizado com sucesso!', 'success');
        refetch();
      }
    } catch (error) {
      showAlert('Erro ao atualizar usuário.', 'error');
    }
  };

  const handleDeleteUsuario = async (id) => {
    try {
      await deleteUsuarios(id);
      showAlert('Usuário deletado com sucesso!', 'success');
      refetch();
    } catch (error) {
      showAlert('Erro ao deletar usuário.', 'error');
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ p: 3, width: '100%' }}>
      {alert.open && (
        <Box sx={{ position: 'fixed', top: '70px', right: '20px', zIndex: 999 }}>
          <Alert
            severity={alert.severity}
            onClose={() => setAlert({ open: false, message: '', severity: 'success' })}>
            {alert.message}
          </Alert>
        </Box>
      )}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}>
        <Search sx={{ display: 'flex' }}>
          <SearchIconWrapper>
            <PiUserList style={{ fontSize: '1.6rem' }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Pesquisar usuários..."
            inputProps={{ 'aria-label': 'search' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Search>
      </Box>

      <TabelaDeUsuarios
        data={data}
        isError={isError}
        isLoading={isLoading}
        onEdit={handleEditUsuario}
        onDelete={handleDeleteUsuario}
      />

      <Box
        display="flex"
        justifyContent="flex-end"
        mt={3}>
        {data?.totalPages !== 1 && (
          <Pagination
            count={data?.totalPages || 1}
            page={page}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            showFirstButton
            showLastButton
          />
        )}
      </Box>
    </Box>
  );
};
