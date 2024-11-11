import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Pagination,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { MdOutlineAddShoppingCart, MdOutlineShoppingCart } from 'react-icons/md';

export const ProductsList = () => {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedCategories, setSelectedCategories] = useState([]);

  const products = [
    {
      id: 1,
      image: '../../../public/produtos/1.png',
      title: 'Fones de Ouvido Sem Fio Bluetooth 5.3, Compatíveis com iPhone e Android',
      price: 99.99,
      category: 'Electronics',
    },
    {
      id: 2,
      image: '../../../public/produtos/2.png',
      title:
        'Power Bank, Carregador Portátil Universal 12.000 mAh, 2 Saídas USB + 1 Saída USB-C, PB12KMB',
      price: 99.99,
      category: 'Accessories',
    },
    {
      id: 3,
      image: '../../../public/produtos/3.png',
      title: 'Wireless Headphones',
      price: 99.99,
      category: 'Accessories',
    },
    {
      id: 4,
      image: '../../../public/produtos/4.png',
      title: 'Wireless Headphones',
      price: 99.99,
      category: 'Accessories',
    },
    {
      id: 5,
      image: '../../../public/produtos/5.png',
      title: 'Wireless Headphones',
      price: 99.99,
      category: 'Accessories',
    },
    {
      id: 6,
      image: '../../../public/produtos/6.png',
      title: 'Wireless Headphones',
      price: 99.99,
      category: 'Accessories',
    },
  ];

  const categories = ['Electronics', 'Bags', 'Accessories', 'Home', 'Clothing'];

  const handlePriceChange = (field, value) => {
    setPriceRange({ ...priceRange, [field]: value });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      gap={3}
      sx={{ mt: 20 }}>
      <Box
        sx={{
          width: { xs: '100%', md: '250px' },
        }}>
        <Typography
          variant="h6"
          gutterBottom>
          Filtros
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box mb={3}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 'bold' }}>
            Categoria
          </Typography>
          {categories.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
              }
              label={category}
              sx={{ fontSize: '0.875rem' }}
            />
          ))}
        </Box>

        <Box mb={3}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 'bold' }}>
            Faixa de preço
          </Typography>
          <Box
            display="flex"
            gap={1}
            mt={1}>
            <TextField
              type="number"
              label="Min"
              value={priceRange.min}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              size="small"
              sx={{ width: '45%' }}
            />
            <TextField
              type="number"
              label="Max"
              value={priceRange.max}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              size="small"
              sx={{ width: '45%' }}
            />
          </Box>
        </Box>

        <Button
          variant="contained"
          sx={{ backgroundColor: '#000000' }}
          fullWidth>
          Aplicar filtros
        </Button>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        flex={1}
        minHeight="600px">
        <Box flexGrow={1}>
          <Grid
            container
            spacing={2}>
            {products.map((product) => (
              <Grid
                item
                md={4}
                key={product.id}>
                <Box
                  sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}>
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.title}
                    sx={{
                      width: '100%',
                      height: 250,
                      objectFit: 'cover',
                    }}
                  />

                  <Box
                    p={2}
                    display="flex"
                    flexDirection="column"
                    flexGrow={1}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{
                        mb: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        marginBottom: 2,
                        flexGrow: 1,
                        lineHeight: '1.4em',
                        maxHeight: '3.4em',
                      }}
                      gutterBottom>
                      {product.title}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 'bold', mb: 1 }}
                      gutterBottom>
                      R${product.price.toFixed(2)}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Button
                        href="#"
                        variant="contained"
                        sx={{
                          boxShadow: 'none',
                          background: 'black',
                          borderRadius: '4px 0 0 4px',
                          transition: 'background-color 0.3s',
                          width: '90%',
                          '&:hover': {
                            backgroundColor: '#D3D3D3',
                            color: 'black',
                            boxShadow: 'none',
                          },
                        }}>
                        <MdOutlineShoppingCart style={{ fontSize: '1.4rem' }} />
                        Comprar
                      </Button>
                      <Button
                        href="#"
                        variant="contained"
                        sx={{
                          boxShadow: 'none',
                          backgroundColor: 'black',
                          height: '2.28rem',
                          borderRadius: '0 4px 4px 0',
                          transition: 'background-color 0.3s',
                          '&:hover': {
                            backgroundColor: '#D3D3D3',
                            color: 'black',
                            boxShadow: 'none',
                          },
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 2,
                            bottom: 2,
                            left: 0,
                            width: 4,
                            backgroundColor: '#ccc',
                            borderRadius: 1,
                          },
                        }}>
                        <MdOutlineAddShoppingCart style={{ fontSize: '1.5rem' }} />
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          mt={4}
          display="flex"
          justifyContent="flex-end">
          <Pagination
            count={5}
            variant="outlined"
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
};
