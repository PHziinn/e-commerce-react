import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';
import { MdDelete } from 'react-icons/md';

export const ConfirmDeleteDialog = ({ open, onClose, onConfirm, name, message }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          p: 1,
        },
      }}>
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          fontSize: '1.3rem',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}>
        <MdDelete style={{ color: '#bf2a1f', fontSize: '1.5rem' }} />
        Confirmar Exclusão
      </DialogTitle>
      <DialogContent>
        <Typography>
          {message}{' '}
          <Typography
            component="span"
            sx={{ fontWeight: 'bold', color: 'red' }}>
            {name}
          </Typography>
          ? Essa ação não pode ser desfeita.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            boxShadow: 'none',
            color: 'white',
            background: '#bf2a1f',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
            width: '8rem',
            '&:hover': {
              backgroundColor: '#a11f15',
              boxShadow: 'none',
            },
          }}>
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          sx={{
            boxShadow: 'none',
            color: 'white',
            background: 'black',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
            width: '8rem',
            '&:hover': {
              backgroundColor: '#282828',
              color: 'white',
              boxShadow: 'none',
            },
          }}>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};
