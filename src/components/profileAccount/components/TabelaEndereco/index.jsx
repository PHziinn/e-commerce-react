import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { ConfirmDelete } from '../../../ConfirmDelete';
import { ModalAddress } from './ModalAddress';

export const TabelaEndereco = ({ userData, onSave, onEdit, onDelete }) => {
  const address = userData?.user?.Address;
  const userId = userData?.user?.id;

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleEditAddress = (id) => {
    const endereco = address.find((user) => user.id === id);
    setSelectedAddress(endereco);
    setEditModalOpen(true);
  };

  const handleSaveEditAddress = (updatedAddress) => {
    if (selectedAddress) {
      onEdit(updatedAddress);
    } else {
      const addressWithUserId = { ...updatedAddress, userId };
      onSave(addressWithUserId);
    }
    setEditModalOpen(false);
  };

  const handleAddAddress = () => {
    setSelectedAddress(null);
    setEditModalOpen(true);
  };

  const handleDeleteAddress = (id) => {
    setAddressToDelete(id);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (addressToDelete) {
      onDelete(addressToDelete);
      setConfirmDeleteOpen(false);
    }
  };

  const deleteMessage = () => {
    return `Você tem certeza de que deseja excluir endereço`;
  };

  return (
    <>
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
        }}>
        <Box
          sx={{
            width: '100%',
          }}>
          <Typography
            fontWeight="bold"
            sx={{
              mt: 1,
              fontSize: '1.3rem',
            }}>
            Endereços cadastrados
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
            }}>
            Veja e edite seus endereços de entrega cadastrados.
          </Typography>
        </Box>
        <Box
          sx={{
            mt: isMobile ? 2 : 0,
            width: '100%',
            textAlign: isMobile ? 'center' : 'right',
          }}>
          <Button
            variant="contained"
            onClick={() => handleAddAddress()}
            sx={{
              boxShadow: 'none',
              background: '#000000',
              fontWeight: 'bold',
              transition: 'background-color 0.3s',
              width: isMobile ? '100%' : '13rem',
              fontSize: '0.8rem',
              '&:hover': {
                backgroundColor: '#282828',
                color: 'white',
                boxShadow: 'none',
              },
            }}>
            Adicionar endereço
          </Button>
        </Box>
      </Box>

      <List>
        {address?.map((address) => (
          <ListItem
            key={address.id}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <ListItemText
              primary={`${address.street} - ${address.streetNumber}`}
              secondary={`${address.city} - ${address.neighbourhood}, CEP: ${address.zipCode}`}
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

        {address?.length === 0 && (
          <ListItem>
            <ListItemText
              sx={{ color: '#757575', py: 2, textAlign: 'center' }}
              primary={'Nenhum endereço encontrado.'}></ListItemText>
          </ListItem>
        )}
      </List>

      <ModalAddress
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        address={selectedAddress}
        onSave={handleSaveEditAddress}
        isEditMode={selectedAddress !== null}
      />

      <ConfirmDelete
        open={isConfirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={confirmDelete}
        message={deleteMessage()}
        name={`${address?.find((address) => address.id === addressToDelete)?.street} ${' -'} ${
          address?.find((address) => address.id === addressToDelete)?.streetNumber
        }`}
      />
    </>
  );
};
