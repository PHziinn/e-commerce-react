import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid2,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { MdClose, MdDelete } from 'react-icons/md';

export const EditProdutosModal = ({ open, onClose, produtos, onSave }) => {
  const [formData, setFormData] = useState({
    ...produtos,
    imageUrl: produtos?.imagemUrl || [],
    files: produtos?.files || [],
  });

  const statusEstoque = ['DISPONIVEL', 'ESGOTADO'];

  useEffect(() => {
    setFormData(() => ({
      ...produtos,
      imageUrl: (Array.isArray(produtos?.imagemUrl) ? produtos.imagemUrl : [produtos?.imagemUrl])
        .filter(Boolean)
        .map((img) => String(img).trim()),

      files: produtos?.files || [],
    }));
  }, [produtos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (onSave && formData) {
      onSave(formData);
    }
    onClose();
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    const imageUrl = fileArray.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...fileArray],
      imageUrl: [...prev.imageUrl, ...imageUrl],
    }));
  };

  const handleImageRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
      imageUrl: prev.imageUrl.filter((_, i) => i !== index),
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: '16px',
          p: 1,
        },
      }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center">
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Editar Produtos</DialogTitle>
        <IconButton onClick={onClose}>
          <MdClose size={24} />
        </IconButton>
      </Box>
      <Divider />
      <DialogContent>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            gutterBottom>
            Imagem do Produto
          </Typography>

          <Button
            variant="contained"
            component="label"
            sx={{
              mb: 2,
              backgroundColor: 'black',
              '&:hover': { backgroundColor: '#282828' },
            }}>
            Upload Imagens
            <Box
              component={'input'}
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={handleImageUpload}
            />
          </Button>
          <Grid2
            container
            spacing={2}>
            {formData?.imageUrl.map((image, index) => (
              <Grid2
                xs={6}
                sm={4}
                md={3}
                key={index}>
                <Card
                  sx={{
                    boxShadow: 'none',
                  }}>
                  <CardMedia
                    component="img"
                    height={200}
                    image={image}
                    alt={`Imagem ${index + 1}`}
                  />
                  <CardActions>
                    <Button
                      sx={{
                        justifyContent: 'flex-start',
                        color: 'red',
                        fontSize: '25px',
                      }}
                      onClick={() => handleImageRemove(index)}>
                      <MdDelete />
                    </Button>
                  </CardActions>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Box>
        <Stack
          spacing={3}
          sx={{ mt: 2 }}>
          <TextField
            label="ID do Usuário"
            variant="outlined"
            fullWidth
            disabled
            value={formData?.id || ''}
          />
          <TextField
            label="SKU"
            variant="outlined"
            fullWidth
            name="sku"
            value={formData?.sku || ''}
            onChange={handleChange}
          />
          <TextField
            label="Nome do Produto"
            variant="outlined"
            fullWidth
            name="name"
            value={formData?.name || ''}
            onChange={handleChange}
          />
          <TextField
            label="Preço"
            variant="outlined"
            fullWidth
            name="price"
            type="number"
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
              },
            }}
            value={formData?.price || 0}
            onChange={handleChange}
          />
          <TextField
            label="Estoque"
            variant="outlined"
            fullWidth
            name="stock"
            type="number"
            value={formData?.stock || 0}
            onChange={handleChange}
          />
          <TextField
            label="Status de Stocks"
            variant="outlined"
            fullWidth
            name="statusEstoque"
            value={formData?.statusEstoque || ''}
            onChange={handleChange}
            select>
            {statusEstoque.map((cat) => (
              <MenuItem
                key={cat}
                value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Descrição do Produto"
            variant="outlined"
            fullWidth
            name="description"
            multiline
            rows={3}
            value={formData?.description || ''}
            onChange={handleChange}
          />
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ justifyContent: 'space-between', px: 3 }}>
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
          variant="contained"
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
          }}
          onClick={handleSave}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
