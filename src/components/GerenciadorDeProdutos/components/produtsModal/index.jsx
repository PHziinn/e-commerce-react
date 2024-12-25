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
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { MdClose, MdDelete, MdAddShoppingCart } from 'react-icons/md';

export const AddProductModal = ({ open, onClose, onAddProduct }) => {
  const [product, setProduct] = useState({
    name: '',
    sku: '',
    price: '',
    stock: '',
    description: '',
    category: '',
    images: [],
  });

  const categories = ['RECOMENDADOS', 'MAIS_VENDIDOS'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...imageUrls],
    }));
  };

  const handleImageRemove = (index) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (
      product.name &&
      product.sku &&
      product.price &&
      product.stock &&
      product.description &&
      product.category &&
      product.images.length > 0
    ) {
      onAddProduct(product);
      setProduct({
        name: '',
        sku: '',
        price: '',
        stock: '',
        description: '',
        category: '',
        images: [],
      });
      onClose();
    } else {
      alert('Por favor, preencha todos os campos e adicione pelo menos uma imagem!');
    }
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
          boxShadow: 24,
          p: 2,
        },
      }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center">
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          Adicionar Novo Produto
        </DialogTitle>
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
            Imagens do Produto
          </Typography>
          <Button
            variant="contained"
            component="label"
            sx={{
              mb: 2,
              backgroundColor: 'black',
              '&:hover': { backgroundColor: '#D3D3D3', color: 'black' },
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
            {product.images.map((image, index) => (
              <Grid2
                item
                xs={6}
                sm={4}
                md={3}
                key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
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
            label="Nome do Produto"
            variant="outlined"
            fullWidth
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Ex: Smartphone"
          />
          <TextField
            label="SKU"
            variant="outlined"
            fullWidth
            name="sku"
            value={product.sku}
            onChange={handleChange}
            placeholder="Ex: SRP-001"
          />
          <TextField
            label="Preço"
            variant="outlined"
            fullWidth
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Ex: 999.99"
            type="number"
          />
          <TextField
            label="Estoque"
            variant="outlined"
            fullWidth
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Ex: 50"
            type="number"
          />

          <TextField
            label="Descrição do Produto"
            variant="outlined"
            fullWidth
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Descrição detalhada"
            multiline
            rows={3}
          />
          <TextField
            label="Categoria"
            variant="outlined"
            fullWidth
            name="category"
            value={product.category}
            onChange={handleChange}
            select>
            {categories.map((cat) => (
              <MenuItem
                key={cat}
                value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
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
            background: 'black',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: '#D3D3D3',
              color: 'black',
              boxShadow: 'none',
            },
          }}
          onClick={handleSubmit}>
          Adicionar Produto
        </Button>
      </DialogActions>
    </Dialog>
  );
};
