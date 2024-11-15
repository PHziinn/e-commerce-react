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
import { useEffect, useState } from 'react';
import { MdOutlineAddShoppingCart, MdOutlineShoppingCart } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { getSearchProducts } from '../../service/api';

export const ProductsList = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const nameParam = searchParams.get('name');
    setName(nameParam);
  }, [location.search]);

  useEffect(() => {
    if (name) {
      getSearchProducts(name, page)
        .then((dados) => {
          console.log('Dados recebidos:', dados);
          setFilteredProducts(dados.data);
          setTotalPages(dados.totalPages);

          const allCategories = dados.data.map((product) => product.category);
          const uniqueCategories = [...new Set(allCategories)];
          setCategories(uniqueCategories);
        })
        .catch((erro) => {
          console.error(erro);
        });
    }
  }, [name, page]);

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
        <Box flex={1}>
          <Grid
            container
            spacing={1}>
            {filteredProducts.length > 0 ? (
              filteredProducts?.map((products) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}
                  xl={3}
                  key={products.id}
                  sx={{
                    display: 'flex',
                    justifyItems: 'center',
                  }}>
                  <Box
                    sx={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      maxWidth: 285,
                      flex: '0 0 auto',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      padding: { xs: '0.3rem', md: '0.7rem' },
                    }}>
                    <Box
                      component={'img'}
                      src={products.imagemUrl}
                      alt={products.name}
                      style={{ width: '100%', marginBottom: '16px' }}
                    />

                    <Typography
                      variant="body2"
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
                      }}>
                      {products.name}
                    </Typography>

                    {products.price && (
                      <Typography
                        variant="body2"
                        sx={{ textDecoration: 'line-through', color: 'gray' }}>
                        R${products.price.toFixed(2)}
                      </Typography>
                    )}
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 'bold', mb: 1 }}>
                      R$ {products.price.toFixed(2)}
                      <Typography
                        component={'p'}
                        sx={{ fontSize: 13, fontWeight: 'lighter', mb: 1 }}>
                        À vista no PIX
                      </Typography>
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
                </Grid>
              ))
            ) : (
              <p>Nenhum produto encontrado.</p>
            )}
          </Grid>
        </Box>
        <Box
          mt={4}
          display="flex"
          justifyContent="flex-end">
          <Pagination
            count={totalPages}
            onChange={(e, value) => setPage(value)}
            variant="outlined"
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      </Box>
    </Box>
  );
};
