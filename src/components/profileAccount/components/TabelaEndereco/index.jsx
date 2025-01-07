import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import { MdDelete, MdEdit } from 'react-icons/md';

export const TabelaEndereco = ({ userData }) => {
  const usuarios = userData?.user;
  return (
    <>
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
        {usuarios?.Address.map((address) => (
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

        {usuarios?.Address.length === 0 && (
          <ListItem>
            <ListItemText
              sx={{ color: '#757575', py: 2, textAlign: 'center' }}
              primary={'Nenhum endereço encontrado.'}></ListItemText>
          </ListItem>
        )}
      </List>
    </>
  );
};
