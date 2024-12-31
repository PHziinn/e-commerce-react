import {
  Avatar,
  Badge,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  styled,
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
import { ConfirmDelete } from '../../../ConfirmDelete';
import { EditUsuarioModal } from '../EditalUsuarioModal';

const StyledBadge = styled(Badge, {
  shouldForwardProp: (prop) => prop !== 'isOnline',
})(({ theme, isOnline }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: isOnline ? '#44b700' : '#999999',
    color: isOnline ? '#44b700' : '#999999',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: -1,
      left: -1,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const roleColors = {
  ADMIN: '#7f6000',
  USER: '#073763',
};

export const TabelaDeUsuarios = ({ data, isLoading, isError, onDelete, onEdit }) => {
  const usuarios = data?.data;
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [usuarioToDelete, setUsuarioToDelete] = useState(null);

  const handleEditUsuario = (id) => {
    const usuario = usuarios.find((user) => user.id === id);
    setSelectedUsuario(usuario);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (updatedUsuario) => {
    onEdit(updatedUsuario);
    setEditModalOpen(false);
  };

  const handleDeleteUsuario = (id) => {
    setUsuarioToDelete(id);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (usuarioToDelete) {
      onDelete(usuarioToDelete);
      setConfirmDeleteOpen(false);
    }
  };

  const deleteMessage = () => {
    return `Você tem certeza de que deseja excluir o usuário`;
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
            {usuarios?.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>
                  <Stack direction="row">
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                      isOnline={usuario.isOnline}>
                      <Avatar
                        sx={{ width: 55, height: 55, border: '1px solid rgb 0.0.0.0.1' }}
                        alt={usuario.name}
                        src={usuario.avatar}
                      />
                    </StyledBadge>
                  </Stack>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{usuario.name}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{usuario.email}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Chip
                    label={usuario.role}
                    sx={{
                      width: '5rem',
                      height: '1.2rem',
                      backgroundColor: roleColors[usuario.role],
                      color: '#fff',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleEditUsuario(usuario.id)}
                    sx={{
                      mx: 0.5,
                      backgroundColor: '#e3f2fd',
                      '&:hover': { backgroundColor: '#bbdefb' },
                    }}>
                    <MdModeEdit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteUsuario(usuario.id)}
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
                  colSpan={5}
                  align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}

            {isError && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center">
                  <Typography
                    variant="body1"
                    sx={{ color: '#757575', py: 2 }}>
                    Erro ao carregar usuários.
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {usuarios?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center">
                  <Typography
                    variant="body1"
                    sx={{ color: '#757575', py: 2 }}>
                    Nenhum usuário encontrado.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <EditUsuarioModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        usuario={selectedUsuario}
        onSave={handleSaveEdit}
      />
      <ConfirmDelete
        open={isConfirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={confirmDelete}
        message={deleteMessage()}
        name={usuarios?.find((user) => user.id === usuarioToDelete)?.name}
      />
    </>
  );
};
