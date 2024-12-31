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
import { useState } from 'react';
import { MdClose, MdDelete } from 'react-icons/md';
import { z } from 'zod';
import { getProduto } from '../../../../service/api';

const categories = ['RECOMENDADOS', 'MAIS_VENDIDOS'];

const initialFormData = {
  name: '',
  sku: '',
  price: '',
  stock: '',
  description: '',
  category: '',
  files: [],
  imageUrl: [],
};

export const AddProdutosModal = ({ open, onClose, showAlert, onAddProduct }) => {
  const [formData, setFormData] = useState(initialFormData);

  const productSchema = z.object({
    name: z.string().min(1, 'Nome do produto é obrigatório'),
    sku: z.string().min(1, 'SKU é obrigatório'),
    price: z.string().refine((val) => parseFloat(val) > 0, 'Preço deve ser maior que 0'),
    stock: z
      .string()
      .refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 1, 'Estoque deve ser no mínimo 1'),
    description: z.string().min(1, 'Descrição do produto é obrigatória'),
    category: z.string().min(1, 'Categoria é obrigatória'),
    files: z.array(z.any()).min(1, 'Pelo menos uma imagem é obrigatória'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const handleSubmit = async () => {
    try {
      productSchema.parse(formData);

      const existingProduct = await getProduto(formData.sku);

      if (existingProduct) {
        showAlert('Produto com este SKU já existe.', 'info');
        return;
      }

      onAddProduct(formData);

      setFormData(initialFormData);
      showAlert(`Produto adicionando com Sucesso!`, 'success');
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        showAlert(`${error.errors[0].message}.`, 'error');
      }
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
          p: 1,
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
                item
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
            label="Nome do Produto"
            variant="outlined"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: Smartphone"
          />
          <TextField
            label="SKU"
            variant="outlined"
            fullWidth
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="Ex: SRP-001"
          />
          <TextField
            label="Preço"
            variant="outlined"
            fullWidth
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Ex: 999.99"
            type="number"
          />
          <TextField
            label="Estoque"
            variant="outlined"
            fullWidth
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Ex: 50"
            type="number"
          />

          <TextField
            label="Descrição do Produto"
            variant="outlined"
            fullWidth
            name="description"
            value={formData.description}
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
            value={formData.category}
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
            color: '#fff',
            background: 'black',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: '#282828',
              color: 'white',
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
