import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid2,
  IconButton,
  InputAdornment,
  MenuItem,
  Slider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { MdClose, MdDelete } from 'react-icons/md';
import { SwiperSlide } from 'swiper/react';
import { z } from 'zod';
import { getProduto } from '../../../../service/api';
import { productSchema } from '../../../../utils/SchemasZod';
import { SliderCard } from '../../../Slide';

const categories = ['RECOMENDADOS', 'MAIS_VENDIDOS', 'MAIS_PROCURADOS'];
const statusEstoque = ['DISPONIVEL', 'ESGOTADO'];

const settings = {
  spaceBetween: 10,
  slidesPerView: 1,
  slidesPerView: 'auto',
  pagination: { clickable: true },
};

const initialFormData = {
  name: '',
  sku: '',
  price: '',
  stock: '',
  description: '',
  category: '',
  discount: '',
  files: [],
  imagens: [],
};

export const ModalProduto = ({
  open,
  onClose,
  onSave,
  showAlert,
  isEditMode,
  produto,
  isPending,
}) => {
  const [formData, setFormData] = useState(produto || initialFormData);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const fileInputRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMoitore = useMediaQuery('(min-width: 1024px) and (max-width: 1366px)');

  useEffect(() => {
    if (isEditMode && produto) {
      setFormData({
        ...produto,
        price: produto.price?.toString() || '',
        stock: produto.stock?.toString() || '',
        files: produto.files?.length > 0 ? produto.files : produto.imagens || [],
        imagens: produto.imagens || [],
      });
    } else {
      setFormData(initialFormData);
    }
  }, [isEditMode, produto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file && file.size <= 5 * 1024 * 1024) {
      setSelectedFile(file);
      setCropDialogOpen(true);
    } else {
      showAlert('Por favor, selecione uma imagem de até 5MB.', 'error');
    }
  };

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const getCroppedImage = async () => {
    if (!selectedFile || !croppedAreaPixels) return;

    const image = await createImage(URL.createObjectURL(selectedFile));
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const { width, height } = croppedAreaPixels;
    canvas.width = width;
    canvas.height = height;

    // Adiciona um fundo transparente ou branco
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, width, height);

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      width,
      height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const croppedFile = new File([blob], selectedFile.name, {
          type: 'image/png',
        });
        resolve(croppedFile);
      }, 'image/png');
    });
  };

  const handleCropConfirm = async () => {
    const croppedFile = await getCroppedImage();

    if (croppedFile) {
      const imagens = URL.createObjectURL(croppedFile);
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, croppedFile],
        imagens: [...prev.imagens, { url: imagens }],
      }));
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setCropDialogOpen(false);
    setSelectedFile(null);
  };

  const handleCropCancel = () => {
    setCropDialogOpen(false);
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
      imagens: prev.imagens.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.files?.length && formData.imagens?.length) {
        formData.files = formData.imagens.map((img) => img.url);
      }
      productSchema.parse(formData);

      if (!isEditMode) {
        try {
          const existingProduct = await getProduto(formData.sku);

          if (existingProduct) {
            showAlert('Produto com este SKU já existe.', 'info');
            return;
          }
        } catch (error) {
          if (error.response?.status !== 204) {
            showAlert('Erro ao verificar o produto.', 'error');
            return;
          }
        }
      }

      if (onSave && formData) {
        onSave(formData);
        showAlert(
          isEditMode ? 'Produto atualizado com sucesso!' : 'Produto adicionado com sucesso!',
          'success'
        );
      }

      if (!isEditMode) {
        setFormData(initialFormData);
      }

      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        showAlert(`${error.errors[0].message}.`, 'error');
      }
    }
  };

  async function createImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
      image.src = url;
    });
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: '7px',
          p: 1,
        },
      }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center">
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          {isEditMode ? 'Editar Produto' : 'Adicionar Novo Produto'}
        </DialogTitle>
        <IconButton onClick={onClose}>
          <MdClose size={24} />
        </IconButton>
      </Box>
      <Divider />
      <DialogContent>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
              Imagens do Produto
            </Typography>

            <Button
              variant="contained"
              component="label"
              sx={{
                mb: 2,
                backgroundColor: 'black',
                boxShadow: 'none',
                '&:hover': { backgroundColor: '#282828', boxShadow: 'none' },
              }}>
              Upload Imagens
              <Box
                component={'input'}
                hidden
                accept="image/*"
                type="file"
                onChange={handleImageUpload}
                ref={fileInputRef}
              />
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              height: formData?.imagens ? 'auto' : 350,
            }}>
            <SliderCard
              settings={settings}
              style={{ width: '100%', height: 'auto' }}>
              <Grid2
                container
                spacing={2}>
                {formData?.imagens?.length > 0 &&
                  formData?.imagens.map((image, index) => (
                    <SwiperSlide key={index}>
                      <Box
                        sx={{
                          textAlign: 'center',
                          position: 'relative',
                        }}>
                        <Box
                          component={'img'}
                          src={image.url}
                          alt={`Imagem ${index + 1}`}
                          sx={{
                            height: '300px',
                            objectFit: 'contain',
                            marginBottom: '8px',
                          }}
                        />

                        <Button
                          sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            color: 'red',
                            minWidth: 'auto',
                            fontSize: '30px',
                          }}
                          onClick={() => handleImageRemove(index)}>
                          <MdDelete />
                        </Button>
                      </Box>
                    </SwiperSlide>
                  ))}
              </Grid2>
            </SliderCard>
          </Box>
        </Box>
        <Stack
          spacing={3}
          sx={{ mt: 2 }}>
          <TextField
            label="Nome do Produto"
            variant="outlined"
            fullWidth
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            placeholder="Ex: Smartphone"
          />
          <TextField
            label="SKU"
            variant="outlined"
            fullWidth
            name="sku"
            value={formData.sku || ''}
            onChange={handleChange}
            placeholder="Ex: SRP-001"
          />
          <TextField
            label="Preço"
            variant="outlined"
            fullWidth
            name="price"
            value={formData.price || 0}
            onChange={handleChange}
            placeholder="Ex: 999.99"
            type="number"
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
              },
            }}
          />
          <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
            <TextField
              label="Estoque"
              variant="outlined"
              fullWidth
              name="stock"
              value={formData.stock || 0}
              onChange={handleChange}
              placeholder="Ex: 50"
              type="number"
            />
            <TextField
              label="Status de Stocks"
              variant="outlined"
              fullWidth
              name="statusEstoque"
              value={formData?.statusEstoque || 'DISPONIVEL'}
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
          </Box>

          <TextField
            label="Descrição do Produto"
            variant="outlined"
            fullWidth
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Descrição detalhada"
            multiline
            rows={3}
          />
          <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
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
            <TextField
              label="Desconto do Produto"
              variant="outlined"
              fullWidth
              name="discount"
              value={formData.discount || ''}
              onChange={handleChange}
              placeholder="Desconto do Produto"
            />
          </Box>
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
          {isPending ? (
            <CircularProgress
              sx={{ color: '#000000' }}
              size={24}
            />
          ) : isEditMode ? (
            'Salvar Alterações'
          ) : (
            'Adicionar Produto'
          )}
        </Button>
      </DialogActions>

      {cropDialogOpen && (
        <Dialog
          open={cropDialogOpen}
          onClose={handleCropCancel}
          fullWidth
          maxWidth="sm">
          <DialogTitle>Recortar Imagem</DialogTitle>
          <DialogContent
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: 500,
                borderRadius: '7px',
                backgroundColor: 'transparent',
              }}>
              <Cropper
                image={selectedFile ? URL.createObjectURL(selectedFile) : ''}
                crop={crop}
                zoom={zoom}
                cropSize={{ width: isMoitore ? 450 : 500, height: isMoitore ? 350 : 420 }}
                aspect={1}
                restrictPosition={false}
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </Box>
            <Box
              sx={{
                width: '80%',
                maxWidth: 400,
              }}>
              <Typography
                variant="body1"
                align="center"
                color="black">
                Ajuste o zoom
              </Typography>
              <Slider
                sx={{ color: '#000000' }}
                size="small"
                value={zoom}
                min={0}
                max={3}
                step={0.1}
                onChange={(e, value) => setZoom(value)}
                aria-labelledby="zoom-slider"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCropCancel}
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
              onClick={handleCropConfirm}
              sx={{
                boxShadow: 'none',
                color: 'white',
                background: 'black',
                fontWeight: 'bold',
                transition: 'background-color 0.3s',
                width: '8rem',
                '&:hover': {
                  backgroundColor: '#282828',
                  boxShadow: 'none',
                },
              }}>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Dialog>
  );
};
