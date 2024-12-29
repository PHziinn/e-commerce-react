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
import { ConfirmDelete } from '../../../ConfirmDelete';
import { EditUsuarioModal } from '../EditalUsuarioModal';

const roleColors = {
  ADMIN: '#d32f2f',
  USER: '#1976d2',
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
                  <Avatar
                    src={usuario.avatar}
                    alt={usuario.name}
                    sx={{ width: 40, height: 40, border: '1px solid rgb 0.0.0.0.1' }}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{usuario.name}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{usuario.email}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Chip
                    label={usuario.role}
                    sx={{
                      width: '5rem',
                      height: '1.5rem',
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
